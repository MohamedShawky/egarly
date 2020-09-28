import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-native-navigation";
import { ifIphoneX } from "react-native-iphone-x-helper";
import Animated from "react-native-reanimated";
import { View, ViewBase } from "react-native";
import ReactNativeParallaxHeader from "react-native-parallax-header";
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
  AppList,
  windowHeight,
  showError,
} from "../../common";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader,
  BottomSheet,
  AppErrorModal,
} from "../../components";
import {
  SearchInput,
  WelcomeHeader,
  Swiper,
  ProductToRent,
  OfferRent,
  Snap,
  LatestProduct,
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
  OrderRefuse,
  DeliverProductToRent,
  OrderCancel,
  DeliverCinfirmation,
  AgreeToReRent,
  ConfirmOrderReRent,
} from "../../components/appModals";

import * as ProductRepo from "../../repo/ProductRepo";
import { getMyOrder } from "../../api/OrderApi";

import CategeoryBottomShet from "../../components/CategeoryBottomShet";
import { getPlaceName } from "../../utils";
import { APPBAR_HEIGHT } from "../../common/utils/responsiveDimensions";
import { barHeight } from "../../components/CustomBottomTabs";
import * as AuthRepo from "../../repo/AuthRepo";
import { setCurrentUser } from "../../actions/AuthActions";
import colors from "../../common/defaults/colors";
import { getAlltatus } from "../../api/ProductApi";
const placholder = require("../../assets/imgs/empityPictue.png");

const tabsContentHeight =
  windowHeight - APPBAR_HEIGHT - responsiveHeight(barHeight);
class Home extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.categeoryRef = React.createRef();

    this.scrollY = new Animated.Value(0);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    this.setState({
      isSelected: true,
      isOfferSelected: false,
    });
  }

  componentDidDisappear() {
    this.setState({
      isSelected: false,
      isOfferSelected: false,
    });
  }
  async componentDidMount() {
    // getMyOrder();

    console.log("did mount");

    this.getAllCategeory();
    this.getAdvertisment();
  }

  state = {
    isVisibal: false,
    loc: this.props.currentLocation,
    loading: false,
    categeoryLoad: true,
    categeories: [],
    data: [],
    isErrorModal: false,

    locationName: I18n.t("all"),
    filterLoad: false,
    isSelected: true,
    isOfferSelected: false,
    noAuth: false,
    advertisement: [],
    advLoading: true,
  };

  getAdvertisment = async () => {
    try {
      const res = await ProductRepo.getAllAdvertisment();

      this.setState({
        advertisement: res,
        advLoading: false,
      });
    } catch (error) {
      this.setState({
        advLoading: false,
        advertisement: [],
      });
    }
  };
  getAllCategeory = async () => {
    try {
      const res = await ProductRepo.getAllCategeory();

      this.setState({
        categeoryLoad: false,
        categeories: res,
      });
    } catch (error) {
      this.setState({
        categeoryLoad: false,
        categeories: [],
      });
    }
  };

  getNearstProduct = async (loc) => {
    this.setState({
      loading: true,
    });

    try {
      const response = await ProductRepo.getNearstProduct(loc);
      this.setState({
        nearstProduct: response,
        loading: false,
      });
    } catch (error) {
      this.setState({
        nearstProduct: [],
        loading: false,
      });
    }
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      <AppHomeHeader
        hideBack
        backgroundColor="#FFF"
        // showMenu
        goToMenu={() => {}}
        title="Egarly"
        rowItems={[
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              borderColor: colors.primary,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppImage
              source={
                !this.props.userData
                  ? placholder
                  : this.props.userData.user.avatar !== null
                  ? {
                      uri: `http://ejarly.dev.fudexsb.com/uploads/${
                        this.props.userData.user.avatar
                      }`,
                    }
                  : placholder
              }
              circleRadius={12}
              centerSelf
              onPress={() => {
                if (!this.props.userData) {
                  this.setState({
                    noAuth: true,
                  });
                } else
                  AppNavigation.push({
                    name: "profile",
                    passProps: {
                      componentId: this.props.componentId,
                    },
                  });
              }}
            />
          </View>,
        ]}
        search
      />

      <AppScrollView stretch flex nestedScrollEnabled paddingBottom={30}>
        {this.props.isConnected ? this.renderContent() : <NoInternet />}
      </AppScrollView>
      <CustomBottomTabs
        componentId={this.props.componentId}
        refBottom={this.bottomSheetRef}
        onPress={() => {
          this.bottomSheetRef.current.show();
        }}
      />
    </AppView>
  );

  onPickLocation = async (val) => {
    const locationName = await getPlaceName(val.latitude, val.longitude);

    this.setState(
      {
        locationName: locationName[2],
      },
      () => {
        this.getNearstProduct(val);
      }
    );
  };

  filterProductByCat = async (id) => {
    this.setState({
      filterLoad: true,
      nearstProduct: [],
    });
    const value = {};
    value.categories = [id];
    try {
      const res = await ProductRepo.searchProduct(value);
      this.setState({
        filterLoad: false,
        nearstProduct: res,
      });
    } catch (error) {
      this.setState({
        isErrorModal: true,
        filterLoad: false,
      });
    }
  };

  renderParalax = () => (
    <View style={{ flex: 1, paddingBottom: 50 }}>
      <ReactNativeParallaxHeader
        // headerMinHeight={APPBAR_HEIGHT}
        headerMaxHeight={200}
        extraScrollHeight={20}
        // renderNavBar={this.renderNavBar}
        renderContent={this.renderContent}
        containerStyle={{
          flexGrow: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        innerContainerStyle={{
          flex: 1,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        scrollViewStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        nestedScrollEnabled
      />
    </View>
  );

  getAllProduct = async () => {
    this.setState({
      filterLoad: true,
    });
    try {
      const products = await ProductRepo.getAllProductProduct();

      this.setState({
        filterLoad: false,
        nearstProduct: products,
      });
    } catch (error) {
      this.setState({
        filterLoad: false,
      });
    }
  };
  renderContent = () => {
    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <AppView stretch height={25}>
          {this.state.advLoading ? (
            <AppView stretch width={100} center>
              <AppSpinner />
            </AppView>
          ) : this.state.advertisement.length === 0 ? (
            <AppView stretch height={25} center>
              <AppText>{I18n.t("ui-noResultsFound")}</AppText>
            </AppView>
          ) : (
            // <AppView  stretch height={25}/>
            <Snap dataAdv={this.state.advertisement} />
          )}
        </AppView>

        <AppView stretch>
          <AppView
            stretch
            row
            onPress={() => {
              AppNavigation.push({
                name: "mapScreen",
                passProps: {
                  onLocationChangeCallback: (val) => this.onPickLocation(val),
                },
              });
            }}
          >
            <AppButton
              leftIcon={
                <AppIcon
                  name="location-pin"
                  type="entypo"
                  size={12}
                  color="grey"
                />
              }
              backgroundColor="transparent"
            />
            <AppText color="primary" size={5.5}>
              {this.state.locationName}
            </AppText>
          </AppView>
        </AppView>
        <AppView stretch height={15}>
          {this.state.categeoryLoad ||
          (this.state.categeories === undefined &&
            this.state.categeories.length === 0) ? (
            <AppView stretch center>
              <AppSpinner />
            </AppView>
          ) : (
            <ProductToRent
              data={this.state.categeories}
              onConfirm={(val) => {
                if (val === 0) {
                  this.getAllProduct();
                } else {
                  this.filterProductByCat(val);
                }
              }}
            />
          )}
        </AppView>
        <AppView stretch row height={7} spaceAround>
          <AppButton
            title={I18n.t("latest-product")}
            flex
            transparent
            onPress={() => {
              this.setState({
                isSelected: true,
                isOfferSelected: false,
              });
            }}
            color={this.state.isSelected ? "primary" : "grey"}
            borderBottomColor={
              this.state.isSelected ? "primary" : "transparent"
            }
            borderBottomWidth={1}
          />
          <AppButton
            title={I18n.t('latest-offer')}
            flex
            transparent
            color={this.state.isOfferSelected ? "primary" : "grey"}
            borderBottomColor={
              this.state.isOfferSelected ? "primary" : "transparent"
            }
            borderBottomWidth={1}
            onPress={() => {
              this.setState({
                isSelected: false,
                isOfferSelected: true,
              });
            }}
          />
        </AppView>

        {this.state.isSelected ? (
          <LatestProduct
            tabLabel="منتجات  مضافه مأخرا"
            data={this.state.nearstProduct}
            loading={this.state.loading || this.state.filterLoad}
          />
        ) : null}
        {this.state.isOfferSelected ? (
          <OfferRent tabLabel="عروض  مضافه مأخرا" />
        ) : null}

        {/* <AppTabs scrollable> */}

        {/* <LatestProduct
          tabLabel="منتجات  مضافه مأخرا"
          data={this.state.nearstProduct}
          loading={this.state.loading || this.state.filterLoad}
        />
        <OfferRent tabLabel="عروض  مضافه مأخرا" /> */}
        {/* </AppTabs> */}
      </View>
    );
  };
  render() {
    console.disableYellowBox = true;

    return (
      <>
        {this.renderMenuContent()}
        <OrderRefuse
          visible={this.state.isVisibal}
          changeState={(val) => {
            this.setState({
              isVisibal: val,
            });
          }}
        />
        <BottomSheet
          ref={this.bottomSheetRef}
          height={40}
          backgroundColor="transparent"
        >
          <AppView
            stretch
            flex
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
        <ConfirmOrderReRent
          visible={this.state.isErrorModal}
          fromSignIn
          changeState={(v) => {
            this.setState({
              isErrorModal: v,
            });
          }}
          errorMessage={["لقد حدث خطآ اعد المحاوله"]}
          onConfirm={() => {
            this.setState({
              isErrorModal: false,
            });
          }}
        />
        <AppNoAuthModal
          isVisible={this.state.noAuth}
          stateChanged={(v) => {
            this.setState({ noAuth: v });
          }}
        />
      </>
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
