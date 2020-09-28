import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppView,
  AppIcon,
  AppImage,
  AppNavigation,
  responsiveFontSize,
  AppButton,
  responsiveHeight,
  InputError
} from "../../common";



const placholder = require("../../assets/imgs/avatar.png");

import ImagePicker from "react-native-image-picker";
const PICKER_OPTIONS = {
  title: "Select Picture",
  storageOptions: {
    quality: 0.1,
    maxWidth: 150,
    maxHeight: 150,
    skipBackup: true,
    path: "images"
  }
}
class Avatar extends Component {
  state = {
    imgUri: this.props.initialUriValue || ""
  };

  setImageUri = imgUri => {
    const { name, onChange } = this.props;
    const uri = imgUri || "";
    this.setState({
      imgUri: uri
    });

    if (onChange) onChange(name, uri);
  };

  renderReset = () => {
    return (
      <AppButton
        onPress={this.setImageUri}
        transparent
        circleRadius={10}
        style={{
          position: "absolute",
          right: -responsiveWidth(8) / 2,
          top: -responsiveWidth(8) / 2,
          zIndex: 10000
        }}
      >
        <AppView circleRadius={7} center backgroundColor="primary">
          <AppIcon name="close" type="ant" color="white" />
        </AppView>
      </AppButton>
    );
  };

  pickImage = async () => {
    ImagePicker.showImagePicker(PICKER_OPTIONS, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setImageUri(response.uri);
      }
    });
  };
  render() {
    const { width, height, error } = this.props;
    return (
      <AppView
        style={{
          overflow: "visible"
        }}
        borderRadius={10}
        borderWidth={1}
        borderColor="inputBorderColor"
        center
        onPress={this.pickImage}
        width={width || 40}
        height={height || 30}
      >
        {this.state.imgUri === "" ? (
          <AppIcon color="lightgrey" size={18} name="camera" type="feather" />
        ) : (
          <AppImage
            borderRadius={10}
            width={width - 0.5 || 39.5}
            height={height - 0.5 || 29.5}
            source={{ uri: this.state.imgUri }}
            resizeMode="cover"
          />
        )}
        {this.state.imgUri !== "" && this.renderReset()}
        {error && <InputError error={error} size={7} />}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(Avatar);
