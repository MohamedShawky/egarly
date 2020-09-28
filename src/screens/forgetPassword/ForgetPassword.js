import React, { Component } from "react";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import { SafeAreaView } from "react-native";
import { AppHeader, InfoModal, AppErrorModal } from "../../components";
import { validationSchemaEmail } from "./validation";
import * as authRepo from "../../repo/AuthRepo";
import * as errors from "../../utils/Errors";
import {
  AppView,
  AppButton,
  AppInput,
  AppNavigation,
  AppScrollView,
  AppText,
  AppIcon,
  showError,
} from "../../common";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorTxt: "",
      showInvalidUserModal: false,
      isInfoModalVisible: false,
      isPhone: false,
    };
  }

  onSubmit = async (values, { setSubmitting }) => {
    let resendCode = false;

    const data = {
      email: values.emailOrPhone,
    };

    try {
      const res = await authRepo.forgetPassword(data);
      if (res) {
        AppNavigation.push("otp");
      }else{
        this.setState({
          showInvalidUserModal: true,
          errorTxt: "البريد الالكتروني غير صحيح",
        });
      }
      console.log("res --->>", res);
    } catch (error) {
      console.log("error ==>>", error);
      if (typeof error === "object") {
        this.setState({
          showInvalidUserModal: true,
          errorTxt: error.message,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  renderCode = async () => {
    try {
      resendCode = await authRepo.resendVerifyCodeForgetPassword(
        values.emailOrPhone
      );
      if (resendCode) {
        this.setState({
          isPhone: !values.emailOrPhone.includes("@"),
          isInfoModalVisible: true,
          emailOrPhone: values.emailOrPhone,
        });
      }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.setState({
          showInvalidUserModal: true,
          errorTxt: I18n.t("ui-networkConnectionError"),
        });
      } else if (error === errors.INVALID_PHONE_OR_EMAIL) {
        this.setState({
          showInvalidUserModal: true,
          errorTxt: I18n.t("invalid-phone-or-email"),
        });
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  renderFormInputs = ({
    setFieldValue,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
  }) => (
    <>
      <AppView marginHorizontal={8} stretch>
        <AppInput
          onChange={(name, v, noValidation) => {
            setFieldValue("emailOrPhone", name);
            handleChange("emailOrPhone")(name);
            this.setState({
              errorTxt: "",
            });
          }}
          leftItems={
            <AppIcon
              type="material"
              name="lock-outline"
              size={12}
              color="#6a6a6a"
            />
          }
          error={errors.emailOrPhone}
          errorMessage={this.state.errorTxt}
          label={I18n.t("sign-in-email-or-phone")}
          initialValue={values.emailOrPhone}
          onBlur={handleBlur("emailOrPhone")}
          isTouched={touched.emailOrPhone}
        />
        <AppView flex />
      </AppView>
      <AppView
        stretch
        stretchChildren
        // style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        marginVertical={15}
      >
        <SafeAreaView>
          <AppButton
            title={I18n.t("next")}
            stretch
            processing={isSubmitting}
            onPress={handleSubmit}
            noBorder
            backgroundColor="primary"
            marginHorizontal={7}
          />
        </SafeAreaView>
      </AppView>
    </>
  );

  renderForm = () => (
    <AppView stretch flex>
      <Formik
        initialValues={{ emailOrPhone: "" }}
        validationSchema={validationSchemaEmail}
        onSubmit={(values, { setSubmitting }) =>
          this.onSubmit(values, { setSubmitting })
        }
      >
        {this.renderFormInputs}
      </Formik>
    </AppView>
  );

  render() {
    return (
      <AppView flex stretch backgroundColor="white">
        <AppHeader backgroundColor="transparent" />

        <AppScrollView stretch centerX flexGrow>
          <AppView marginVertical={12.5} stretch paddingHorizontal={7}>
            <AppText>{I18n.t("setting-forget-password")}</AppText>
            <AppText size={5.6} bold color="#757575">
              {I18n.t("entre-next-data")}
            </AppText>
          </AppView>
          {this.renderForm()}
        </AppScrollView>
        <InfoModal
          isVisible={this.state.isInfoModalVisible}
          message={I18n.t("otpScreen-descriptions")}
          secondMessage={
            this.state.isPhone
              ? I18n.t("phone-revsion")
              : I18n.t("email-revsion")
          }
          onConfirm={() => {
            this.setState({
              isInfoModalVisible: false,
            });
            setTimeout(() => {
              AppNavigation.push({
                name: "sendVerificationCode",
                passProps: { emailOrPhone: this.state.emailOrPhone },
              });
            }, 550);
          }}
          changeState={(v) => {
            this.setState({
              isInfoModalVisible: v,
            });
          }}
          marginHorizontal={10}
          confirmInfo
        />
        <AppErrorModal
          visible={this.state.showInvalidUserModal}
          fromSignIn
          changeState={(v) => {
            this.setState({
              showInvalidUserModal: v,
            });
          }}
          errorMessage={[this.state.errorTxt]}
          onConfirm={() => {
            this.setState({
              showInvalidUserModal: false,
            });
          }}
        />
      </AppView>
    );
  }
}

export default ForgetPassword;
