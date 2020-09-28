import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions } from "react-native";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  getColors,
  AppImage,
} from "../../common";
import styles from "./styles";
import cardShadowStyle from "../../common/utils/cardShadowStyle";

class OptionButton extends Component {
  static defaultProps = {
    buttonBold: true,
  };

  renderCheckBox = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      label,
      ...rest
    } = this.props;
    const price = this.props.index !== 2 && I18n.t("price");
    return (
      <AppView
        stretch
        row
        paddingHorizontal={10}
        onPress={() => {
          onPress(value, text);
        }}
        touchableOpacity
      >
        <AppView
          width={6}
          height={2.8}
          bc={this.props.selected ? "primary" : "#ACB5BB"}
          bw={2}
          borderWidth={2}
          borderRadius={3}
          borderColor={this.props.selected ? "primary" : "#707070"}
          center
        >
          {this.props.selected ? (
            <AppIcon
              name="check"
              type="entypo"
              stretch
              color="white"
              backgroundColor="primary"
              noFlip
            />
          ) : null}
        </AppView>
        <AppButton
          center={false}
          title={text}
          stretch
          flex
          backgroundColor="transparent"
          height={7}
          color="#6A6A6A"
          size={6.5}
          bold={this.props.buttonBold}
          onPress={() => {
            onPress(value, text);

            // this.props.hide();
          }}
          touchableOpacity
        />
      </AppView>
    );
  };

  renderIconBox = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      label,
      ...rest
    } = this.props;
    const price = this.props.index !== 2 && I18n.t("price");
    return (
      <AppView
        stretch
        row
        paddingHorizontal={10}
        onPress={() => {
          onPress(value, text);
        }}
        touchableOpacity
      >
        <AppView width={6} height={2.8} center>
          <AppIcon
            name={this.props.iconName}
            type={this.props.iconType}
            stretch
          />
        </AppView>
        <AppButton
          center={false}
          title={text}
          stretch
          flex
          backgroundColor="transparent"
          height={7}
          color="#6A6A6A"
          size={6.5}
          bold={this.props.buttonBold}
          onPress={() => {
            onPress(value, text);

            // this.props.hide();
          }}
          touchableOpacity
        />
      </AppView>
    );
  };

  renderTagScrool = () => {
    const {
      tagScroll,
      style,
      onPress,
      onDeselect,
      value,
      index,
      selected,
      text,
      name,
      label,
      ...rest
    } = this.props;

    return (
      <AppView
        stretch
        style={style}
        centerX
        {...rest}
        marginBottom={5}
        marginHorizontal={3}
      >
        <AppView
          borderWidth={1.5}
          borderColor={selected ? getColors().primary : "#E9E9E9"}
          style={styles.radius}
          // height={3}
          borderRadius={20}
          backgroundColor={selected ? getColors().primary : "#E9E9E9"}
          padding={3}
          center
          touchableOpacity={this.props.touchableOpacity}
          onPress={() => {
            onPress(value, text, this.props.reset);
          }}
        >
          {tagScroll && (
            <AppText color={selected ? "white" : "#8B8B8B"}>{text}</AppText>
          )}
        </AppView>
      </AppView>
    );
  };

  renderKitchenScroll = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      kitchen,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX {...rest}>
        <AppView
          borderWidth={1}
          borderColor="primary"
          backgroundColor={selected ? "primary" : "white"}
          paddingHorizontal={6}
          paddingVertical={1}
          center
          onPress={() => {
            onPress(value);
          }}
          borderRadius={3}
          touchableOpacity
        >
          {kitchen && (
            <AppText color={selected ? "white" : "primary"}>{text}</AppText>
          )}
        </AppView>
      </AppView>
    );
  };

  renderCategoryScroll = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      number,
      category,
      ...rest
    } = this.props;
    return (
      <AppView style={style} centerX {...rest} marginHorizontal={2}>
        <AppView
          backgroundColor={selected ? getColors().primary : "transparent"}
          // paddingHorizontal={6}
          center
          onPress={() => {
            onPress(value);
          }}
          borderRadius={3}
          height={6}
          // width={number > 3 ? 95 / number : 90 / number}
          borderColor="#E9E8E5"
          borderWidth={1}
          stretch
          paddingHorizontal={5}
        >
          <AppText color={selected ? "white" : "darkgrey"}>{text}</AppText>
        </AppView>
      </AppView>
    );
  };

  renderDefault = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      gender,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX flex={!gender} {...rest}>
        <AppView
          borderWidth={1.5}
          borderColor={selected ? getColors().primary : getColors().grey}
          circleRadius={12}
          center
          onPress={() => {
            onPress(value);
          }}
          touchableOpacity
          marginHorizontal={2}
        >
          {name && (
            <AppImage
              source={name}
              marginHorizontal={1}
              resizeMode="contain"
              equalSize={12}
            />
          )}
        </AppView>
        {text && (
          <AppView center marginTop={2}>
            <AppText
              color={selected ? "#676767" : "#8B8B8B"}
              center
              size={5}
              bold={selected}
            >
              {text}
            </AppText>
          </AppView>
        )}
      </AppView>
    );
  };

  renderFilterItems = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      label,
      ...rest
    } = this.props;
    const price = this.props.index !== 2 && I18n.t("price");
    return (
      <AppView
        stretch
        row
      
        paddingHorizontal={10}
        onPress={() => {
          onPress(value, text);
          // this.props.hide();
        }}
        touchableOpacity
      >
        {!this.props.case && (
          <AppView
            bc={this.props.selected ? "primary" : "#ACB5BB"}
            bw={2}
            circle
            circleRadius={6}
            center
          >
            {this.props.selected ? (
              <AppView circle circleRadius={3} backgroundColor="primary" />
            ) : null}
          </AppView>
        )}
        <AppButton
          center={false}
          title={
            typeof text === "object"
              ? this.props.rtl
                ? text.ar_name
                : text.en_name
              : text
          }
          stretch
          flex
          backgroundColor="transparent"
          height={7}
          color="#6A6A6A"
          size={5.5}
          bold={this.props.buttonBold}
          onPress={() => {
            onPress(value, text);
          }}
          touchableOpacity
        />
        {this.props.case && (
          <AppView
            bc={this.props.selected ? "green" : "#ACB5BB"}
            bw={2}
            circle
            circleRadius={5}
            center
            elevation={3}
            style={cardShadowStyle}
          >
            {this.props.selected ? (
              <AppView circle circleRadius={3} backgroundColor="green" />
            ) : null}
          </AppView>
        )}
      </AppView>
    );
  };

  render() {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      gender,
      kitchen,
      category,
      search,
      icon,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        {checkBox
          ? this.renderCheckBox()
          : tagScroll
          ? this.renderTagScrool()
          : kitchen
          ? this.renderKitchenScroll()
          : category
          ? this.renderCategoryScroll()
          : search
          ? this.renderFilterItems()
          : icon
          ? this.renderIconBox()
          : this.renderDefault()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps, null)(OptionButton);
