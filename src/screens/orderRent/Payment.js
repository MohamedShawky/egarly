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
import {
  ProductInfo,
  CreateOrderBarStepper,
  Payment,
} from "../../components/orderRent";

import * as OrderRepo from "../../repo/OrderRepo";
import InfoModal from "../../components/InfoModal";
import InfoBottomSheet from "../../components/InfoBottomSheet";
import { refreshList } from "../../actions/list";
import { OrderAccepted, AgreeToReRent } from "../../components/appModals";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import PaymentBottomSheet from "../../components/orderRent/PaymentBottomSheet";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import PaymenOwner from "../orderRentOwner/PaymentOwner";
class PaymentOrder extends Component {
  constructor(props) {
    super(props);
    this.InfoBottomSheet = React.createRef();
    Navigation.events().bindComponent(this);

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
    // console.log("echoo", this.echo);
  }

  listenToEchoo = (threadId) => {
    this.echo
      .join(`order.change_status.${this.props.orderId}`)
      .here((event) => {
        console.log("here ==>>>", event);
      })
      .listen("ChangeStatus", (msg) => {
        console.log("changeStauts payment ---->", msg);
        const { order } = msg;
        const { id, status_id } = order;

        if (
          this.state.stackName === "ORDER_STACK" &&
          this.props.orderId === id
        ) {
          AppNavigation.navigateToOrderStatus(status_id, id, this.props.owner);
        }
      });
  };
  state = {
    paymentSuccess: false,
    orderLoading: true,
    isModalVisible: false,
    message: "",
    loading: false,
    data: null,
    paymentMethod: null,
    stackName: this.props.stackName,
  };

  componentDidMount() {
    console.log("props -->>", this.props);

    this.listenToEchoo();
    this.getOrderById();
  }

  //
  componentDidDisappear() {
    this.echo.leaveChannel(`order.change_status.${this.props.orderId}`);
    this.echo.leave(`order.change_status.${this.props.orderId}`);
    this.echo.leaveChannel(`ChangeStatus`);
    this.echo.leave(`ChangeStatus`);
    this.echo = null;

    this.setState(
      {
        stackName: "MAIN_STACK",
      },
      () => {
        console.log("state ===>>", this.state.stackName);
      }
    );
  }

  getOrderById = async () => {
    this.setState({
      orderLoading: true,
    });
    try {
      const order = await OrderRepo.getOrderById(this.props.orderId);
      console.log("Order ******  in Payment ===>>>", order);

      this.setState(
        {
          data: order,
        },
        () => {
          this.setState({
            orderLoading: false,
          });
          if (
            order !== undefined &&
            order.user_id === this.props.userData.user.id &&
            order.status_id === 5
          ) {
            this.setState({
              isModalVisible: true,
              message: "في انتظار الموافقه علي طلب الدفع",
            });
          }
        }
      );
    } catch (error) {
      this.setState({
        orderLoading: false,
      });
    }
  };

  onRequestToPaid = async () => {
    // order id ==>>
    this.setState({
      loading: true,
    });

    const order_id = this.state.data.id;
    const userId = this.props.userData.id;
    let data = {};
    if (
      this.state.data.status_id === 4 &&
      this.props.userData.user.id === this.state.data.user_id
    ) {
      data.order_id = order_id;
      data.status_id = 5;
    } else {
      data.order_id = order_id;
      data.status_id = 6;
    }

    console.log("orderId ==>>>", data);

    try {
      const isAccepteToPaid = await OrderRepo.changeOrderStatus(data);
      console.log("is Accept");

      if (
        isAccepteToPaid &&
        this.state.data.user_id === this.props.userData.id
      ) {
        this.props.refreshList("myOrderRent");
        this.setState({
          loading: false,
          isModalVisible: true,
          message: I18n.t("payment-confirmed"),
        });
      } else {
        this.props.refreshList("rentedOrder");

        AppNavigation.navigateToOrderStatus(6, this.state.data.id);
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log("error", error);

      showError("Error , try again");
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
          !this.state.orderLoading &&
          I18n.t("rent-order", { id: this.state.data.id })
        }
      />

      <CreateOrderBarStepper
        arrayOfstepsKey="create-order-rent-steps-done"
        currentStep={3}
      />
      {this.state.orderLoading ? (
        <AppView stretch flex centerX>
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
          >
            <Payment
              onRequestToPaid={() => {
                this.onRequestToPaid();
              }}
              sppiner={this.state.loading}
              order={this.state.data}
              userId={this.props.userData.user.id}
              payment={
                this.state.paymentMethod !== null &&
                this.state.paymentMethod.ar_name
              }
            />
          </AppScrollView>
          <AppView
            style={[{ positioon: "absolute", bottom: 0, left: 0, right: 0 }]}
            stretch
            style={cardShadowStyle}
            elevation={1.5}
            paddingBottom={10}
            // backgroundColor="red"
          >
            {this.props.userData.user.id === this.state.data.owner_id ? (
              <AppButton
                title={"تاكيد الدفع"}
                stretch
                onPress={() => {
                  this.onRequestToPaid();
                }}
                processing={this.state.loading}
                marginHorizontal={7}
                backgroundColor="primary"
                disabled={
                  this.state.data.status_id < 4 ||
                  (this.props.userData.user.id === this.state.data.owner_id &&
                    this.state.data.status_id <= 4)
                }
              />
            ) : (
              <AppButton
                title={"حدد طريقه الدفع"}
                stretch
                onPress={() => {
                  this.InfoBottomSheet.current.show();
                }}
                processing={this.state.loading}
                marginHorizontal={7}
                backgroundColor="primary"
                disabled={
                  this.state.data.status_id < 4 ||
                  (this.state.data.user_id === this.props.userData.user.id &&
                    this.state.data.status_id === 5)
                }
              />
            )}
          </AppView>
        </>
      )}
      {/* <CustomBottomTabs componentId={this.props.componentId} /> */}
      <PaymentBottomSheet
        ref={this.InfoBottomSheet}
        onConfirm={(v) => {
          this.setState(
            {
              paymentMethod: v,
            },
            () => {
              this.onRequestToPaid();
            }
          );
        }}
      />
    </AppView>
  );

  render() {
    if (this.props.owner) {
      return (
        <>
          <AppHeader
            title={
              !this.state.orderLoading &&
              I18n.t("rent-order", { id: this.state.data.id })
            }
          />

          <CreateOrderBarStepper
            arrayOfstepsKey="create-order-rent-steps-done"
            currentStep={3}
          />
          <PaymenOwner
            data={this.state.data}
            orderLoading={this.state.orderLoading}
            isModalVisible={this.state.isModalVisible}
          />
          {/* <AgreeToReRent
            visible={this.state.isModalVisible}
            changeState={(v) => {
              this.setState(
                {
                  isModalVisible: false,
                },
                () => {}
              );
            }}
            orderConfirmation={this.state.message}
            title={I18n.t("okey")}
            payment
            owner
          /> */}
        </>
      );
    }
    return (
      <>
        {this.renderMenuContent()}

        <AgreeToReRent
          visible={this.state.isModalVisible}
          changeState={(v) => {
            this.setState(
              {
                isModalVisible: false,
              },
              () => {
                // AppNavigation.pop();
                AppNavigation.navigateToOrderStatus(6, this.props.orderId);
              }
            );
          }}
          orderConfirmation={this.state.message}
          title={I18n.t("okey")}
          payment
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl,
});
const mapDispatchToProps = (dispatch) => ({
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOrder);
