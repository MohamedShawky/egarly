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
import advProduct from "../../assets/imgs/advProduct.png";
import I18n from "react-native-i18n";
import { HEADER_ELEVATION } from "../../common/utils/Constants";
import cardShadowStyle from "../../common/utils/cardShadowStyle";

class AdvantageProduct extends Component {
  renderAdvantage = (name, type, text) => {
    return (
      <AppView
        stretch
        row
        paddingHorizontal={7}
        // elevation={HEADER_ELEVATION}
        // style={cardShadowStyle}
        paddingVertical={5}
      >
        <AppView circleRadius={6} backgroundColor="#27AE60" center>
          <AppIcon name={name} type={type} color="white" />
        </AppView>
        <AppText marginHorizontal={7}>{text}</AppText>
      </AppView>
    );
  };
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("adv-product")} />

        <AppImage source={advProduct} stretch height={25} flex contain />
        <AppView stretch flex paddingTop={10}>
          <AppText bold size={6.5} marginHorizontal={10}>
            {I18n.t("adv-product-hint")}
          </AppText>
          <AppView stretch height={4} />
          {this.renderAdvantage("check", "ant", I18n.t("adv-product-one"))}
          {this.renderAdvantage("check", "ant", I18n.t("adv-product-two"))}
          {this.renderAdvantage("check", "ant", I18n.t("adv-product-three"))}
        </AppView>
        <AppButton
          title={I18n.t("next")}
          backgroundColor="primary"
          stretch
          marginHorizontal={7}
          marginVertical={10}
          onPress={() => {
            AppNavigation.push({
              name: "advantageProductStepTwo",
              passProps: {
                product_id: this.props.product_id,
              },
            });
          }}
        />
      </AppView>
    );
  }
}

export default AdvantageProduct;
