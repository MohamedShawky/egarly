import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../common/defaults/colors";
import {
  moderateScale,
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize
} from "../../common/utils/responsiveDimensions";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  chatContainer: {
    backgroundColor: "#F5F5F5",
    // flex: 1,
    // alignSelf: 'stretch',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.inputBorderColor
  },
  overlay: {
    zIndex: 3000,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center"
    // justifyContent: "center"
  },
  overImage: {
    zIndex: 3000,
    marginTop: moderateScale(35),
    marginBottom: moderateScale(8),
    height: responsiveHeight(65),
    width: "73%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderRadius: 5
  },
  iconSpace: {
    justifyContent: "space-between"
  },
  overLayIconTrash: {
    color: "red",
    borderRadius: responsiveWidth(15) / 2
  },
  overLayIconContainer: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(11) / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "white",
    marginHorizontal: moderateScale(2)
  },
  bubleContainer: {
    // alignItems: "center",
    width:responsiveWidth(35)
  },
  userBubleContainer: {
    backgroundColor: "#fff",
    paddingTop: moderateScale(3),
    borderTopLeftRadius: moderateScale(6),
    borderTopRightRadius: moderateScale(6),
    borderBottomLeftRadius: moderateScale(6),
    width: responsiveWidth(65)
  },
  timeContainer: {
    height: responsiveHeight(3),
    justifyContent: "center"
  },
  timeText: {
    color: "#9B9B9B"
  },
  senderMsg: {
    color: "#000"
  },
  senderContainer: {
    backgroundColor: "#fff",
    // borderTopLeftRadius: moderateScale(6),
    // borderTopRightRadius: moderateScale(6),
    // borderBottomRightRadius: moderateScale(6),
    // paddingTop: moderateScale(3),
  },
  userMsg: {
    color: "#555555"
  }
});
;