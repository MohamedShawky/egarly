import { StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  moderateScale,
  screenHeight
} from "../../common/utils/responsiveDimensions";

export default StyleSheet.create({
  fullAbsolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  logo: {
    position: "absolute",
    top: responsiveHeight(3.5),
    width: responsiveWidth(18),
    height: responsiveHeight(6),
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    alignSelf: "stretch"
  },
  logoText: {
    position: "absolute",
    top: responsiveHeight(5),
    right: responsiveWidth(24),
    zIndex: 5000,
    alignSelf: "stretch"
  },
  modalContentContainer: {
    width: responsiveWidth(85),
    backgroundColor: "white",
    alignSelf: "center",
    height: responsiveHeight(55),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(2)
  },
  footerStyle: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0
  }
});
