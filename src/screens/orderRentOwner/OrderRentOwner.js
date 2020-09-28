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

import { ProductInfo, CreateOrderBarStepper } from "../../components/orderRent";
import * as OrderRepo from "../../repo/OrderRepo";
import { refreshList } from "../../actions/list";
import { PendingOrderAccepted } from "../../components/appModals";
import { ActionsButton } from "../../components/orderRent/ProductInfo";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";
import store from "../../store";
import { SET_SUBSCREIBED } from "../../actions/types";
class OrderRent extends Component {
  state = {
    loading: false,
    orderLoading: true,
    order: this.props.order,
    isModalVisible: false,
    messageHint: null,
    stackName: this.props.stackName,
    isReject: false,
  };

  onAcceptOrder = async () => {
    // order id ==>>
    this.setState({
      loading: true,
    });

    console.log("onAccept ===>>", this.props.order);

    const order_id = this.props.order.id;
    const userId = this.props.userData.user.id;
    let data = null;

    data = {
      order_id,
      status_id: 2,
    };

    console.log("orderId ==>>>", data);

    try {
      const isAccepte = await OrderRepo.changeOrderStatus(data);

      console.log("isAccepte", isAccepte);

      if (isAccepte) {
        this.setState({
          loading: false,
          messageHint: "تم قبول الطلب",
        });

        this.props.refreshList("rentedOrder");

        this.props.refreshList("myOrderRent");
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
    console.log("log =======>>>");

    const orderId = this.props.order.id;
    this.setState({
      isReject: true,
    });
    const  data = {
      order_id : orderId,
      status_id: 12,
    };

    try {
      const isAccepte = await OrderRepo.changeOrderStatus(data);
      AppNavigation.pop();
    } catch (error) {
      console.log("error", error);
      showError("Error happen");
    } finally {
      this.setState({
        isReject: false,
      });
    }
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  renderContent = () => (
    <AppView stretch flex>
      {this.props.orderLoading ? (
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
              sppiner={this.state.loading}
              userId={this.props.userData.user.id}
              order={this.props.order.products[0]}
              user={this.props.order.user}
              owner={true}
            />
          </AppScrollView>
          {this.state.loading || this.state.isReject ? (
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
          ) : (
            <ActionsButton
              onAcceptOrder={this.onAcceptOrder}
              onRefuseOrder={() => this.onRefuseOrder()}
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
