import React, { useState } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppModal,
  AppIcon,
  AppButton,
  AppSpinner,
  AppNavigation
} from "../common";

export default props => {
  // const [isVisible, setVisible] = useState(false);
  return (
    <AppModal
      animationIn="bounceIn"
      animationOut="bounceOut"
      isVisible={props.isVisible}
      changeState={props.stateChanged}
      backdropDismiss
      {...props}
    >
      <AppView width={80} backgroundColor="white" borderRadius={5}>
        <AppView paddingHorizontal={5} paddingVertical={5} marginTop={5}>
          <AppText center marginHorizontal={10} color="black" bold>
            {I18n.t("no-auth-title")}
          </AppText>

          <AppText marginHorizontal={10} marginVertical={4}>
            {I18n.t("no-auth-message")}
          </AppText>
        </AppView>
        <AppView
          stretch
          marginTop={10}
          row
          bottom
          marginHorizontal={3}
          marginBottom={1}
        >
          <AppButton
            title={I18n.t("ui-create-account")}
            backgroundColor="primary"
            height={6}
            margin={1}
            touchableOpacity
            onPress={() => {
              props.stateChanged(false);
              AppNavigation.push("signUp");
            }}
          />
          <AppButton
            title={I18n.t("ui-signIn-button")}
            backgroundColor="primary"
            height={6}
            margin={1}
            touchableOpacity
            onPress={() => {
              props.stateChanged(false);
              AppNavigation.push("signIn");
            }}
          />
        </AppView>
      </AppView>
    </AppModal>
  );
};
