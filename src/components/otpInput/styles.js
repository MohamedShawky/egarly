import { StyleSheet } from "react-native";
import colors from "../../common/defaults/colors";

export default StyleSheet.create({
  underlineStyleBase: {
    width: 70,
    height: 60,
    // borderRadius: 100,
    // borderWidth: 1,
    backgroundColor: "#F3F3F3"
  },
  boxStyleBaseAfterAdd: {
    // borderColor: "#ccc",
    width: 70,
    height: 60,
    // borderRadius: 100,
    // borderWidth: 1,
    backgroundColor: "#F3F3F3",
    // borderColor: colors.primary
  },

  underlineStyleHighLighted: {
    borderColor: colors.primary,
    borderWidth: 0,
    borderBottomWidth: 1
  }
});
