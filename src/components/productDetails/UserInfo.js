import React from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppPrice,
  AppImage,
  AppStarRating,
} from "../../common";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import avatar from "../../assets/imgs/avatar.png";
export default (props) => {
  return (
    <AppView
      stretch
      {...props}
      elevation={1.2}
      style={cardShadowStyle}
      row
      marginTop={5}
      paddingVertical={5}
      marginHorizontal={5}
    >
      <AppImage circleRadius={15} source={avatar} marginHorizontal={5} />

      <AppView stretch>
        <AppText size={5.5}>{props.name} </AppText>

        <AppStarRating rate={props.rate_avg} size={5} />
      </AppView>
    </AppView>
  );
};
