import React from "react";
import View from "./View";
import Text from "./Text";
import I18n from "react-native-i18n";
export default ({ amount, unit, amountStyle, unitStyle, ...rest }) => {
  return (
    <View row {...rest}>
      <Text size={6} {...amountStyle}>
        {amount}
      </Text>
      <Text paddingHorizontal={2} {...unitStyle}>
        {I18n.t(unit)}
      </Text>
    </View>
  );
};
