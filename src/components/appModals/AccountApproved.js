import React, { Component } from "react";
import I18n from "react-native-i18n";
import { moderateScale } from "../../common/utils/responsiveDimensions";
import { View } from "react-native";
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppModal,
  AppImage,
  getColors,
} from "../../common";
import styles from "./styles";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import checkMark from "../../assets/imgs/checkMark.png";

class AccountApproved extends Component {
  renderInvalidModal = () => {
    const { visible, changeState, rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        {...rest}
        isVisible={visible}
      >
        <AppView
          width={80}
          backgroundColor="white"
          borderRadius={7}
          centerX
          elevation={1.2}
          style={cardShadowStyle}
          paddingHorizontal={8}
        >
          <AppImage marginTop={10} width={80} height={15} source={checkMark} />

          <AppText>{I18n.t("account-approve")}</AppText>
          <AppButton
            touchableOpacity
            stretch
            backgroundColor="primary"
            marginVertical={10}
            onPress={() => changeState(false)}
            title={I18n.t("good")}
          />
        </AppView>
      </AppModal>
    );
  };

  render() {
    return (
      <View style={{ alignSelf: "stretch", alignItems: "center" }}>
        {this.renderInvalidModal()}
      </View>
    );
  }
}

export default AccountApproved;
