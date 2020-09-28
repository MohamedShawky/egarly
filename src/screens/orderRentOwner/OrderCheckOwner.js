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
  ProductCheck,
  CreateOrderBarStepper,
} from "../../components/orderRent";

import * as OrderRepo from "../../repo/OrderRepo";
import InfoModal from "../../components/InfoModal";
import { date } from "yup";
import InfoBottomSheet from "../../components/InfoBottomSheet";
import { refreshList } from "../../actions/list";
import { OrderAccepted } from "../../components/appModals";
import {
  ActionsButton,
  ActionsButtonOwner,
} from "../../components/orderRent/ProductCheck";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import Echo from "laravel-echo";
import Pusher from "pusher-js/react-native";

class Home extends Component {
  state = {
    loading: false,
    orderLoading: true,
    data: null,
    isModalVisible: false,
    message: "",
    isRefused: false,
    isModalVisibleRefuse: false,
    stackName: this.props.stackName,
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  onPreviewRequest = async () => {
    // order id ==>>
    this.setState({
      loading: true,
    });

    console.log("props --->>", this.props);

    console.log("this.state.data", this.state.data);

    const order_id = this.state.data.id;
    let data = {};
    if (this.state.data.status_id === 3) {
      data.order_id = order_id;
      data.status_id = 4;
    }

    try {
      const isAccepte = await OrderRepo.changeOrderStatus(data);
      console.log("is Accept");

      if (isAccepte) {
        this.setState({
          loading: false,
          isModalVisible: true,
          message: "الموافقه علي طلب المعاينه",
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
      });

      showError("Error , try again");
    }
  };
  onRefuseOrder = async () => {
    this.setState({
      isRefused: true,
    });

    try {
      const data = {
        order_id: this.props.data.id,
        status_id: 12,
      };
      const isAccepte = await OrderRepo.changeOrderStatus(data);

      if (isAccepte) {
        this.setState({
          isRefused: false,
          isModalVisibleRefuse: true,

          message: "تم الغاء الطلب",
        });
      }
    } catch (error) {
      this.setState({
        isRefused: false,
      });

      showError("Error , try again");
    }
  };
  renderContent = () => {
    return (
      <AppView stretch flex>
        {this.props.orderLoading ? (
          <AppView flex stretch center>
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
              centerX
            >
              <ProductCheck
                onPreviewRequest={() => {
                  this.onPreviewRequest();
                }}
                sppiner={this.state.loading}
                order={this.props.data}
                onRefuseOrder={() => {
                  this.onRefuseOrder();
                }}
                ownerOrRenter={true}
              />
            </AppScrollView>
            <AppView
              style={[{ positioon: "absolute", bottom: 0, left: 0, right: 0 }]}
              stretch
              style={cardShadowStyle}
              elevation={1.5}
              // backgroundColor="red"
            >
              {this.props.data !== undefined && (
                <ActionsButton
                  onPreviewRequest={this.onPreviewRequest}
                  onRefuseOrder={this.onRefuseOrder}
                  sppiner={this.state.loading}
                  isRefused={this.state.isRefused}
                  disabled={this.props.data.status_id === 2}
                />
              )}
            </AppView>
          </>
        )}
        {/* <CustomBottomTabs componentId={this.props.componentId} /> */}
      </AppView>
    );
  };
  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        images: [],
        address: "",
        description: "",
        price: "",
        rentValue: "",
      }}
      // validationSchema={buildValidationSchemaEGY(this.fromikRef)}
      onSubmit={(values, { setSubmitting, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, isSubmitting })
      }
    >
      {this.renderFormBody}
    </Formik>
  );

  renderFormBody = (props) => {
    const {
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = props;

    return (
      <>
        <AddImage {...props} />
        <Descriptions {...props} />
        <Price {...props} />
      </>
    );
  };

  render() {
    const { data } = this.props;

    return (
      <>
        {this.renderMenuContent()}
        {/* <InfoBottomSheet
          ref={this.InfoBottomSheet}
          message="Waitting Acceptting Order"
        /> */}
        <OrderAccepted
          visible={this.state.isModalVisible}
          changeState={(v) => {
            this.setState(
              {
                isModalVisible: false,
              },
              () => {
                if (
                  this.props.data.status_id === 3 &&
                  this.state.message !== "تم الغاء الطلب"
                ) {
                  AppNavigation.navigateToOrderStatus(4, data.id);
                }
              }
            );
          }}
          message={this.state.message}
          messageHint
        />
        <OrderAccepted
          visible={this.state.isModalVisibleRefuse}
          changeState={(v) => {
            this.setState(
              {
                isModalVisibleRefuse: false,
              },
              () => {
                AppNavigation.pop();
              }
            );
          }}
          message={this.state.message}
          messageHint
        />
      </>
    );
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
export default connect(mapStateToProps)(Home);
