import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton,
  AppScrollView,
  AppInput,
  responsiveFontSize,
  showError,
} from "../../common";
import BottomSheet from "../BottomSheet";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import InputError from "../../common/micro/InputError";
import { Formik } from "formik";
import Validations from "./Validations";
import DateTimeWheelPicker from "./DateTimeWheelPicker";
import Axios from "axios";
class NotifyAboutProductBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      modalVisible: false,
      reasons: [],
      reasonLoad: true,
      dataToPicker: [],
    };
  }

  componentDidMount() {
    console.log("did mount");

    this.getReasons();
  }
  onSubmit = (value) => {
    this.props.onConfirm(value);
    this.hide();
  };

  show = () => {
    this.bottomSheetRef.current.show();
    this.setState({
      mount: true,
    });
  };

  hide = () => {
    this.bottomSheetRef.current.hide();
    this.setState({
      mount: false,
    });
  };

  renderForm = () => {
    return (
      <Formik
        initialValues={{
          reason: "",
          comment: "",
        }}
        validationSchema={Validations}
        onSubmit={(values, { setSubmitting, isSubmitting }) =>
          this.onSubmit(values, { setSubmitting, isSubmitting })
        }
      >
        {this.renderContent}
      </Formik>
    );
  };

  renderAction = ({ handleSubmit, isSubmitting }) => {
    return (
      <AppButton
        title={I18n.t("send")}
        stretch
        backgroundColor="primary"
        onPress={handleSubmit}
        processing={isSubmitting}
      />
    );
  };
  renderContent = (props) => {
    const {
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      values,
      touched,
      setFieldValue,
    } = props;

    console.log("values ==>>", values.reason);

    return (
      <AppView stretch paddingHorizontal={7}>
        <AppView height={10} paddingTop={5} centerX stretch>
          <AppText bold>{I18n.t("notify-product")}</AppText>
        </AppView>
        <AppView row stretch marginBottom={2}>
          <AppText>{I18n.t("why-to-notify")}</AppText>
          <AppIcon
            name="md-star"
            color="#EA5C5E"
            maringHorizontal={1}
            size={4.5}
          />
        </AppView>
        <AppView
          stretch
          backgroundColor="#F3F3F3"
          borderRadius={7}
          row
          spaceBetween
          height={6}
          paddingHorizontal={4}
          onPress={this.handleHideModal}
        >
          <AppText>
            {values.reason ? values.reason[0].ar_name : I18n.t("reason")}
          </AppText>
          <AppIcon name="ios-arrow-down" />
        </AppView>
        <InputError
          error={touched.reason ? errors.reason : " "}
          errorTextMarginHorizontal={5}
          errorTextMarginBottom={2}
          size={6}
        />

        <AppView stretch row marginBottom={2}>
          <AppText>{I18n.t("label-comment")}</AppText>
          <AppIcon
            name="md-star"
            color="#EA5C5E"
            maringHorizontal={1}
            size={4.5}
          />
        </AppView>
        <AppInput
          initialValue={values.comment}
          onBlur={handleBlur("comment")}
          onChange={handleChange("comment")}
          error={errors.comment}
          isTouched={touched.comment}
          height={18}
          errorInput
          multiline
        />
        {this.renderAction(props)}
        {this.renderWheels(props)}
      </AppView>
    );
  };
  handleHideModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };
  renderWheels = (props) => {
    const { modalVisible } = this.state;
    const { values, setFieldValue } = props;
    return (
      <DateTimeWheelPicker
        modalVisible={modalVisible}
        hide={this.handleHideModal}
        itemTextSize={responsiveFontSize(6.5)}
        selectedItemTextSize={responsiveFontSize(7.5)}
        selectedValue={values.reason}
        reasonLable
        label={I18n.t("this-product")}
        wheels={[
          {
            // data: ["كراهيه", "غير اخلاقي", "مكرر", "عشوائي", "اخري"],
            data: this.state.dataToPicker,
          },
        ]}
        showClose
        wheelsMarginHorizontal={55}
        // label={I18n.t("define-ds")}
        initialValue={["مكرر"]}
        onChange={(value) => {
          console.log("value ==>", value);

          const selected = this.state.reasons.filter(
            (i) => i.ar_name === value[0]
          );
          console.log("selected", selected);

          setFieldValue("reason", selected);

          this.handleHideModal();
        }}
      />
    );
  };
  getReasons = async () => {
    try {
      const res = await Axios.get(
        "http://dev.fudexsb.com/demo/ejarly/public/api/product/report/status"
      );
      console.log("res", res.data);
      const dataToPicker = res.data.map((i) => i.ar_name);

      this.setState({
        reasons: res.data,
        reasonLoad: false,
        dataToPicker,
      });
    } catch (error) {
      showError(I18n.t("ui-error-happened"));
    } finally {
      this.setState({
        reasonLoad: false,
      });
    }
  };
  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={60}
        borderTopRightRadius={7}
        borderTopLeftRadius={7}
      >
        {this.state.mount && <>{this.renderForm()}</>}
      </BottomSheet>
    );
  }
}

export default NotifyAboutProductBottomSheet;
