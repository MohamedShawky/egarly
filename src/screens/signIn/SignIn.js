import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DrawerLayout } from "react-native-gesture-handler";
import { Formik } from "formik";
import { View } from "react-native";
import {
  AppView,
  AppText,
  AppInput,
  AppImage,
  AppScrollView,
  AppIcon,
  AppButton,
  AppNavigation,
  AppInputError,
} from "../../common";
import sideHomeImg from "../../assets/imgs/sideHome.png";
import index from "../../assets/imgs/index.png";
import MenuContent from "../../components/MenuContent";
import styles from "./styles";
import {
  responsiveWidth,
  moderateScale,
} from "../../common/utils/responsiveDimensions";
import validationSchema from "./validation";
import { LoadingOverlay, SocialButtonsSection } from "../../components";
import AppErrorModal from "../../components/AppErrorModal/AppErrorModal";
import { signIn, resetLoginError } from "../../actions/AuthActions";
import wellcom from "../../assets/imgs/wellcom.png";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.emailOrPhone = React.createRef();
    this.password = React.createRef();
  }

  state = {
    showInvalidUserModal: false,
    inVisible: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        showInvalidUserModal: true,
      });
    }
  }

  renderFrom = () => (
    <Formik
      initialValues={{ emailOrPhone: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) =>
        this.onSubmit(values, { setSubmitting })
      }
    >
      {this.renderFromBody}
    </Formik>
  );

  renderForgetPassword = () => (
    <AppView
      leftSelf={this.props.rtl}
      rightSelf={!this.props.rtl}
      marginVertical={10}
      onPress={() => {
        AppNavigation.push("forgetPassword");
      }}
    >
      <AppText color="white">{I18n.t("ui-forget-password")}</AppText>
    </AppView>
  );

  renderFromBody = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => (
    <AppView stretch centerX marginVertical={5} marginHorizontal={7}>
      <AppInput
        label={I18n.t("ui-email-or-phone")}
        leftItems={
          <AppIcon
            type="material-community"
            name="account-circle-outline"
            size={12}
          />
        }
        initialValue={values.emailOrPhone}
        onBlur={handleBlur("emailOrPhone")}
        onChange={handleChange("emailOrPhone")}
        error={errors.emailOrPhone}
        ref={this.emailOrPhone}
        nextInput={this.password}
        isTouched={touched.emailOrPhone}
        hint={I18n.t("ui-email-or-phone")}
        email
      />
      <AppView stretch marginTop={5}>
        <AppText bold color={this.props.hintColor || "white"} marginBottom={!errors.password ? 5 : undefined}>
          {I18n.t("ui-password")}
        </AppText>
        {errors.password && <AppInputError error={errors.password} size={5}  errorTextMarginHorizontal={1}/>}
      </AppView>

      <AppInput
        label={I18n.t("ui-password")}
        ref={this.password}
        secure
        showSecureEye
        leftItems={<AppIcon type="material" name="lock-outline" size={12} />}
        initialValue={values.password}
        onBlur={handleBlur("password")}
        onChange={handleChange("password")}
        error={errors.password}
        isTouched={touched.password}
        // errorInput
      />
      {this.renderForgetPassword()}
      <AppButton
        title={I18n.t("ui-signIn-button")}
        stretch
        processing={isSubmitting}
        onPress={handleSubmit}
      />
    </AppView>
  );

  onSubmit = async (values, { setSubmitting }) => {
    this.props.onSignIn(values, setSubmitting);
  };

  renderOrDivider = () => (
    <AppView row stretch marginHorizontal={7} center>
      <AppView
        height={0}
        center
        borderWidth={0.5}
        borderColor="#3C3C3C"
        width={30}
      />
      <AppView backgroundColor="transparent" center marginHorizontal={3}>
        <AppText color="#3C3C3C">{I18n.t("ui-or")}</AppText>
      </AppView>
      <AppView
        height={0}
        center
        borderWidth={0.5}
        borderColor="#3C3C3C"
        width={30}
      />
    </AppView>
  );

  renderSocialButtons = () => (
    <SocialButtonsSection
      marginTop={2.5}
      marginBottom={5}
      titleMarginBottom={5}
    />
  );

  render() {
    return (
      <AppView flex stretch backgroundColor="#FFCC00" center>
        {/* <AppScrollView
          center
          stretch
          showsVerticalScrollIndicator={false}
          backgroundColor="white"
          marginHorizontal={10}
        > */}

        <AppView stretch marginHorizontal={7}>
          <AppText size={6} color="white">
            {I18n.t("ui-signIn-wellcom")}
          </AppText>
          <AppText size={8} bold color="white">
            {I18n.t("ui-signIn-title")}
          </AppText>
        </AppView>

        {this.renderFrom()}

        {/* {this.renderOrDivider()}

        {this.renderSocialButtons()} */}
        {/* </AppScrollView> */}
        <AppErrorModal
          visible={this.state.showInvalidUserModal}
          fromSignIn
          changeState={(v) => {
            this.props.onResetLoginError();
            this.setState({
              showInvalidUserModal: v,
            });
          }}
          errorMessage={[this.props.error]}
          onConfirm={() => {
            this.props.onResetLoginError();
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
  error: state.auth.error,
  loadingOverlay: state.loadingOverlay.socialSignin,
  rtl: state.lang.rtl,
});

const mapDispatchToProps = (dispatch) => ({
  onSignIn: bindActionCreators(signIn, dispatch),
  onResetLoginError: bindActionCreators(resetLoginError, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
