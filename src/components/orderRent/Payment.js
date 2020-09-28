import React, { useState } from "react";
import I18n from "react-native-i18n";
import { AppView, AppText, AppButton, AppIcon } from "../../common";

import cardShadowStyle from "../../common/utils/cardShadowStyle";

import moment from "moment";
import { Agreement } from "./ProductCheck";
import { NumberToRent, NotesRenter } from "./ProductInfo";

export default (props) => (
  <AppView stretch {...props.rest}>
    <PaymentInfo
      {...props.order}
      onRequestToPaid={props.onRequestToPaid}
      userId={props.userId}
      payment={props.payment}
      owner={props.owner}
    />
    {!props.owner ? (
      <NotesRenterOwner {...props} />
    ) : (
      <NotesRenter {...props} />
    )}
  </AppView>
);

export const PaymentInfo = (props) => {
  console.log("props ------>>>>>>", props);

  const {
    from_date,
    to_date,
    quantity,
    rent_price,
    product,
  } = props.products[0];

  const { replacement_cost, price_per_day, user_id } = product;
  const now = moment(from_date, "Do-MM-YYYY"); //todays date
  const end = moment(to_date, "Do-MM-YYYY"); // another date
  console.log("now --->", from_date, to_date);

  const duration = moment.duration(end.diff(now));
  return (
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
        <AppText bold size={6}>
          {I18n.t("conclusion")}
        </AppText>
        <NumberToRent {...props.products[0]} payment />
      </AppView>
      {/* <AppView
        marginTop={5}
        style={cardShadowStyle}
        elevation={1.5}
        paddingVertical={5}
        borderRadius={10}
        backgroundColor="#F3F3F3"
        paddingHorizontal={2}
        stretch
      >
        <AppText bold size={6}>
          {I18n.t("conclusion")}
        </AppText>
        {duration.asDays() > 0 ? (
          <PaymentRow label={I18n.t("days")} value={`${duration.asDays()}`} />
        ) : (
          <PaymentRow label={I18n.t("days")} value="يوم واحد" />
        )}
        <PaymentRow label={I18n.t("product-number")} value={quantity} />
        <PaymentRow
          label={I18n.t("product-price-rent")}
          value={`${price_per_day} ريال لليوم الواحد`}
        />
        <PaymentRow
          label={I18n.t("product-price")}
          value={`${replacement_cost} ريال عند التلف`}
        />
        <PaymentRow
          label={I18n.t("total-rent-price")}
          valueStyle={{ color: "green" }}
          value={`${rent_price} ريال`}
        />
        {props.userId === user_id && (
          <>
            <AppView
              height={0.2}
              stretch
              backgroundColor="#E2E1DE"
              marginHorizontal={3}
              marginVertical={8}
            />
            <AppView stretch row spaceBetween>
              <AppText bold size={6}>
                {I18n.t("payment")}
              </AppText>
              <AppText bold color={props.payment && "red"}>
                {props.payment ? props.payment : "في انتظار تحديد طريقه الدفع"}
              </AppText>
            </AppView>
          </>
        )}
      </AppView> */}

      {/* <AppText bold marginTop={5}>
        {I18n.t("agree")}
      </AppText> */}
      {/* <Agreement {...props}/> */}
      <WaitToPay {...props} deliver />
    </AppView>
  );
};
export const PaymentRow = (props) => (
  <AppView stretch row spaceBetween height={5}>
    <AppText color="labelText">{props.label}</AppText>
    <AppText bold {...props.valueStyle}>
      {props.value}
    </AppText>
  </AppView>
);

export const WaitToPay = (props) => {
  const {
    from_date,
    to_date,
    quantity,
    rent_price,
    product,
  } = props.products[0];

  const { replacement_cost, price_per_day, user_id } = product;

  return (
    <AppView
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="white"
      paddingHorizontal={2}
      stretch
    >
      <AppView stretch row spaceBetween height={8}>
        <AppText bold size={6}>
          {I18n.t("agreement")}
        </AppText>
        <AppIcon name="down" type="ant" size={8} />
      </AppView>
      <AppView
        backgroundColor="#F3F3F3"
        borderRadius={10}
        paddingVertical={5}
        centerY
        stretch
        paddingHorizontal={6}
      >
        <AppView row stretch>
          <AppView circleRadius={8} center backgroundColor="transparent">
            <AppIcon name="checkcircle" type="ant" color="#5FE45A" size={10} />
          </AppView>
          <AppText marginHorizontal={3} size={5.5}>
            {I18n.t("agree")}
          </AppText>
        </AppView>
      </AppView>
      <AppView stretch row spaceBetween height={8}>
        <AppText bold size={6}>
          {I18n.t("check")}
        </AppText>
        <AppIcon name="down" type="ant" size={8} />
      </AppView>
      {/* <AppText bold>{I18n.t("check")}</AppText> */}
      <AppView
        backgroundColor="#F3F3F3"
        borderRadius={10}
        paddingVertical={5}
        centerY
        stretch
        paddingHorizontal={6}
      >
        <AppView row stretch>
          <AppText marginHorizontal={3} size={5.5} color="labelText">
            {I18n.t("check-notes")}
          </AppText>
        </AppView>
      </AppView>
      {props.user_id !== user_id && (
        <>
          <AppView stretch row spaceBetween height={8}>
            <AppText bold size={6}>
              {"بيانات الدفع"}
            </AppText>
            <AppIcon name="down" type="ant" size={8} />
          </AppView>
          <AppView
            backgroundColor="#F3F3F3"
            borderRadius={10}
            paddingVertical={5}
            centerY
            stretch
            paddingHorizontal={6}
          >
            <AppView row stretch>
              <AppView circleRadius={8} center backgroundColor="transparent">
                <AppIcon
                  name="checkcircle"
                  type="ant"
                  color="#5FE45A"
                  size={10}
                />
              </AppView>
              <AppText marginHorizontal={3} size={5.5} color="labelText">
                {props.deliver ? I18n.t("agree-pay") : "لم يتم تحديد الدفع بعد"}
              </AppText>
            </AppView>
          </AppView>
        </>
      )}
    </AppView>
  );
};
