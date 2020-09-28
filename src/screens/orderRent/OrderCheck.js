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
import {
  ProductCheck,
  CreateOrderBarStepper,
} from "../../components/orderRent";

import * as OrderRepo from "../../repo/OrderRepo";
import InfoModal from "../../components/InfoModal";
import { date } from "yup";
import InfoBottomSheet from "../../components/InfoBottomSheet";
import { refreshList } from "../../actions/list";
import { OrderAccepted } from "../../components/appModals";
import {
  ActionsButton,
  ActionsButtonOwner,
} from "../../components/orderRent/ProductCheck";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";

class Home extends Component {
  constructor(props) {
    super(props);
    this.InfoBottomSheet = React.createRef();
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
    let PusherClient = new Pusher(options.key, options);
    console.log("PusherClient", PusherClient);

    PusherClient.connection.bind("error", function(err) {
      log(">>> detected limit error");
    });

    PusherClient.connection.bind("connected", function() {
      console.log("isConnected");
    });
    this.echo = new Echo({
      broadcaster: "pusher",
      client: PusherClient,
      ...options,
    });
    console.log("echoo", this.echo);
  }
  state = {
    loading: false,
    orderLoading: true,
    data: null,
    isModalVisible: false,
    message: "",
    isRefused: false,
    isModalVisibleRefuse: false,
  };

  listenToEchoo = (threadId) => {
    this.echo
      .join(`order.change_status.${this.props.orderId}`)
      .here((event) => {
        console.log("here  ==>>>", event);
      })
      .listen("ChangeStatus", (msg) => {
        console.log("changeStauts orderCheck ---->");

        const { order } = msg;
        const { id, status_id } = order;

        if (
          this.props.stackName === "ORDER_STACK" &&
          this.props.orderId === id
        ) {
          AppNavigation.navigateToOrderStatus(status_id, id);
        }
      });

    console.log("echoo *****", this.echo);
  };
  // order.change_status.{order_id}

  async componentDidMount() {
    await this.getOrderById();
    this.listenToEchoo();
  }

  getOrderById = async () => {
    this.setState({
      orderLoading: true,
    });
    try {
      const order = await OrderRepo.getOrderById(this.props.orderId);
      console.log("Order check  ------          ===>>>", order);

      this.setState({
        data: order,
        orderLoading: false,
      });

      if (
        order !== undefined &&
        order.user_id === this.props.userData.user.id &&
        order.status_id === 3
      ) {
        this.setState({
          message: "في انتظارالموافقه علي طلب المعاينه",
          isModalVisible: true,
        });
      } else if (
        order !== undefined &&
        order.user_id !== this.props.userData.user.id &&
        order.status_id < 3
      ) {
        this.setState({
          message: "في انتظار طلب المعاينه",
          isModalVisible: true,
        });
      } else if (
        order !== undefined &&
        order.user_id !== this.props.userData.user.id &&
        order.status_id === 4
      ) {
        this.setState({
          message: "في انتظار طلب الدفع",
          isModalVisible: true,
        });
      }
    } catch (error) {
      console.log("error ===>>>>", JSON.parse(JSON.stringify(error)));

      this.setState({
        orderLoading: false,
      });
    }
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  onPreviewRequest = async () => {
    // order id ==>>
    this.setState({
      loading: true,
    });

    console.log("props --->>", this.props);

    console.log("this.state.data", this.state.data);

    const order_id = this.state.data.id;
    let data = {};
    if (this.state.data.status_id === 3) {
      data.order_id = order_id;
      data.status_id = 4;
    } else {
      data.order_id = order_id;
      data.status_id = 3;
    }

    console.log("onPreviewRequest ===>>", data);

    console.log("orderId ==>>>", data);

    try {
      const isAccepte = await OrderRepo.changeOrderStatus(data);
      console.log("is Accept");

      if (isAccepte) {
        this.setState({
          loading: false,
          isModalVisible: true,
          message:
            this.state.data.status_id === 3
              ? "الموافقه علي طلب المعاينه"
              : "في انتظار تاكيد طلب المعاينه",
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });

      showError("Error , try again");
    }
  };
  onRefuseOrder = async () => {
    this.setState({
      isRefused: true,
    });

    try {
      const data = {
        order_id: this.state.data.id,
        status_id: 12,
      };
      const isAccepte = await OrderRepo.changeOrderStatus(data);

      if (isAccepte) {
        this.setState({
          isRefused: false,
          isModalVisibleRefuse: true,

          message: "تم الغاء الطلب",
        });
      }
    } catch (error) {
      this.setState({
        isRefused: false,
      });

      showError("Error , try again");
    }
  };
  renderContent = () => {
    return (
      <AppView stretch flex>
        <AppHeader
          title={
            !this.state.orderLoading &&
            I18n.t("rent-order", {
              id: !this.state.orderLoading ? this.state.data.id : null,
            })
          }
        />
        <CreateOrderBarStepper
          arrayOfstepsKey="create-order-rent-steps"
          currentStep={2}
        />
        {this.state.orderLoading ? (
          <AppView flex stretch center>
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
              centerX
            >
              <ProductCheck
                onPreviewRequest={() => {
                  this.onPreviewRequest();
                }}
                sppiner={this.state.loading}
                order={this.state.data}
                onRefuseOrder={() => {
                  this.onRefuseOrder();
                }}
                ownerOrRenter={
                  this.state.data !== undefined &&
                  this.state.data.user_id !== this.props.userData.user.id
                    ? true
                    : false
                }
              />
            </AppScrollView>
            <AppView
              style={[{ positioon: "absolute", bottom: 0, left: 0, right: 0 }]}
              stretch
              style={cardShadowStyle}
              elevation={1.5}
              // backgroundColor="red"
            >
              {this.state.data !== undefined &&
              this.state.data.user_id !== this.props.userData.user.id ? (
                <ActionsButton
                  onPreviewRequest={this.onPreviewRequest}
                  onRefuseOrder={this.onRefuseOrder}
                  sppiner={this.state.loading}
                  isRefused={this.state.isRefused}
                  disabled={
                    this.props.userData.user.id === this.state.data.owner_id &&
                    this.state.data.status_id === 2
                  }
                />
              ) : (
                <ActionsButtonOwner
                  onPreviewRequest={this.onPreviewRequest}
                  onRefuseOrder={this.onRefuseOrder}
                  sppiner={this.state.loading}
                  isRefused={this.state.isRefused}
                />
              )}
            </AppView>
          </>
        )}
        {/* <CustomBottomTabs componentId={this.props.componentId} /> */}
      </AppView>
    );
  };
  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        images: [],
        address: "",
        description: "",
        price: "",
        rentValue: "",
      }}
      // validationSchema={buildValidationSchemaEGY(this.fromikRef)}
      onSubmit={(values, { setSubmitting, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, isSubmitting })
      }
    >
      {this.renderFormBody}
    </Formik>
  );

  renderFormBody = (props) => {
    const {
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = props;

    return (
      <>
        <AddImage {...props} />
        <Descriptions {...props} />
        <Price {...props} />
      </>
    );
  };

  render() {
    const { data } = this.state;

    return (
      <>
        {this.renderMenuContent()}
        {/* <InfoBottomSheet
          ref={this.InfoBottomSheet}
          message="Waitting Acceptting Order"
        /> */}
        <OrderAccepted
          visible={this.state.isModalVisible}
          changeState={(v) => {
            this.setState(
              {
                isModalVisible: false,
              },
              () => {
                if (
                  this.props.userData.user.id !== this.state.data.owner_id ||
                  (this.state.data.status_id === 3 &&
                    this.state.message !== "تم الغاء الطلب")
                ) {
                  AppNavigation.navigateToOrderStatus(4, data.id);
                }
              }
            );
          }}
          message={this.state.message}
          messageHint
        />
        <OrderAccepted
          visible={this.state.isModalVisibleRefuse}
          changeState={(v) => {
            this.setState(
              {
                isModalVisibleRefuse: false,
              },
              () => {
                AppNavigation.pop();
              }
            );
          }}
          message={this.state.message}
          messageHint
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
export default connect(mapStateToProps)(Home);
