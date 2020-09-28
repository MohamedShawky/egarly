import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { Formik } from "formik";
import { Keyboard, SafeAreaView } from "react-native";
import * as errors from "../../utils/Errors";
import contactUs from "../../assets/imgs/contact-us.png";
import {
  AppView,
  AppImage,
  AppText,
  AppPicker,
  AppInput,
  AppButton,
  AppIcon,
  AppScrollView
} from "../../common";
import { AppHeader, NoInternet, AppFeedBack } from "../../components";
import { validationSchema } from "./Validation";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.fromikRef = React.createRef();
    this.message = React.createRef();
  }

  state = {
    isInfoModalVisible: false,
    isReset: false
  };

  onSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
    Keyboard.dismiss();
  };

  renderIssueType = ({ handleChange, errors, setFieldError, touched }) => (
    <AppView
      bc="#E0E0E0"
      bbw={0.7}
      stretch
      height={errors.type ? 12 : 9.1}
      marginTop={3}
    >
      <AppPicker
        reset={this.state.isReset}
        placeholder={I18n.t("message-type")}
        title={I18n.t("message-type")}
        hideSearch
        marginHorizontal={10}
        backgroundColor="#E6E8EA"
        labelStyle
        mb={errors.type && touched.type ? -5 : -15}
        bw={0}
        color="#6A6A6A"
        isTouched={touched.type}
        error={errors.type}
        onChange={value => {
          setFieldError("type", "");
          handleChange("type")(value);
          value === "ORDER"
            ? handleChange("isOrder")(true)
            : handleChange("isOrder")(false);
        }}
        data={[
          {
            label: I18n.t("order-complain"),
            value: "ORDER"
          },
          {
            label: I18n.t("public-complain"),
            value: "COMPLAIN"
          },
          { label: I18n.t("suggestion"), value: "SUGGESTION" },
          { label: I18n.t("question"), value: "QUESTION" }
        ]}
        rightItems={[
          <AppIcon
            name="keyboard-arrow-down"
            type="material"
            size={10}
            color="#6A6A6A"
          />
        ]}
        leftItems={[
          <AppIcon name="mail" type="custom" size={8} color="#6A6A6A" />
        ]}
      />
    </AppView>
  );

  renderOrderNumber = ({
    values,
    handleBlur,
    errors,
    handleChange,
    touched
  }) => (
    <AppView
      paddingVertical={7}
      stretch
      center
      borderBottomWidth={0.7}
      borderColor="#E0E0E0"
    >
      <AppInput
        marginBottom={errors.orderNumber && touched.orderNumber ? -10 : -14}
        nextInput={this.message}
        number
        label={I18n.t("order-number")}
        marginHorizontal={10}
        title={I18n.t("order-number")}
        initialValue={values.orderNumber}
        onBlur={handleBlur("orderNumber")}
        onChange={handleChange("orderNumber")}
        error={errors.orderNumber}
        isTouched={touched.orderNumber}
        onBlur={handleBlur("orderNumber")}
        leftItems={[
          <AppView margin={1} padding={3}>
            <AppIcon
              name="adress-list"
              type="custom"
              size={8}
              color="#6A6A6A"
            />
          </AppView>
        ]}
      />
    </AppView>
  );

  renderIssueMessage = ({
    values,
    handleBlur,
    errors,
    handleChange,
    touched
  }) => (
    <AppView flex stretch centerX>
      <AppInput
        height={16}
        multiline
        label={I18n.t("issue-message")}
        initialValue={values.message}
        onBlur={handleBlur("message")}
        onChange={handleChange("message")}
        error={errors.message}
        isTouched={touched.message}
        marginHorizontal={10}
        marginVertical={10}
      />
    </AppView>
  );

  renderFromBody = props => {
    const { values, handleSubmit, isSubmitting } = props;
    return (
      <AppView flex stretch>
        <AppView flex stretch>
          <AppScrollView stretch>
            <AppView center stretch height={35} backgroundColor="#F1F1F1">
              <AppImage
                source={contactUs}
                width={70}
                height={21}
                resizeMode="contain"
              />
              <AppView marginTop={-5} stretch center>
                <AppText size={8} color="primary">
                  {I18n.t("contact-us-title")}
                </AppText>
                <AppText color="#888686">
                  {I18n.t("contact-us-message")}
                </AppText>
              </AppView>
            </AppView>
            <AppView
              paddingBottom={10}
              flex
              stretch
              centerX
              backgroundColor="white"
            >
              {this.renderIssueType(props)}
              {values.isOrder === true && this.renderOrderNumber(props)}
              {this.renderIssueMessage(props)}
            </AppView>
          </AppScrollView>
        </AppView>
        <AppView
          stretch
          stretchChildren
          style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
        >
          <SafeAreaView>
            <AppButton
              title={I18n.t("send")}
              stretch
              processing={isSubmitting}
              onPress={handleSubmit}
              noBorder
            />
          </SafeAreaView>
        </AppView>
      </AppView>
    );
  };

  renderSuccessModal() {
    return (
      <AppFeedBack
        visible={this.state.isInfoModalVisible}
        changeState={v => {
          this.setState({
            isInfoModalVisible: v
          });
        }}
        iconName="md-checkmark"
        iconType="ion"
        iconSize={16}
        iconColor="white"
        message={I18n.t("done")}
        hintMessage={I18n.t("message-added-successfully")}
      />
    );
  }

  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("contact-us-title")} />
        {!this.props.connected ? (
          <AppView>
            <NoInternet />
          </AppView>
        ) : (
          <AppView flex stretch>
            {/* <Formik
              ref={this.fromikRef}
              initialValues={{
                isOrder: false,
                type: "",
                orderNumber: "",
                message: ""
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm, setFieldError }) =>
                this.onSubmit(values, {
                  setSubmitting,
                  resetForm,
                  setFieldError
                })
              }
            >
              {this.renderFromBody}
            </Formik> */}
            {this.renderSuccessModal()}
          </AppView>
        )}
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  connected: state.network.isConnected
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
