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
class PaymentOrder extends Component {
  constructor(props) {
    super(props);
    this.InfoBottomSheet = React.createRef();
  }

  state = {
    paymentSuccess: false,
    orderLoading: true,
    isModalVisible: this.props.isModalVisible,
    message: "",
    loading: false,
    data: null,
    paymentMethod: null,
    stackName: this.props.stackName,
  };

  onRequestToPaid = async () => {
    // order id ==>>
    this.setState({
      loading: true,
    });

    const order_id = this.props.data.id;
    const userId = this.props.userData.id;
    let data = {};

    data.order_id = order_id;
    data.status_id = 6;

    try {
      const isAccepteToPaid = await OrderRepo.changeOrderStatus(data);
      console.log("is Accept");

      this.props.refreshList("rentedOrder");
      this.props.refreshList("myOrderRent");

      AppNavigation.navigateToOrderStatus(6, this.props.data.id);
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
      {this.props.orderLoading ? (
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
              order={this.props.data}
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
            <AppButton
              title={"تاكيد الدفع"}
              stretch
              onPress={() => {
                this.onRequestToPaid();
              }}
              processing={this.state.loading}
              marginHorizontal={7}
              backgroundColor="primary"
              disabled={this.props.data.status_id <= 4}
            />
          </AppView>
        </>
      )}
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
});
const mapDispatchToProps = (dispatch) => ({
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentOrder);
