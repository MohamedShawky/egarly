import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppView,
  AppIcon,
  AppImage,
  AppNavigation,
  responsiveFontSize
} from "../common";

const placholder = require("../assets/imgs/empityPictue.png");

class Avatar extends Component {
  state = {
    imgUri: this.props.initialUriValue || null
  };

  selectProfileImg = uri => {
    this.setState({
      imgUri: uri
    });
    this.props.onChange(uri);
  };

  renderPlusIcon = () => (
    <AppView
      center
      circleRadius={8}
      // borderRadius={5}
      borderColor="primary"
      borderWidth={1}
      backgroundColor="white"
      style={{
        position: "absolute",
        bottom: 0,
        right: this.props.rtl ?   undefined : 0,
        left: this.props.rtl ?  0 :undefined
      }}
      onPress={() =>
        AppNavigation.push({
          name: "photoSelection",
          passProps: {
            action: this.selectProfileImg
          }
        })
      }
    >
      <AppIcon
        type="custom"
        name="edit"
        size={7}
        color="primary"
        style={{
          lineHeight: responsiveFontSize(8)
        }}
      />
    </AppView>
  );

  render() {
    return (
      <AppView marginBottom={10} marginTop={5} >
        {this.state.imgUri ? (
          <AppView
            borderWidth={1}
            borderColor="grey"
            circleRadius={27}
            center
            touchableOpacity
            onPress={() =>
              AppNavigation.push({
                name: "photoSelection",
                passProps: {
                  action: this.selectProfileImg
                }
              })
            }
            style={{
              overflow: "visible"
            }}
          >
            <AppImage
              source={{ uri: this.state.imgUri }}
              resizeMode="cover"
              
              circleRadius={26}
            />
            {this.renderPlusIcon()}
          </AppView>
        ) : (
          <React.Fragment>
            <AppView
              borderWidth={1}
              borderColor="grey"
              circleRadius={26}
              center
              onPress={() =>
                AppNavigation.push({
                  name: "photoSelection",
                  passProps: {
                    action: this.selectProfileImg
                  }
                })
              }
              style={{
                overflow: "visible"
              }}
            >
              <AppImage
                source={placholder}
                circleRadius={26}
                resizeMode="contain"
              />
              {this.renderPlusIcon()}
            </AppView>
          </React.Fragment>
        )}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(Avatar);
