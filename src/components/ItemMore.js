import React, { Component } from "react";
import PropTypes from "prop-types";

import { AppView, AppText, AppIcon } from "../common";

class ItemMore extends Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    textSize: PropTypes.number,
    text: PropTypes.string,
    nameLeft: PropTypes.string,
    type: PropTypes.string,
    typeLeft: PropTypes.string,
    sizeLeft: PropTypes.number,
    textMargin: PropTypes.number,
    borderBottomColor: PropTypes.string,
    borderBottomWidth: PropTypes.number,
    borderTopColor: PropTypes.string,
    borderTopWidth: PropTypes.number,
    onPress: PropTypes.func,
    colorLeft: PropTypes.string,
    leftItem: PropTypes.node,
    rightItem: PropTypes.node,

    transparent: PropTypes.bool,
    paddingVertical: PropTypes.number,
    paddingHorizontal: PropTypes.number
  };

  static defaultProps = {
    color: "#484848",
    size: 6,
    textSize: 6,
    nameLeft: "ios-arrow-back",
    typeLeft: "ion",
    sizeLeft: 8,
    textMargin: 10,
    borderBottomColor: "#EEEEEE",
    borderBottomWidth: 1,

    colorLeft: "#BFBFBF",
    paddingVertical: 5,
    paddingHorizontal: 7
  };

  renderLeftIcon = c => {
    const { leftItem, size } = this.props;

    return React.cloneElement(leftItem, {
      size: leftItem.props.size || size * 1.4,
      color: leftItem.props.color || c
    });
  };

  renderMidItemsItem = c => {
    const { midItems, size } = this.props;

    return React.cloneElement(midItems, {
      size: midItems.props.size || size * 1.4,
      color: midItems.props.color || c
    });
  };

  renderRightIcon = c => {
    const { rightItem, size } = this.props;

    return React.cloneElement(rightItem, {
      size: rightItem.props.size || size * 1.4,
      color: rightItem.props.color || c
    });
  };

  render() {
    const {
      name,
      color,
      size,
      textSize,
      text,
      nameLeft,
      type,
      typeLeft,
      sizeLeft,
      borderBottomcolor,
      borderBottomWidth,
      onPress,
      colorLeft,
      textMargin,
      leftItem,
      rightItem,
      midItems,
      paddingHorizontal,

      ...rest
    } = this.props;

    const border = {};
    if (this.props.noBorder) {
      border.borderBottomcolor = null;
      border.borderBottomWidth = undefined;
      border.paddingVertical = 2;
      border.paddingHorizontal = undefined;
    }

    const padding = {};
    if (this.props.noPadding) {
      border.paddingVertical = 1;
    }

    return (
      <AppView
        {...rest}
        stretch
        borderBottomcolor={borderBottomcolor}
        borderBottomWidth={borderBottomWidth}
        // paddingVertical={5}
        onPress={onPress}
        {...border}
        {...padding}
      >
        <AppView stretch spaceBetween row paddingHorizontal={paddingHorizontal}>
          {rightItem ? (
            this.renderRightIcon()
          ) : (
            <AppView row center paddingHorizontal={6}>
              <AppIcon name={name} type={type} size={size} lineHeight={size} />
              <AppText
                color={color}
                size={textSize}
                marginHorizontal={textMargin}
              >
                {text}
              </AppText>
            </AppView>
          )}

          {midItems ? this.renderMidItemsItem() : null}

          {leftItem ? (
            this.renderLeftIcon()
          ) : (
            <AppIcon
              name={nameLeft}
              type={typeLeft}
              size={sizeLeft}
              color={colorLeft}
              paddingHorizontal={6}
            />
          )}
        </AppView>
      </AppView>
    );
  }
}

export default ItemMore;
