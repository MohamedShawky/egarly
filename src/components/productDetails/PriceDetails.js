import React from "react";
import I18n from "react-native-i18n";
import { AppView, AppText, AppPrice } from "../../common";
import cardShadowStyle from "../../common/utils/cardShadowStyle";

export default (props) => (
  <AppView
    stretch
    backgroundColor="primary"
    height={8}
    row
    spaceAround
    centerY
    {...props}
    elevation={1.2}
    style={cardShadowStyle}
  >
    {props.prices.map((i, index) => (
      <Price {...i} index={index} />
    ))}
  </AppView>
);

const Price = (props) => {

  return (
    <AppView
      flex
      center
      borderLeftWidth={props.index === 0 ? undefined : 1}
      borderLeftColor={props.index === 0 ? undefined : "white"}
    >
      <AppText>{props.pricehint}</AppText>
      <AppPrice
        amount={props.id ? props.id : '-'}
        unit="real"
        unitStyle={{ color: "white" }}
        amountStyle={{ color: "white" }}
      />
    </AppView>
  );
};
