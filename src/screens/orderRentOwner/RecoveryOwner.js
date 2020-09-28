import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  AppView,
  AppScrollView,
  AppNavigation,
  AppSpinner,
} from "../../common";

import { AppHeader } from "../../components";

import {
  CreateOrderBarStepper,
  RecoveryProduct,
} from "../../components/orderRent";
import * as OrderRepo from "../../repo/OrderRepo";
import { Navigation } from "react-native-navigation";

import { refreshList } from "../../actions/list";
import { OrderAccepted } from "../../components/appModals";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
class DeliverRentOrder extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);

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
        console.log("here ==>>>", event);
      })
      .listen("ChangeStatus", (msg) => {
        console.log("ChangeStatus ===>>", msg);

        const { order } = msg;
        const { id, status_id } = order;

        AppNavigation.navigateToOrderStatus(status_id, id);
      });

    console.log("echoo *****", this.echo);
  };
  state = {
    paymentSuccess: false,
    orderLoading: true,
    isModalVisible: false,
    message: "",
    loading: false,
    data: null,
  };

  componentDidMount() {
    this.getOrderById();
    this.listenToEchoo();
  }

  componentDidDisappear() {
    console.log("did dis appear");
    // this.echo.subscription.unbind();
    if (this.echo !== null) {
      this.echo.leaveChannel(`order.change_status.${this.props.orderId}`);
      this.echo.leave(`order.change_status.${this.props.orderId}`);
      this.echo.leaveChannel(`ChangeStatus`);
      this.echo.leave(`ChangeStatus`);
      this.echo.disconnect();
    }

    this.echo = null;
  }

  getOrderById = async () => {
    this.setState({
      orderLoading: true,
    });
    try {
      const order = await OrderRepo.getOrderById(this.props.orderId);
      console.log("Order recovery===>>>", order);

      this.setState(
        {
          orderLoading: false,
          data: order,
        },
        () => {
          if (
            this.props.userData.user.id !== this.state.data.user_id &&
            order.status_id === 11
          ) {
            this.setState({
              loading: false,
              isModalVisible: true,
              message: "تم انتهاء الطلب بنجاح",
            });
          }
          if (
            order !== undefined &&
            order.user_id !== this.props.userData.user.id &&
            order.status_id < 9
          ) {
            this.setState({
              isModalVisible: true,
              message: "في انتظار طلب الاسترجاع",
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

  onRequestToDelever = async () => {
    // order id ==>>
    this.setState({
      loading: true,
    });

    const order_id = this.state.data.id;
    const userId = this.props.userData.id;
    let data = {};
    if (
      this.state.data.status_id === 8 &&
      this.props.userData.user.id === this.state.data.user_id
    ) {
      data.order_id = order_id;
      data.status_id = 9;
    } else {
      data.order_id = order_id;
      data.status_id = 10;
    }

    console.log("orderId ==>>>", data);

    try {
      const isAccepteToPaid = await OrderRepo.changeOrderStatus(data);
      console.log(
        "is Accept",
        this.props.userData.user.id,
        this.state.data.user_id
      );
      this.setState({
        loading: false,
      });

      this.props.refreshList("rentedOrder");
      this.props.refreshList("myOrderRent");

      AppNavigation.pop();
      if (this.props.userData.user.id === this.state.data.user_id) {
        this.setState({
          loading: false,
          isModalVisible: true,
          message: "انتظار طلب الاسترجاع",
        });
      } else {
        this.setState({
          loading: false,
          isModalVisible: true,
          message: "تم انتهاء الطلب بنجاح",
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      console.log("error", error);

      showError("Error , try again");
    }
  };

  renderContent = () => {
    return (
      <AppView stretch flex paddingBottom={10}>
        <AppHeader
          title={
            this.state.orderLoading
              ? null
              : I18n.t("rent-order", { id: this.state.data.id })
          }
        />
        <CreateOrderBarStepper
          arrayOfstepsKey="create-order-rent-steps-done"
          currentStep={5}
        />
        <AppScrollView
          stretch
          flex
          paddingTop={5}
          paddingHorizontal={7}
          paddingBottom={10}
        >
          {this.state.orderLoading ? (
            <AppView stretch center>
              <AppSpinner />
            </AppView>
          ) : (
            <RecoveryProduct
              onRequestToDelever={() => {
                this.onRequestToDelever();
              }}
              order={this.state.data}
              sppiner={this.state.loading}
              owner={this.props.userData.user.id !== this.state.data.user_id}
              disabled={
                (this.props.userData.user.id === this.state.data.user_id &&
                  this.state.data.status_id === 8) ||
                (this.props.userData.user.id !== this.state.data.user_id &&
                  this.state.data.status_id === 9)
              }
            />
          )}
        </AppScrollView>
      </AppView>
    );
  };
  render() {
    return (
      <>
        {this.renderContent()}
        {/* <InfoBottomSheet
          isVisible={this.state.isModalVisible}
          message={this.state.message}
          ref={this.InfoBottomSheet}
          confirmInfo
          changeState={v => {
            AppNavigation.pop();
            this.setState({
              isModalVisible: false
            });
          }}
        /> */}
        <OrderAccepted
          visible={this.state.isModalVisible}
          changeState={(v) => {
            this.setState(
              {
                isModalVisible: false,
              },
              () => {
                AppNavigation.pop();
              }
            );
          }}
          messageHint=" "
          message={this.state.message}
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
