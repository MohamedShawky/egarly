import React, { useState } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import TypeWriter from "react-native-typewriter";
import {
  AppView,
  AppText,
  AppIcon,
  AppPicker,
  responsiveFontSize,
  getFonts
} from "../../common";

export default props => (
  <AppView stretch marginHorizontal={10}>
    <AppText bold size={10} color="#6A6A6A">
      {I18n.t("welcome_home")}
    </AppText>

    <AppView row marginTop={1} stretch spaceBetween>
      <AppView width={60} centerY>
        <AppText size={6} color="#6A6A6A">
          {I18n.t("newHone_text4")}
        </AppText>
      </AppView>
    </AppView>
    <AppView row marginTop={1} mb={5}>
      <AppText size={8} color="#6A6A6A">
        {I18n.t("as")}
      </AppText>
      <TypeWriterArray2 />
    </AppView>
  </AppView>
);

class TypeWriterArray extends React.Component {
  state = {
    loading: true,
    jobs: [
      { ar: "صيانة تكييفات", en: "Air conditioning maintenance" },
      { ar: "صيانة غسالات", en: "Maintenance of washers" },
      { ar: "صيانة كهرباء", en: "Electricity maintenance" },
      { ar: "صيانة مبردات", en: "Maintenance of coolers" },
      { ar: "صيانة الكترونيات", en: "Electronics maintenance" }
    ],
    TextIndex: 0
  };

  async componentDidMount() {
    setTimeout(() => {
      this.setTextIndex();
    }, 5000);
  }

  setTextIndex = () => {
    const TextIndex =
      this.state.jobs.length - 1 === this.state.TextIndex
        ? 0
        : this.state.TextIndex + 1;
    this.setState({ TextIndex });
    setTimeout(() => {
      this.setTextIndex();
    }, 3000);
  };

  render() {
    return (
      <TypeWriter
        initialDelay={3000}
        typing={1}
        style={{
          color: "#FFB655",
          fontSize: responsiveFontSize(7),
          fontFamily: getFonts().normal
        }}
      >
        {this.state.jobs[this.state.TextIndex][this.props.rtl ? "ar" : "en"]}
      </TypeWriter>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});
const TypeWriterArray2 = connect(mapStateToProps)(TypeWriterArray);
