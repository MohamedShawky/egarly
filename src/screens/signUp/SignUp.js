import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { bindActionCreators } from "redux";

import { DrawerLayout } from "react-native-gesture-handler";
import {
  AppView,
  AppButton,
  AppImage,
  AppScrollView,
  AppText,
} from "../../common";
import styles from "./styles";
import index from "../../assets/imgs/index.png";

import {
  SocialButtonsSection,
  AppHeader,
  FormInput,
  LoadingOverlay,
} from "../../components";

import { signUp, resetLoginError } from "../../actions/AuthActions";
import MenuContent from "../../components/MenuContent";
import { responsiveWidth } from "../../common/utils/responsiveDimensions";
// import FormInput from './FormInput';
import AppErrorModal from "../../components/AppErrorModal/AppErrorModal";

class SignUp extends Component {
  state = {
    inVisible: false,
    showInvalidUserModal: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        showInvalidUserModal: true,
      });
    }
  }

  renderLogo = () => (
    <AppButton
      style={styles.logo}
      backgroundColor="white"
      onPress={() => {
        this.drawer.openDrawer();
      }}
      center
      borderWidth={1}
      borderColor="#ECECEC"
    >
      <AppImage source={index} width={10} height={5} resizeMode="contain" />
    </AppButton>
  );

  render() {
    const navigationView = (
      <MenuContent
        onClose={() => {
          this.drawer.closeDrawer();
        }}
        inVisible={this.props.loadingOverlay}
        signUp
      />
    );

    return (
      <AppView stretch flex backgroundColor="white">
        <AppHeader title={I18n.t("sign-up-title")} backgroundColor="white" />
        <AppScrollView keyboardShouldPersistTaps="handled" flex stretch>
          <AppView stretch marginVertical={10} paddingHorizontal={10}>
            <AppText>{I18n.t("sign-up-wellcom")}</AppText>
            <AppText bold size={8}>
              {I18n.t("sign-up")}
            </AppText>
          </AppView>
          <FormInput />
        </AppScrollView>
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
  rtl: state.lang.rtl,
  error: state.auth.error,
  loadingOverlay: state.loadingOverlay.socialSignin,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: bindActionCreators(signUp, dispatch),
  onResetLoginError: bindActionCreators(resetLoginError, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
