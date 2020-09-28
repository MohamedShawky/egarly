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
  AppInput,
  AppPrice,
} from "../../common";
import styles from "./styles";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import avatarClient from "../../assets/imgs/avatarClient.png";

class SureInfoModal extends Component {
  state = {
    text: "",
  };
  renderInvalidModal = () => {
    const { visible, changeState, ...rest } = this.props;
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
          <AppText marginTop={5} bold size={7}>
            {I18n.t("cancel-order-hint")}
          </AppText>
          <AppText marginVertical={5} size={5} center>
            {I18n.t("refuse-order-hint")}
          </AppText>

          <AppInput
            multiline
            height={13}
            stretch
            initialValue={this.state.text}
            onChange={(val) => {
              this.setState({
                text: val,
              });
            }}
          />

          <AppButton
            touchableOpacity
            stretch
            backgroundColor="primary"
            marginBottom={5}
            marginTop={10}
            onPress={() => changeState(false)}
            title={I18n.t("send")}
          />
          <AppButton
            touchableOpacity
            stretch
            backgroundColor="#B2B2B2"
            marginBottom={10}
            onPress={() => changeState(false)}
            title={I18n.t("cancel")}
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
