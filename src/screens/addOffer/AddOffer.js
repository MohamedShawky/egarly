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
  showSuccess,
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

import DateTimePicker from "react-native-modal-datetime-picker";

// import BottomSheet from "./BottomSheet";
import moment from "moment";

import CustomBottomTabs from "../Home/CustomBottomTabs";
import avatar from "../../assets/imgs/avatar.png";
import { AddImage, Descriptions, Price } from "../../components/addOffer";
import * as ProductRepo from "../../repo/ProductRepo";
import { Header } from "../addProduct/AddProduct";
import CategeoryBottomShet from "../../components/CategeoryBottomShet";
import ProfessionBottomSheet from "../../components/ProfessionBottomSheet";
import { ProductLocation, ProductDeliver } from "../../components/addProduct";
import ModalConfirm from "../../components/appModals/ModalConfirm";
import validationSchema from "./validation";
import { OrderAccepted } from "../../components/appModals";

class Home extends Component {
  constructor(props) {
    super(props);
    this.categeoryRef = React.createRef();
    this.professionRef = React.createRef();
    this.statusRef = React.createRef();
    this.deliverRef = React.createRef();
  }
  state = {
    categories: [],
    selectedItems: [],
    categoryLoading: true,
    status: null,
    statusLoading: true,
    jobs: [],
    jobsLoading: true,
    catSelected: [],
    errorOfPrice: null,
    isModalVisible: false,
    isModalVisibleConfirm: false,
    selectedDelivryTypes: [],
    profession: [],
    isModalVisibleConfirm: false,
  };
  componentDidMount() {
    this.getCategeory();
    this.getStatus();
    this.getJobs();
  }

  getCategeory = async () => {
    console.log("**** ==>");

    try {
      const categeory = await ProductRepo.getAllCategeory();
      this.setState({
        categories: categeory,
        categoryLoading: false,
      });
    } catch (error) {
      this.setState({
        categoryLoading: false,
      });

      // showError(error);
    }
  };

  getStatus = async () => {
    console.log("**** ==>");

    try {
      const status = await ProductRepo.getAlltatus();
      console.log("**********************************", status);

      this.setState({
        status,
        statusLoading: false,
      });
    } catch (error) {
      this.setState({
        statusLoading: false,
      });

      // showError(error);
    }
  };

  getJobs = async () => {
    console.log("**** ==>");

    try {
      const jobs = await ProductRepo.getAllJobs();
      this.setState({
        jobs,
        jobsLoading: false,
      });
    } catch (error) {
      this.setState({
        jobsLoading: false,
      });

      // showError(error);
    }
  };

  _showDateTimePicker = (pickerType, from, dateOrTime) => {
    const currentDate =
      pickerType === "date" && dateOrTime
        ? moment(dateOrTime, "Do/MM/YYYY").toDate()
        : null;

    const currentTime =
      pickerType === "time" && dateOrTime
        ? moment(dateOrTime, "h:mm:ss a").toDate()
        : null;

    this.setState({
      currentPicker: pickerType,
      isDateTimePickerVisible: true,
      currentDate: currentDate || currentTime || new Date(),
      from,
    });
  };

  _hideDateTimePicker = () =>
    this.setState({ isDateTimePickerVisible: false, from: false });

  _handleDatePicked = (date, { setFieldValue }) => {
    if (this.state.currentPicker === "date") {
      if (this.state.from) {
        setFieldValue("date_from", moment(date).format("Do-MM-YYYY"));
      } else {
        setFieldValue("date_to", moment(date).format("Do-MM-YYYY"));
      }
    } else if (state.currentPicker === "time") {
      if (state.from) {
        setFieldValue("timeFrom", moment(date).format("h:mm:ss a"));
      } else {
        setFieldValue("timeTo", moment(date).format("h:mm:ss a"));
      }
    }
    this._hideDateTimePicker();
  };
  onSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("on submit", values);

    this.setState({
      isModalVisibleConfirm: false,
    });

    let images = (images = [values.images1, values.images2, ...values.images3]);

    if (images.length < 3) {
      setFieldError("images1", I18n.t("input-required-error"));
      return;
    }
    try {
      const data = new FormData();
      data.append("ar_title", values.ar_title);

      data.append("en_title", values.ar_title);
      data.append("en_description", values.ar_description);
      data.append("ar_description", values.ar_description);
      data.append("en_title", values.ar_title);
      if (values.job_id) {
        data.append("job_id", values.job_id);
      }

      if (values.delivery_type) {
        data.append("delivery_types", JSON.stringify(values.delivery_type));
      }

      data.append(
        "date_from",
        moment(values.date_from, "D-MM-YYY")
          .locale("en")
          .format("D-MM-YYY")
      );
      data.append(
        "date_to",
        moment(values.date_to, "D-MM-YYY")
          .locale("en")
          .format("D-MM-YYY")
      );
      data.append("price_from", values.price_from);
      data.append("price_to", values.price_to);
      if (values.city_id) {
        data.append("city_id", values.city_id);
      }

      if (values.latitude && values.longitude) {
        data.append("latitude", values.latitude);
        data.append("longitude", values.longitude);
      }

      data.append("categories", JSON.stringify(values.categories));

      if (images.length) {
        images.forEach((img) => {
          data.append("images[]", {
            uri: img,
            type: "image/*",
            name: "images",
          });
        });
      }

      console.log("data add Offer ==>>", data);

      const res = await ProductRepo.addOffer(data);
      console.log("res", res);

      showSuccess(res.data.message);
      this.setState({
        isModalVisible: true,
      });
      setSubmitting(false);
    } catch (error) {
      this.setState({
        isModalVisible: false,
        isModalVisibleConfirm: false,
      });
      setSubmitting(false);
      // AppNavigation.pop();
      console.log("***", error);
    }
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  renderContent = () => (
    <AppView stretch flex>
      <AppHeader title={I18n.t("add-offer")} />

      {this.renderForm()}
      {/* <CustomBottomTabs componentId={this.props.componentId} /> */}
    </AppView>
  );

  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        images: [],
        description: "",

        date_from: "",
        date_to: "",
        price_from: "",
        price_to: "",
        latitude: "",
        longitude: "",
        delivery_type: [],
      }}
      validationSchema={validationSchema(this.fromikRef)}
      onSubmit={(values, { setSubmitting, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, isSubmitting })
      }
    >
      {this.renderFormBody}
    </Formik>
  );

  renderFormBody = (props) => {
    const {
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      values,
      touched,
    } = props;

    return (
      <>
        <AppScrollView
          stretch
          flex
          paddingTop={5}
          paddingHorizontal={7}
          paddingBottom={20}
        >
          <AddImage {...props} />
          {/* <AppInputError error={}/> */}
          <Descriptions {...props} />
          <AppView row stretch spaceBetween width={86}>
            <AppView width={40}>
              <Header
                label={I18n.t("categery")}
                title={
                  this.state.catSelected.length > 0
                    ? this.state.catSelected
                        .map((i) => {
                          return i.ar_name;
                        })
                        .join("/")
                    : I18n.t("define")
                }
                onPress={() => {
                  this.categeoryRef.current.show();
                }}
                sppiner={this.state.categoryLoading}
                require
              />
            </AppView>
            {/* <ProfessionBottomSheet ref={this.professionRef} {...props} /> */}
            <AppView width={6} />
            <AppView width={40}>
              <Header
                label={I18n.t("categery-2")}
                title={
                  this.state.profession.length > 0
                    ? this.state.profession
                        .map((i) => {
                          return i.ar_name;
                        })
                        .join("/")
                    : I18n.t("define")
                }
                onPress={() => {
                  this.professionRef.current.show();
                }}
                sppiner={this.state.jobsLoading}
              />
            </AppView>
          </AppView>

          <Price {...props} />
          <Header
            label={I18n.t("product-trans")}
            title={
              this.state.selectedDelivryTypes.length > 0
                ? this.state.selectedDelivryTypes
                    .map((i) => {
                      return i.ar_name;
                    })
                    .join("/")
                : I18n.t("define")
            }
            onPress={() => {
              this.deliverRef.current.show();
            }}
            require
          />
          <AppView stretch marginTop={2}>
            <AppText>{I18n.t("date")}</AppText>
          </AppView>

          <AppView stretch row spaceBetween>
            <AppInput
              flex
              placeholder={I18n.t("date-from")}
              height={6}
              editable={false}
              onPress={() => {
                this._showDateTimePicker("date", true, values.date_from);
              }}
              initialValue={values.date_from}
              onBlur={handleBlur("date_from")}
              onChange={handleChange("date_from")}
              error={errors.date_from}
              isTouched={touched.date_from}
            />
            <AppView width={10} />

            <AppInput
              flex
              placeholder={I18n.t("date-to")}
              height={6}
              editable={false}
              onPress={() => {
                this._showDateTimePicker("date", false, values.date_to);
              }}
              initialValue={values.date_to}
              onBlur={handleBlur("date_to")}
              onChange={handleChange("date_to")}
              error={errors.date_to}
              isTouched={touched.date_to}
            />
          </AppView>
          <ProductLocation marginTop={5} {...props} offer />
          {/* <AppInputError error={errors.latitude ? errors.latitude : ""} /> */}
        </AppScrollView>
        <AppView height={10} stretch center>
          <AppButton
            title={I18n.t("add-offer")}
            width={40}
            backgroundColor="primary"
            onPress={() => {
              this.setState({
                isModalVisibleConfirm: true,
              });
            }}
            processing={isSubmitting}
            marginHorizontal={7}
            disabled={
              Object.getOwnPropertyNames(errors).length !== 0 ||
              Object.getOwnPropertyNames(touched).length === 0
            }
          />
        </AppView>

        <CategeoryBottomShet
          ref={this.categeoryRef}
          data={this.state.categories}
          onChange={(v) => {
            this.setState({
              catSelected: v,
            });
          }}
          {...props}
        />
        <ProfessionBottomSheet
          ref={this.professionRef}
          {...props}
          onConfirm={(value) => {
            this.setState({
              profession: value,
            });
          }}
          data={this.state.jobs}
        />
        <ProductDeliver
          ref={this.deliverRef}
          initialValue={values.delivery_type}
          {...props}
          onChange={(v) => {
            this.setState({
              selectedDelivryTypes: v,
            });
          }}
        />
        {this.state.isDateTimePickerVisible && (
          <DateTimePicker
            minimumDate={new Date()}
            date={this.state.currentDate}
            mode={this.state.currentPicker}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={(date) => this._handleDatePicked(date, props)}
            onCancel={this._hideDateTimePicker}
          />
        )}
        <ModalConfirm
          isVisible={this.state.isModalVisibleConfirm}
          changeState={(v) => {
            this.setState({
              isModalVisibleConfirm: v,
            });
          }}
          message={"هل انت متاكد من اتمام الطلب"}
          onConfirm={() => {
            this.setState({
              isModalVisibleConfirm: false,
            });
            handleSubmit();
          }}
        />
        <OrderAccepted
          visible={this.state.isModalVisible}
          messageHint={"تم اضافه الطلب "}
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
      </>
    );
  };

  render() {
    return <>{this.renderMenuContent()}</>;
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,

  allChat: state.chat,
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Home);
