import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton,
  AppScrollView,
  AppNavigation
} from "../common";
import { OptionButton, BottomSheet } from ".";
import CategeoryCard from "./CategeoryCard";
import cardShadowStyle from "../common/utils/cardShadowStyle";
import { HEADER_ELEVATION } from "../common/utils/Constants";

class CategeoryBottomShet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 0,

          iconName: "eye-with-line",
          iconType: "entypo"
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 1,
          iconName: "trash",
          iconType: "feather"
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 2,

          iconName: "eye-with-line",
          iconType: "entypo"
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 3,
          iconName: "trash",
          iconType: "feather"
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 4,

          iconName: "eye-with-line",
          iconType: "entypo"
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 5,
          iconName: "trash",
          iconType: "feather"
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 6,

          iconName: "eye-with-line",
          iconType: "entypo"
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 7,
          iconName: "trash",
          iconType: "feather"
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 8,

          iconName: "eye-with-line",
          iconType: "entypo"
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 9,
          iconName: "trash",
          iconType: "feather"
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 10,

          iconName: "eye-with-line",
          iconType: "entypo"
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 11,
          iconName: "trash",
          iconType: "feather"
        }
      ]
    };
  }

  onSubmit = value => {
    this.props.onConfirm(value);
    this.hide();
  };

  show = () => {
    this.bottomSheetRef.current.show();
    this.setState({
      mount: true
    });
  };

  hide = () => {
    this.bottomSheetRef.current.hide();
    this.setState({
      mount: false
    });
  };

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={30}
        // disableBackDrop={true}
        hide={() => {
          AppNavigation.pop();
        }}
      >
        {this.state.mount && (
          <AppView
            backgroundColor="white"
            padding={6}
            borderRadius={5}
            center
            elevation={HEADER_ELEVATION}
          >
            <AppText
              center
              marginHorizontal={4}
              lineHeight={7.5}
              color="primary"
              bold
              marginBottom={3}
            >
              {this.props.message}
            </AppText>
          </AppView>
        )}
      </BottomSheet>
    );
  }
}

export default CategeoryBottomShet;
