import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-native-navigation";
import { ifIphoneX } from "react-native-iphone-x-helper";
import { Formik } from "formik";
import {
  AppView,
  AppScrollView,
  AppNavigation,
  responsiveHeight,
  AppText,
  AppButton,
  AppIcon,
  AppImage,
  AppInput,
  AppInputError,
} from "../../common";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader,
} from "../../components";
import {
  SearchInput,
  WelcomeHeader,
  Swiper,
  ProductToRent,
  OfferRent,
} from "../../components/home";

import CustomBottomTabs from "../Home/CustomBottomTabs";
import avatar from "../../assets/imgs/avatar.png";
import {
  AddImage,
  Descriptions,
  Price,
  ProductDeliver,
} from "../../components/addProduct";
import { CreateOrderBarStepper } from "../../components/orderRent";
import OrderDateBottomSheet from "../../components/OrderDateBottomSheet";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import Validations from "./Validations";
import {
  ProductInfo,
  DateTime,
  NumberToRent,
} from "../../components/orderRent/ProductInfo";

import * as OrderRepo from "../../repo/OrderRepo";
import moment, { months } from "moment";
import InputError from "../../common/micro/InputError";
import { PaymentRow } from "../../components/orderRent/Payment";
import AgreeToReRent from "../../components/appModals/AgreeToReRent";
import { Header } from "../addProduct/AddProduct";
class Home extends Component {
  constructor(props) {
    super(props);
    this.dateBottomSheet = React.createRef();
    this.deliverRef = React.createRef();
    this.state = {
      isChecked: false,
      delivery_type_value: [],
    };
  }
  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  onSubmit = async (values, { setSubmitting, isSubmitting }) => {
    console.log("on submit ", values);

    setSubmitting(true);
    const order = {};

    order.note = values.note;

    const dateTo = moment(values.to_date, "Do-MM-YYYY")
      .locale("en")
      .format("Do-MM-YYYY");
    const datFrom = moment(values.from_date, "Do-MM-YYYY")
      .locale("en")
      .format("Do-MM-YYYY");

    console.log("88888888888>>>>>", dateTo);

    order.products = JSON.stringify([
      {
        id: this.props.productId,
        from_date: datFrom,
        to_date: dateTo,
        quantity: values.quantity,
        delivery_type: values.delivery_type[0],
      },
    ]);
    console.log("order To rent", order);

    try {
      const response = await OrderRepo.orderToRent(order);
      this.setState({
        isChecked: true,
      });

      console.log("reposen", response);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  renderContent = () => (
    <AppView stretch flex paddingBottom={10}>
      <AppHeader title={I18n.t("rent-order")} hideBack />
      <CreateOrderBarStepper
        arrayOfstepsKey="create-order-rent-steps"
        currentStep={1}
      />
      <AppScrollView
        stretch
        flex
        paddingTop={5}
        paddingHorizontal={7}
        paddingBottom={35}
      >
        {/* <ProductInfo /> */}
      </AppScrollView>
    </AppView>
  );

  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        id: "",
        // moment(data.from_date).format("Do/MM/YYYY")
        from_date: moment(new Date()).format("Do/MM/YYYY"),
        to_date: moment(new Date()).format("Do/MM/YYYY"),

        note: "",
        quantity: 1,
        delivery_type: "",
      }}
      validationSchema={Validations}
      onSubmit={(values, { setSubmitting, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, isSubmitting })
      }
    >
      {this.renderFormBody}
    </Formik>
  );

  renderNumberToRent = (props) => {
    const { values, setFieldValue } = props;
    return (
      <AppView
        stretch
        marginTop={5}
        style={cardShadowStyle}
        elevation={1.5}
        paddingVertical={5}
        borderRadius={10}
        backgroundColor="white"
        paddingHorizontal={2}
      >
        <AppView stretch spaceBetween row>
          <AppText bold>{I18n.t("count")}</AppText>
          <AppText>
            {I18n.t("number-availabl", { number: this.props.data.quantity })}
          </AppText>
        </AppView>

        <AppText size={5} color="labelText" marginVertical={5}>
          {I18n.t("number-to-rent")}
        </AppText>
        <AppView
          backgroundColor="#F3F3F3"
          borderRadius={10}
          height={6}
          row
          stretch
          spaceBetween
        >
          <AppButton
            leftIcon={
              <AppIcon name="plus" type="ant" color="white" size={10} />
            }
            backgroundColor="green"
            circleRadius={8}
            center
            noPadding
            marginHorizontal={4}
            onPress={() => {
              if (+values.quantity < this.props.data.quantity) {
                setFieldValue("quantity", +values.quantity + 1);
              }
            }}
          />

          <AppView flex center>
            <AppText>{values.quantity}</AppText>
          </AppView>

          <AppButton
            leftIcon={
              <AppIcon name="minus" type="ant" color="white" size={10} />
            }
            backgroundColor="#B2B2B2"
            circleRadius={8}
            center
            noPadding
            marginHorizontal={4}
            onPress={() => {
              if (+values.quantity > 1) {
                setFieldValue("quantity", +values.quantity - 1);
              }
            }}
          />
        </AppView>
      </AppView>
    );
  };
  renderTransportation = (props) => {
    console.log("props ==>", props);
    let data = null;
    if (props.values.delivery_type !== "") {
      console.log(
        "this.props.data.delivery_type_values",
        this.props.data.delivery_type_values,
        props.values.delivery_type
      );

      const filterData = this.props.data.delivery_type_values.filter(
        (i) => i.id === props.values.delivery_type
      );
      const merchant = props.values.delivery_type.map((id) =>
        this.props.data.delivery_type_values.find((item) => item.id === id)
      );

      data = merchant;
    }

    return (
      <Header
        label={I18n.t("product-trans")}
        title={
          data !== null
            ? data.map((item) => item.ar_name).join("/")
            : I18n.t("define")
        }
        onPress={() => {
          this.deliverRef.current.show();
        }}
        require
      />
    );
  };
  renderFormBody = (props) => {
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

    let days = 1;
    const { price_per_day, price_per_week, price_per_month } = this.props.data;
    let price = price_per_day;

    let week = null;
    let month = null;
    if (values.from_date && values.to_date) {
      const now = moment(values.from_date, "D MM YYYY"); //todays date
      const end = moment(values.to_date, "D MM YYYY"); // another date

      // var startDate = moment(values.from_date, "DD/MM/YYYY");
      // var endDate = moment(values.to_date, "DD/MM/YYYY");
      // var dateDiff = endDate.diff(startDate, "days");

      const duration = moment.duration(end.diff(now));

      days = Math.floor(duration.asDays());
      week = Math.floor(duration.asWeeks());
      month = Math.floor(duration.months());
    } else {
      days = 1;
    }

    console.log("days", days);
    console.log("week", week);
    console.log("month ", month);

    if (
      week !== null &&
      week > 0 &&
      price_per_week > 0 &&
      (month === 0 || !price_per_month)
    ) {
      console.log("in weeks --->>>");

      if (week * 7 === days) {
        price = price_per_week * week;
      } else {
        const daysDiffWeek = days - week * 7;
        price = price_per_week * week + daysDiffWeek * price_per_day;
      }
    } else if (month !== null && month > 0 && price_per_month > 0) {
      const diffMonth = days - 30 * month;
      // 9
      const diffWeek = diffMonth / 7;
      //1

      const diffDay = diffMonth - Math.floor(diffWeek) * 7;
      //2

      console.log(
        "diffMonth",
        diffMonth,
        "diffMonth",
        Math.floor(diffWeek),
        "diffMonth",
        diffDay
      );

      price =
        price_per_month * month +
        Math.floor(diffWeek) * price_per_week +
        diffDay * price_per_day;
    } else if (days === 0 && week === 0 && month === 0) {
      price = price_per_day * 1;
    } else {
      price = price_per_day * days;
    }

    return (
      <>
        <AppHeader title={"طلب تآجير"} />

        <AppView stretch flex>
          <AppScrollView
            stretch
            flex
            paddingHorizontal={7}
            paddingTop={10}
            paddingBottom={responsiveHeight(5)}
          >
            <ProductInfo
              flat
              // paddingHorizontal={7}
              data={this.props.data}
            />
            <DateTime
              onPress={() => {
                this.dateBottomSheet.current.show();
              }}
              {...props}
              flat
            />
            <AppView stretch>
              {(errors.from_date ||
                errors.to_date ||
                touched.from_date ||
                touched.to_date) && (
                <InputError
                  error={
                    touched.from_date || touched.to_date
                      ? errors.from_date || errors.to_date
                      : " "
                  }
                  errorTextMarginHorizontal={5}
                  errorTextMarginBottom={2}
                  size={6}
                />
              )}
            </AppView>
            {this.renderNumberToRent(props)}

            {this.renderTransportation(props)}
            <AppView stretch marginVertical={5}>
              <AppText>ارسل رساله لصاحب السلعه مع الطلب</AppText>
            </AppView>

            <AppInput
              placeholder={I18n.t("label-desc")}
              initialValue={values.note}
              onBlur={handleBlur("note")}
              onChange={handleChange("note")}
              error={errors.note}
              isTouched={touched.note}
            />
            <AppView
              marginTop={5}
              style={cardShadowStyle}
              elevation={1.5}
              paddingVertical={5}
              borderRadius={10}
              backgroundColor="#F3F3F3"
              paddingHorizontal={2}
              stretch
            >
              <AppText bold>{I18n.t("conclusion")}</AppText>

              {values.delivery_type_values !== null && (
                <PaymentRow
                  label={I18n.t("product-trans")}
                  value={this.state.delivery_type_value
                    .map((i) => {
                      return i.ar_name;
                    })
                    .join("/")}
                />
              )}

              <PaymentRow label={I18n.t("days")} value={days==0?1 : days} />
              <PaymentRow
                label={I18n.t("product-number")}
                value={values.quantity}
              />
              <PaymentRow
                label={I18n.t("product-price-rent")}
                value={`${this.props.data.price_per_day} ريال لليوم الواحد`}
              />

              <PaymentRow
                label={I18n.t("total-rent-price")}
                valueStyle={{ color: "green" }}
                value={price * values.quantity}
              />
            </AppView>
          </AppScrollView>

          <AppButton
            disabled={
              Object.keys(errors).length > 0 ||
              Object.keys(touched).length === 0
            }
            stretch
            processing={isSubmitting}
            margin={7}
            title={I18n.t("next")}
            onPress={() => {
              AppNavigation.push({
                name: "termsAndCondition",
                passProps: {
                  handleSubmit: handleSubmit,
                  isSubmitting,
                },
              });
            }}
          />
          <OrderDateBottomSheet
            ref={this.dateBottomSheet}
            createOrder={(order) => {
              setFieldValue("from_date", order.from_date);
              setFieldValue("to_date", order.to_date);
            }}
            {...props}
          />
          <ProductDeliver
            ref={this.deliverRef}
            initialValue={values.delivery_type}
            data={this.props.data.delivery_type_values}
            single
            {...props}
            onChange={(v) => {
              this.setState({
                delivery_type_value: v,
              });
            }}
          />
        </AppView>
      </>
    );
  };

  render() {
    return (
      <>
        {this.renderForm()}
        <AgreeToReRent
          visible={this.state.isChecked}
          changeState={(v) => {
            this.setState(
              {
                isChecked: false,
              },
              () => {
                AppNavigation.pop();
              }
            );
          }}
          orderConfirmation
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Home);
