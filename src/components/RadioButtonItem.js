import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppText, AppRadioButton } from '../common';
import colors from '../common/defaults/colors';
import { RADIO_BUTTON_DISPLAY_NAME } from '../common/utils/Constants';

const RadioButtonItem = props => {
  const { calories, price, ...rest } = props;

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
        <AppRadioButton {...rest} labelBold size={6} />
        {calories && (
          <AppView
            row
            marginHorizontal={5}
            paddingHorizontal={5}
            borderLeftWidth={1}
            borderColor="#C3CDD2"
          >
            <AppText bold size={7} color="#858F96">
              {calories}
            </AppText>
            <AppText color="#858F96" size={5} marginHorizontal={3}>
              {I18n.t('calories')}
            </AppText>
          </AppView>
        )}
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

RadioButtonItem.displayName = RADIO_BUTTON_DISPLAY_NAME;
export default RadioButtonItem;
