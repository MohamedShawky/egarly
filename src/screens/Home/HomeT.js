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
  AppSpinner
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
  OfferRent,
  Snap
} from "../../components/home";

import CustomBottomTabs from "./CustomBottomTabs";
import avatar from "../../assets/imgs/avatar.png";

import {
  SureInfoModal,
  PaymentSure,
  AcceptOrderToRentAgain,
  AddNotes,
  OrderAccepted,
  OrderReRent,
  OrderRefuse
} from "../../components/appModals";

import * as ProductRepo from "../../repo/ProductRepo";
import { getMyOrder } from "../../api/OrderApi";

class Home extends Component {
  async componentDidMount() {
    getMyOrder();
  }

  state = {
    isVisibal: false,
    loc: this.props.currentLocation,
    loading: true
  };

  componentDidUpdate(prevState) {
    if (prevState.currentLocation !== this.props.currentLocation) {
      console.log(
        "IIIIIIIIIIIIIIIIIIII",
        this.props.currentLocation,
        prevState.currentLocation
      );

      // this.getNearstProduct(this.props.currentLocation);
      this.setLoc(this.props.currentLocation);
    }
  }

  setLoc = location => {
    this.setState({
      loc: location
    });
  };

  getNearstProduct = async loc => {
    try {
      const response = await ProductRepo.getNearstProduct(loc);
      console.log("respo =", response);
      this.setState({
        nearstProduct: response,
        loading: false
      });
    } catch (error) {
      this.setState({
        nearstProduct: [],
        loading: false
      });
      console.log("neares erorr", error);
    }
  };

  renderMenuContent = ({ onMenuPress }) => (
    <AppView flex backgroundColor="white">
      <AppHomeHeader
        hideBack
        backgroundColor="#FFF"
        showMenu
        goToMenu={onMenuPress}
        title="Egarly"
        rowItems={[<AppImage source={avatar} circleRadius={12} centerSelf />]}
      />
      {this.renderContent()}
    </AppView>
  );

  onPickLocation = val => {
    this.setState({
      loc: val
    });
  };

  renderContent = () => (
    <AppView stretch flex paddingBottom={10}>
      <AppScrollView stretch flex paddingTop={5}>
        {/* <Swiper />
         */}
        <Snap />
        <AppView
          height={25}
          paddingLeft={5}
          marginTop={10}
          onPress={() => {
            this.setState({
              isVisibal: !this.state.isVisibal
            });
          }}
        >
          <AppView row spaceBetween stretch paddingLeft={1}>
            <AppText>{I18n.t("product-rent")}</AppText>
            <AppButton title={I18n.t("see-all")} transparent />
          </AppView>
          <ProductToRent />
        </AppView>
        <AppView stretch flex centerX>
          <AppView
            stretch
            row
            spaceBetween
            paddingHorizontal={7}
            paddingTop={5}
          >
            <AppText>{I18n.t("rent-offers")}</AppText>
            <AppView
              row
              onPress={() => {
                AppNavigation.push({
                  name: "mapScreen",
                  passProps: {
                    onLocationChangeCallback: this.onPickLocation
                  }
                });
              }}
            >
              <AppText>الدمام</AppText>
              <AppIcon name="location-pin" type="entypo" color="primary" />
            </AppView>
          </AppView>
          <OfferRent loc={this.state.loc} data={this.state.nearstProduct} />
        </AppView>
      </AppScrollView>
      <CustomBottomTabs componentId={this.props.componentId} />
    </AppView>
  );

  render() {
    // console.disableYellowBox = true
    console.log("current location ==>>", this.props.currentLocation);

    return (
      <>
        <SideMenu
          renderContent={this.renderMenuContent}
          update={[this.props.isConnected]}
        />

        <OrderRefuse
          visible={this.state.isVisibal}
          changeState={val => {
            this.setState({
              isVisibal: val
            });
          }}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,
  currentLocation: state.location.current,

  allChat: state.chat,
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(Home);
