import React from "react";
import View from "../View";
import Text from "../Text";
import I18n from "react-native-i18n";

export default props => (
  <View stretch center flex {...props}>
    <Text bold>{I18n.t("ui-noResultsFound")}</Text>
  </View>
);
