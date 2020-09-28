import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppButton,
  AppNavigation,
  AppImage,
} from "../../common";
import styles from "./styles";
import walkThrough from "../../assets/imgs/walkThrough.png";
import walkthrough2 from "../../assets/imgs/walkthrough2.png";
import walkthrough3 from "../../assets/imgs/walkthrough3.png";
import { AppHeader } from "../../components";

class Walkthrough extends Component {
  state = {
    index: this.props.rtl ? 2 : 0,
  };
  renderButtons = () => (
    <AppButton
      title={I18n.t("next")}
      centerSelf
      style={styles.button}
      color="white"
      onPress={() => {
        this.swiper.scrollBy(1);
      }}
      size={5.5}
      backgroundColor="primary"
      paddingHorizontal={5}
      borderRadius={0}
    />
  );

  renderFirstPage = () => (
    <AppView marginHorizontal={12} flex center>
      <AppView marginHorizontal={10} stretch>
        <AppImage
          source={walkThrough}
          stretch
          height={40}
          resizeMode="contain"
        />
      </AppView>

      <AppView marginTop={25} center>
        <AppText center size={6.5} color="primary">
          التطبيق
        </AppText>
        <AppText
          center
          size={5}
          marginTop={2}
          lineHeight={9.5}
          color="darkgrey"
        >
          {/* {I18n.t("walkthrough-subtitle-1")} */}
          شرح عمل التطبيق
        </AppText>
      </AppView>
    </AppView>
  );

  renderٍSecondPage = () => (
    <AppView marginHorizontal={12} flex center>
      <AppView marginHorizontal={10} stretch marginTop={0}>
        <AppImage
          source={walkthrough2}
          stretch
          height={40}
          resizeMode="contain"
        />
      </AppView>

      <AppView marginTop={25} center>
        <AppText center size={6.5} color="primary">
          التطبيق
        </AppText>
        <AppText
          center
          size={5}
          marginTop={2}
          lineHeight={9.5}
          color="darkgrey"
        >
          {/* {I18n.t("walkthrough-subtitle-1")} */}
          شرح عمل التطبيق
        </AppText>
      </AppView>
    </AppView>
  );

  renderThirdPage = () => (
    <AppView marginHorizontal={12} flex center>
      <AppView stretch marginTop={0}>
        <AppImage
          source={walkThrough}
          resizeMode="contain"
          stretch
          height={35}
        />
      </AppView>

      <AppView marginTop={25} center>
        <AppText center size={6.5} color="primary">
          التطبيق
        </AppText>
        <AppText
          center
          size={5}
          marginTop={2}
          lineHeight={9.5}
          color="darkgrey"
        >
          {/* {I18n.t("walkthrough-subtitle-1")} */}
          شرح عمل التطبيق
        </AppText>
      </AppView>
    </AppView>
  );

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader
          backgroundColor="white"
          walk
          rowItems={[
            <AppView flex={2} center width={30} >
              <AppButton
                
                stretch
                title={I18n.t("skip")}
                transparent
                onPress={() => {
                  AppNavigation.push("wellcomPage");
                }}
              />
            </AppView>,
          ]}
          hideBack
        />
        <AppView flex stretchChildren>
          <Swiper
            loop
            horizontal
            autoplayTimeout={4}
            dotStyle={styles.dotStyles}
            activeDotStyle={styles.activeDotStyles}
            index={this.state.index}
            style={{}}
            onIndexChanged={(v) => {
              if (v === 2) {
                setTimeout(() => {
                  AppNavigation.push("wellcomPage");
                }, 5);
              }
              console.log("vvvv====>>", v);
            }}
            ref={(component) => (this.swiper = component)}
          >
            {this.props.rtl ? this.renderThirdPage() : this.renderFirstPage()}
            {this.renderٍSecondPage()}
            {this.props.rtl ? this.renderFirstPage() : this.renderThirdPage()}
          </Swiper>

          {this.renderButtons()}
        </AppView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Walkthrough);
