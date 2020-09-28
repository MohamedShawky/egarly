import React, { Component } from "react";
import PropsTypes from "prop-types";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { AppView, AppText, AppModal, AppIcon, AppButton } from "../common";

class InfoModal extends Component {
  static propTypes = {
    type: PropsTypes.string
  };

  static defaultProps = {
    type: "success"
  };

  renderInfo = (iconSize, iconName, iconType) => {
    const {
      isVisible,
      type,
      marginHorizontal,
      lineHeight,
      message,
      onConfirm,
      bold,
      ...rest
    } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        lock
        {...rest}
      >
        <AppView
          width={65}
          backgroundColor="white"
          padding={6}
          borderRadius={5}
          center
        >
          <AppIcon
            name={iconName}
            type={iconType}
            size={iconSize}
            color="primary"
            mb={4}
          />
          <AppText
            center
            marginHorizontal={marginHorizontal}
            lineHeight={lineHeight}
            bold={bold}
          >
            {this.props.message}
          </AppText>
          <AppButton
            title={I18n.t("proceed-button")}
            marginVertical={5}
            paddingHorizontal={15}
            touchableOpacity
            onPress={this.props.onConfirm}
          />
        </AppView>
      </AppModal>
    );
  };

  renderConfirmMessage = () => {
    const {
      isVisible,
      type,
      marginHorizontal,
      lineHeight,
      message,
      onConfirm,
      secondMessage,
      buttonText,
      ...rest
    } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        lock
        {...rest}
      >
        <AppView
          width={80}
          backgroundColor="white"
          padding={6}
          borderRadius={5}
        >
          <AppText
            center
            marginHorizontal={marginHorizontal}
            lineHeight={lineHeight}
            color="black"
            bold
            marginBottom={3}
          >
            {message}
          </AppText>
          {secondMessage && (
            <AppText
              marginHorizontal={marginHorizontal}
              lineHeight={lineHeight}
              color="#888888"
            >
              {secondMessage}
            </AppText>
          )}
          <AppView rightSelf={!this.props.rtl} leftSelf={this.props.rtl} marginTop={7}>
            <AppButton
              title={buttonText || I18n.t("skip")}
              paddingHorizontal={8}
              touchableOpacity
              onPress={onConfirm}
              // marginTop={5}
              height={6}
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  };

  render() {
    const {
      isVisible,
      type,
      marginHorizontal,
      lineHeight,
      ...rest
    } = this.props;

    let iconName;
    let iconSize;
    let iconType;

    switch (type) {
      case "success":
        iconName = "checkbox-marked-circle-outline";
        iconSize = 30;
        iconType = "material-community";
        break;
      case "error":
        iconName = "close";
        iconSize = 50;
        iconType = "material-community";
        break;
      case "warn":
        iconName = "warning";
        iconSize = 50;
        iconType = "material";
        break;
      default:
        iconName = "";
        iconSize = 40;
    }

    return (
      <>
        {this.props.confirmInfo
          ? this.renderConfirmMessage()
          : this.renderInfo(iconSize, iconName, iconType)}
      </>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(InfoModal);
