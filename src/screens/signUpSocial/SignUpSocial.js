import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import {
  AppView,
  AppButton,
  AppScrollView,
  AppInput,
  AppIcon,
  AppText,
  AppNavigation,
  AppFormLocation,
  AppSpinner
} from "../../common";
import { AppHeader } from "../../components";
import { buildValidationSchemaEGY } from "./validation";
import * as Errors from "../../utils/Errors";
import { onSignUpSocial, resetLoginError } from "../../actions/AuthActions";
import AppErrorModal from "../../components/AppErrorModal/AppErrorModal";
import Picker from "../../common/picker/Picker";

const countryId = 1;
const cities = null;
class signUpSocial extends Component {
  constructor(props) {
    super(props);

    this.nameArRef = React.createRef();
    this.nameEnRef = React.createRef();
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
    this.phoneRef = React.createRef();
    this.fromikRef = React.createRef();
  }

  state = {
    dialCode: "+20",
    showInvalidUserModal: false,
    isLoading: true,
    cities: ""
  };

  async componentDidMount() {
    await this.getCities();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        showInvalidUserModal: true
      });
    }
  }

  onSubmit = async (values, { setSubmitting }) => {
    this.props.onSignUpSocial(values, setSubmitting, this.props.accessToken);
  };

  checkKeyExistance = key => {
    if (this.props.data && this.props.data.fieldsNeeded) {
      for (let i = 0; i < this.props.data.fieldsNeeded.length; i++) {
        if (key === this.props.data.fieldsNeeded[i]) return true;
      }
    }
    return false;
  };

  renderNameArInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  }) => (
    <AppInput
      name="nameAr"
      ref={this.nameArRef}
      nextInput={this.nameEnRef}
      label={I18n.t("signup-nameAr")}
      leftItems={<AppIcon type="custom" name="profile" size={8} />}
      initialValue={values.nameAr}
      onBlur={handleBlur("nameAr")}
      onChange={handleChange("nameAr")}
      error={errors.nameAr}
      isTouched={touched.nameAr}
    />
  );

  renderNameEnInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  }) => (
    <AppInput
      name="nameEn"
      leftItems={<AppIcon type="custom" name="profile" size={8} />}
      initialValue={values.nameEn}
      onBlur={handleBlur("nameEn")}
      onChange={handleChange("nameEn")}
      error={errors.nameEn}
      isTouched={touched.nameEn}
      ref={this.nameEnRef}
      nextInput={this.emailRef}
      label={I18n.t("signup-nameEn")}
    />
  );

  renderEmailInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    status
  }) => (
    <AppInput
      name="email"
      leftItems={<AppIcon type="custom" name="mail" size={8} />}
      initialValue={values.email}
      onBlur={handleBlur("email")}
      onChange={handleChange("email")}
      error={errors.email}
      isTouched={touched.email}
      ref={this.emailRef}
      nextInput={this.passwordRef}
      email
      setError={setFieldError}
      label={I18n.t("signup-email")}
      asyncLoading={status && status.email}
    />
  );

  renderPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  }) => (
    <AppInput
      name="password"
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
      secure
      showSecureEye
      ref={this.passwordRef}
      nextInput={this.confirmPasswordRef}
      label={I18n.t("signup-password")}
    />
  );

  renderConfirmPassInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    setFieldValue
  }) => (
    <AppInput
      name="confirmPassword"
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
      secure
      showSecureEye
      ref={this.confirmPasswordRef}
      nextInput={this.phoneRef}
      label={I18n.t("signup-confirmPassword")}
      setError={setFieldError}
    />
  );

  renderPhoneInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    status
  }) => {
    const {} = this.props;
    return (
      <AppView row spaceBetween>
        <AppView flex={3}>
          <AppInput
            asyncLoading={status && status.phone}
            label={I18n.t("signup-phone")}
            ref={this.phoneRef}
            leftItems={
              <AppIcon
                type="material-community"
                name="phone-outline"
                size={12}
                color="#6A6A6A"
              />
            }
            initialValue={values.phone}
            onBlur={handleBlur("phone")}
            onChange={handleChange("phone")}
            error={errors.phone}
            isTouched={touched.phone}
            phone
            setError={setFieldError}
            name="phone"
          />
        </AppView>
        <AppView
          height={8}
          style={{ alignSelf: "flex-start" }}
          flex
          center
          borderColor="#6A6A6A"
          backgroundColor="white"
          borderWidth={1}
          marginLeft={5}
          borderRadius={5}
        >
          <AppText color="#8A8A8A" size={5.5}>
            {this.state.dialCode || I18n.t("sign-up-dial-code")}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  renderLocation = ({
    setFieldValue,
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  }) => (
    <AppFormLocation
      initialValue={values.location}
      error={errors.location}
      noValidation={!touched.location}
      onChange={handleChange("location")}
      placeholder={I18n.t("signup-location")}
      leftItems={[<AppIcon name="adress" type="custom" size={8} />]}
      backgroundColor="#E6E8EA"
      bc="#E6E8EA"
    />
  );

  renderSubmitButton = ({ errors, isSubmitting, handleSubmit }) => (
    // console.log("errors",errors);
    <AppButton
      title={I18n.t("sing-up-next")}
      stretch
      height={7}
      onPress={handleSubmit}
      processing={!Object.getOwnPropertyNames(errors).length && isSubmitting}
    />
  );

  renderTermsConditions = () => (
    <AppView height={3} paddingHorizontal={15} center row marginVertical={10}>
      <AppText color="grey" size={5}>
        {I18n.t("sign-up-when-continue-you-accept-on")}
      </AppText>
      <AppView
        onPress={() => {
          AppNavigation.showModal("termsAndCondition");
        }}
        transparent
        centerY
        paddingHorizontal={1}
      >
        <AppText color="primary" size={5}>
          {I18n.t("sign-up-terms-coditions")}
        </AppText>
      </AppView>
    </AppView>
  );

  createValidationSchema = () => {
    const { fieldsNeeded } = this.props.data;
    return buildValidationSchemaEGY(fieldsNeeded, this.fromikRef);
  };

  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        nameAr: "",
        nameEn: "",
        email: "",
        password: "",
        confirmPassword: "",
        city: "",
        phone: "",
        location: ""
      }}
      // validationSchema={buildValidationSchemaEGY(null)}
      validationSchema={this.createValidationSchema()}
      onSubmit={(values, { setSubmitting }) =>
        this.onSubmit(values, { setSubmitting })
      }
    >
      {this.renderFormBody}
    </Formik>
  );

  renderFormBody = props => (
    <AppScrollView flex flexGrow centerX stretch>
      <AppView
        flex
        stretch
        paddingTop={10}
        marginBottom={6}
        paddingHorizontal={10}
      >
        {this.checkKeyExistance("NAME") ? this.renderNameArInput(props) : null}

        {this.checkKeyExistance("NAME") ? this.renderNameEnInput(props) : null}

        {this.checkKeyExistance("EMAIL") ? this.renderEmailInput(props) : null}

        {this.renderPasswordInput(props)}

        {this.renderConfirmPassInput(props)}

        {this.checkKeyExistance("CITY") ? this.renderCity(props) : null}

        {this.checkKeyExistance("PHONE") ? this.renderPhoneInput(props) : null}

        {this.checkKeyExistance("LOCATION") ? this.renderLocation(props) : null}

        {this.renderTermsConditions()}

        {this.renderSubmitButton(props)}
      </AppView>
    </AppScrollView>
  );

  render() {
    return (
      <AppView flex stretch backgroundColor="white">
        <AppHeader title={I18n.t("social-signUp-title")} />
        {this.renderForm()}
        <AppErrorModal
          visible={this.state.showInvalidUserModal}
          fromSignIn
          changeState={v => {
            this.props.onResetLoginError();
            this.setState({
              showInvalidUserModal: v
            });
          }}
          errorMessage={[this.props.error]}
          onConfirm={() => {
            this.props.onResetLoginError();
            this.setState({
              showInvalidUserModal: false
            });
          }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  onSignUpSocial: bindActionCreators(onSignUpSocial, dispatch),
  onResetLoginError: bindActionCreators(resetLoginError, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signUpSocial);
