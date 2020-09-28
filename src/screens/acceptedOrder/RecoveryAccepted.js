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
  AppImage
} from "../../common";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader
} from "../../components";
import {
  SearchInput,
  WelcomeHeader,
  Swiper,
  ProductToRent,
  OfferRent
} from "../../components/home";

import CustomBottomTabs from "../Home/CustomBottomTabs";
import avatar from "../../assets/imgs/avatar.png";
import { AddImage, Descriptions, Price } from "../../components/addProduct";
import {
  ProductInfo,
  CreateOrderBarStepper,
  Payment,
  DeliverRent,
  RecoveryProduct
} from "../../components/orderRent";

class DeliverRentOrder extends Component {
  state = {
    paymentSuccess: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        paymentSuccess: true
      });
    }, 5000);
  }

  renderContent = () => (
    <AppView stretch flex paddingBottom={10}>
      <AppHeader title={I18n.t("rent-order")} />
      <CreateOrderBarStepper
        arrayOfstepsKey="order-accepted"
        currentStep={5}
      />
      <AppScrollView
        stretch
        flex
        paddingTop={5}
        paddingHorizontal={7}
        paddingBottom={10}
      >
        <RecoveryProduct paymentSuccess={this.state.paymentSuccess} />
      </AppScrollView>
    </AppView>
  );

  render() {
    return <>{this.renderContent()}</>;
  }
}

const mapStateToProps = state => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(DeliverRentOrder);
