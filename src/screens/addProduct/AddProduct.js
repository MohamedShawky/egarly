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
  showError,
  moderateScale,
  responsiveWidth,
  getColors,
  AppSpinner,
  AppInputError,
  showSuccess,
} from "../../common";
import CategeoryBottomShet from "../../components/CategeoryBottomShet";
import StatusProductBottomSheet from "../../components/StatusProductBottomSheet";
import ProfessionBottomSheet from "../../components/ProfessionBottomSheet";
// import ProfessionBottomSheet from "../../components/ProfessionBottomSheet";

import {
  AppHomeHeader,
  SideMenu,
  NoInternet,
  AppNoAuthModal,
  AppHeader,
  DropDounMenu,
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
  Categeory,
  ProductLocation,
  ProductCase,
  ProductDeliver,
} from "../../components/addProduct";
import * as ProductRepo from "../../repo/ProductRepo";
import validationSchema from "./validation";
import { date } from "yup";
import { OrderAccepted } from "../../components/appModals";
import ModalConfirm from "../../components/appModals/ModalConfirm";
import { refreshList } from "../../actions/list";

export const Header = ({ label, title, onPress, sppiner, require }) => (
  <AppView stretch marginTop={10}>
    <AppView row>
      <AppText> {label} </AppText>

      <AppText
        marginHorizontal={0.5}
        size={8}
        color={require ? "red" : "white"}
      >
        *
      </AppText>
    </AppView>
    <AppView
      stretch
      borderRadius={5}
      backgroundColor="inputBgColor"
      height={6}
      paddingHorizontal={3}
      onPress={() => {
        onPress();
      }}
    >
      {sppiner ? (
        <AppView stretch center height={8}>
          <AppSpinner />
        </AppView>
      ) : (
        <AppView
          centerY
          height={6}
          row
          spaceBetween
          stretch
          paddingHorizontal={2}
        >
          <AppText numberOfLines={1} marginRight={2}>
            {title}
          </AppText>
          <AppIcon name="ios-arrow-down" type="ion" size={8} />
        </AppView>
      )}
    </AppView>
  </AppView>
);
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
  };

  componentDidMount() {
    console.log("data", this.props.data);

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

  showModal = () => {
    this.setState({ onToggleList: !this.state.onToggleList });
  };

  onSelectedItemsChange = (selectedItems, props) => {
    props.setFieldValue("categories", selectedItems);
    this.setState({ selectedItems, onToggleList: false });
  };

  renderSelection = (props) => {
    const { selectedItems, categories } = this.state;

    // if(this.state.categoryLoading){
    //   return null
    // }
    return (
      <AppView stretch stretchChildren>
        <DropDounMenu
          noPlaceholder
          hideTags
          styleItemsContainer={[
            {
              backgroundColor: "#FFFBFF",
            },
          ]}
          checkedIconStyle={{ color: "red", fontSize: moderateScale(10) }}
          styleRowList={{
            height: responsiveHeight(6),
            borderBottomColor: "#858F96",
            borderBottomWidth: 0.5,
            justifyContent: "center",
            paddingHorizontal: moderateScale(4),
          }}
          items={categories}
          selector={this.state.onToggleList}
          uniqueKey="id"
          ref={(component) => {
            this.multiSelect = component;
          }}
          showDropDowns
          readOnlyHeadings
          onSelectedItemsChange={(val) =>
            this.onSelectedItemsChange(val, props)
          }
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={(text) => console.log(text)}
          // altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey={this.props.rtl ? "ar_name" : "en_name"}
          styleDropdownMenuSubsection={{
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 7,
            color: "#CCC",
            paddingVertical: 20,
          }}
          single={false}
        />
        {/* <AppView>
        {this.multiSelect.getSelectedItemsExt(selectedItems)}
      </AppView> */}
        {/* ??? */}
      </AppView>
    );
  };

  onSubmit = async (values, { setSubmitting, setFieldError }) => {
    console.log("on submit", values);

    this.setState({
      isModalVisibleConfirm: false,
    });
    if (
      !values.price_per_day &&
      !values.price_per_week &&
      !values.price_per_month
    ) {
      console.log("no prices add");
      this.setState({
        errorOfPrice: "مطلوب",
      });
      setSubmitting(false);
      return;
    }

    const images = [values.images1, values.images2, ...values.images3];

    console.log("images ==>", images);

    if (images.length < 3) {
      setFieldError("images1", I18n.t("input-required-error"));
    }
    try {
      const data = new FormData();
      data.append("ar_title", values.ar_title);

      data.append("en_title", values.ar_title);
      data.append("en_description", values.ar_description);
      data.append("ar_description", values.ar_description);
      data.append("en_title", values.ar_title);
      if (values.job_id !== "") {
        data.append("job_id", values.job_id);
      }
      data.append("quantity", values.quantity);
      data.append("price_per_day", values.price_per_day);
      data.append("price_per_week", values.price_per_week);
      data.append("price_per_month", values.price_per_month);
      data.append("status", values.status.id);
      if (values.replacement_cost !== "") {
        data.append("replacement_cost", values.replacement_cost);
      }
      data.append("latitude", values.latitude);
      data.append("longitude", values.longitude);

      data.append("delivery_types", JSON.stringify(values.delivery_type));
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

      console.log("data ==>>", data);

      const res = await ProductRepo.addProduct(data);
      console.log("res", res);

      // this.props.refresh('latest')
      if (res.data.status) {
        showSuccess(res.data.message);
        this.setState({
          isModalVisible: true,
        });
      }else{
        showError(I18n.t('ui-error-happened'))
      }
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
      <AppHeader title={I18n.t("add-product")} />

      {this.renderForm()}
    </AppView>
  );

  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        en_title: "",
        ar_title: "",
        categories: "",
        en_description: "",
        ar_description: "",
        job_id: "",
        quantity: 1,
        price_per_day: "",
        price_per_week: "",
        price_per_month: "",
        status: "",

        images1: "",
        images2: "",
        images3: [],
        replacement_cost: "",
        delivery_type: "",

        latitude: "",
        longitude: "",
        ...this.props.data,
      }}
      validationSchema={validationSchema(this.fromikRef)}
      onSubmit={(values, { setSubmitting, setFieldError, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, setFieldError, isSubmitting })
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
      setFieldError,
      values,
      touched,
    } = props;

    console.log("values ==>>", values);

    const delivers = [
      {
        id: 1,
        en_name: "استلام من مكان محدد",
        ar_name: "استلام من مكان محدد",
      },
      {
        id: 2,

        en_name: "توصيل مجاني للمستاجر",
        ar_name: "توصيل مجاني للمستاجر",
      },
    ];

    console.log("errro", errors);

    const image = [values.images1, values.images2, ...values.images3];
    // if (image.length && image.length < 3) {
    //   setFieldValue("images1")("mmmmm");
    // }
    return (
      <AppView stretch flex>
        <AppScrollView
          stretch
          flex
          paddingTop={5}
          paddingHorizontal={7}
          paddingBottom={20}
        >
          <AddImage {...props} />
          <AppView stretch>
            <AppInputError
              error={
                props.errors.images1 && image.length > 0 && image.length >= 3
                  ? props.errors.images1
                  : " "
              }
              errorTextMarginHorizontal={10}
              size={5}
            />
          </AppView>
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
          <Header
            label={I18n.t("product-case")}
            title={
              values.status !== "" ? values.status.ar_name : I18n.t("define")
            }
            onPress={() => {
              this.statusRef.current.show();
            }}
            require
          />
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

          <Price
            {...props}
            quantity
            // label={I18n.t("number-product")}
            labelhint={I18n.t("number-product-hint")}
            error={this.state.errorOfPrice || errors.price_per_day}
          />

          <ProductLocation marginTop={10} {...props} />

          {errors.latitude ? (
            <AppView stretch>
              <AppText color="red">{I18n.t("signup-field-required")} </AppText>
            </AppView>
          ) : null}
          <AppButton
            title={I18n.t("add-product")}
            marginTop={20}
            backgroundColor="#FFCC00"
            stretch
            onPress={() => {
              this.setState({
                isModalVisibleConfirm: true,
              });
            }}
            processing={isSubmitting}
            disabled={Object.getOwnPropertyNames(errors).length !== 0}
          />
        </AppScrollView>

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

        <ProductCase
          ref={this.statusRef}
          onConfirm={(v) => {
            handleChange("status")(v);
          }}
          initialValue={values.status.id}
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
        <ProfessionBottomSheet
          ref={this.professionRef}
          {...props}
          onConfirm={(value) => {
            console.log("v", value);

            this.setState({
              profession: value,
            });
          }}
          data={this.state.jobs}
        />
        <OrderAccepted
          visible={this.state.isModalVisible}
          messageHint={"تم اضافه المنتج "}
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
      </AppView>
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

const mapDispatchToProps = (dispatch) => ({
  refresh: bindActionCreators(refreshList, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
