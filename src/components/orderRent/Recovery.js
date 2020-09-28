import React, { useState } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppIcon,
  AppNavigation,
  AppImage,
  AppPrice,
  AppButton,
  AppStarRating,
  AppInput
} from "../../common";
import { ImagePicker } from "..";
import product from "../../assets/imgs/product.png";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import { Price } from "../addProduct";
import avatar from "../../assets/imgs/avatar.png";

export default props => (
  <AppView stretch {...props.rest}>
    <PaymentInfo {...props} />
    <Detail label={I18n.t("payment-detail")} labelHint={I18n.t("agree-pay")} />
    <Detail
      label={I18n.t("delivey-detail")}
      labelHint={I18n.t("agree-deliver")}
    />
    <Detail
      label={I18n.t("recovery-detail")}
      labelHint={I18n.t("agree-recovery")}
    />
  </AppView>
);

const PaymentInfo = props => (
  <AppView stretch backgroundColor="white">
    <AppView
      marginTop={5}
      style={cardShadowStyle}
      elevation={1.5}
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="#F3F3F3"
      paddingHorizontal={2}
      stretch
    >
      <AppText bold>{I18n.t("conclusion")}</AppText>
      <PaymentRow label={I18n.t("days")} value="يوم واحد" />
      <PaymentRow label={I18n.t("product-number")} value="عدد واحد" />
      <PaymentRow
        label={I18n.t("product-price-rent")}
        value="30 ريال لليوم الواحد"
      />
      <PaymentRow
        label={I18n.t("product-price")}
        value="2000 ريال عند التلف "
      />
      <PaymentRow
        label={I18n.t("total-rent-price")}
        valueStyle={{ color: "green" }}
        value="30 ريال"
      />
      <AppView
        height={0.2}
        stretch
        backgroundColor="#E2E1DE"
        marginHorizontal={3}
        marginVertical={8}
      />
      <PaymentRow
        label={I18n.t("payment")}
        value="VISA"
        valueStyle={{ color: "red" }}
      />
    </AppView>
    <AppText bold marginTop={5}>
      {I18n.t("agree")}
    </AppText>
    <WaitToPay {...props} />
  </AppView>
);

const PaymentRow = props => (
  <AppView stretch row spaceBetween>
    <AppText color="labelText">{props.label}</AppText>
    <AppText bold {...props.valueStyle}>
      {props.value}
    </AppText>
  </AppView>
);

const WaitToPay = props =>{
  console.log("WaitToPay", props);
  
  return (
  <AppView
    marginTop={5}
    style={cardShadowStyle}
    elevation={1.5}
    paddingVertical={5}
    borderRadius={10}
    backgroundColor="white"
    paddingHorizontal={2}
    stretch
  >
    <AppButton
      title={"الاسترجاع"}
      stretch
      disabled={props.disabled}
      onPress={() => {
        // AppNavigation.push("deliverRentOrder");
        props.onRequestToDelever();
      }}
      processing={props.sppiner}
    />

    <AppText bold marginTop={5}>
      {I18n.t("check")}
    </AppText>

    <AppView
      backgroundColor="#F3F3F3"
      borderRadius={7}
      paddingVertical={5}
      centerY
      stretch
      borderWidth={0.5}
      borderColor="labelText"
      marginTop={5}
      paddingHorizontal={3}
    >
      <AppText>{I18n.t("add-notes")}</AppText>
    </AppView>
  </AppView>
);}

const Detail = props => (
  <AppView
    marginTop={5}
    style={cardShadowStyle}
    elevation={1.5}
    paddingVertical={5}
    borderRadius={10}
    backgroundColor="white"
    paddingHorizontal={2}
    stretch
  >
    <AppText bold marginVertical={3}>
      {props.label}
    </AppText>
    <AppView
      backgroundColor="#F3F3F3"
      borderRadius={10}
      paddingVertical={3}
      centerY
      stretch
      paddingHorizontal={3}
    >
      <AppView row stretch>
        <AppView circleRadius={10} center backgroundColor="#5FE45A">
          <AppIcon name="checkcircle" type="ant" color="white" size={10} />
        </AppView>
        <AppText marginHorizontal={3}>{props.labelHint}</AppText>
      </AppView>
    </AppView>
  </AppView>
);
