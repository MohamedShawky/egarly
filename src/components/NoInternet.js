import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppText, AppImage } from '../common';
import noInternet from '../assets/imgs/noInternet.png';
import colors from '../common/defaults/colors';

class NoInternet extends Component {
  render() {
    return (
      <AppView flex center stretch >
        <AppImage
          source={noInternet}
          width={100}
          height={40}
          resizeMode="contain"
        />
        <AppView center>
          <AppText marginVertical={8}>{I18n.t('noInternet-message')}</AppText>
          <AppText size={5.5} color={colors.darkgrey}>
            {I18n.t('noInternet-check-connection')}
          </AppText>
        </AppView>
      </AppView>
    );
  }
}

export default NoInternet;
