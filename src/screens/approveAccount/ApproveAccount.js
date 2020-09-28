import React, { Component } from "react";

import {
  AppView,
  AppButton,
  AppNavigation,
  AppText,
  AppImage,
  AppIcon,
} from "../../common";
import { AppHeader } from "../../components";
import rec from "../../assets/imgs/image-approv.png";
import I18n from "react-native-i18n";
import { HEADER_ELEVATION } from "../../common/utils/Constants";
import cardShadowStyle from "../../common/utils/cardShadowStyle";

class ApproveAccount extends Component {
  renderAdvantage = (name, type, text) => {
    return (
      <AppView
        stretch
        row
        paddingHorizontal={7}
        height={7}
        // elevation={HEADER_ELEVATION}
        // style={cardShadowStyle}
      >
        <AppView circleRadius={7} backgroundColor="#27AE60" center>
          <AppIcon name={name} type={type} color="white" />
        </AppView>
        <AppText marginHorizontal={7}>{text}</AppText>
      </AppView>
    );
  };
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("approve-account")} />

        <AppView stretch height={40} center>
          <AppImage source={rec} stretch height={30} contain />
        </AppView>
        <AppView stretch flex centerX paddingTop={10}>
          <AppText bold size={6.5}>
            اهلا بك في عمليه توثيق الحساب
          </AppText>
          <AppText>نقدم لك عن طريق التوثيق في عده خطوات</AppText>
          <AppView stretch height={4} />
          {this.renderAdvantage("check", "ant", I18n.t("adv-one"))}
          {this.renderAdvantage("check", "ant", I18n.t("adv-two"))}
        </AppView>
        <AppButton
          title={I18n.t("next")}
          backgroundColor="primary"
          stretch
          marginHorizontal={7}
          marginVertical={10}
          onPress={() => {
            AppNavigation.push("approveAccountStepOne");
          }}
        />
      </AppView>
    );
  }
}

export default ApproveAccount;
