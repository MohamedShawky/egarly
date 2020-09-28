import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import { bindActionCreators } from "redux";
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppInput,
  AppNavigation,
  AppFormLocation,
  showError,
  AppSpinner
} from "../../common";
import { AvatarPicker } from "..";
import { signUp } from "../../actions/AuthActions";
import { buildValidationSchemaEGY } from "./validation";
import * as Errors from "../../utils/Errors";
import Picker from "../../common/picker/Picker";

const countryId = 1;
const cities = null;
class FormInput extends Component {
  constructor(props) {
    super(props);

    this.name = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
    this.fromikRef = React.createRef();
  }

  state = {
    dialCode: "+20",
    termsConditionsCheck: false,
    cities: "",
    isLoading: true
  };

  async componentDidMount() {
    // await this.getCities();
  }

  onSubmit = (values, { setSubmitting, isSubmitting }) => {
    console.log("values -->>", values);

    this.props.signUp(values, setSubmitting);
  };

  renderArabicInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  }) => {
    const {} = this.props;
    return (
      <AppInput
        maxLength={30}
        hintColor="#262628"
        hint={I18n.t("signup-nameAr")}
        label={I18n.t("signup-nameAr")}
        ref={this.name}
        nextInput={this.email}
        leftItems={
          <AppIcon
            type="material-community"
            name="account-circle-outline"
            size={12}
            color="#6a6a6a"
          />
        }
        initialValue={values.name}
        onBlur={handleBlur("name")}
        onChange={handleChange("name")}
        error={errors.name}
        isTouched={touched.name}
      />
    );
  };

  renderEmailInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    status
  }) => (
    <AppInput
      asyncLoading={status && status.email}
      name="email"
      leftItems={
        <AppIcon
          type="material-community"
          name="email-outline"
          size={12}
          color="#6A6A6A"
        />
      }
      hintColor="#262628"
      hint={I18n.t("signup-email")}
      initialValue={values.email}
      onBlur={handleBlur("email")}
      onChange={handleChange("email")}
      error={errors.email}
      isTouched={touched.email}
      ref={this.emailRef}
      nextInput={this.password}
      email
      label={I18n.t("signup-email")}
    />
  );

  renderPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  }) => {
    const {} = this.props;
    return (
      <AppInput
        hint={I18n.t("ui-password")}
        hintColor="#262628"
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
      />
    );
  };

  renderConfirmPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  }) => {
    const {} = this.props;
    return (
      <AppInput
        hint={I18n.t("signup-confirmPassword")}
        hintColor="#262628"
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
        initialValue={values.confirmation_password}
        onBlur={handleBlur("confirmation_password")}
        onChange={handleChange("confirmation_password")}
        error={errors.confirmation_password}
        isTouched={touched.confirmation_password}
      />
    );
  };

  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmation_password: ""
      }}
      validationSchema={buildValidationSchemaEGY(this.fromikRef)}
      onSubmit={(values, { setSubmitting, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, isSubmitting })
      }
    >
      {this.renderFromBody}
    </Formik>
  );

  renderFromBody = props => {
    const {
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    } = props;
    // console.log("isSubmitting ", isSubmitting);

    return (
      <AppView centerX stretch>
        <AppView marginHorizontal={10} stretch>
          {this.renderArabicInput(props)}
          {this.renderEmailInput(props)}
          {this.renderPasswordInput(props)}
          {this.renderConfirmPasswordInput(props)}
        </AppView>
        <AppButton
          processing={
            !Object.getOwnPropertyNames(errors).length && isSubmitting
          }
          onPress={handleSubmit}
          height={7}
          stretch
          title={I18n.t("next")}
          marginHorizontal={10}
          marginTop={20}
          backgroundColor="primary"
        />
      </AppView>
    );
  };

  render() {
    return <>{this.renderForm()}</>;
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  connected: state.network.isConnected
});

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUp, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormInput);
