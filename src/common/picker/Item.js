import React from "react";
import AppNavigation from "../Navigation.js";
import RadioButton from "../RadioButton";
import { getTheme } from "../Theme";

export default props => {
  const { item,index ,keyOfValue, keyOfLabel, selected, onSelect, ...rest } = {
    ...getTheme().Picker.item,
    ...props,
  };
  return (
    <RadioButton
      {...rest}
      selected={selected}
      label={item[keyOfLabel]}
      onPress={() => {
        AppNavigation.pop();
        onSelect(item[keyOfValue],index);
      }}
    />
  );
};
