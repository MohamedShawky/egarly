import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { moderateScale } from '../../common/utils/responsiveDimensions';
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppModal,
  AppImage,
  getColors,
} from '../../common';
import styles from './styles';

class AppErrorModal extends Component {
  renderInvalidModal = () => {
    const {
      errorMessage,
      hintMessage,
      visible,
      fromSignIn,
      ...rest
    } = this.props;

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        {...rest}
        isVisible={visible}
      >
        <AppView
          paddingHorizontal={10}
          borderRadius={2}
          stretch
          backgroundColor="white"
          style={styles.modalContentContainer}
          width={80}
        >
          <AppView stretch paddingTop={8}>
            <AppText>{hintMessage}</AppText>
          </AppView>
          <AppView stretch paddingVertical={5}>
            <AppText
              lineHeight={10.5}
              size={6}
              center
              marginTop={3}
              style={styles.errorModalText}
            >
              {errorMessage}
            </AppText>
          </AppView>

          <AppView stretch marginBottom={5} paddingTop={5} left>
            <AppButton
              touchableOpacity
              title={fromSignIn ? I18n.t('skip') : I18n.t('try-it-again')}
              stretch
              height={7}
              onPress={() => {
                if (this.props.onConfirm) {
                  this.props.onConfirm();
                } else {
                  this.props.changeState(false);
                }
              }}
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  };

  render() {
    return <React.Fragment>{this.renderInvalidModal()}</React.Fragment>;
  }
}

export default AppErrorModal;
