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
import SettingBottomSheet from "../../components/SettingBottomSheet";
import AddImage from "./AddImage";
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
    this.settingBottomSheet = React.createRef();
  }
  state = {
    categories: [],
    selectedItems: [],
    categoryLoading: true,
    status: this.props.data.status_val,
    statusLoading: true,
    jobs: [],
    jobsLoading: true,
    catSelected: this.props.data.main_categories,
    errorOfPrice: null,
    isModalVisible: false,
    isModalVisibleConfirm: false,
    selectedDelivryTypes: this.props.data.delivery_type_values,
    profession: [this.props.data.job],
    message: "",
    isHideLoading: false,
  };

  componentDidMount() {
    this.getCategeory();
    this.getStatus();
    this.getJobs();
  }

  getCategeory = async () => {
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
    try {
      const status = await ProductRepo.getAlltatus();

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

  onSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    if (
      !values.price_per_day &&
      !values.price_per_week &&
      !values.price_per_month
    ) {
      this.setState({
        errorOfPrice: "مطلوب",
      });
      setSubmitting(false);
      return;
    }

    const images = [...values.images];

    // try {
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
        if (!img.startsWith("http")) {
          data.append("images[]", {
            uri: img,
            type: "image/*",
            name: "images",
          });
        }
      });
    }

    console.log("data ==>>", data);

    try {
      const res = await ProductRepo.updateProduct(data, this.props.data.id);

      this.props.refreshList("myProductList");
      showSuccess(res.data.message);
      this.setState({
        isModalVisibleConfirm: false,
        isModalVisible: true,
        message: "تم تعديل المنتج",
      });
      setSubmitting(false);
    } catch (error) {
      this.setState({
        isModalVisible: false,
        isModalVisibleConfirm: false,
      });
      showError(I18n.t("ui-error-happened"));
      setSubmitting(false);
      // AppNavigation.pop();
    }
  };

  renderMenuContent = () => (
    <AppView flex backgroundColor="white">
      {this.props.isConnected ? this.renderContent() : <NoInternet />}
    </AppView>
  );

  renderContent = () => (
    <AppView stretch flex>
      <AppHeader
        title={I18n.t("add-product")}
        rowItems={[
          this.state.isHideLoading ? (
            <AppSpinner />
          ) : (
            <AppView
              stretch
              flex
              center
              onPress={() => {
                this.settingBottomSheet.current.show();
              }}
            >
              <AppIcon name="dots-three-vertical" type="entypo" />
            </AppView>
          ),
        ]}
      />

      {this.renderForm()}
    </AppView>
  );

  renderForm = () => {
    const {
      ar_title,
      categories,
      delivery_types,
      job_id,
      latitude,
      longitude,
      price_per_day,
      photos,
      price_per_month,
      price_per_week,
      quantity,
      replacement_cost,
      status,
      ar_description,
      status_val,
    } = this.props.data;

    const images = photos.map((i) => {
      return `http://dev.fudexsb.com/demo/ejarly/public/uploads/${i.image}`;
    });
    return (
      <Formik
        ref={this.fromikRef}
        initialValues={{
          ar_title: ar_title,
          categories: categories,
          ar_description: ar_description,
          job_id: job_id !== null ? job_id : "",
          quantity: `${quantity}`,
          price_per_day: `${price_per_day}`,
          price_per_week: price_per_week,
          price_per_month: price_per_month,
          status: status_val,

          images: images,

          replacement_cost: replacement_cost ? replacement_cost : "",
          delivery_type: delivery_types,

          latitude: latitude,
          longitude: longitude,
        }}
        validationSchema={validationSchema(this.fromikRef)}
        onSubmit={(values, { setSubmitting, setFieldError, isSubmitting }) =>
          this.onSubmit(values, { setSubmitting, setFieldError, isSubmitting })
        }
      >
        {this.renderFormBody}
      </Formik>
    );
  };

  onHideProduct = async () => {
    try {
      this.setState({
        isHideLoading: true,
      });
      const productId = this.props.data.id;
      let is_active = this.props.data.is_active;
      if (is_active === 1) {
        is_active = 0;
      } else {
        is_active = 1;
      }

      const isHide = await ProductRepo.hideProduct(productId, is_active);
      this.props.refreshList("myProductList");
      this.setState({
        isModalVisible: true,
        message: "تم اخفاء المنتج بنجاح",
      });
    } catch (error) {
    } finally {
      this.setState({
        isHideLoading: false,
      });
    }
  };
  onDeleteProduct = async () => {
    try {
      this.setState({
        isHideLoading: true,
      });
      const productId = this.props.data.id;

      const isHide = await ProductRepo.deleteProduct(productId);
      this.props.refreshList("myProductList");
      this.setState({
        isModalVisible: true,
        message: "تم حذف المنتج بنجاح",
      });
    } catch (error) {
    } finally {
      this.setState({
        isHideLoading: false,
      });
    }
  };
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
      setSubmitting,
    } = props;

    return (
      <AppView stretch flex>
        <AppScrollView
          stretch
          flex
          paddingTop={5}
          paddingHorizontal={7}
          paddingBottom={20}
        >
          <AppView
            stretch
            row
            backgroundColor="#F09800"
            spaceBetween
            height={7}
            borderRadius={7}
            paddingHorizontal={7}
            onPress={() => {
              AppNavigation.push({
                name: "advantageProduct",
                passProps: {
                  product_id: this.props.data.id,
                },
              });
            }}
          >
            {/* <AppIcon name="keyboard-arrow-left" type="material" /> */}

            <AppText color="white">{I18n.t("adv-product")}</AppText>
            <AppIcon name="keyboard-arrow-left" type="material" color="white" />
          </AppView>
          <AddImage {...props} />
          <AppView stretch>
            <AppInputError
              error={props.errors.images ? props.errors.images : " "}
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

          {values.latitude === "" && touched.longitude ? (
            <AppView stretch>
              <AppText color="red">{I18n.t("signup-field-required")} </AppText>
            </AppView>
          ) : null}
          <AppButton
            title={I18n.t("edit")}
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
            this.setState({
              profession: value,
            });
          }}
          data={this.state.jobs}
        />
        <OrderAccepted
          visible={this.state.isModalVisible}
          messageHint={this.state.message}
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
          processing={isSubmitting}
          message={"هل انت متاكد من تعديل المنتج"}
          onConfirm={async () => {
            await this.onSubmit(values, { setSubmitting, setFieldError });
            // await handleSubmit();
          }}
        />
        <SettingBottomSheet
          ref={this.settingBottomSheet}
          is_active={this.props.data.is_active}
          onConfirm={(v) => {
            if (v === 0) {
              this.onHideProduct();
            } else if (v === 1) {
              this.onDeleteProduct();
            }
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
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
