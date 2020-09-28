import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

import {
  AppView,
  getColors,
  AppIcon,
  responsiveHeight,
  AppImage,
  responsiveWidth,
  responsiveFontSize,
  getFonts
} from "../../common";
import { getThemeColor } from "../../common/utils/colors";

const { timing, spring, Value, interpolate, color, round } = Animated;

class OrderStepper extends Component {
  static defaultProps = {
    currentStep: 0,
    size: 16,
    labelSize: 4.6,
    stepWidth: 20,
    normalColor: "#E6E8EA",
    primaryColor: getColors().primary,
    progressBarThickness: 4,
    paddingVertical: 5,
    progressWidthFull: 0,
    showProgress: false
  };

  constructor(props) {
    super(props);

    this.currentStep = {
      PENDING: 0,
      ACCEPTED: 1,
      FINISHED: 2,
      ARRIVED: 3,
      RECIEVED_BY_DELIVERY_PLACE: 2
    };

    this.state = {
      firstStepLayout: null,
      lastStepLayout: null,
      currentStep: this.currentStep[props.status] || 0,
      progressWidth: new Value(0),
      doneCalculation: false,
      useAnimationStyle: false
    };

    this.progress = new Value(this.currentStep[props.status] || 0);

    this.steps = [
      {
        normalText: I18n.t("accepted"),
        doneText: I18n.t("accepted"),
        normalImage: require("../../assets/imgs/order/pending_grey.png"),
        doneImage: require("../../assets/imgs/order/pending.png")
      },
      {
        normalText: I18n.t("check"),
        doneText: I18n.t("check"),
        normalImage: require("../../assets/imgs/order/prepairing_grey.png"),
        doneImage: require("../../assets/imgs/order/prepairing.png")
      },
      {
        normalText: I18n.t("pay-ment"),
        doneText: I18n.t("pay-ment"),
        normalImage: require("../../assets/imgs/order/pending_grey.png"),
        doneImage: require("../../assets/imgs/order/pending.png")
      },
      {
        normalText: I18n.t("deliver"),
        doneText: I18n.t("deliver"),
        normalImage: require("../../assets/imgs/order/pending_grey.png"),
        doneImage: require("../../assets/imgs/order/pending.png")
      },
      {
        normalText: I18n.t("deliver"),
        doneText: I18n.t("deliver"),
        normalImage: require("../../assets/imgs/order/pending_grey.png"),
        doneImage: require("../../assets/imgs/order/pending.png")
      }
    ];

    if (
      props.deliveryType === "DELIVERY_PLACE" ||
      props.deliveryType === "COOKER_PLACE"
    ) {
      this.steps.push({
        normalText: I18n.t("order-details-waiting"),
        doneText: I18n.t("order-details-waiting-done"),
        normalImage: require("../../assets/imgs/order/waiting_grey.png"),
        doneImage: require("../../assets/imgs/order/waiting.png")
      });
    } else {
      this.steps.push({
        normalText: I18n.t("re-rent"),
        doneText: I18n.t("re-rent"),
        normalImage: require("../../assets/imgs/order/delivary_grey.png"),
        doneImage: require("../../assets/imgs/order/delivering.png")
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.status !== nextProps.status) {
      if (typeof this.currentStep[nextProps.status] === "number") {
        this.setState(
          {
            currentStep: this.currentStep[nextProps.status]
          },
          () => {
            this.createAnimation(this.state.currentStep);
          }
        );
      }
    }
  }

  createAnimation = currentStep => {
    if (!this.state.useAnimationStyle) {
      this.setState(
        {
          useAnimationStyle: true
        },
        () => {
          this.runAnimation(currentStep);
        }
      );
    } else {
      this.runAnimation(currentStep);
    }
  };

  runAnimation = currentStep => {
    const config = {
      duration: 800,
      toValue: currentStep,
      easing: Easing.inOut(Easing.ease)
    };

    this.anim = timing(this.progress, config);

    setTimeout(() => {
      this.anim.start();
    }, 25);
  };

  renderInnerShape = (item, index) => {
    const { currentStep } = this.state;

    let image = "";
    if (index < currentStep) {
      image = "green";
    } else if (index === currentStep) {
      image = "#FFCC00";
    } else if (index > currentStep) {
      image = "#FFCC00";
    }

    const innerShapeOpacity = interpolate(this.progress, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 0, 0.8],
      extrapolate: "clamp"
    });

    const innerShapeScale = interpolate(this.progress, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    });

    return (
      <AppView
        borderColor={image}
        circleRadius={8}
        borderWidth={1}
        flex
        stretch
        center
      >
        {/* <Animated.View
          style={{
            borderRadius: responsiveWidth(8) / 2,
            backgroundColor: getThemeColor("primary"),
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: "center",
            opacity: innerShapeOpacity,
            transform: [
              {
                scale: innerShapeScale
              }
            ]
          }}
        > */}
        <AppIcon name="check" type="oct" color={image} size={12} />
        {/* </Animated.View> */}
      </AppView>
    );
  };

  renderStep = (item, index) => {
    const { size, labelSize, backgroundColor, stepWidth } = this.props;
    const { currentStep } = this.state;

    let text = "";
    let textBold = false;
    if (index < currentStep) {
      text = item.doneText;
      textBold = true;
    } else if (index === currentStep) {
      text = item.normalText;
      textBold = true;
    } else if (index > currentStep) {
      text = item.normalText;
    }

    const r = interpolate(this.progress, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [172, 72, 247],
      extrapolate: "clamp"
    });

    const g = interpolate(this.progress, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [181, 72, 82],
      extrapolate: "clamp"
    });

    const b = interpolate(this.progress, {
      inputRange: [index - 1, index, index + 1],
      outputRange: [187, 72, 37],
      extrapolate: "clamp"
    });

    const textColor = color(round(r), round(g), round(b));

    return (
      <View
        key={String(index)}
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "stretch",
          width: responsiveWidth(stepWidth)
        }}
        onLayout={e => {
          const { width, height } = e.nativeEvent.layout;

          if (index === 0) {
            this.setState({
              firstStepLayout: {
                width,
                height
              }
            });
          } else if (index === this.steps.length - 1) {
            this.setState({
              lastStepLayout: {
                width,
                height
              }
            });
          }
        }}
      >
        <AppView circleRadius={8} backgroundColor={backgroundColor} center>
          {this.renderInnerShape(item, index)}
        </AppView>
        <AppView height={labelSize * 0.75} center>
          <Animated.Text
            style={{
              color: textColor,
              fontSize: responsiveFontSize(labelSize),
              fontFamily: textBold ? getFonts().bold : getFonts().normal
            }}
          >
            {text}
          </Animated.Text>
        </AppView>
      </View>
    );
  };

  renderHorizontalBar = () => {
    const {
      rtl,
      normalColor,
      primaryColor,
      labelSize,
      progressBarThickness,
      stepWidth
    } = this.props;

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          marginLeft: stepWidth
            ? responsiveWidth(stepWidth) / 2
            : this.state.firstStepLayout
            ? this.state.firstStepLayout.width / 2
            : 0,

          marginRight: stepWidth
            ? responsiveWidth(stepWidth) / 2
            : this.state.lastStepLayout
            ? this.state.lastStepLayout.width / 2
            : 0
        }}
      >
        <View
          style={{
            marginTop: -responsiveHeight(labelSize * 0.75),
            backgroundColor: normalColor,
            width: "80%",
            height: progressBarThickness,
            flexDirection: rtl ? "row-reverse" : "row",
            overflow: "hidden"
          }}
          onLayout={e => {
            const { width } = e.nativeEvent.layout;

            if (!this.state.doneCalculation) {
              const progressWidth = interpolate(this.progress, {
                inputRange: [0, this.steps.length - 1],
                outputRange: [0, Math.round(width)],
                extrapolate: "clamp"
              });

              this.setState({
                progressWidth,
                doneCalculation: true
              });
            }
          }}
        >
          <Animated.View
            style={{
              backgroundColor: primaryColor,
              width: this.state.useAnimationStyle
                ? this.state.progressWidth
                : `${Math.min(
                    Math.round(
                      (this.state.currentStep / (this.steps.length - 1)) * 100
                    ),
                    100
                  )}%`,
              height: "100%"
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const { backgroundColor, ...rest } = this.props;

    return (
      <AppView
        {...rest}
        backgroundColor={backgroundColor}
        stretch
        borderColor="red"
        borderWidth={2}
      >
        <AppView
          stretch
          row
          spaceBetween
          borderColor="green"
          marginHorizontal={1}
          borderWidth={2}
        >
          {this.renderHorizontalBar()}
          {this.steps.map((item, index) => this.renderStep(item, index))}
        </AppView>
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(OrderStepper);
