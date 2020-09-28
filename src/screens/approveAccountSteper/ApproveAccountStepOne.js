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
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
class ApproveAccountStepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      isDateTimePickerVisible: false,
      currentPicker: "date"
    };
  }
  onSubmit = async (values, { setSubmitting }) => {
    try {
      AppNavigation.push("approveAccountStepThree");
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


  _showDateTimePicker = (pickerType, from, dateOrTime) => {
    const currentDate =
      pickerType == "date" && dateOrTime
        ? moment(dateOrTime, "DD-MMM-YYYY").toDate()
        : null;
    const currentTime =
      pickerType == "time" && dateOrTime
        ? moment(dateOrTime, "h:mm:ss a").toDate()
        : null;

    this.setState({
      currentPicker: pickerType,
      isDateTimePickerVisible: true,
      currentDate: currentDate || currentTime || new Date(),
      from
    });
  };

  _hideDateTimePicker = () =>
    this.setState({ isDateTimePickerVisible: false, from: false });

  _handleDatePicked = (
    date,
    { handleChange, errors, values, setFieldError, setFieldValue, touched }
  ) => {
    if (this.state.currentPicker === "date") {
      setFieldValue(
        "date",
        moment(date)
          .startOf("date")
          .format("DD-MMMM-YYYY")
      );
    } else if (this.state.currentPicker === "time") {
      setFieldValue("time", moment(date).format("hh:mm a"));
    }
    this._hideDateTimePicker();
  };
  renderForm = () => {
    return (
      <Formik
        initialValues={{
          identity: "",
          date: ""
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
          paddingTop={20}
          paddingHorizontal={7}
          paddingBottom={10}
          borderTopWidth={0.5}
          borderTopColor="#F4F2F0"
        >
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("add-identity-number")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.identity}
            onBlur={handleBlur("identity")}
            onChange={handleChange("identity")}
            error={errors.identity}
            isTouched={touched.identity}
            height={6}
          />
          <AppView stretch marginTop={10} marginBottom={3}>
            <AppText>{I18n.t("end-date")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            onPress={() => this._showDateTimePicker("date", false, values.date)}
            editable={false}
            initialValue={values.date}
            onBlur={handleBlur("date")}
            onChange={handleChange("date")}
            error={errors.date}
            isTouched={touched.date}
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
            <AppText bold>{I18n.t("add-identity-number")}</AppText>

            {this.renderAdvantage("check", "ant", I18n.t("identity-one"))}
            {this.renderAdvantage("check", "ant", I18n.t("identity-two"))}
            {this.renderAdvantage("check", "ant", I18n.t("identity-three"))}
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
        {this.state.isDateTimePickerVisible && (
          <DateTimePicker
            minimumDate={this.state.minimumDate}
            date={this.state.currentDate}
            mode={this.state.currentPicker}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={date => this._handleDatePicked(date, props)}
            onCancel={this._hideDateTimePicker}
            is24Hour={false}
          />
        )}
      </>
    );
  };

  renderContent = () => (
    <AppView stretch flex>
      <AppHeader title={I18n.t("approve")} />
      <CreateOrderBarStepper
        arrayOfstepsKey="create-approve-account-steps"
        currentStep={1}
      />
      {this.renderForm()}

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
