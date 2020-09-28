import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
} from "../../components";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      currentValue: 0,
      currentPicker: "date",
      loading: true,
      isModaleVisible: false,
    };
  }

  showDateTimePicker = (pickerType, from, dateOrTime, name) => {
    const currentDate =
      pickerType == "date" && dateOrTime
        ? moment(dateOrTime, "D-M-YYYY").toDate()
        : null;

    const currentTime =
      pickerType == "time" && dateOrTime
        ? moment(dateOrTime, "h:mm:ss a").toDate()
        : null;

    console.log("this.state.dateOrTime", name);

    this.setState({
      currentPicker: pickerType,
      isDateTimePickerVisible: true,
      currentDate: currentDate || currentTime || new Date(),
      from,
      name,
    });
  };

  hideDateTimePicker = () =>
    this.setState({ isDateTimePickerVisible: false, from: false });

  handleDatePicked = (
    date,
    { handleChange, errors, values, setFieldError, setFieldValue, touched }
  ) => {
    console.log("this.state.dateOrTime", this.state.dateOrTime, date);

    if (this.state.currentPicker === "date") {
      setFieldValue(
        this.state.name,
        moment(date)
          .locale("en")
          .startOf("date")
          .format("MM/YYYY")
      );
    } else if (this.state.currentPicker === "time") {
      setFieldValue("time", moment(date).format("hh:mm a"));
    }
    this.hideDateTimePicker();
  };

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
          creditName: "",
          creditId: "",
          creditExpDate: "",
          password: "",
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
          paddingTop={5}
          paddingHorizontal={7}
          paddingBottom={10}
          borderTopWidth={0.5}
          borderTopColor="#F4F2F0"
        >
          <AppView stretch marginBottom={3}>
            <AppText size={5.5}>{I18n.t("credit-name")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.creditName}
            onBlur={handleBlur("creditName")}
            onChange={handleChange("creditName")}
            error={errors.creditName}
            isTouched={touched.creditName}
            placeholder={I18n.t("credit-name-hint")}
            height={6}
            size={4}
          />
          <AppView stretch marginBottom={3}>
            <AppText size={5.5}>{I18n.t("credit-id")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.creditId}
            onBlur={handleBlur("creditId")}
            onChange={handleChange("creditId")}
            error={errors.creditId}
            isTouched={touched.creditId}
            height={6}
            placeholder={I18n.t("credit-id-hint")}
            size={4}
          />
          <AppView row spaceBetween marginTop={3} marginTop={3}>
            <AppView stretch flex={2}>
              <AppText marginBottom={3} size={5.5}>
                {I18n.t("credit-exp")}
              </AppText>
              <AppInput
                // leftItems={<AppIcon type="custom" name="street" size={8} />}
                initialValue={values.creditExpDate}
                onBlur={handleBlur("creditExpDate")}
                onChange={handleChange("creditExpDate")}
                error={errors.creditExpDate}
                isTouched={touched.creditExpDate}
                height={6}
                placeholder={"MM/YYYY"}
                size={4}
                editable={false}
                onPress={() => {
                  this.showDateTimePicker(
                    "date",
                    false,
                    values.creditExpDate,
                    "creditExpDate"
                  );
                }}
              />
            </AppView>
            <AppView width={5} />

            <AppView stretch flex={1}>
              <AppText marginBottom={3} size={5.5}>
                {I18n.t("credit-pass")}
              </AppText>
              <AppInput
                // leftItems={<AppIcon type="custom" name="street" size={8} />}
                initialValue={values.password}
                onBlur={handleBlur("password")}
                onChange={handleChange("password")}
                error={errors.password}
                isTouched={touched.password}
                height={6}
                placeholder={I18n.t("credit-pass-hint")}
                size={4}
              />
            </AppView>
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
        <DateTimePicker
          minimumDate={this.state.minimumDate}
          date={this.state.currentDate}
          mode={this.state.currentPicker}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(date) => this.handleDatePicked(date, props)}
          onCancel={this.hideDateTimePicker}
          is24Hour={false}
        />
      </>
    );
  };

  renderContent = () => (
    <AppView stretch flex>
      <AppHeader title={I18n.t("payment-detail")} />

      {this.renderForm()}
    </AppView>
  );

  render() {
    return <>{this.renderMenuContent()}</>;
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(CreditCard);
