import React, { Component, useState } from "react";
import {
  AppView,
  AppImage,
  AppText,
  AppNavigation,
  showError,
} from "../common";
import Avatar from "../assets/imgs/avatar.png";
import moment from "moment";
import Axios from "axios";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";
export default (props) => {
  const timeStamp = moment.now();
  const { user, title, created_at, body, id, is_read } = props.data;
  const [read, setRead] = useState(is_read !== 1 ? false : true);

  const isNotificationRead = async () => {
    try {
      const isRead = await Axios.post(
        `${API_ENDPOINT_GATEWAY}notification/read/${id}`
      );
      console.log("isRead", isRead);
      if (isRead.data.status) {
        setRead(true);
      }
    } catch (error) {
      showError(I18n.t("ui-error-happened"));
    }
  };
  return (
    <AppView
      stretch
      {...props}
      row
      height={11}
      elevation={1.5}
      paddingHorizontal={5}
      onPress={() => {
        console.log("props --->>data", props.data);
        isNotificationRead();

        AppNavigation.navigateToOrderStatus(props.data.order.status.id, props.data.order.id);
      }}
    >
      <AppView stretch center>
        <AppImage
          source={
            user.avatar !== null
              ? { uri: `http://ejarly.dev.fudexsb.com/uploads/${user.avatar}` }
              : Avatar
          }
          equalSize={17}
          stretch
          borderRadius={7}
          elevation={2}
        />
      </AppView>
      <AppView stretch marginHorizontal={2} marginTop={3.5} flex>
        <AppText numberOfLines={1}>{title}</AppText>
        <AppText numberOfLines={2}>{body}</AppText>
      </AppView>
      <AppText>{moment(created_at).fromNow()}</AppText>
      <AppView
        circleRadius={5}
        backgroundColor={!read ? "primary" : "white"}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
        }}
      />
    </AppView>
  );
};
