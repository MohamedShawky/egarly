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
  AppInput
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
  onSubmit = async (values, { setSubmitting }) => {
    try {
      AppNavigation.push("approveAccountStepFour");
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
          bankName: "",
          bankNumber: "",
          accountName: "",
          iban: ""
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
  renderFromBody = props => {
    const {
      errors,
      values,
      handleBlur,
      handleChange,
      touched,
      isSubmitting,
      handleSubmit
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
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("bank-name")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.bankName}
            onBlur={handleBlur("bankName")}
            onChange={handleChange("bankName")}
            error={errors.bankName}
            isTouched={touched.bankName}
            height={6}
          />
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("bank-account-name")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.accountName}
            onBlur={handleBlur("accountName")}
            onChange={handleChange("accountName")}
            error={errors.accountName}
            isTouched={touched.accountName}
            height={6}
          />
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("account-number")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.bankNumber}
            onBlur={handleBlur("bankNumber")}
            onChange={handleChange("bankNumber")}
            error={errors.bankNumber}
            isTouched={touched.bankNumber}
            height={6}
          />
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("iban")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.iban}
            onBlur={handleBlur("iban")}
            onChange={handleChange("iban")}
            error={errors.iban}
            isTouched={touched.iban}
            height={6}
          />

          <AppView
            flex
            stretch
            backgroundColor="#F3F3F3"
            marginTop={15}
            paddingHorizontal={7}
            paddingVertical={10}
          >
            <AppText bold>{I18n.t("add-bank-account")}</AppText>

            {this.renderAdvantage("check", "ant", I18n.t("bank-one"))}
            {this.renderAdvantage("check", "ant", I18n.t("identity-two"))}
          </AppView>
          <AppButton
            title={I18n.t("next")}
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
        currentStep={2}
      />
      {this.renderForm()}
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
