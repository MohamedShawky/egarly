import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../actions/AuthActions";
import * as errors from "../utils/Errors";
import {
  AppView,
  AppText,
  AppModal,
  AppButton,
  showError,
  AppNavigation,
} from "../common";

class LogoutModal extends Component {
  render() {
    const { isVisible, ...rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        {...rest}
      >
        <AppView
          width={80}
          backgroundColor="white"
          paddingVertical={4}
          borderRadius={5}
        >
          <AppView marginHorizontal={6} paddingTop={5} marginBottom={7}>
            <AppText center bold>
              {I18n.t("log-out")}
            </AppText>
            <AppText center lineHeight={8.5} color="#5F5F5F" marginTop={5}>
              {I18n.t("log-out-text")}
            </AppText>
          </AppView>

          <AppView
            row
            marginTop={10}
            rightSelf={!this.props.rtl}
            leftSelf={this.props.rtl}
          >
            <AppButton
              title={I18n.t("log-out-cancel")}
              touchableOpacity
              onPress={() => this.props.changeState(false)}
              backgroundColor="#fff"
              borderColor="primary"
              borderWidth={1}
              height={6}
              width={23}
              color="primary"
              marginHorizontal={3}
            />
            <AppButton
              title={I18n.t("log-out-confrim")}
              touchableOpacity
              onPress={() => {
                try {
                  this.props.changeState(false);

                  AppNavigation.setStackRoot("signIn");
                  this.props.logout();
                } catch (error) {
                  console.log("error ==>", error);

                  if (error === errors.CONNECTION_ERROR) {
                    showError(error);
                  } else {
                    showError(error.message);
                  }
                }
              }}
              height={6}
              width={23}
              marginHorizontal={3}
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  }
}
const mapStateToProp = (state) => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
});
const mapDispatchToProps = (dispatch) => ({
  logout: bindActionCreators(logout, dispatch),
});

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(LogoutModal);
