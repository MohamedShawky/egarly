import React from "react";
import { AppView, AppText } from "../../common";
import moment from "moment";

export const CardWallet = (props) => {
  return (
    <AppView
      stretch
      height={12}
      elevation={2}
      borderRadius={7}
      paddingHorizontal={7}
      marginBottom={7}
    >
      <AppView stretch row spaceBetween>
        <AppText bold>رقم العمليه</AppText>

        <AppText>#{props.id}</AppText>
      </AppView>
      <AppView stretch row spaceBetween>
        <AppText bold>رقم الطلب</AppText>

        <AppText>#{props.order_id}</AppText>
      </AppView>
      <AppView stretch row spaceBetween>
        <AppText bold>قيمه الاستحقاق</AppText>

        <AppText>{props.amount} ريال</AppText>
      </AppView>
      <AppView stretch row spaceBetween>
        <AppView flex/>

        <AppText>{moment(props.created_at).fromNow()}</AppText>
      </AppView>
    </AppView>
  );
};
