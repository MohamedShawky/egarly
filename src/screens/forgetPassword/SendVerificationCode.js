import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { AppView, AppText } from '../../common';
import { AppHeader, AppErrorModal, InfoModal } from '../../components';
import OtpInput from '../../components/otpInput/OtpInput';

class Otp extends Component {
  state = {
    isVisible: false,
    errorText: '',
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
        <AppHeader title={I18n.t('account-confirmation-title')} />
        <AppView stretch centerX>
          <AppText marginTop={10} color="#777777">
            {I18n.t('sms-message-otp')}
          </AppText>
          <AppText>{this.props.emailOrPhone}</AppText>

          <AppText marginTop={10} marginBottom={5} color="#777777">
            {I18n.t('enter-verfication-code')}
          </AppText>
        </AppView>
        <OtpInput
          phone={this.props.emailOrPhone}
          forget
          onChangeState={this.onChangeState}
          onChangeInfoModal={this.onChangeInfoModal}
        />
        <AppErrorModal
          visible={this.state.isVisible}
          fromSignIn
          changeState={v => {
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
          message={I18n.t('otpScreen-descriptions')}
          onConfirm={() => {
            this.setState({
              isInfoModalVisible: false,
            });
          }}
          changeState={v => {
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
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = props => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Otp);
