import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import I18n from "react-native-i18n";
import { useDispatch } from "react-redux";
import {
  AppView,
  AppButton,
  AppNavigation,
  AppText,
  AppIcon,
  AppInput,
} from "../common";
import BottomSheet from "./BottomSheet";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import ValidationDate from "./validationDate";
import { HEADER_ELEVATION } from "../common/utils/Constants";

export default React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isDateTimePickerVisible: false,
    currentPicker: "date",
    from: false,
  });

  _showDateTimePicker = (pickerType, from, dateOrTime) => {
    const currentDate =
      pickerType === "date" && dateOrTime
        ? moment(dateOrTime, "Do/MM/YYYY").toDate()
        : null;

    const currentTime =
      pickerType === "time" && dateOrTime
        ? moment(dateOrTime, "h:mm:ss a").toDate()
        : null;

    setState({
      currentPicker: pickerType,
      isDateTimePickerVisible: true,
      currentDate: currentDate || currentTime || new Date(),
      from,
    });
  };

  _hideDateTimePicker = () =>
    setState({ isDateTimePickerVisible: false, from: false });

  _handleDatePicked = (date, { setFieldValue }) => {
    if (state.currentPicker === "date") {
      if (state.from) {
        setFieldValue("dateFrom", moment(date).format("Do/MM/YYYY"));
      } else {
        setFieldValue("dateTo", moment(date).format("Do/MM/YYYY"));
      }
    } else if (state.currentPicker === "time") {
      if (state.from) {
        setFieldValue("timeFrom", moment(date).format("h:mm:ss a"));
      } else {
        setFieldValue("timeTo", moment(date).format("h:mm:ss a"));
      }
    }
    _hideDateTimePicker();
  };

  _onSubmit = (values, { setSubmitting }) => {
    const order = {};
    if (values.dateFrom && values.dateTo) {
      order.from_date = values.dateFrom;
      order.to_date = values.dateTo;
    }

    ref.current.hide();
    props.createOrder(order);
    setSubmitting(false);
  };

  _renderFromBody = (props) => {
    return (
      <>
        <AppView flex stretch>
          <OrderDateHeader />
          <AppView stretch marginHorizontal={10} marginTop={10}>
            <StartDate {...props} showDateTimePicker={_showDateTimePicker} />
            <EndDate {...props} showDateTimePicker={_showDateTimePicker} />
          </AppView>
        </AppView>
        <SafeAreaView style={{ alignSelf: "stretch" }}>
          <AppButton
            title={I18n.t("ok")}
            stretch
            touchableOpacity
            marginHorizontal={10}
            marginVertical={2.5}
            onPress={props.handleSubmit}
          />
        </SafeAreaView>

        {state.isDateTimePickerVisible && (
          <DateTimePicker
            minimumDate={new Date()}
            date={state.currentDate}
            mode={state.currentPicker}
            isVisible={state.isDateTimePickerVisible}
            onConfirm={(date) => _handleDatePicked(date, props)}
            onCancel={_hideDateTimePicker}
          />
        )}
      </>
    );
  };

  let date = new Date();


  return (
    <>
      <BottomSheet ref={ref} height={45}>
        <AppView stretch flex>
          <Formik
            initialValues={{
              // timeFrom: "",
              // timeTo: "",
              dateFrom:
                props.values.from_date !== ""
                  ? moment(props.values.from_date, "Do/MM/YYYY").format(
                      "Do/MM/YYYY"
                    )
                  : moment(date).format("Do/MM/YYYY"),
              dateTo:
                props.values.to_date !== ""
                  ? moment(props.values.to_date, "Do/MM/YYYY").format(
                      "Do/MM/YYYY"
                    )
                  : moment(date).format("Do/MM/YYYY"),
            }}
            validationSchema={ValidationDate}
            onSubmit={_onSubmit}
          >
            {_renderFromBody}
          </Formik>
        </AppView>
      </BottomSheet>
    </>
  );
});

const OrderDateHeader = () => {
  return (
    <AppView
      stretch
      paddingVertical={5}
      paddingHorizontal={10}
      backgroundColor="#F6F6F6"
      elevation={HEADER_ELEVATION}
      // bbw={1}
    >
      <AppText bold size={5}>
        {I18n.t("date-time")}
      </AppText>
    </AppView>
  );
};

const StartDate = ({
  showDateTimePicker,
  handleChange,
  handleBlur,
  errors,
  values,
  touched,
}) => {
  return (
    <AppView row>
      <AppInput
        flex={2}
        onPress={() => showDateTimePicker("date", true, values.dateFrom)}
        marginRight={4}
        editable={false}
        label={I18n.t("from")}
        leftItems={<AppIcon type="font-awesome" name="calendar-o" size={8} />}
        initialValue={values.dateFrom}
        onBlur={handleBlur("dateFrom")}
        onChange={handleChange("dateFrom")}
        error={errors.dateFrom}
        isTouched={touched.dateFrom}
        errorInput
      />

      {/* <AppInput
        onPress={() => showDateTimePicker("time", true, values.timeFrom)}
        editable={false}
        label={I18n.t("hour")}
        flex
        initialValue={values.timeFrom}
        onBlur={handleBlur("timeFrom")}
        onChange={handleChange("timeFrom")}
        error={errors.timeFrom}
        isTouched={touched.timeFrom}
        errorInput
      /> */}
    </AppView>
  );
};

const EndDate = ({
  showDateTimePicker,
  handleChange,
  handleBlur,
  errors,
  values,
  touched,
}) => {

  return (
    <AppView row>
      <AppInput
        flex={2}
        onPress={() => showDateTimePicker("date", false, values.dateTo)}
        marginRight={4}
        editable={false}
        label={I18n.t("to")}
        leftItems={<AppIcon type="font-awesome" name="calendar-o" size={8} />}
        initialValue={values.dateTo}
        onBlur={handleBlur("dateTo")}
        onChange={handleChange("dateTo")}
        error={errors.dateTo}
        isTouched={touched.dateTo}
        errorInput
      />

      {/* <AppInput
        onPress={() => showDateTimePicker("time", false, values.timeTo)}
        editable={false}
        label={I18n.t("hour")}
        flex
        initialValue={values.timeTo}
        onBlur={handleBlur("timeTo")}
        onChange={handleChange("timeTo")}
        error={errors.timeTo}
        isTouched={touched.timeTo}
        errorInput
      /> */}
    </AppView>
  );
};
