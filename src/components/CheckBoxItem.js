import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppText, CheckBox } from '../common';
import colors from '../common/defaults/colors';
import { CHECK_BOX_DISPLAY_NAME } from '../common/utils/Constants';

const CheckBoxItem = props => {
  const { price, ...rest } = props;
  return (
    <AppView
      paddingHorizontal={5}
      row
      stretch
      borderBottomWidth={0.5}
      borderColor={colors.grey}
      paddingVertical={3}
      spaceBetween
    >
      <AppView row>
        <CheckBox {...rest} labelBold size={6.5} />
      </AppView>
      {price && (
        <AppView row>
          <AppText bold color="black">
            {price}
          </AppText>
          <AppText bold color="black" size={4.5} marginHorizontal={2}>
            {I18n.t('currency')}
          </AppText>
        </AppView>
      )}
    </AppView>
  );
};
CheckBoxItem.displayName = CHECK_BOX_DISPLAY_NAME;
export default CheckBoxItem;
