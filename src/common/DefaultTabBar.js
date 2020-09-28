import React, { Component } from "react";
import { connect } from "react-redux";
import { Animated } from "react-native";
import Reanimated from "react-native-reanimated";
import View from "./View";
import Button from "./Button";
import { getTheme } from "./Theme";
import { getThemeColor } from "./utils/colors";
import cardShadowStyle from "./utils/cardShadowStyle";

class DefaultTabBar extends Component {
  static defaultProps = {
    ...getTheme().tabBar,
    tabBar2: getTheme().tabBar2
  };

  renderTab = (name, page, isActive, onPressHandler) => {
    const {
      activeTextColor,
      activeTextSize,
      activeTextBold,
      inactiveTextColor,
      inactiveTextSize,
      inactiveTextBold
    } = this.props.default ? this.props.tabBar2 : this.props;

    const textColor = isActive ? activeTextColor : inactiveTextColor;
    const textSize = isActive ? activeTextSize : inactiveTextSize;
    const textBold = isActive ? activeTextBold : inactiveTextBold;

    return (
      <Button
        key={String(page)}
        backgroundColor="transparent"
        flex
        stretch
        pv={0}
        color={textColor}
        size={textSize}
        bold={textBold}
        onPress={() => {
          onPressHandler(page);
        }}
        title={name}
      />
    );
  };

  render() {
    const {
      containerWidth,
      tabs,
      activePage,
      goToPage,
      scrollValue,
      stickyScrollValue,
      rtl,
      underlineHeight,
      scrollAnimationRange
    } = this.props;
    const { underlineColor, backgroundColor, elevation, height } = this.props
      .default
      ? this.props.tabBar2
      : this.props;

    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: "absolute",
      width: containerWidth / numberOfTabs,
      height: 2,
      backgroundColor: getThemeColor(underlineColor),
      bottom: 0
    };

    if (this.props.panGesture) {
      this.translateX = Reanimated.interpolate(scrollValue, {
        inputRange: [0, 1],
        outputRange: [
          rtl ? (containerWidth / numberOfTabs) * -1 : 0,
          rtl ? 0 : (containerWidth / numberOfTabs) * -1
        ]
      });
    } else {
      this.translateX = scrollValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (containerWidth / numberOfTabs) * (rtl ? -1 : 1)]
      });
    }

    if (stickyScrollValue)
      this.tabsTransY = stickyScrollValue.interpolate({
        inputRange: [0, scrollAnimationRange, scrollAnimationRange + 1],
        outputRange: [0, 0, 1]
      });

    const UnderLinView = this.props.panGesture
      ? Reanimated.View
      : Animated.View;
    return (
      <Animated.View
        style={[
          stickyScrollValue
            ? {
                transform: [{ translateY: this.tabsTransY }],
                zIndex: 1
              }
            : {}
        ]}
      >
        <View
          row
          backgroundColor={backgroundColor}
          height={height}
          // elevation={1.2}
          // style={cardShadowStyle}
        >
          {tabs.map(tab => {
            const isTabActive = activePage === tab.page;

            return this.renderTab(tab.label, tab.page, isTabActive, goToPage);
          })}

          <UnderLinView
            style={[
              tabUnderlineStyle,
              this.translateX
                ? {
                    transform: [{ translateX: this.translateX }]
                  }
                : {},
              this.props.underlineStyle
            ]}
          />
        </View>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(DefaultTabBar);
