import React from "react";
import I18n from "react-native-i18n";
import { AppView, AppText, AppIcon, AppNavigation } from "../../common";

export default () => (
  <AppView
    stretch
    flex
    row
    backgroundColor="inputBgColor"
    marginBottom={8}
    centerX
    height={6.5}
    paddingHorizontal={5}
    marginHorizontal={10}
    borderRadius={5}
    bw={0.5}
    borderColor="lightgrey"
    onPress={() => AppNavigation.push("search")}
  >
    <AppIcon type="custom" name="search" color="#A0A0A0" size={7.5} flip />
    <AppText color="lightgrey" marginHorizontal={5} size={6}>
      {I18n.t("service-search")}
    </AppText>
  </AppView>
);
