import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-native-navigation";

import { Formik } from "formik";
import {
  AppView,
  AppScrollView,
  AppNavigation,
  AppSpinner,
  AppButton,
} from "../../common";

import { NoInternet, AppHeader } from "../../components";

import { AddImage, Descriptions, Price } from "../../components/addProduct";
import { CreateOrderBarStepper, DeliverRent } from "../../components/orderRent";

import * as OrderRepo from "../../repo/OrderRepo";
import { refreshList } from "../../actions/list";
import {
  OrderAccepted,
  PaymentConfirmation,
  PaymentSure,
  PaymentConfirmationRenter,
} from "../../components/appModals";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import DeliverRentOrderOwner from "../orderRentOwner/DeliverRentOrderOwner";
class DeliverRentOrder extends Component {
  constructor(props) {
    super(props);
    this.InfoBottomSheet = React.createRef();
    Navigation.events().bindComponent(this);

    this.echoObj = null;
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

  componentDidDisappear() {
    console.log("did dis appear");
    // this.echo.subscription.unbind();

    this.echo.leaveChannel(`order.change_status.${this.props.orderId}`);
    this.echo.leave(`order.change_status.${this.props.orderId}`);
    this.echo.leaveChannel(`ChangeStatus`);
    this.echo.leave(`ChangeStatus`);
    this.echo.disconnect();

    this.echo = null;
  }

  listenToEchoo = (threadId) => {
    this.echo
      .join(`order.change_status.${this.props.orderId}`)
      .here((event) => {
        console.log("here ==>>>", event);
      })
      .listen("ChangeStatus", (msg) => {
        console.log("ChangeStatus Order ===>>>", msg);
        this.props.refreshList("rentedOrder");
        this.props.refreshList("myOrderRent");

        const { order } = msg;
        const { id, status_id } = order;

        if (
          this.props.stackName === "ORDER_STACK" &&
          this.props.orderId === id
        ) {
          AppNavigation.navigateToOrderStatus(status_id, id, this.props.owner);
        }
      });

    console.log("echoo *****", this.echo);
  };
  state = {
    paymentSuccess: false,
    orderLoading: !this.props.owner ? true : false,
    isModalVisible: false,
    message: "",
    loading: false,
    data: null,
    isPaymentSuccess: false,
  };

  componentDidMount() {
    this.listenToEchoo();

    if (!this.props.owner) {
      this.getOrderById();
    }
  }

  getOrderById = async () => {
    this.setState({
      orderLoading: true,
    });
    try {
      const order = await OrderRepo.getOrderById(this.props.orderId);
      console.log("Order  delviery ===>>>", order);

      if (!this.props.owner && order.status_id === 5) {
        this.setState({
          isPaymentSuccess: true,
        });
      }

      if (
        order !== undefined &&
        !this.props.owner &&
        order.status_id !== 5 &&
        order.owner_id !== this.props.userData.user.id
      ) {
        this.setState(
          {
            isModalVisible: true,
            message: "في انتظار تاكيد الاستلام",
          },
          () => {
            // this.InfoBottomSheet.current.show();
          }
        );
      }

      this.setState({
        data: order,

        orderLoading: false,
      });
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
    const userId = this.props.userData.user.id;
    let data = {};

    data.order_id = order_id;
    data.status_id = 8;

    try {
      const isAccepteToPaid = await OrderRepo.changeOrderStatus(data);

      if (
        isAccepteToPaid &&
        this.props.userData.user.id !== this.state.data.user_id
      ) {
        this.props.refreshList("rentedOrder");

        this.setState({
          loading: false,
          isModalVisible: true,
          message: "تم تاكيد الاستلام",
        });
      } else {
        this.props.refreshList("myOrderRent");

        AppNavigation.navigateToOrderStatus(9, this.state.data.id);
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

  renderContent = () => {
    console.log("this.state.data", this.state.data);

    return (
      <AppView stretch flex>
        <AppHeader
          title={
            !this.state.orderLoading &&
            I18n.t("rent-order", {
              id:
                !this.state.orderLoading && this.state.data !== null
                  ? this.state.data.id
                  : "",
            })
          }
        />
        <CreateOrderBarStepper
          arrayOfstepsKey="create-order-rent-steps-done"
          currentStep={4}
        />
        {this.state.orderLoading ? (
          <AppView stretch center paddingTop={20}>
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
              <DeliverRent
                onRequestToPaid={() => {
                  this.onRequestToPaid();
                }}
                sppiner={this.state.loading}
                order={this.state.data}
                userId={this.props.userData.user.id}
              />
            </AppScrollView>
            <AppView height={10} center stretch backgroundColor="white">
              <AppButton
                title={I18n.t("confirm-order-deliver")}
                stretch
                // disabled={!props.paymentSuccess}
                backgroundColor="#F3AC19"
                onPress={() => {
                  // AppNavigation.push("recovery");
                  this.onRequestToPaid();
                }}
                marginHorizontal={7}
                processing={this.state.loading}
                disabled={!this.props.owner && this.state.data.status_id < 7}
              />
            </AppView>
          </>
        )}
        {/* <CustomBottomTabs componentId={this.props.componentId} /> */}
      </AppView>
    );
  };

  render() {
    if (this.props.owner) {
      return <DeliverRentOrderOwner orderId={this.props.orderId} />;
    }
    return (
      <>
        {this.renderMenuContent()}
        {/* PaymentConfirmation */}

        <OrderAccepted
          visible={this.state.isModalVisible}
          changeState={(v) => {
            this.setState({
              isModalVisible: false,
            });
          }}
          messageHint={
            this.state.message !== null
              ? this.state.message
              : "تآكيد استلام السلعه"
          }
          message={
            "بعد استلامك للمنتج فانت متعهد بارجاعه بالوقت المحدد وبحالته السابقه بدون اي ضرر"
          }
          messageStyle={{ color: "red" }}
          title={
            !this.state.orderLoading &&
            this.props.userData.user.id ===
              (this.state.data !== null && this.state.data.owner_id)
              ? I18n.t("DELIVERED")
              : I18n.t("skip")
          }
        />
        <PaymentConfirmationRenter
          visible={this.state.isPaymentSuccess}
          changeState={(v) => {
            this.setState({
              isPaymentSuccess: false,
            });
          }}
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
)(DeliverRentOrder);
