import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';

import { DrawerLayout } from 'react-native-gesture-handler';
import { AppView, AppButton, AppImage, AppScrollView } from '../../common';

import {
  SocialButtonsSection,
  AppHeader,
  FormInput,
  AppErrorModal,
  UpdateFormInput,
} from '../../components';

import { signUp, resetLoginError } from '../../actions/AuthActions';
import MenuContent from '../../components/MenuContent';
import { responsiveWidth } from '../../common/utils/responsiveDimensions';

class UpdateProfile extends Component {
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

  render() {
    const { currentUser } = this.props;
    if (!currentUser) return null;
    return (
      <>
        <AppView stretch flex backgroundColor="#fff">
          <AppHeader title={I18n.t('account-data')} backgroundColor="white" />
          <AppScrollView keyboardShouldPersistTaps="handled" flex stretch>
            <UpdateFormInput updateProfile data={currentUser.user} />
          </AppScrollView>
        </AppView>
        <AppErrorModal
          visible={this.state.showInvalidUserModal}
          fromSignIn
          changeState={v => {
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
      </>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  error: state.auth.error,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUp, dispatch),
  onResetLoginError: bindActionCreators(resetLoginError, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateProfile);
