import React, { useState, useEffect } from "react";
import { AppState } from "react-native";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";
import I18n from "react-native-i18n";
import { AppView, AppText } from "../../common";
import { IN_PROGRESS } from "../../common/utils/OrderStatus";
import { calculateWorkingHours } from "./helper";

momentDurationFormat(moment);

export default React.memo(({ order }) => {
  const { status, workingPeriods } = order;
  const isPlay = status == IN_PROGRESS;
  const workingHours = calculateWorkingHours([...workingPeriods]);
  const [time, setTime] = useState(workingHours);
  const [appState, setAppState] = useState("");
  let interval;

  const _addSecond = () => {
    let newDuration = time;
    newDuration = moment.duration(newDuration, "seconds").add(1, "s");
    setTime(newDuration);
  };

  const _handleAppStateChange = nextAppState => {
    setAppState(nextAppState);
  };

  // / new workingPeriods
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    if (isPlay) {
      if (workingPeriods && workingPeriods.length)
        workingPeriods[workingPeriods.length - 1].endDate = null;
      else order.workingPeriods = [{ startDate: +moment.utc() }];

      const workingHours = calculateWorkingHours([...workingPeriods]);
      if (
        moment.duration(workingHours).asMilliseconds() >
        moment.duration(time).asMilliseconds()
      ) {
        setTime(workingHours);
      }
    }

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, [workingPeriods, appState]);

  // interval timer
  useEffect(() => {
    if (isPlay) {
      interval = setInterval(_addSecond, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlay, time, workingPeriods, appState]);

  return (
    <AppView>
      <AppText>{I18n.t("order-inprogress-message")}</AppText>
      <AppText bold size={8}>
        {moment.duration(time).format("hh : mm : ss", {
          stopTrim: "hh",
          userLocale: "en"
        })}
      </AppText>
      {!isPlay && <AppText color="stop">{I18n.t("time-paused")}</AppText>}
    </AppView>
  );
});
