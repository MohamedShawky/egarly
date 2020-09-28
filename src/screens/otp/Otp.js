import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { AppView, AppText } from "../../common";
import {
  OtpInput,
  AppHeader,
  AppErrorModal,
  InfoModal,
} from "../../components";

class OtpScreen extends Component {
  state = {
    isVisible: false,
    errorText: "",
    isInfoModalVisible: false,
  };

  onChangeState = (isVisible, errorText) => {
    this.setState({
      isVisible,
      errorText,
    });
  };

  onChangeInfoModal = (isInfoModalVisible, text) => {
    this.setState({
      isInfoModalVisible,
      text,
    });
  };

  render() {
    return (
      <AppView flex backgroundColor="white">
        <AppHeader flat />
        <OtpInput
          otp={{ timeState: 1 }}
          leftItems={[
            <AppView stretch paddingHorizontal={7} height={20} centerY>
              <AppText>{I18n.t("forget-password-hint")}</AppText>
              <AppText size={9}>{I18n.t("code")}</AppText>

              <AppText>
                {I18n.t("to-email")} {this.props.email}
              </AppText>
            </AppView>,
          ]}
          ref={this.otpInput}
          phone="01212002733"
          onChangeState={this.onChangeState}
          onChangeInfoModal={this.onChangeInfoModal}
        />
        <AppErrorModal
          visible={this.state.isVisible}
          fromSignIn
          changeState={(v) => {
            this.setState({
              isVisible: v,
            });
          }}
          errorMessage={[this.state.errorText]}
          onConfirm={() => {
            this.setState({
              isVisible: false,
            });
          }}
        />
        <InfoModal
          isVisible={this.state.isInfoModalVisible}
          message={I18n.t("otpScreen-descriptions")}
          // secondMessage={this.state.text}
          onConfirm={() => {
            this.setState({
              isInfoModalVisible: false,
            });
          }}
          changeState={(v) => {
            this.setState({
              isInfoModalVisible: v,
            });
          }}
          marginHorizontal={10}
          confirmInfo
        />
      </AppView>
    );
  }
}
const mapStateToProps = (state) => ({
  // currentUser: state.auth.currentUser
});

const mapDispatchToProps = (props) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpScreen);
