import React from 'react';
import View from '../View';
import Text from '../Text';
import AppNavigation from '../Navigation.js';
import { getTheme } from '../Theme';
import InputError from '../micro/InputError';

export default props => {
  const {
    rightItem,
    leftItem,
    label,
    renderItem,
    data,
    title,
    placeholder,
    textStyle,
    placeholderStyle,
    labelStyle,
    searchPlaceholder,
    selectedValue,
    onValueChange,
    keyOfLabel,
    keyOfValue,
    hideSearch,
    NoResult,
    Footer,
    noValidation,
    errorStyle,
    contentStyle,
    error,
    ListHeader,
    errorContentStyle,
    disabled,
    ...rest
  } = { ...getTheme().Picker, hideSearch: false, ...props };

  const renderCenterItem = () => {
    let value = '';
    if (selectedValue && data && data.length) {
      const item = data.find(Item => Item[keyOfValue] == selectedValue);
      if (item) value = item[keyOfLabel];
    }

    return selectedValue ? (
      <View {...contentStyle}>
        {!!label && (
          <Text numberOfLines={1} {...labelStyle}>
            {label}
          </Text>
        )}
        <Text numberOfLines={1} {...textStyle}>
          {value}
        </Text>
      </View>
    ) : (
      <View {...contentStyle}>
        {!!label && (
          <Text numberOfLines={1} {...labelStyle}>
            {label}
          </Text>
        )}
        {!!placeholder && (
          <Text numberOfLines={1} {...placeholderStyle}>
            {placeholder}
          </Text>
        )}
      </View>
    );
  };
  onClick = () => {
    AppNavigation.showModal({
      name: 'picker',
      passProps: {
        data,
        title,
        selectedValue,
        onSelect: onValueChange,
        keyOfLabel,
        keyOfValue,
        renderItem,
        hideSearch,
        searchPlaceholder,
        NoResult,
        ListHeader,
        Footer,
      },
    });
  };

  return (
    <>
      <View
        onPress={disabled ? null : onClick}
        row
        stretch
        stretchChildren
        {...rest}
      >
        {rightItem}
        {renderCenterItem()}
        {leftItem}
      </View>
      {!noValidation && (
        <View {...errorContentStyle}>
          <InputError error={error} {...errorStyle} />
        </View>
      )}
    </>
  );
};
