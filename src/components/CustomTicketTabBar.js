import React, { Component } from "react";
import { connect } from "react-redux";
import { Animated } from "react-native";

import {
  AppView,
  AppButton,
  getColor,
  moderateScale,
  responsiveHeight,
  responsiveWidth
} from "../common";

class CustomTicketTabBar extends Component {
  static defaultProps = {
    height: 5.5,
    activeTextColor: "white",
    activeTextSize: 4.5,
    inactiveTextColor: "foreground",
    inactiveTextSize: 4.5,
    underlineColor: "primary"
  };

  renderTab = (name, page, isActive, onPressHandler) => {
    const {
      activeTextColor,
      activeTextSize,
      activeTextBold,
      inactiveTextColor,
      inactiveTextSize,
      inactiveTextBold
    } = this.props;

    const textColor = isActive ? activeTextColor : inactiveTextColor;
    const textSize = isActive ? activeTextSize : inactiveTextSize;
    const textBold = isActive ? activeTextBold : inactiveTextBold;

    return (
      <AppButton
        key={String(page)}
        backgroundColor="transparent"
        flex
        stretch
        borderRadius={0}
        color={textColor}
        size={textSize}
        bold={textBold}
        touchableOpacity
        onPress={() => {
          onPressHandler(page);
        }}
        title={name}
        paddingVertical={0.1}
      />
    );
  };

  render() {
    const {
      tabs,
      height,
      activePage,
      goToPage,
      scrollValue,
      rtl,
      underlineColor
    } = this.props;
    let { containerWidth } = this.props;

    containerWidth -= moderateScale(16) + 5;

    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: "absolute",
      width: containerWidth / numberOfTabs ,
      borderRadius: 4,
      backgroundColor: getColor(underlineColor),
      bottom: responsiveHeight(0.5),
      top: responsiveHeight(0.5),
      left: responsiveWidth(this.props.rtl ? 0 : 1.5) 
    };

    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-responsiveHeight(0.5), (containerWidth / numberOfTabs) *(rtl?-1:1)]
    });

    return (
      <AppView
        row
        row
        backgroundColor="white"
        borderColor="primary"
        borderWidth={1}
        borderRadius={7}
        height={height}
        margin={7}
        paddingLeft={this.props.rtl ? null : 3 }
      >
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }]
            },
            this.props.underlineStyle
          ]}
        />
          {tabs.map(tab => {
            const isTabActive = activePage === tab.page;

            return this.renderTab(tab.label, tab.page, isTabActive, goToPage);
          })}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});
export default connect(mapStateToProps)(CustomTicketTabBar);
