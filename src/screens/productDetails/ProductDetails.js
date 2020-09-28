import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Dimensions, SafeAreaView } from "react-native";

import ImagesSwiper from "./ImagesSwiper";
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
  moderateScale,
  responsiveWidth,
  getColors,
  AppSpinner,
  AppInputError,
  showSuccess,
} from "../../common";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader,
  DropDounMenu,
  ParallexHeader,
} from "../../components";
import {
  SearchInput,
  WelcomeHeader,
  Swiper,
  ProductToRent,
  OfferRent,
} from "../../components/home";
import ReactNativeParallaxHeader from "react-native-parallax-header";
import Share from "react-native-share";
import coverPlaceholder from "../../assets/imgs/avatar.png";
import {
  AddImage,
  Descriptions,
  Price,
  Categeory,
  ProductLocation,
} from "../../components/addProduct";
import * as ProductRepo from "../../repo/ProductRepo";
import {
  PriceDetails,
  ProductDescripteion,
  ProductPrice,
  UserInfo,
} from "../../components/productDetails";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import { orderToRent } from "../../repo/OrderRepo";
import SettingBottomSheet from "../../components/SettingBottomSheet";
import { APPBAR_HEIGHT } from "../../common/utils/responsiveDimensions";
import { isIphoneX } from "../../utils/iphoneHelper";
import styles from "./styles";
import NotifyAboutProductBottomSheet from "../../components/reasonBottomSheet/NotifyAboutProductBottomSheet";
import { OrderAccepted } from "../../components/appModals";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    console.log("props  =?", props);

    this.settingBottomSheetRef = React.createRef();
    this.reasonBottomSheetRef = React.createRef();
  }
  state = {
    reportProduct: false,
    isModalVisible: false,
    prices: [
      {
        pricehint: I18n.t("by-day"),
        name: "price_per_day",
        id: this.props.data && this.props.data.price_per_day,
      },
      {
        pricehint: I18n.t("by-week"),
        name: "price_per_week",
        id: this.props.data && this.props.data.price_per_week,
      },
      {
        pricehint: I18n.t("by-month"),
        name: "price_per_month",
        id: this.props.data && this.props.data.price_per_month,
      },
    ],
    loading: false,
    data: this.props.data,
    loadingDetails: false,
  };

  componentDidMount() {
    if (this.props.product_id) {
      this.getProductById();
    }
  }
  getProductById = async () => {
    this.setState({
      loadingDetails: true,
    });
    try {
      const product = await ProductRepo.getProductdetails(
        this.props.product_id
      );
      this.setState({
        data: product,
        loadingDetails: false,
        prices: [
          {
            pricehint: I18n.t("by-day"),
            name: "price_per_day",
            id: product.price_per_day,
          },
          {
            pricehint: I18n.t("by-week"),
            name: "price_per_week",
            id: product.price_per_week,
          },
          {
            pricehint: I18n.t("by-month"),
            name: "price_per_month",
            id: product.price_per_month,
          },
        ],
      });
    } catch (error) {
      console.log("error", error);

      showError(I18n.t("ui-error-happened"));
      this.setState({
        loadingDetails: false,
      });
    }
  };

  addOrder = async () => {
    try {
      console.log("props ==>>", this.props.data);

      this.setState({
        loading: true,
      });
      const values = {};
      values.note = "Add order Num 1";
      values.products = JSON.stringify([
        {
          id: this.props.data.id,
          from_date: "25-10-2020",
          to_date: "30-10-2020",
          quantity: "3",
        },
      ]);
      const res = await orderToRent(values);
      console.log("res ==>", res);
      this.setState({
        loading: false,
      });
    } catch (error) {
      console.log("error ==>", error);
      this.setState({
        loading: false,
      });
    }
  };

  renderActions = () => (
    <AppView
      stretch
      paddingHorizontal={7}
      // marginTop={5}
      backgroundColor="white"
      // height={10}
      elevation={3}
      style={[
        cardShadowStyle,
        { position: "absolute", bottom: 0, left: 0, right: 0 },
      ]}
    >
      <AppView row spaceAround stretch paddingBottom={10}>
        <AppButton
          title={I18n.t("rent")}
          flex={3}
          backgroundColor="primary"
          onPress={() => {
            AppNavigation.push({
              name: "orderToRent",
              passProps: {
                productId: this.props.data.id,
                data: this.props.data,
              },
            });
            // this.addOrder();
          }}
          processing={this.state.loading}
        />
        <AppView width={5} />
        <AppButton
          title={I18n.t("chat")}
          flex={1.5}
          transparent
          borderColor="primary"
          borderWidth={1}
        />
      </AppView>
    </AppView>
  );
  onEdit = () => {
    AppNavigation.push({
      name: "addProduct",
      passProps: {
        data: this.props.data,
      },
    });
  };

  onConfirm = async (val) => {
    this.setState({
      reportProduct: true,
    });
    try {
      const values = {
        product_id: this.props.data.id,
        report_status_id: val.reason[0].id,
        comment: val.comment,
      };
      const res = await ProductRepo.productReport(values);

      this.setState({
        reportProduct: false,

        isModalVisible: true,
      });
    } catch (error) {
      showError(error.message);
    } finally {
      this.setState({
        reportProduct: false,
      });
    }
  };
  renderName = () => (
    <AppView row stretch spaceBetween marginTop={6} paddingHorizontal={5}>
      <AppView
        style={{
          width: Dimensions.get("window").width * 0.8,
        }}
      >
        <AppText
          color="black"
          size={7}
          bold
          paddingVertical={0}
          numberOfLines={1}
        >
          {/* {this.state.name} */}
          {/* prooooName */}
        </AppText>
      </AppView>
    </AppView>
  );
  renderNavBar = () => {
    return (
      <AppView style={styles.navContainer} backgroundColor="red" centerY>
        <AppButton
          flex
          stretch
          color="foreground"
          leftIcon={<AppIcon flip name="close" type="ant" size={12} />}
          padding={0}
          onPress={() => {
            this.pop();
          }}
          size={12}
          width={20}
          backgroundColor="transparent"
        />
      </AppView>
      // <AppView
      //   title={I18n.t("product-detail-header")}
      //   edit
      //   backgroundColor="transparent"
      //   onEdit={() => this.onEdit()}
      //   rowItems={[
      //     <AppView
      //       stretch
      //       transparent
      //       ph={3}
      //       flexInnerTouchable
      //       center
      //       onPress={() => this.onEdit()}
      //       borderRadius={20}
      //     >
      //       <AppIcon
      //         reverse
      //         name="edit"
      //         type="entypo"
      //         size={10}
      //         lineHeight={10}
      //         color="white"
      //       />
      //     </AppView>,
      //     <AppView
      //       stretch
      //       transparent
      //       ph={3}
      //       flexInnerTouchable
      //       center
      //       onPress={() => this.settingBottomSheetRef.current.show()}
      //       borderRadius={20}
      //     >
      //       <AppIcon
      //         reverse
      //         name="md-settings"
      //         type="ion"
      //         size={10}
      //         lineHeight={10}
      //         color="white"
      //       />
      //     </AppView>,
      //   ]}
      // />
    );
  };

  pop = () => {
    AppNavigation.pop();
  };
  renderImageSwiper = () => {
    isIphoneX() ? (
      <SafeAreaView style={{ flex: 1, alignSelf: "stretch" }}>
        <ImagesSwiper
          onPress={this.pop}
          imgs={
            this.props.data.hasOwnProperty("photos") &&
            this.props.data.photos.length > 0 &&
            this.props.data.photos
          }
        />
        <AppView
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 15,
            zIndex: 10000,
            // overflow: "visible"
          }}
          stretch
          backgroundColor="transparent"
          height={8}
          center
          marginHorizontal={7}
        >
          <PriceDetails prices={this.state.prices} />
        </AppView>
        {this.renderName()}
      </SafeAreaView>
    ) : (
      <>
        <ImagesSwiper
          onPress={this.pop}
          imgs={
            this.state.data.hasOwnProperty("photos") &&
            this.state.data.photos.length > 0 &&
            this.state.data.photos
          }
          isAddToFav={this.props.data.isAddToFav}
        />
        <AppView
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 13,
            zIndex: 10000,
            // overflow: "visible"
          }}
          stretch
          backgroundColor="transparent"
          height={8}
          center
          marginHorizontal={7}
        >
          <PriceDetails prices={this.state.prices} />
        </AppView>
        {this.renderName()}
      </>
    );
  };
  renderParalax = () => {
    console.log("this.props.data.photos.length", this.state.data);

    return (
      <View style={{ flex: 1 }}>
        <ParallexHeader
          ref={this.parallxHeader}
          offset={responsiveHeight(10)}
          statusBarColor="transparent"
          alwaysShowTitle={false}
          headerMinHeight={APPBAR_HEIGHT}
          headerMaxHeight={Dimensions.get("window").height * 0.45}
          extraScrollHeight={20}
          navbarColor="transparent"
          title={
            <AppText bold size={5.5} color="black">
              product
            </AppText>
          }
          backgroundImage={coverPlaceholder}
          content={() =>
            isIphoneX() ? (
              <SafeAreaView style={{ flex: 1, alignSelf: "stretch" }}>
                {/* <ImagesSwiper
                  onPress={this.pop}
                  imgs={
                    this.props.data.hasOwnProperty("photos")
                      ? this.props.data.photos
                      : []
                  }
                /> */}
                <AppView
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 15,
                    zIndex: 10000,
                    // overflow: "visible"
                  }}
                  stretch
                  backgroundColor="transparent"
                  height={8}
                  center
                  marginHorizontal={7}
                >
                  <PriceDetails prices={this.state.prices} />
                </AppView>
                {this.renderName()}
              </SafeAreaView>
            ) : (
              <>
                <ImagesSwiper
                  onPress={this.pop}
                  imgs={
                    this.state.data.hasOwnProperty("photos")
                      ? this.state.data.photos
                      : []
                  }
                  isAddToFav={this.state.data.isFavorite}
                  product_id={this.state.data.id}
                />
                <AppView
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 13,
                    zIndex: 10000,
                    // overflow: "visible"
                  }}
                  stretch
                  backgroundColor="transparent"
                  height={8}
                  center
                  marginHorizontal={7}
                >
                  <PriceDetails prices={this.state.prices} />
                </AppView>
                {this.renderName()}
              </>
            )
          }
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={() => this.renderContent()}
          containerStyle={{
            flex: 1,
            alignSelf: "stretch",
            paddingBottom:
              this.state.data.user_id !== this.props.userData.user.id
                ? responsiveHeight(15)
                : undefined,
          }}
          // contentContainerStyle={{ flexGrow: 1 }}
          innerContainerStyle={{ flex: 1 }}
        />
      </View>
    );
  };
  renderContent = () => {
    return (
      <AppView stretch flex width={100}>
        {/* {this.props.data.user_id === this.props.userData.user.id && (
          <AppView
            stretch
            transparent
            ph={7}
            flexInnerTouchable
            center
            row
            spaceBetween
          >
            <AppText bold>{I18n.t("setting-product")}</AppText>
            <AppIcon
              reverse
              name="md-settings"
              type="ion"
              size={10}
              lineHeight={10}
              // color="white"
              onPress={() => this.settingBottomSheetRef.current.show()}
            />
          </AppView>
        )} */}
        {/* <AppView stretch marginTop={5} height={10} row spaceBetween centerY>
         
        </AppView> */}

        <ProductDescripteion {...this.state.data} />
        {/* {this.props.data.user_id !== this.props.data.user.id &&
            this.renderActions()} */}

        <ProductPrice
          paddingHorizontal={7}
          marginVertical={7}
          paddingVertical={7}
          {...this.state.data}
        />

        <UserInfo
          {...this.state.data.user}
          onPress={() => {
            if (this.state.data.user_id === this.props.userData.user.id) {
              AppNavigation.push("profile");
            } else {
              AppNavigation.push({
                name: "userProfile",
                passProps: {
                  id: this.state.data.user_id,
                },
              });
            }
          }}
        />
        <AppButton
          title="التبليغ عن المحتوي"
          color="#EB6264"
          transparent
          onPress={() => {
            this.reasonBottomSheetRef.current.show();
          }}
          processing={this.state.isModalVisible}
          stretch
        />
      </AppView>
    );
  };
  onConfirmSetting = (val) => {
    console.log("value ==>>", val);

    switch (val) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        AppNavigation.push({
          name: "advantageProduct",
          passProps: {
            product_id: this.state.data.id,
          },
        });
        break;
      default:
        break;
    }
  };
  render() {
    if (this.state.data === undefined && !this.state.loadingDetails)
      return null;

    if (this.state.loadingDetails) {
      return (
        <AppView stretch flex center>
          <AppSpinner />
        </AppView>
      );
    }
    return (
      <AppView stretch flex>
        {this.renderParalax()}
        {/* <AppScrollView stretch flex> */}
        <SettingBottomSheet
          ref={this.settingBottomSheetRef}
          onConfirm={(val) => {
            this.onConfirmSetting(val);
          }}
        />
        <NotifyAboutProductBottomSheet
          ref={this.reasonBottomSheetRef}
          onConfirm={(val) => {
            this.setState(
              {
                reportProduct: true,
              },
              () => {
                this.onConfirm(val);
              }
            );
          }}
        />
        <OrderAccepted
          visible={this.state.isModalVisible}
          messageHint={I18n.t("product-reported")}
          changeState={(v) => {
            this.setState({
              isModalVisible: false,
            });
          }}
          message={I18n.t("product-reported-hint")}
          messageStyle={{
            bold: true,
          }}
        />
        {this.state.data.user_id !== this.props.userData.user.id &&
          this.renderActions()}
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl,
});
export default connect(mapStateToProps)(ProductDetails);
