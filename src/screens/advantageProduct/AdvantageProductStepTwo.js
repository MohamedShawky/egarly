import React, { Component } from "react";

import {
  AppView,
  AppButton,
  AppNavigation,
  AppText,
  AppImage,
  AppIcon,
  AppScrollView,
  AppInput,
  showError,
  showSuccess,
} from "../../common";
import { AppHeader } from "../../components";
import advProduct from "../../assets/imgs/advProduct.png";
import I18n from "react-native-i18n";
import { HEADER_ELEVATION } from "../../common/utils/Constants";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import { Formik } from "formik";
import moment from "moment";

import StatusProductBottomSheet from "../../components/StatusProductBottomSheet";
import * as ProductRepo from "../../repo/ProductRepo";
import { Price } from "../../components/addProduct";
import DateTimePicker from "react-native-modal-datetime-picker";
import Validations from "./validations";
import { OrderAccepted } from "../../components/appModals";

class AdvantageProductStepTwo extends Component {
  constructor(props) {
    super(props);
    this.statusProductBottomSheetRef = React.createRef();
    this.formikRef = React.createRef();
  }
  state = {
    isDateTimePickerVisible: false,
    currentValue: 0,
    currentPicker: "date",
    loading: true,
    isModaleVisible: false,
  };

  async componentDidMount() {
    try {
      const d = await ProductRepo.distinguishStatuses();
      console.log("distinguishStatuses", d);

      this.setState({
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  showDateTimePicker = (pickerType, from, dateOrTime, name) => {
    const currentDate =
      pickerType == "date" && dateOrTime
        ? moment(dateOrTime, "D-M-YYYY").toDate()
        : null;

    const currentTime =
      pickerType == "time" && dateOrTime
        ? moment(dateOrTime, "h:mm:ss a").toDate()
        : null;

    console.log("this.state.dateOrTime", name);

    this.setState({
      currentPicker: pickerType,
      isDateTimePickerVisible: true,
      currentDate: currentDate || currentTime || new Date(),
      from,
      name,
    });
  };

  hideDateTimePicker = () =>
    this.setState({ isDateTimePickerVisible: false, from: false });

  handleDatePicked = (
    date,
    { handleChange, errors, values, setFieldError, setFieldValue, touched }
  ) => {
    console.log("this.state.dateOrTime", this.state.dateOrTime, date);

    if (this.state.currentPicker === "date") {
      setFieldValue(
        this.state.name,
        moment(date)
          .locale("en")
          .startOf("date")
          .format("DD-M-YYYY")
      );
    } else if (this.state.currentPicker === "time") {
      setFieldValue("time", moment(date).format("hh:mm a"));
    }
    this.hideDateTimePicker();
  };
  onSubmit = async (values, { setSubmitting, isSubmitting }) => {
    console.log("values [[[[]]]] ==>>", values);
    const data = { ...values };
    // data.price_day = values.price_per_day;
    // data.price_week = values.price_per_week;
    // data.price_for_three_times = values.price_per_month;
    data.distinction_status_id = values.distinction_status_id[0].id;

    console.log("data ==>>", data);

    try {
      const res = await ProductRepo.setProductDistinguish(data);
      console.log("res --->", res);

      if (res) {
        this.setState({
          isModaleVisible: true,
        });
      }
      setSubmitting(false);
      // showSuccess("تم بنجاح تميز المنتج");
    } catch (error) {
      console.log("error", error);

      this.setState({
        isModaleVisible: false,
      });
      if (typeof error === "object") {
        showError(error.message);
      }
      setSubmitting(false);
    }
  };
  renderForm = () => {
    return (
      <Formik
        ref={this.formikRef}
        initialValues={{
          product_id: this.props.product_id,
          distinction_status_id: "",

          price_per_day: "",
          price_per_week: "",
          price_per_month: "",
          from_date: "",
          to_date: "",
          message: "",
        }}
        validationSchema={Validations}
        onSubmit={(values, { setSubmitting, isSubmitting }) =>
          this.onSubmit(values, { setSubmitting, isSubmitting })
        }
      >
        {this.renderFormBody}
      </Formik>
    );
  };
  renderFormBody = (props) => {
    const {
      errors,
      values,
      handleBlur,
      handleChange,
      touched,
      isSubmitting,
      handleSubmit,
    } = props;
    return (
      <AppView stretch flex>
        <AppScrollView
          flexGrow
          stretch
          // paddingHorizontal={5}
          paddingBottom={10}
        >
          <AppImage
            source={
              values.distinction_status_id !== "" &&
              values.distinction_status_id[0].image !== null
                ? {
                    uri: `http://ejarly.dev.fudexsb.com/uploads/${
                      values.distinction_status_id[0].image
                    }`,
                  }
                : advProduct
            }
            cover
            height={45}
            stretch
            // width={100}
          />

          <AppView stretch paddingHorizontal={5} flex={1}>
            <AppView stretch marginBottom={3}>
              <AppText>{I18n.t("status-product-type")}</AppText>
            </AppView>

            <AppInput
              initialValue={
                values.distinction_status_id &&
                values.distinction_status_id[0].ar_name
              }
              onBlur={handleBlur("distinction_status_id")}
              onChange={handleChange("distinction_status_id")}
              error={errors.distinction_status_id}
              isTouched={touched.distinction_status_id}
              height={6}
              placeholder={I18n.t("status-product-type")}
              editable={false}
              onPress={() => this.statusProductBottomSheetRef.current.show()}
            />
            <AppView row stretch marginVertical={2}>
              <AppText bold>
                {values.distinction_status_id &&
                  values.distinction_status_id[0].ar_description || "ادخل وصف"}  
              </AppText>
              {/* <AppIcon name="star" type="ant" size={7} color="#FF9292" /> */}
            </AppView>
            {/* describtion  */}
            <AppView row stretch marginBottom={5} >
              <AppText>سعر الخدمه</AppText>
              {/* <AppIcon name="star" type="ant" size={7} color="#FF9292" /> */}
            </AppView>
            <Price
              {...props}
              adv
              distinction_status_id
              labelDay="مره"
              labelWeek="مرتان"
              labelMonth="ثلاث مرات"
              editable={false}
            />
            <AppView stretch marginBottom={3}>
              <AppText>{I18n.t("date")}</AppText>
            </AppView>

            <AppView stretch row>
              <AppInput
                initialValue={values.from_date}
                onBlur={handleBlur("from_date")}
                onChange={handleChange("from_date")}
                error={errors.from_date}
                isTouched={touched.from_date}
                height={6}
                placeholder={I18n.t("date-from")}
                editable={false}
                onPress={() =>
                  this.showDateTimePicker(
                    "date",
                    false,
                    values.from_date,
                    "from_date"
                  )
                }
                flex
              />
              <AppView width={5} />
              <AppInput
                initialValue={values.to_date}
                onBlur={handleBlur("to_date")}
                onChange={handleChange("to_date")}
                error={errors.to_date}
                isTouched={touched.to_date}
                height={6}
                placeholder={I18n.t("date-to")}
                editable={false}
                onPress={() =>
                  this.showDateTimePicker(
                    "date",
                    false,
                    values.to_date,
                    "to_date"
                  )
                }
                flex
              />
            </AppView>
            <AppView stretch marginTop={10}>
              <AppText>رسالة الطلب</AppText>
            </AppView>
            <AppInput
              initialValue={values.message}
              onBlur={handleBlur("message")}
              onChange={handleChange("message")}
              error={errors.message}
              isTouched={touched.message}
              height={20}
              marginTop={5}
              multiline
            />
          </AppView>
        </AppScrollView>
        <AppButton
          title={I18n.t("next")}
          backgroundColor="primary"
          stretch
          marginVertical={10}
          onPress={handleSubmit}
          marginHorizontal={5}
          processing={isSubmitting}
        />
        {this.state.isDateTimePickerVisible && (
          <DateTimePicker
            minimumDate={this.state.minimumDate}
            date={this.state.currentDate}
            mode={this.state.currentPicker}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(date) => this.handleDatePicked(date, props)}
            onCancel={this.hideDateTimePicker}
            is24Hour={false}
          />
        )}
      </AppView>
    );
  };
  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("adv-product")} />
        {this.renderForm()}

        <StatusProductBottomSheet
          ref={this.statusProductBottomSheetRef}
          onConfirm={(val) => {
            this.formikRef.current.setFieldValue("distinction_status_id", val);
            this.formikRef.current.setFieldValue(
              "price_per_day",
              val[0].price_for_once.toString()
            );

            this.formikRef.current.setFieldValue(
              "price_per_week",
              val[0].price_for_twice.toString()
            );
            this.formikRef.current.setFieldValue(
              "price_per_month",
              val[0].price_for_three_times.toString()
            );
          }}
        />
        <OrderAccepted
          visible={this.state.isModaleVisible}
          messageHint={"تم بنجاح تميز المنتج"}
          changeState={(v) => {
            this.setState(
              {
                isModalVisible: false,
              },
              () => {
                AppNavigation.pop();
              }
            );
          }}
        />
      </AppView>
    );
  }
}

export default AdvantageProductStepTwo;
