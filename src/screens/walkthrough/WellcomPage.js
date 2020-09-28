import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import I18n from "react-native-i18n";
import {
  AppView,
  AppButton,
  AppText,
  AppImage,
  AppNavigation,
} from "../../common";
import { SocialButtonsSection } from "../../components";
import wellcom from "../../assets/imgs/wellcom.png";
import logo from "../../assets/imgs/home/wellogo.png";

export default class WellcomPage extends Component {
  renderOrDivider = () => (
    <AppView row stretch marginHorizontal={7} center>
      <AppView
        height={0}
        center
        borderWidth={0.5}
        borderColor="#3C3C3C"
        width={30}
      />
      <AppView backgroundColor="transparent" center marginHorizontal={3}>
        <AppText color="#3C3C3C">{I18n.t("ui-or")}</AppText>
      </AppView>
      <AppView
        height={0}
        center
        borderWidth={0.5}
        borderColor="#3C3C3C"
        width={30}
      />
    </AppView>
  );

  renderSocialButtons = () => (
    <SocialButtonsSection
      marginTop={2.5}
      marginBottom={5}
      titleMarginBottom={5}
    />
  );

  renderTerms = () => (
    <AppView stretch center marginTop={15}>
      <AppText> عند ادخال رقم الهاتف الجوال فانت توافق علي </AppText>
      <AppButton
        title={I18n.t("terms-and-condition-title")}
        transparent
        color="primary"
        onPress={() => {
          AppNavigation.push({
            name: "termsAndCondition",
            passProps: {
              order: true,
            },
          });
        }}
      />
    </AppView>
  );

  render() {
    return (
      <AppView flex stretch centerX backgroundColor="white">
        <AppView
          stretch
          centerX
          style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        >
          <AppView stretch center height={40}>
            <AppImage source={logo} stretch flex contain marginLeft={5} />
          </AppView>
          <AppText bold center marginRight={10} marginBottom={10}>
            {I18n.t("wellcom-text")}
          </AppText>
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <AppButton
              title={I18n.t("ui-signIn-button")}
              stretch
              color="#3C3C3C"
              onPress={() => {
                AppNavigation.push("signIn");
              }}
              backgroundColor="primary"
            />
            <AppButton
              title={I18n.t("ui-create-account")}
              stretch
              backgroundColor="#3C3C3C"
              color="white"
              onPress={() => {
                AppNavigation.push("signUp");
              }}
              marginVertical={10}
            />

            <AppButton
              title={I18n.t("ui-signIn-Skip")}
              backgroundColor="#DDDBD7"
              color="#3C3C3C"
              height={6}
              onPress={() => {
                AppNavigation.navigateToHome();
              }}
              stretch
            />
            {/* {this.renderOrDivider()}
          {/* {this.renderSocialButtons()} */}
            {/*  */}
            {this.renderTerms()}
          </View>
        </AppView>
      </AppView>
    );
  }
}
