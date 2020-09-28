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
  AppPrice,
  AppStarRating,
} from "../../common";
import avatar from "../../assets/imgs/avatar.png";

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
import MapScreen from "../mapScreen/MapScreen";
import MapLocation from "../../components/productDetails/MapLocation";
import MapView, { Marker } from "react-native-maps";
import moment from "moment";
import ModalSelection from "../../components/appModals/ModalSelection";
import { OrderAccepted } from "../../components/appModals";
class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.latitudeDelta = 0.007016387588862472;
    this.longitudeDelta = 0.004741139709949493;
    this.state = {
      isModalVisible: false,
      isModalVisibleReason: false,
      reportProduct: false,
    };
    this.reasonBottomSheetRef = React.createRef();
  }

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

        isModalVisibleReason: true,
      });
    } catch (error) {
      showError(error.message);
    } finally {
      this.setState({
        reportProduct: false,
      });
    }
  };

  pop = () => {
    AppNavigation.pop();
  };

  renderContent = () => {
    const {
      ar_title,
      ar_description,
      main_categories,
      photos,
      price_from,
      price_to,
      date_from,
      date_to,
      duration,
      latitude,
      longitude,
      delivery_types,
      delivery_type_values,
      user,
      job,
    } = this.props.data;
    console.log("this.props.data",this.props.data);
    
    return (
      <>
        <AppView stretch flex paddingHorizontal={7}>
          <AppView stretch>
            <AppText bold size={6.5}>
              {ar_title}
            </AppText>
          </AppView>
          <AppView stretch marginTop={4}>
            <AppText size={6} color="#2A2825">
              {I18n.t("detail")}
            </AppText>
            <AppText color="#BCBCBC" marginTop={3} numberOfLines={2}>
              {ar_description}
            </AppText>
          </AppView>
          <AppView stretch marginTop={4}>
            <AppText size={6} color="#2A2825">
              {I18n.t("label-price")}
            </AppText>

            <AppView stretch height={9} marginTop={3} center>
              <AppView
                row
                stretch
                borderColor="#BCBCBC"
                borderWidth={0.5}
                borderRadius={7}
              >
                <AppView flex center>
                  <PriceLabel
                    amountStyle={{ color: "red" }}
                    unitStyle={{ color: "red" }}
                    amount={price_from}
                  />
                </AppView>
                <AppView width={0.3} backgroundColor="#BCBCBC" height={5} />
                <AppView flex center height={7}>
                  <PriceLabel
                    amountStyle={{ color: "green" }}
                    unitStyle={{ color: "green" }}
                    amount={price_to}
                  />
                </AppView>
              </AppView>
            </AppView>
            <Label
              label={I18n.t("price_from")}
              top={responsiveHeight(4)}
              right={responsiveWidth(4)}
            />
            <Label
              label={I18n.t("price_to")}
              top={responsiveHeight(4)}
              right={responsiveWidth(50)}
            />
          </AppView>
          {latitude !== null && longitude !== null && (
            <AppView stretch marginBottom={2}>
              <AppText size={6} color="#2A2825">
                {I18n.t("location-de")}
              </AppText>
            </AppView>
          )}
          {latitude !== null && longitude !== null && (
            <AppView height={15} stretch center>
              <MapView
                scrollEnabled={false}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
                initialRegion={{
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                  latitudeDelta: this.latitudeDelta,
                  longitudeDelta: this.longitudeDelta,
                }}
              />
              <AppView
                circleRadius={20}
                backgroundColor="primary"
                style={{
                  position: "absolute",
                  top: 20,

                  opacity: 0.7,
                }}
              />
            </AppView>
          )}
          <AppView stretch marginTop={5}>
            <AppView stretch row spaceBetween>
              <AppText size={6} color="#2A2825">
                {I18n.t("type-product")}
              </AppText>
              <AppText>
                {main_categories
                  .map((i) => {
                    return i.ar_name;
                  })
                  .join("/")}
              </AppText>
            </AppView>
            {job !== null && (
              <AppView stretch row spaceBetween>
                <AppText size={6} color="#2A2825">
                  {I18n.t("job")}
                </AppText>
                <AppText>{job.ar_name}</AppText>
              </AppView>
            )}
            {delivery_types !== null &&delivery_type_values !==null && (
              <AppView stretch row spaceBetween>
                <AppText size={6} color="#2A2825">
                  {I18n.t("product-trans")}
                </AppText>
                <AppText>
                  {delivery_type_values.map((i) => i.ar_name).join("/")}
                </AppText>
              </AppView>
            )}
            <AppView stretch row spaceBetween>
              <AppText size={6} color="#2A2825">
                {I18n.t("days")}
              </AppText>
              <AppText>{duration > 0 ? duration : 1}</AppText>
            </AppView>
            <AppView stretch spaceBetween>
              <AppText size={6} marginVertical={5} color="#2A2825">
                {I18n.t("date")}
              </AppText>
              <AppView stretch row>
                <AppView
                  flex
                  backgroundColor="#CCCCCB"
                  height={5}
                  borderRadius={7}
                  paddingHorizontal={7}
                  row
                >
                  <AppIcon
                    type="material"
                    name="date-range"
                    marginHorizontal={3}
                  />

                  <AppText>{moment(date_from).format("Do-MMM-YYYY")}</AppText>
                </AppView>
                <AppView width={15} center>
                  <AppIcon name="arrowright" type="ant" flip />
                </AppView>
                <AppView
                  flex
                  backgroundColor="#CCCCCB"
                  height={5}
                  borderRadius={7}
                  row
                  paddingHorizontal={7}
                >
                  <AppIcon
                    type="material"
                    name="date-range"
                    marginHorizontal={3}
                  />

                  <AppText>{moment(date_to).format("Do-MMM-YYYY")}</AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
          <AppView stretch row marginTop={5} paddingVertical={5}>
            <AppImage
              circleRadius={15}
              source={
                user.avatar !== null
                  ? {
                      uri: `http://dev.fudexsb.com/demo/ejarly/public/uploads/${
                        user.avatar
                      }`,
                    }
                  : avatar
              }
            />

            <AppView stretch marginHorizontal={5}>
              <AppText size={5.5}>{user.name} </AppText>

              <AppStarRating rate={user.rate_avg3} size={5} />
            </AppView>
          </AppView>
          <AppView
            stretch
            center
            marginVertical={5}
            paddingVertical={4}
            onPress={() => {
              this.reasonBottomSheetRef.current.show();
            }}
          >
            {this.state.reportProduct ? (
              <AppSpinner />
            ) : (
              <AppText color="#ED7B7C" bold>
                {I18n.t("Indecent")}
              </AppText>
            )}
          </AppView>
        </AppView>
        <AppView elevation={3} stretch row height={10} paddingHorizontal={7}>
          <AppButton
            title={I18n.t("apply-offer")}
            flex={2}
            backgroundColor="primary"
            color="white"
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}
          />
          <AppView width={5} />
          <AppButton
            title={I18n.t("chat")}
            flex={1}
            backgroundColor="white"
            borderColor="primary"
            borderWidth={1}
            color="#33312F"
          />
        </AppView>
      </>
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
  addNewProduct = () => {
    this.setState(
      {
        isModalVisible: false,
      },
      () => {
        AppNavigation.push({
          name: "addNewProduct",
        });
      }
    );
  };
  onSelectFromProducts = () => {
    this.setState(
      {
        isModalVisible: false,
      },
      () => {
        AppNavigation.push({
          name: "profile",
        });
      }
    );
  };
  render() {
    console.log("offerdetails ==>", this.props.data);

    return (
      <AppView stretch flex>
        <AppHeader title={I18n.t("offer-details")} />
        <AppScrollView>
          <AppView height={25}>
            <ImagesSwiper onPress={this.pop} imgs={this.props.data.photos} />
          </AppView>
          {this.renderContent()}
        </AppScrollView>
        <ModalSelection
          isVisible={this.state.isModalVisible}
          message={I18n.t("offer-selection")}
          changeState={() => {
            this.setState({
              isModalVisible: false,
            });
          }}
          onSelectFromProducts={this.onSelectFromProducts}
          addNewProduct={this.addNewProduct}
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
          visible={this.state.isModalVisibleReason}
          messageHint={I18n.t("product-reported")}
          changeState={(v) => {
            this.setState({
              isModalVisibleReason: false,
            });
          }}
          message={I18n.t("product-reported-hint")}
          messageStyle={{
            bold: true,
          }}
        />
      </AppView>
    );
  }
}

const PriceLabel = (props) => {
  return (
    <AppView flex height={6} center>
      {props.amount ? (
        <AppPrice
          amount={props.amount}
          unit={"real"}
          amountStyle={props.amountStyle}
          unitStyle={props.unitStyle}
        />
      ) : (
        <AppText> - </AppText>
      )}
    </AppView>
  );
};
const Label = (props) => {
  return (
    <AppView
      stretch
      borderRadius={5}
      paddingHorizontal={3}
      style={{
        position: "absolute",
        top: props.top,
        zIndex: 10000,

        right: props.right,

        height: 20,
        backgroundColor: "white",
      }}
    >
      <AppText>{props.label}</AppText>
    </AppView>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  currentLocation: state.location.current,

  allChat: state.chat,
  rtl: state.lang.rtl,
});
export default connect(mapStateToProps)(ProductDetails);
