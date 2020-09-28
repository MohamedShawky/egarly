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
  AppInput,
} from "../../common";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader,
  AvatarPicker,
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
import { ProductInfo, CreateOrderBarStepper } from "../../components/orderRent";
import * as OrderRepo from "../../repo/OrderRepo";
import { App } from "react-native-firebase";
import AccountApproved from "../../components/appModals/AccountApproved";
class ApproveAccountStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApproved: false,
    };
  }
  onSubmit = async (values, { setSubmitting }) => {
    try {
      // AppNavigation.push("approveAccountStepFour");
      setSubmitting(false);
      this.setState({
        isApproved: true,
      });
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
      } else if (error === errors.INVALID_PASSWORD) {
        setFieldError("oldPassword", I18n.t("invalid-old-password"));
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );
  renderForm = () => {
    return (
      <Formik
        initialValues={{
          userName: "",
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        }}
        // validationSchema={ValidationDate}
        onSubmit={(values, { setSubmitting, isSubmitting }) =>
          this.onSubmit(values, { setSubmitting, isSubmitting })
        }
      >
        {this.renderFromBody}
      </Formik>
    );
  };
  renderAdvantage = (name, type, text) => {
    return (
      <AppView stretch row height={5}>
        <AppView circleRadius={5.5} backgroundColor="#27AE60" center>
          <AppIcon name={name} type={type} color="white" />
        </AppView>
        <AppText marginHorizontal={7}>{text}</AppText>
      </AppView>
    );
  };
  renderFromBody = (props) => {
    const {
      errors,
      values,
      handleBlur,
      handleChange,
      touched,
      isSubmitting,
      handleSubmit,
    } = props;
    return (
      <>
        <AppScrollView
          stretch
          flex
          paddingTop={15}
          paddingHorizontal={7}
          paddingBottom={10}
          borderTopWidth={0.5}
          borderTopColor="#F4F2F0"
        >
          <AppView stretch center>
            <AvatarPicker
              onChange={(v) => {
                console.log("v");
              }}
            />
          </AppView>

          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("userName")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.userName}
            onBlur={handleBlur("userName")}
            onChange={handleChange("userName")}
            error={errors.userName}
            isTouched={touched.userName}
            height={6}
          />
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("firstName")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.firstName}
            onBlur={handleBlur("firstName")}
            onChange={handleChange("firstName")}
            error={errors.firstName}
            isTouched={touched.firstName}
            height={6}
          />
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("lastName")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.lastName}
            onBlur={handleBlur("lastName")}
            onChange={handleChange("lastName")}
            error={errors.lastName}
            isTouched={touched.lastName}
            height={6}
          />
          <AppView stretch paddingVertical={10}>
            <AppText bold>{I18n.t("personal-data")}</AppText>
            <AppText>{I18n.t("personal-data-hint")}</AppText>
          </AppView>
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("phone")}</AppText>
          </AppView>
          <AppView stretch row backgroundColor="#F3F3F3">
            <AppView width={20} center>
              <AppText>+02</AppText>
            </AppView>
            <AppView
              width={0.5}
              marginHorizontal={1}
              // marginTop={2}
              // marginBottom={2}
              stretch
              backgroundColor="grey"
            />
            <AppInput
              // leftItems={<AppIcon type="custom" name="street" size={8} />}
              initialValue={values.phone}
              onBlur={handleBlur("phone")}
              onChange={handleChange("phone")}
              error={errors.phone}
              isTouched={touched.phone}
              height={6}
              phone
              flex
            />
          </AppView>
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("email")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.email}
            onBlur={handleBlur("email")}
            onChange={handleChange("email")}
            error={errors.email}
            isTouched={touched.email}
            height={6}
            email
          />

          <AppButton
            title={I18n.t("save")}
            onPress={handleSubmit}
            processing={isSubmitting}
            stretch
            backgroundColor="primary"
            marginTop={15}
          />
        </AppScrollView>
      </>
    );
  };

  renderContent = () => (
    <AppView stretch flex>
      <AppHeader title={I18n.t("approve")} />
      <CreateOrderBarStepper
        arrayOfstepsKey="create-approve-account-steps"
        currentStep={3}
      />
      {this.renderForm()}
    </AppView>
  );

  render() {
    return (
      <>
        {this.renderMenuContent()}
        <AccountApproved
          visible={this.state.isApproved}
          changeState={() => {
            this.setState(
              {
                isApproved: false,
              },
              () => {
                AppNavigation.setStackRoot("MAIN_STACK");
              }
            );
          }}
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

export default connect(mapStateToProps)(ApproveAccountStepper);
