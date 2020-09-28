import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppScrollView,
  windowWidth,
  responsiveHeight
} from "../../common";
import { AppHeader } from "../../components";
import facebook from "../../assets/imgs/fb.png";
import twitter from "../../assets/imgs/tw.png";
import index from "../../assets/imgs/indexG.png";
import khdmat from "../../assets/imgs/khdmat.png";

class AboutUs extends Component {
  state = {
    isLogOutVisible: false
  };

  renderImageVersion = () => (
    <>
      <AppImage
        source={require("../../assets/imgs/sideHome.png")}
        width={40}
        height={17}
        marginTop={10}
        marginBottom={2}
        resizeMode="contain"
      />
      <AppText color="black" bold size={5}>
        {I18n.t("aboutUs-version")}
      </AppText>
    </>
  );

  renderDescription = () => (
    <AppScrollView>
      <AppText lineHeight={10} color="#000" marginHorizontal={2} size={5}>
        {I18n.t("aboutUs-description")}
      </AppText>
    </AppScrollView>
  );

  renderItem = (text, image, f, t, width, height) => {
    const {} = this.props;
    return (
      <AppView flex center>
        <AppText>{text}</AppText>
        <AppImage
          source={image}
          resizeMode="stretch"
          width={width || 20}
          height={height || 4.5}
          marginVertical={5}
        />
        <AppView row marginBottom={5} spaceBetween width={23}>
          <AppImage source={t} equalSize={10} stretch />
          <AppImage source={f} equalSize={10} stretch />
        </AppView>
      </AppView>
    );
  };

  renderCompany = () => (
    <AppView stretch height={20} row>
      {this.renderItem(
        I18n.t("aboutUs-index"),
        khdmat,
        facebook,
        twitter,
        30,
        4
      )}
      <AppView
        borderWidth={0.5}
        borderColor="grey"
        marginVertical={13}
        stretch
      />
      {this.renderItem(I18n.t("aboutUs-khdmat"), index, facebook, twitter)}
    </AppView>
  );

  render() {
    return (
      <AppView flex stretch backgroundColor="#F1F1F1" style={{ flex: 1 }}>
        <AppHeader title={I18n.t("aboutUs-header")} />
        {/* <AppScrollView stretch center flexGrow> */}

        <AppView
          backgroundColor="#F8F8F8"
          center
          marginHorizontal={6}
          elevation={2}
          paddingHorizontal={3}
          style={{ flex: 3 }}
        >
          {/* {this.renderImageVersion()}
          {this.renderDescription()} */}
        </AppView>
        <AppView stretch flex center style={{ flex: 1 }}>
          {/* {this.renderCompany()} */}
        </AppView>
        {/* </AppScrollView> */}
      </AppView>
    );
  }
}

export default connect()(AboutUs);
