import React, { Component } from "react";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import { SafeAreaView } from "react-native";
import { AppHeader, InfoModal, AppErrorModal } from "../../components";
import { validationSchemaPasswords } from "./validation";
import * as authRepo from "../../repo/AuthRepo";
import * as errors from "../../utils/Errors";
import {
  AppView,
  AppButton,
  AppInput,
  AppNavigation,
  AppScrollView,
  AppIcon,
  showError,
} from "../../common";
import { logout, signIn } from "../../actions/AuthActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfoModalVisible: false,
      showInvalidUserModal: false,
      errorTxt: "",
      password: "",
    };

    this.confirmPasswordRef = React.createRef();
  }

  onSubmit = async (values, { setSubmitting }) => {
    const data = {
      code: this.props.code,
      password: values.password,
      password_confirmation: values.password,
    };

    try {
      await authRepo.newPasswordToForgetPassword(data);
      this.setState({
        isInfoModalVisible: true,
        password: values.password,
      });
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        this.setState({
          showInvalidUserModal: true,
          errorTxt: I18n.t("ui-networkConnectionError"),
        });
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  renderPasswordInput = (values, errors, touched, handleChange, handleBlur) => {
    const {} = this.props;
    return (
      <AppInput
        label={I18n.t("ui-password")}
        ref={this.password}
        nextInput={this.confirmPassword}
        secure
        showSecureEye
        leftItems={
          <AppIcon
            type="material"
            name="lock-outline"
            size={12}
            color="#6a6a6a"
          />
        }
        initialValue={values.password}
        onBlur={handleBlur("password")}
        onChange={handleChange("password")}
        error={errors.password}
        isTouched={touched.password}
        marginBottom={10}
      />
    );
  };

  renderConfirmPasswordInput = (
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  ) => {
    const {} = this.props;
    return (
      <AppInput
        label={I18n.t("signup-confirmPassword")}
        ref={this.confirmPassword}
        nextInput={this.phone}
        secure
        showSecureEye
        leftItems={
          <AppIcon
            type="material"
            name="lock-outline"
            size={12}
            color="#6a6a6a"
          />
        }
        initialValue={values.confirmPassword}
        onBlur={handleBlur("confirmPassword")}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        isTouched={touched.confirmPassword}
      />
    );
  };

  renderFromBody = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => (
    <React.Fragment>
      <AppView marginHorizontal={8} stretch>
        {this.renderPasswordInput(
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        )}
        {this.renderConfirmPasswordInput(
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        )}
      </AppView>
      <AppView
        stretch
        stretchChildren
        marginHorizontal={7}
        style={{ position: "absolute", bottom: 30, left: 0, right: 0 }}
      >
        <SafeAreaView>
          <AppButton
            title={I18n.t("skip")}
            stretch
            processing={isSubmitting}
            onPress={handleSubmit}
            noBorder
          />
        </SafeAreaView>
      </AppView>
    </React.Fragment>
  );

  renderForm = () => (
    <AppView stretch flex marginTop={15}>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchemaPasswords}
        onSubmit={(values, { setSubmitting }) =>
          this.onSubmit(values, { setSubmitting })
        }
      >
        {this.renderFromBody}
      </Formik>
    </AppView>
  );

  render() {
    console.log("====================================");
    console.log(this.props);
    console.log("====================================");
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("setting-change-password")} />
        <AppScrollView stretch centerX flexGrow>
          {this.renderForm()}
        </AppScrollView>

        <InfoModal
          isVisible={this.state.isInfoModalVisible}
          message={I18n.t("password-changed-success")}
          secondMessage={I18n.t("congratulation")}
          onConfirm={() => {
            this.setState({
              isInfoModalVisible: false,
            });
            let values = {
              emailOrPhone: this.props.data,
              password: this.state.password,
            };
            AppNavigation.setStackRoot("signIn");
            // this.props.currentUser
            //   ? this.props.logout()
            //   : this.props.signIn(values, true);
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

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: bindActionCreators(signIn, dispatch),
  logout: bindActionCreators(logout, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
