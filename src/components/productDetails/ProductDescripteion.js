import React from "react";
import I18n from "react-native-i18n";
import MapView from "react-native-maps";
import { AppView, AppText, AppPrice } from "../../common";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import { UserInfo } from ".";

import MapLocation from "./MapLocation";
export default (props) => {
  console.log("props ==>> offer", props);

  return (
    <AppView
      stretch
      centerY
      {...props}
      // elevation={1.5}
      // style={cardShadowStyle}
      // paddingHorizontal={}
      paddingVertical={2}
    >
      <Price {...props} />
      <Descriptions {...props} />

      {props.main_categories.length > 0 && (
        <AppView
          stretch
          spaceBetween
          row
          paddingHorizontal={5}
          // elevation={1.2}
          // style={cardShadowStyle}
          paddingVertical={3}
        >
          <AppText bold size={5}>
            {I18n.t("type-product")}
          </AppText>
          <AppView>
            <AppText>
              {props.main_categories
                .map((i) => {
                  return i.ar_name;
                })
                .join("/")}
            </AppText>
          </AppView>
        </AppView>
      )}
      {props.hasOwnProperty("job_id") &&
        props.job_id !== null &&
        props.job !== null && (
          <AppView
            stretch
            spaceBetween
            row
            paddingHorizontal={5}
            // elevation={1.2}
            // style={cardShadowStyle}
            // paddingVertical={7}
          >
            <AppText bold size={5}>
              {I18n.t("job")}
            </AppText>
            <AppText>{props.job_id && props.job.ar_name}</AppText>
          </AppView>
        )}

      {props.hasOwnProperty("status") && props.status !== null && (
        <AppView
          stretch
          spaceBetween
          row
          paddingHorizontal={5}
          // elevation={1.2}
          // style={cardShadowStyle}
          // paddingVertical={7}
        >
          <AppText bold size={5}>
            {I18n.t("product-case")}
          </AppText>
          <AppText>{props.status && props.status_val.ar_name}</AppText>
        </AppView>
      )}

      <AppView
        stretch
        spaceBetween
        row
        paddingHorizontal={5}
        // elevation={1.2}
        // style={cardShadowStyle}
        // paddingVertical={7}
      >
        <AppText bold size={5}>
          {I18n.t("count")}
        </AppText>
        <AppText>
          {I18n.t("number-availabl", { number: props.quantity })}
        </AppText>
      </AppView>
      {props.hasOwnProperty("delivery_types") &&
        props.delivery_types !== "" &&
        props.delivery_types !== null && (
          <AppView
            stretch
            spaceBetween
            paddingHorizontal={5}
            // elevation={1.2}
            // style={cardShadowStyle}
            // paddingVertical={7}
          >
            <AppText bold size={5}>
              {I18n.t("product-trans")}
            </AppText>
            <AppView>
              <AppText>
                {props.delivery_type_values
                  .map((i) => {
                    return i.ar_name;
                  })
                  .join("/")}
              </AppText>
            </AppView>
          </AppView>
        )}
      <ProductLocation {...props} />

      {/* <UserInfo {...props.userInfo} /> */}
    </AppView>
  );
};

const Price = (props) => (
  <AppView center stretch row spaceBetween paddingHorizontal={7}>
    <AppText bold size={6.8}>
      {props.ar_title}
    </AppText>
    <AppPrice
      amount={props.price_per_day}
      unit="real"
      unitStyle={{ color: "green" }}
      amountStyle={{ color: "green" }}
    />
  </AppView>
);

const Descriptions = (props) => (
  <AppView stretch marginBottom={7} paddingHorizontal={5}>
    <AppText size={6} color="#2A2825">
      {I18n.t("detail")}
    </AppText>
    <AppText color="#ABAAA9">{props.ar_description}</AppText>
  </AppView>
);

const ProductLocation = (props) => {
  if (props.latitude === null) return null;

  const currentLocation = {
    latitude: parseFloat(props.latitude),
    longitude: parseFloat(props.longitude),
  };
  return (
    <AppView
      stretch
      height={30}
      // marginBottom={10}
      marginTop={5}
      paddingHorizontal={5}
    >
      <AppText bold size={5}>
        {I18n.t("location-de")}
      </AppText>

      <MapLocation currentLocation={currentLocation} />
    </AppView>
  );
};
