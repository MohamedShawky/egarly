import React from "react";
import { SafeAreaView } from "react-native";
import View from "./View";
import {
  responsiveHeight,
  responsiveWidth
} from "./utils/responsiveDimensions";
import { useSelector } from "react-redux";

export default props => {
  const rtl = useSelector(state => state.lang.rtl);
  return (
    <SafeAreaView
      style={[
        {
          position: "absolute",
          bottom: responsiveHeight(5)
        },
        rtl
          ? { left: responsiveWidth(5) }
          : { right: responsiveWidth(5) }
      ]}
    >
      <View
        flex
        elevation={5}
        center
        circle
        circleRadius={15}
        stretch
        flex
        backgroundColor="primary"
        {...props}
        // height={15}
      >
        {props.children}
      </View>
    </SafeAreaView>
  );
};
