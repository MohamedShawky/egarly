import React, { PureComponent } from "react";
import {
  View as RNView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from "react-native";

import Animated from "react-native-reanimated";

import AppBottomSheet from "reanimated-bottom-sheet";
import { responsiveHeight, windowWidth, AppView } from "../common";

export default class BottomSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.bottomSheet = React.createRef();
    this.allowCloseEnd = React.createRef(false);
    this.fadeAnim = new Animated.Value(1);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    if (this.props.onLayout) {
      this.props.onLayout();
    }
  }

  show = () => {
    this.setState(
      {
        isVisible: true
      },
      () => {
        this.bottomSheet.current.snapTo(1);
      }
    );

    if (this.props.onVisibleChange)
      this.props.onVisibleChange(true);
  };

  hide = () => {
    this.bottomSheet.current.snapTo(0);
    this.setState({
      isVisible: false
    });
    this.allowCloseEnd.current = false;
    Keyboard.dismiss();

    if (this.props.onVisibleChange)
      this.props.onVisibleChange(false);
  };

  renderContent = () =>
    this.state.isVisible ? (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "position" : "padding"}
        enabled
      >
        <RNView
          style={{
            alignSelf: "stretch",
            width: windowWidth,
            backgroundColor: this.props.backgroundColor || "white",
            height: responsiveHeight(this.props.height || 60),
            borderTopLeftRadius: this.props.borderTopLeftRadius || undefined,
            borderTopRightRadius: this.props.borderTopRightRadius || undefined
          }}
        >
          <RNView
            style={{
              width: windowWidth,
              alignSelf: "stretch",
              flex: 1
            }}
          >
            {this.props.children}
          </RNView>
        </RNView>
      </KeyboardAvoidingView>
    ) : null;

  backDrop = () =>
    this.state.isVisible
      ? this.state.isVisible && (
          <TouchableWithoutFeedback onPress={this.hide}>
            <Animated.View
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0,1)",
                opacity: Animated.interpolate(this.fadeAnim, {
                  inputRange: [0, 1],
                  outputRange: [0.5, 0]
                })
              }}
            />
          </TouchableWithoutFeedback>
        )
      : null;

  render = () => {
    let onCloseEndCallBack = false;

    return (
      this.state.isVisible && (
        <AppView
          flex
          stretch
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 100000,
            elevation: 5
          }}
        >
          <AppBottomSheet
            ref={this.bottomSheet}
            callbackNode={this.fadeAnim}
            snapPoints={[0, responsiveHeight(this.props.height || 60)]}
            renderContent={this.renderContent}
            initialSnap={0}
            onCloseEnd={() => {
              if (!this.allowCloseEnd.current) return;
              this.hide();
            }}
            onOpenStart={() => {
              Keyboard.dismiss();
              this.allowCloseEnd.current = true;
            }}
          />
          {this.backDrop()}
        </AppView>
      )
    );
  };
}
