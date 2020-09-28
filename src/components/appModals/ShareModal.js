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
import wallet from "../../assets/imgs/wallet.png";

class ShareModal extends Component {
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
          height={60}
          paddingTop={15}
        >
          <AppImage
            marginTop={5}
            equalSize={20}
            source={wallet}
            backgroundColor="white"
          />

          <AppText marginVertical={8} bold color="green">
            {I18n.t("share-hint", { amout: 10 })}
          </AppText>

          <AppView stretch center>
            <AppText marginVertical={5} center>
              {I18n.t("share-hint-product")}
            </AppText>
          </AppView>

          <AppView flex stretch center>
            <AppText marginBottom={5} size={5.7} bold color="black">
              {I18n.t("share-code")}
            </AppText>

            <AppView stretch center>
              <AppButton
                touchableOpacity
                borderColor="primary"
                // transparent
                backgroundColor="white"
                borderWidth={1}
                marginTop={2}
                // paddingHorizontal={7}
                width={30}
                borderRadius={7}
                onPress={() => changeState(false)}
                title={"M4s5s"}
                color="grey"
              />
            </AppView>
          </AppView>

          <AppView
            style={{ position: "absolute", top: 0, left: 0 }}
            equalSize={10}
            center
            touchableOpacity
            onPress={() => this.props.changeState(false)}
          >
            <AppIcon name="close" type="ant" size={8}/>
          </AppView>
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

export default ShareModal;
