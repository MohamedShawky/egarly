import React, { useState, useEffect } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppButton,
  AppImage,
  AppIcon,
  moderateScale,
} from "../common";
import { View } from "react-native-animatable";

const placholder = require("../assets/imgs/cat.png");

// import {database} from 'react-native-firebase';

export default (props) => {
  const { onPress, selected, value, text } = props;

  return (
    <AppView
      stretch
      centerX
      borderRadius={7}
      marginBottom={5}
      width={25}
      // height={15}
      onPress={() => {
        onPress(value);
      }}
    >
      <View
        style={{
          width: moderateScale(33),
          height: moderateScale(33),
          borderRadius: moderateScale(7660),
          borderColor: selected ? "green" : "transparent",
          borderWidth: 1,
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        <AppView
          stretch
          center
          // borderColor={selected ? "green" : "transparent"}
          // borderWidth={1}
          // circleRadius={22}
        >
          <AppView
            center
            circleRadius={20}
            // backgroundColor={selected ? "#FAC428" : "white"}
          >
            <AppImage
              // resizeMode="contain"
              source={
                props.data.image
                  ? {
                      uri: `http://ejarly.dev.fudexsb.com/thumbs/${
                        props.data.image
                      }`,
                    }
                  : placholder
              }
              flex
              stretch
            />
          </AppView>
        </AppView>
      </View>
      <AppView stretch centerX width={25} height={10}>
        <AppText
          lineHeight={10}
          // numberOfLines={1}
          center
          size={6}
          color="secondary"
        >
          {props.data.ar_name || props.data.title}
        </AppText>
      </AppView>
    </AppView>
  );
};
