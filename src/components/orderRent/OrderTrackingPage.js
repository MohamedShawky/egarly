import React, { useRef, useEffect } from "react";
import I18n from "react-native-i18n";
import moment from "moment";
import { useSelector } from "react-redux";
import Animated from "react-native-reanimated";
import {
  ACCEPTED,
  ON_THE_WAY,
  ARRIVED,
  IN_PROGRESS,
  PAUSED_BY_CLIENT,
  PAUSED_BY_PROVIDER
} from "../../common/utils/OrderStatus";
import { AppView, AppText, AppIcon } from "../../common";
import { runTiming } from "../../utils/animation";
import colors from "../../common/defaults/colors";
import Timer from "./Timer";

export default React.memo(props => {
  console.log(">>>>>>>>", "update");

  return (
    <AppView flex paddingVertical={10} paddingHorizontal={10}>
      <Steps {...props} />
    </AppView>
  );
});

const getTrackingSteps = order => {
  const { status, expectedExecutionDate } = order;

  const orderStatusSteps = [
    {
      status: ACCEPTED,
      active: status == ACCEPTED,
      done: status != ACCEPTED,
      icon: "check",
      iconType: "entypo",
      renderSubtitle: () => (
        <ExecutionDate expectedExecutionDate={expectedExecutionDate} />
      )
    },
    {
      status: ON_THE_WAY,
      icon: "truck",
      iconType: "feather",
      active: status == ON_THE_WAY,
      done:
        status == ARRIVED ||
        status == IN_PROGRESS ||
        status == PAUSED_BY_CLIENT ||
        status == PAUSED_BY_PROVIDER,
      renderSubtitle: () => (
        <AppText>{I18n.t("order-on-the-way-message")}</AppText>
      )
    },
    {
      status: ARRIVED,
      icon: "home",
      iconType: "simple-line",
      done:
        status == IN_PROGRESS ||
        status == PAUSED_BY_CLIENT ||
        status == PAUSED_BY_PROVIDER,
      active: status == ARRIVED,
      renderSubtitle: () => <AppText>{I18n.t("order-arrived-message")}</AppText>
    },
    {
      status: IN_PROGRESS,
      icon: "wrench-outline",
      iconType: "material-community",
      active:
        status == IN_PROGRESS ||
        status == PAUSED_BY_CLIENT ||
        status == PAUSED_BY_PROVIDER,
      done: false,
      renderSubtitle: () => <AppText>{I18n.t("order-arrived-message")}</AppText>
    }
  ];

  return orderStatusSteps;
};

const Steps = props => {
  // const { order } = props;
  const order = {};

  order.prevStatus = "ACCEPTED";
  order.status = "ON_THE_WAY";
  const { prevStatus } = order;
  const orderStatusSteps = getTrackingSteps(order);

  return orderStatusSteps.map((step, index) => {
    let animatedHeight = new Animated.Value(0);
    let height = new Animated.Value(40);
    let doneOpacity = step.done || index == 0 ? 1 : 0;
    let activeOpacity = step.active && index != 0 ? 1 : 0;
    let inActiveOpacity = !doneOpacity && !activeOpacity ? 1 : 0;
    console.log("ssssssssss prev after", prevStatus, order.status);
    if (
      index != orderStatusSteps.length - 1 &&
      orderStatusSteps[index + 1].active &&
      prevStatus !== order.status
    ) {
      animatedHeight = runTiming(new Animated.Clock(), 70, 0, 800);
      height = runTiming(new Animated.Clock(), 0, 40, 800);
      if (index != 0) {
        doneOpacity = runTiming(new Animated.Clock(), 0, 1, 800);
        activeOpacity = runTiming(new Animated.Clock(), 1, 0, 800);
      }
    } else if (step.active) {
      if (prevStatus !== order.status) {
        animatedHeight = runTiming(new Animated.Clock(), 0, 30, 800);
        activeOpacity = runTiming(new Animated.Clock(), 0, 1, 800);
        inActiveOpacity = runTiming(new Animated.Clock(), 1, 0, 800);
      } else {
        animatedHeight = new Animated.Value(30);
      }
    }

    if (prevStatus !== order.status) {
      order.prevStatus = order.status;
    }

    return (
      <OrderStatusStep
        key={step.status}
        {...step}
        index={index}
        length={orderStatusSteps.length}
        height={height}
        animatedHeight={animatedHeight}
        activeOpacity={activeOpacity}
        doneOpacity={doneOpacity}
        inActiveOpacity={inActiveOpacity}
      />
    );
  });
};

const Line = React.memo(({ active, index, done, height, animatedHeight }) => {
  let backgroundColor = "#EBEAEA";
  if (done) {
    backgroundColor = colors.done;
  }

  return (
    <AppView center>
      <Animated.View style={{ width: 1.5, height, backgroundColor }} />
      <Animated.View
        style={{
          width: 1.5,
          height: animatedHeight,
          backgroundColor: "#EBEAEA"
        }}
      />
    </AppView>
  );
});

const OrderStatusStep = props => {
  const {
    index,
    length,
    status,
    active,
    done,
    icon,
    iconType,
    doneOpacity,
    activeOpacity,
    inActiveOpacity,
    renderSubtitle: Subtitle
  } = props;
  let textColor = "#9F9F9F";
  if (done || !index) {
    textColor = "black";
  } else if (active) {
    textColor = "primary";
  }

  return (
    <AppView stretch>
      <AppView centerX stretch>
        <AppView row stretch>
          <AnimatedIcon
            type="entypo"
            icon="check"
            iconColor="white"
            backgroundColor="done"
            borderColor="done"
            opacity={doneOpacity}
            radius={10}
          />

          <AnimatedIcon
            type={iconType}
            icon={icon}
            iconColor="primary"
            borderColor="primary"
            backgroundColor="transparent"
            textColor="primary"
            radius={10}
            opacity={activeOpacity}
            style={{ position: "absolute" }}
          />
          <AnimatedIcon
            type={iconType}
            icon={icon}
            iconColor="#9F9F9F"
            backgroundColor="#EBEAEA"
            borderColor="#EBEAEA"
            radius={10}
            opacity={inActiveOpacity}
            style={{ position: "absolute" }}
          />
        </AppView>
        {index !== length - 1 && <Line {...props} />}
      </AppView>

      <AppView stretch paddingHorizontal={5}>
        <AppText paddingTop={3} color={textColor} size={6} bold>
          {I18n.t(status)}
        </AppText>
        {active && <Subtitle />}
      </AppView>
    </AppView>
  );
};

const AnimatedIcon = ({
  icon,
  iconColor,
  backgroundColor,
  borderColor,
  type,
  opacity,
  radius,
  style
}) => (
  <Animated.View style={{ opacity, ...style }}>
    <AppView
      circleRadius={radius}
      backgroundColor={backgroundColor}
      bw={1.5}
      bc={borderColor}
      center
    >
      <AppIcon name={icon} type={type} size={7} color={iconColor} />
    </AppView>
  </Animated.View>
);

const ExecutionDate = ({ expectedExecutionDate }) => {
  const rtl = useSelector(state => state.lang.rtl);
  return (
    <AppView row>
      <AppText bold>{I18n.t("order-execution-date")}</AppText>
      <AppText>
        {moment(expectedExecutionDate).format(
          ` ${rtl ? "ddd YYYY/MM/DD" : "DD/MM/YYYY ddd"} ${I18n.t(
            "hour"
          )} hh:mm a `
        )}
      </AppText>
    </AppView>
  );
};
