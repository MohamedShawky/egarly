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
import avatarClient from "../../assets/imgs/avatarClient.png";
import checkMark from "../../assets/imgs/checkMark.png";

class SureInfoModal extends Component {
  renderInvalidModal = () => {
    const { visible, changeState,messageHint, rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        {...rest}
        isVisible={visible}
        changeState={changeState}
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
          <AppImage marginTop={5} circleRadius={20} source={checkMark} />

          {/* <AppText  marginVertical={5}>
                Mohamed
            </AppText> */}

          <AppText bold marginVertical={5} center size={6.5}>
            { messageHint ? messageHint : I18n.t("order-has-accepted")}
          </AppText>

          {this.props.message !== "" ? (
            <AppText marginBottom={5} center {...this.props.messageStyle}>
              {this.props.message}
            </AppText>
          ) : (
            <AppText marginBottom={5} center>
              {I18n.t("order-has-accepted-hint")}
            </AppText>
          )}

          <AppButton
            touchableOpacity
            stretch
            backgroundColor="primary"
            marginVertical={10}
            onPress={() => changeState(false)}
            title={ this.props.title? this.props.title : I18n.t("good")}
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

export default SureInfoModal;
