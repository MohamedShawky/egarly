import React from "react";
import I18n from "react-native-i18n";
import { AppView, AppText, AppPrice } from "../../common";
import cardShadowStyle from "../../common/utils/cardShadowStyle";

export default (props) => (
  <AppView stretch {...props} >
    <AppText bold size={6} >{I18n.t("product-price")}</AppText>
    <AppText  size={6}>{I18n.t("priduct-price-hint")}</AppText>

    <AppView stretch center height={7} backgroundColor="#FF5152" marginTop={5} borderRadius={7}>
      <AppPrice
        color="white"
        amount={props.replacement_cost}
        amountStyle={{ color: "white" }}
        unit={"real"}
        unitStyle={{ color: "white" }}
      />
    </AppView>
  </AppView>
);
