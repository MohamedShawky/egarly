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
  showError
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
import { ProductInfo, CreateOrderBarStepper } from "../../components/orderRent";
import * as OrderRepo from "../../repo/OrderRepo";
class ApproveAccountStepper extends Component {
  constructor(props) {
    super(props);
  }

 
  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  renderContent = () => (
    <AppView stretch flex>
      <AppHeader  />
      <CreateOrderBarStepper
        arrayOfstepsKey="create-approve-account-steps"
        currentStep={2}
      />
      <AppScrollView
        stretch
        flex
        paddingTop={5}
        paddingHorizontal={7}
        paddingBottom={10}
        borderTopWidth={0.5}
        borderTopColor="#F4F2F0"
      >
      
      </AppScrollView>
      {/* <CustomBottomTabs componentId={this.props.componentId} /> */}
    </AppView>
  );

  render() {
    return <>{this.renderMenuContent()}</>;
  }
}

const mapStateToProps = state => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(ApproveAccountStepper);
