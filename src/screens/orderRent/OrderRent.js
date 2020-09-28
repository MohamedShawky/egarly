import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-native-navigation";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Formik } from "formik";
import {
  AppView,
  AppScrollView,
  AppNavigation,
  responsiveHeight,
  AppText,
  AppButton,
  AppIcon,
  AppImage,
  showError,
  AppSpinner,
} from "../../common";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader,
} from "../../components";
import {
  SearchInput,
  WelcomeHeader,
  Swiper,
  ProductToRent,
  OfferRent,
} from "../../components/home";

import CustomBottomTabs from "../Home/CustomBottomTabs";
import avatar from "../../assets/imgs/avatar.png";
import { AddImage, Descriptions, Price } from "../../components/addProduct";
import { ProductInfo, CreateOrderBarStepper } from "../../components/orderRent";
import * as OrderRepo from "../../repo/OrderRepo";
import { date, reach } from "yup";
import { refreshList } from "../../actions/list";
import InfoBottomSheet from "../../components/InfoBottomSheet";
import {
  OrderAccepted,
  PendingOrderAccepted,
} from "../../components/appModals";
import { ActionsButton } from "../../components/orderRent/ProductInfo";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import store from "../../store";
import { SET_SUBSCREIBED } from "../../actions/types";
class OrderRent extends Component {
  constructor(props) {
    super(props);
    this.InfoBottomSheet = React.createRef();
    Navigation.events().bindComponent(this);
    this.echoObj = null;

    console.log("props =====>>", props);

    let options = {
      broadcaster: "pusher",
      key: "myKey",
      wsHost: "ejarly.dev.fudexsb.com",
      wsPort: 6001,
      wssPort: 6001,
      disableStats: true,
      authEndpoint: "http://ejarly.dev.fudexsb.com/broadcasting/auth",

      auth: {
        headers: {
          Authorization: `Bearer ${props.userData.token}`,
        },
      },
    };
    this.PusherClient = new Pusher(options.key, options);
    console.log("PusherClient", this.PusherClient);

    this.PusherClient.connection.bind("error", function(err) {
      log(">>> detected limit error");
    });

    this.PusherClient.connection.bind("connected", function() {
      console.log("isConnected");
    });
    this.echo = new Echo({
      broadcaster: "pusher",
      client: this.PusherClient,
      ...options,
    });
  }

  listenToEchoo = (threadId) => {
    this.echo
      .join(`order.change_status.${this.props.orderId}`)
      .here((event) => {
        console.log("here ==>>>", event);
      })
      .listen("ChangeStatus", (msg) => {
        console.log("ChangeStatus Orderrent ===>>>", msg);
        this.props.refreshList("rentedOrder");
        this.props.refreshList("myOrderRent");

        const { order } = msg;
        const { id, status_id } = order;
        console.log("id, status_id", id, status_id);
        console.log("this.state.stackName", this.state.stackName);

        if (
          this.state.stackName === "ORDER_STACK" &&
          this.props.orderId === id
        ) {
          AppNavigation.navigateToOrderStatus(status_id, id);
        }
      });

    console.log("echoo *****", this.echo);
  };

  componentDidAppear() {
    console.log("this.props.isSubscribed", this.props.isSubscribed);

    if (!this.props.isSubscribed) {
      store.dispatch({
        type: SET_SUBSCREIBED,
        payload: true,
      });
    }
  }

  componentDidDisappear() {
    console.log("did dis appear");

    this.echo.leaveChannel(`order.change_status.${this.props.orderId}`);
    this.echo.leave(`order.change_status.${this.props.orderId}`);
    this.echo.leaveChannel(`ChangeStatus`);
    this.echo.leave(`ChangeStatus`);
    this.echo = null;

    this.setState({
      stackName: "MAIN_STACK",
    });

    // this.echo.connector.socket.removeListener("ChangeStatus", this.echo);
  }
  state = {
    loading: false,
    orderLoading: true,
    order: null,
    isModalVisible: false,
    messageHint: null,
    stackName: this.props.stackName,
  };
  componentDidMount() {
    this.listenToEchoo();
    this.getOrderById();
  }

  getOrderById = async () => {
    console.log("order this.props.orderId -->>", this.props.orderId);

    try {
      const order = await OrderRepo.getOrderById(this.props.orderId);
      console.log("order ____________________ -->>", order);
      this.setState({
        orderLoading: false,
        order,
      });
      if (
        order !== null &&
        order.user_id === this.props.userData.user.id &&
        order.status_id === 2
      ) {
        // this.InfoBottomSheet.current.show();
        this.setState({
          isModalVisible: true,
        });
      }
    } catch (error) {
      console.log("EEEEEEEERRRRRRRR", error);

      this.setState({
        orderLoading: false,
      });
    }
  };
  onAcceptOrder = async () => {
    // order id ==>>
    this.setState({
      loading: true,
    });

    const order_id = this.props.orderId;
    const userId = this.props.userData.user.id;
    let data = null;
    if (userId === this.state.order.user_id) {
      data = {
        order_id,
        status_id: 1,
      };
    } else {
      data = {
        order_id,
        status_id: 2,
      };
    }

    console.log("orderId ==>>>", data);

    try {
      const isAccepte = await OrderRepo.changeOrderStatus(data);

      console.log("isAccepte", isAccepte);

      if (isAccepte) {
        this.setState({
          loading: false,
          isModalVisible: true,
          messageHint:
            userId !== this.state.order.user_id ? "تم قبول الطلب" : false,
        });

        this.props.refreshList("rentedOrder");

        this.props.refreshList("myOrderRent");

        // AppNavigation.push({
        //   name: "orderCheck",
        //   passProps: {
        //     data: this.state.order
        //   }
        // });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log("error", error);
      showError("Error happen");
    }
  };

  onRefuseOrder = async () => {
    const { orderId } = this.props.data;

    try {
      const isAccepte = await OrderRepo.changeOrderStatus(order_id, 2);
      if (isAccepte) {
        AppNavigation.push({
          name: "orderCheck",
          passProps: {
            data: this.state.order,
          },
        });
      }
    } catch (error) {
      console.log("error", error);
      showError("Error happen");
    }
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  renderContent = () => (
    <AppView stretch flex>
      <AppHeader
        title={
          this.state.orderLoading || this.state.order === null
            ? null
            : I18n.t("rent-order", { id: this.state.order.id })
        }
      />
      <CreateOrderBarStepper
        arrayOfstepsKey="create-order-rent-steps"
        currentStep={1}
      />
      {this.state.orderLoading ? (
        <AppView stretch flex center>
          <AppSpinner />
        </AppView>
      ) : (
        <>
          <AppScrollView
            stretch
            flex
            paddingTop={5}
            paddingHorizontal={7}
            paddingBottom={10}
            borderTopWidth={0.5}
            borderTopColor="#F4F2F0"
          >
            <ProductInfo
              onAcceptOrder={() => {
                this.onAcceptOrder();
              }}
              sppiner={this.state.loading}
              onRefuseOrder={() => {
                this.onRefuseOrder();
              }}
              userId={this.props.userData.user.id}
              order={this.state.order.products[0]}
            />
          </AppScrollView>
          {this.state.loading ? (
            <AppView
              marginTop={5}
              style={[cardShadowStyle]}
              elevation={1.5}
              paddingVertical={5}
              stretch
              center
            >
              <AppSpinner />
            </AppView>
          ) : this.state.order !== null &&
            this.state.order.user_id === this.props.userData.user.id ? (
            <AppView
              style={[
                cardShadowStyle,
                { positioon: "absolute", bottom: 0, left: 0, right: 0 },
              ]}
              paddingHorizontal={7}
              elevation={1.2}
              stretch
              height={10}
              center
            >
              <AppButton stretch disabled title={I18n.t("PENDING")} />
            </AppView>
          ) : (
            <ActionsButton
              onAcceptOrder={this.onAcceptOrder}
              onRefuseOrder={this.onRefuseOrder}
            />
          )}
        </>
      )}
      <PendingOrderAccepted
        visible={this.state.isModalVisible}
        changeState={(v) => {
          this.setState(
            {
              isModalVisible: false,
            },
            () => {
              // AppNavigation.navigateToOrderStatus(
              //   this.state.order.status.id,
              //   this.state.order.id
              // );

              this.props.refreshList("rentedOrder");

              this.props.refreshList("myOrderRent");
            }
          );
        }}
        ownerName={"المالك"}
        messageHint={this.state.messageHint}
        message="قم بالتواصل مع المالك عن طريق الرسائل لتحديد وقت الالتقاء والمكان"
      />
    </AppView>
  );

  render() {
    return <>{this.renderMenuContent()}</>;
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl,
  isSubscribed: state.order.isSubscribed,
});

const mapDispatchToProps = (dispatch) => ({
  refreshList: bindActionCreators(refreshList, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderRent);
