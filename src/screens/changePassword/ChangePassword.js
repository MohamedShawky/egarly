import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { SafeAreaView } from "react-native";
import {
  AppView,
  AppInput,
  AppText,
  AppButton,
  AppIcon,
  AppNavigation,
  showError,
} from "../../common";
import { AppHeader } from "../../components";
import { buildValidationSchema } from "./validation";
import { Formik } from "formik";
import * as authRepo from "../../repo/AuthRepo";
import * as errors from "../../utils/Errors";
import { OrderAccepted } from "../../components/appModals";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.oldPassword = React.createRef();
    this.newPassword = React.createRef();
    this.confirmPassword = React.createRef();
    this.fromikRef = React.createRef();
    this.state = {
      isModalVisible: false,
      message: "",
    };
  }

  onSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const data = {
        old_password: values.oldPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
      };
      console.log("data ", data);

      const isChanged = await authRepo.changePassword(data);
      if (isChanged) {
        this.setState({
          isModalVisible: true,
          message: "تم تغيير كلمه المرور بنجاح",
        });
      } else {
        setFieldError("oldPassword", I18n.t("invalid-old-password"));
      }
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

  renderOldPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  }) => {
    return (
      <AppInput
        label={I18n.t("ui-old-password")}
        ref={this.oldPassword}
        nextInput={this.newPassword}
        secure
        showSecureEye
        // leftItems={<AppIcon type="material" name="lock-outline" size={12} color="#6a6a6a"/>}
        initialValue={values.oldPassword}
        onBlur={handleBlur("oldPassword")}
        onChange={handleChange("oldPassword")}
        error={errors.oldPassword}
        isTouched={touched.oldPassword}
      />
    );
  };

  renderNewPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  }) => {
    return (
      <AppInput
        label={I18n.t("ui-new-password")}
        ref={this.newPassword}
        nextInput={this.confirmPassword}
        secure
        showSecureEye
        // leftItems={<AppIcon type="material" name="lock-outline" size={12} color="#6a6a6a"/>}
        initialValue={values.newPassword}
        onBlur={handleBlur("newPassword")}
        onChange={handleChange("newPassword")}
        error={errors.newPassword}
        isTouched={touched.newPassword}
        marginTop={5}
      />
    );
  };

  renderConfirmPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
  }) => {
    return (
      <AppInput
        label={I18n.t("ui-confirmPassword")}
        ref={this.confirmPassword}
        secure
        showSecureEye
        // leftItems={<AppIcon type="material" name="lock-outline" size={12} color="#6a6a6a"/>}
        initialValue={values.confirmPassword}
        onBlur={handleBlur("confirmPassword")}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        isTouched={touched.confirmPassword}
        marginTop={5}
      />
    );
  };
  renderForgetPassword = () => (
    <AppButton
      marginTop={-8}
      transparent
      noPadding
      onPress={() => {
        AppNavigation.push("forgetPassword");
      }}
    >
      <AppText color="primary" size={6}>
        {I18n.t("forget-password")}
      </AppText>
    </AppButton>
  );
  renderSubmit = ({ errors, handleSubmit, isSubmitting }) => (
    <AppView
      stretch
      stretchChildren
      style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      height={10}
      center
    >
      <SafeAreaView>
        <AppButton
          processing={
            !Object.getOwnPropertyNames(errors).length && isSubmitting
          }
          onPress={handleSubmit}
          height={7}
          stretch
          noBorder
          title={I18n.t("save")}
          marginHorizontal={7}
          backgroundColor="primary"
        />
      </SafeAreaView>
    </AppView>
  );
  renderFromBody = (props) => {
    return (
      <AppView flex centerX stretch>
        <AppView stretch centerX marginHorizontal={10} marginTop={15}>
          {this.renderOldPasswordInput(props)}
          {this.renderNewPasswordInput(props)}
          {this.renderConfirmPasswordInput(props)}
          {/* {this.renderForgetPassword()} */}
        </AppView>
        {this.renderSubmit(props)}
      </AppView>
    );
  };

  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={buildValidationSchema(this.fromikRef)}
      onSubmit={(values, { setSubmitting, setFieldError }) =>
        this.onSubmit(values, { setSubmitting, setFieldError })
      }
    >
      {this.renderFromBody}
    </Formik>
  );

  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("change-password-title")} />
        {this.renderForm()}
        <OrderAccepted
          visible={this.state.isModalVisible}
          messageHint={this.state.message}
          changeState={(v) => {
            this.setState(
              {
                isModalVisible: false,
              },
              () => {
                AppNavigation.pop();
              }
            );
          }}
        />
      </AppView>
    );
  }
}
const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  connected: state.network.isConnected,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
