import React, { Component } from 'react';
import { Platform, SafeAreaView } from 'react-native';

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
} from '../../common';
import { APPBAR_HEIGHT } from '../../common/utils/responsiveDimensions';


export default class Header extends Component {
  goBack = () => {
    if (this.props.backHandler) {
      this.props.backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  renderLeft = () => {
    const { showClose } = this.props;

    if (showClose)
      return (
        <AppView flex>
          <AppButton
            flex
            paddingVertical={0.1}
            paddingHorizontal={6}
            leftIcon={
              <AppIcon
                reverse
                name="keyboard-backspace"
                type="material-community"
                size={13}
                flip
                color="#fff"
              />
            }
            backgroundColor="transparent"
            color="foreground"
            onPress={this.goBack}
          />
        </AppView>
      );
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', alignSelf: 'stretch' }}>
        <AppView
          stretch
          backgroundColor="primary"
          style={{
            height: APPBAR_HEIGHT,
          }}
          row
          spaceBetween
          borderBottomColor="inputBorderColor"
          borderBottomWidth={0.5}
        >
          <AppView row>
            {this.renderLeft()}
            <AppView flex={2} centerY centerX>
              <AppText size={5.5} bold color="#fff" numberOfLines={1}>
                {this.props.title}
              </AppText>
            </AppView>
            <AppView stretch flex />
          </AppView>
        </AppView>
      </SafeAreaView>
    );
  }
}
