import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-native-navigation";
import { ifIphoneX } from "react-native-iphone-x-helper";
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
  AppTabs,
} from "../../common";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader,
  BottomSheet,
} from "../../components";
import {
  SearchInput,
  WelcomeHeader,
  Swiper,
  ProductToRent,
  OfferRent,
  Snap,
} from "../../components/home";

import CustomBottomTabs from "../Home/CustomBottomTabs";

import {
  SureInfoModal,
  PaymentSure,
  AcceptOrderToRentAgain,
  AddNotes,
  OrderAccepted,
  OrderReRent,
  OrderRefuse,
} from "../../components/appModals";
import Favorite from "./Favorite";
import MyRentOrder from "./MyRentOrder";
import RentOrders from "./RentOrders";
import Orders from "./Orders";

class OrderTab extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    Navigation.events().bindComponent(this);
    this.state = {
      visable: false,
    };
  }
  componentDidAppear() {
    this.setState({
      visable: true,
    });
  }

  componentDidDisappear() {
    this.setState({
      visable: false,
    });
  }
  render() {
    return (
      <AppView stretch flex>
        {!this.props.profile && (
          <AppHeader
            title={I18n.t("myList")}
            hideBack
            flat
            backgroundColor="white"
          />
        )}
        <AppView stretch flex paddingBottom={10}>
          {this.props.profile ? (
            <AppTabs default>
              <MyRentOrder
                tabLabel={I18n.t("order-to-rent")}
                componentId={this.props.componentId}
              />
              <RentOrders
                tabLabel={I18n.t("my-rent-order")}
                componentId={this.props.componentId}
              />
              <Orders
                tabLabel={I18n.t("orders")}
                componentId={this.props.componentId}
              />
            </AppTabs>
          ) : (
            <AppTabs default>
              <Favorite
                tabLabel={I18n.t("favorite")}
                componentId={this.props.componentId}
              />
              <MyRentOrder
                tabLabel={I18n.t("order-to-rent")}
                componentId={this.props.componentId}
              />
              <RentOrders
                tabLabel={I18n.t("my-rent-order")}
                componentId={this.props.componentId}
              />
              <Orders
                tabLabel={I18n.t("orders")}
                componentId={this.props.componentId}
              />
            </AppTabs>
          )}
        </AppView>

        {!this.props.profile && (
          <CustomBottomTabs
            componentId={this.props.componentId}
            onPress={() => this.bottomSheetRef.current.show()}
          />
        )}
        <BottomSheet
          ref={this.bottomSheetRef}
          height={40}
          backgroundColor="transparent"
        >
          <AppView
            stretch
            transparent
            center
            onPress={() => this.bottomSheetRef.current.hide()}
          >
            <AppButton
              title={I18n.t("add-product")}
              width={40}
              height={5.5}
              borderRadius={20}
              marginBottom={10}
              backgroundColor="white"
              color="grey"
              onPress={() => {
                AppNavigation.push("addProduct");
              }}
            />
            <AppButton
              title={I18n.t("add-order")}
              width={40}
              height={5.5}
              borderRadius={20}
              backgroundColor="white"
              color="grey"
              onPress={() => {
                AppNavigation.push("addOffer");
              }}
            />
          </AppView>
        </BottomSheet>
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,
  currentLocation: state.location.current,

  allChat: state.chat,
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(OrderTab);
