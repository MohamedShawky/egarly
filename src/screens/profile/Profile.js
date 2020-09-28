import React, { Component } from "react";
import I18n from "react-native-i18n";
import { Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppView,
  AppText,
  AppScrollView,
  responsiveHeight,
  responsiveWidth,
  AppIcon,
  AppImage,
  AppNavigation,
  AppTabs,
} from "../../common";
import {
  SideMenu,
  AppHeader,
  CustomBottomTabs,
  LogoutModal,
} from "../../components";
import { logout } from "../../actions/AuthActions";
import avatar from "../../assets/imgs/empityPictue.png";
import { HEADER_ELEVATION } from "../../common/utils/Constants";
import ReactNativeParallaxHeader from "react-native-parallax-header";

import { View } from "react-native";
import { APPBAR_HEIGHT } from "../../common/utils/responsiveDimensions";
import wellogo from "../../assets/imgs/avatar.png";
const placholder = require("../../assets/imgs/empityPictue.png");

import cardShadowStyle from "../../common/utils/cardShadowStyle";
import Information from "./Information";
import MyProduct from "./MyProduct";
import MyOffers from "./MyOffers";
import OrderTab from "../myOrders/OrderTab";
import { getPlaceName } from "../../utils";
import rec from "../../assets/imgs/image-approv.png";

class Profile extends Component {
  state = {
    location: null,
    isLogOutVisible: false,
  };
  async componentDidMount() {
    const location = {};
    if (this.props.currentUser.user.latitude !== null) {
      location.latitude = this.props.currentUser.user.latitude;
      location.longitude = this.props.currentUser.user.longitude;
    } else {
      location.latitude = this.props.currentLocation.latitude;
      location.longitude = this.props.currentLocation.longitude;
    }
    let locationRes = await getPlaceName(location.latitude, location.longitude);
    console.log("location ====>>", this.props.currentUser);

    this.setState({
      location: locationRes[0],
    });
  }
  renderNavBar = () => (
    <AppView stretch row transparent>
      <AppView
        onPress={() => {
          AppNavigation.pop();
        }}
        equalSize={10}
        center
      >
        <AppIcon flip name="ios-arrow-back" type="ion" size={8} color="white" />
      </AppView>
      <AppView center>{/* <AppText color="white">fasds</AppText> */}</AppView>
    </AppView>
  );
  onModalVisible = () => {
    this.setState({
      isLogOutVisible: true,
    });
  };
  renderContent = () => {
    return (
      <AppView
        flex
        stretch
        borderTopRightRadius={20}
        borderTopLeftRadius={20}
        elevation={HEADER_ELEVATION}
        style={cardShadowStyle}
        paddingTop={5}
        // borderTopColor="grey"
        // borderTopWidth={0.5}
        // paddingHorizontal={7}
        backgroundColor="white"
      >
        <AppTabs default>
          {/* <AppList tabLabel="منتجات مطلوبه للتأجير" flex stretch /> */}
          <AppView tabLabel={I18n.t("product")} flex stretch>
            <AppTabs default>
              <MyProduct tabLabel="منتجاتي" />
              <MyOffers tabLabel="طلباتي" flex stretch />
            </AppTabs>
          </AppView>
          <Information
            tabLabel={I18n.t("info")}
            flex
            stretch
            onModalVisible={this.onModalVisible}
          />

          <OrderTab
            tabLabel={I18n.t("arcive")}
            flex
            stretch
            profile
            componentId={this.props.componentId}
          />
        </AppTabs>
      </AppView>
    );
  };
  renderParallax = () => {
    const { currentUser } = this.props;
    let images = {
      background: placholder,
    };
    if (currentUser.user.avatar !== null) {
      images = {
        background: {
          uri: `http://ejarly.dev.fudexsb.com/uploads/${
            currentUser.user.avatar
          }`,
        },
      };
    }

    return (
      <View style={{ flex: 1 }}>
        <ReactNativeParallaxHeader
          headerMinHeight={APPBAR_HEIGHT}
          headerMaxHeight={200}
          extraScrollHeight={20}
          navbarColor="#FFCC00"
          backgroundImage={images.background}
          backgroundImageScale={1.2}
          imageContainer={
            <AppView
              stretch
              height={10}
              center
              linearBackgroundGradient={{
                start: { x: 0.5, y: 0.1 },
                end: { x: 0.5, y: 2.27 },
                locations: [0, 0.8],
                colors: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 8)"],
              }}
            >
              <AppView row>
                <AppView flex={2} center>
                  <AppText bold size={6.5}>
                    {this.props.currentUser.user.name}
                  </AppText>
                  <AppText>{this.state.location}</AppText>
                </AppView>
                <AppView style={{position:'absolute', bottom:0,right:0}}>
                  <AppImage source={rec} circleRadius={10} marginHorizontal={10} />
                </AppView>
              </AppView>
            </AppView>
          }
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          nestedScrollEnabled
          containerStyle={{
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          contentContainerStyle={{
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          innerContainerStyle={{
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          scrollViewStyle={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          scrollViewProps={{
            onScrollBeginDrag: () => console.log("onScrollBeginDrag"),
            onScrollEndDrag: () => console.log("onScrollEndDrag"),
          }}
        />
      </View>
    );
  };

  render() {
    if (this.props.currentUser === null) return <></>;
    return (
      <>
        {this.renderParallax()}

        <LogoutModal
          isVisible={this.state.isLogOutVisible}
          changeState={(v) => {
            this.setState({
              isLogOutVisible: v,
            });
          }}
        />
      </>
    );
  }
}

mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
  currentLocation: state.location.current,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: bindActionCreators(logout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
