import React, { Component } from "react";
import { connect } from "react-redux";

import * as Progress from "react-native-progress";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import {
  AppView,
  AppInput,
  AppText,
  AppIcon,
  AppButton,
  AppNavigation,
  AppSpinner,
  AppScrollView,
  AppImage
} from "../../common";
import {
  NoInternet,
  AppHeader,
  AppErrorModal,
  SelectionOptionGroupMulti,
} from "../../components";
import { HEADER_ELEVATION } from "../../common/utils/Constants";
import CategeoryBottomShet from "../../components/CategeoryBottomShet";
import ProfessionBottomSheet from "../../components/ProfessionBottomSheet";
import Slider from "@react-native-community/slider";

import * as ProductRepo from "../../repo/ProductRepo";
import { getPlaceName } from "../../utils";


const items = [
  {
    id: "92iijs7yta",
    name: "Ondo",
  },
  {
    id: "a0s0a8ssbsd",
    name: "Ogun",
  },
  {
    id: "16hbajsabsd",
    name: "Calabar",
  },
  {
    id: "nahs75a5sg",
    name: "Lagos",
  },
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.categeoryRef = React.createRef();
    this.professionRef = React.createRef();
  }

  state = {
    lastSearch: "",
    isVisible: false,
    indicator: 0,
    indicatorTo: 0,
    isErrorModal: false,
    categeoryLoad: true,
    jobLodaing: true,
    categeories: [],
    locationPlace: [],
  };

  componentDidMount() {
    this.getAllCategeory();
    this.getAllJobs();
  }

  getAllJobs = async () => {
    try {
      const jobs = await ProductRepo.getAllJobs();
      console.log("jobs ==>>", jobs);

      this.setState({
        jobs,
        jobLodaing: false,
      });
    } catch (error) {
      this.setState({
        jobLodaing: false,
      });
    }
  };

  getAllCategeory = async () => {
    try {
      const res = await ProductRepo.getAllCategeory();

      this.setState({
        categeoryLoad: false,
        categeories: res,
      });
    } catch (error) {
      this.setState({
        categeoryLoad: false,
        categeories: [],
      });
    }
  };

  showModal = () => {
    this.setState(
      {
        profession: false,
      },
      () => {
        this.categeoryRef.current.show();
      }
    );
  };

  showProfession = () => {
    this.setState(
      {
        profession: true,
      },
      () => {
        this.professionRef.current.show();
      }
    );
  };

  onAdd = (value) => {
    const inde = +this.state.indicator;
    if (value <= 0) {
      this.setState({
        indicator: 0,
      });
    } else {
      this.setState(
        {
          indicator: inde + value,
        },
        () => {
          console.log("statet", this.state.indicator);
        }
      );
    }
  };

  onAddTo = (value) => {
    const valTo = +this.state.indicatorTo;
    if (value <= 0) {
      this.setState({
        indicator: 0,
      });
    } else {
      this.setState({
        indicatorTo: valTo + value,
      });
    }
  };

  renderPrices = (props) => (
    <AppView stretch paddingHorizontal={10} marginVertical={10}>
      <AppText>{I18n.t("price")}</AppText>
      <AppView stretch row height={8}>
        <AppView row stretch flex>
          <AppText flex marginHorizontal={2}>
            من
          </AppText>
          <AppView elevation={HEADER_ELEVATION} row flex={2}>
            <AppView center flex={2}>
              <AppInput
                initialValue={`${this.state.indicator}`}
                number
                textAlignVertical="center"
                height={6}
                backgroundColor="white"
                onChange={(v) => {
                  this.setState({
                    indicator: v,
                  });
                }}
                noValidation
              />
              {/* <AppText>{this.state.indicator}</AppText> */}
            </AppView>
            <AppView center flex>
              <AppIcon
                name="up"
                type="ant"
                size={8}
                onPress={() => this.onAdd(1)}
              />
              <AppIcon
                name="down"
                type="ant"
                size={8}
                onPress={() => this.onAdd(-1)}
              />
            </AppView>
          </AppView>
        </AppView>
        <AppView width={3} />
        <AppView row stretch flex>
          <AppText flex marginHorizontal={2}>
            الي
          </AppText>
          <AppView elevation={HEADER_ELEVATION} row flex={2}>
            <AppView flex={2} center>
              {/* <AppText>{this.state.indicatorTo}</AppText> */}
              <AppInput
                initialValue={`${this.state.indicatorTo}`}
                number
                textAlignVertical="center"
                height={6}
                backgroundColor="white"
                onChange={(v) => {
                  this.setState({
                    indicatorTo: v,
                  });
                }}
                noValidation
              />
            </AppView>
            <AppView center flex>
              <AppIcon
                name="up"
                type="ant"
                size={8}
                onPress={() => this.onAddTo(1)}
              />
              <AppIcon
                name="down"
                type="ant"
                size={8}
                onPress={() => this.onAddTo(-1)}
              />
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    </AppView>
  );

  onSubmit = async (values, { setSubmitting, isSubmitting }) => {
    const value = {};
    if (values.search_str) {
      value.search_str = values.search_str;
    }

    if (values.distance !== "") {
      value.distance = +values.distance;
    }
    if (values.latitude !== "" && value.longitude) {
      value.latitude = values.latitude;
      value.longitude = values.longitude;
    }
    if (values.categories.length !== 0) {
      value.categories = JSON.stringify(values.categories);
    }
    if (this.state.indicator && this.state.indicatorTo) {
      value.price_from = this.state.indicator;
      value.price_to = this.state.indicatorTo;
    }

    console.log("value", value);

    try {
      const res = await ProductRepo.searchProduct(value);
      console.log("res", res);
      AppNavigation.push({
        name: "searchResults",
        passProps: {
          data: res,
        },
      });
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      this.setState({
        isErrorModal: true,
      });
    }
    console.log("values ==>>", value);
  };

  renderForm = () => (
    <Formik
      initialValues={{
        longitude: "",
        latitude: "",
        distance: "",
        search_str: "",
        price_from: "",
        price_to: "",
        categories: [],
        profession: [],
      }}
      onSubmit={(values, { setSubmitting, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, isSubmitting })
      }
    >
      {this.renderContent}
    </Formik>
  );

  renderContent = (props) => {
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
        <AppScrollView stretch flex paddingBottom={30}>
          <AppView stretch>
            <AppInput
              placeholder={I18n.t("search")}
              marginHorizontal={10}
              height={6}
              marginTop={7}
              marginBottom={5}
              initialValue={values.search_str}
              onBlur={handleBlur("search_str")}
              onChange={handleChange("search_str")}
              error={errors.search_str}
              isTouched={touched.search_str}
            />

            <Header
              title={I18n.t("select-categeroy")}
              onPress={this.showModal}
              sppiner={this.state.categeoryLoad}
            />
            {values.categories.length !== 0 && (
              <AppView stretch wrap row marginBottom={2}>
                {values.categories.map((item) => {
                  const label = this.state.categeories.filter(
                    (v) => v.id === item
                  );
                  return (
                    <AppButton
                      marginBottom={5}
                      marginRight={5}
                      title={label[0].en_name}
                      color="white"
                      paddingHorizontal={7}
                      height={5}
                      borderRadius={20}
                      onPress={() => {
                        const index = values.categories.indexOf(item);
                        if (index !== -1) {
                          const newValue = [
                            ...values.categories.slice(0, index),
                            ...values.categories.slice(index + 1),
                          ];
                          handleChange("categories")(newValue);
                        }
                      }}
                      rightIcon={
                        <AppView>
                          <AppIcon name="close" type="ant" color="white" />
                        </AppView>
                      }
                    />
                  );
                })}
              </AppView>
            )}
            <Header
              title={I18n.t("select-job")}
              onPress={this.showProfession}
              sppiner={this.state.jobLodaing}
            />
            {values.profession.length !== 0 && (
              <AppView stretch wrap row marginBottom={2}>
                {values.profession.map((item) => {
                  const label = this.state.jobs.filter((v) => v.id === item);
                  return (
                    <AppButton
                      marginBottom={5}
                      marginRight={5}
                      title={label[0].en_name}
                      color="white"
                      paddingHorizontal={7}
                      height={5}
                      borderRadius={20}
                      onPress={() => {
                        const index = values.profession.indexOf(item);
                        if (index !== -1) {
                          const newValue = [
                            ...values.profession.slice(0, index),
                            ...values.profession.slice(index + 1),
                          ];
                          handleChange("profession")(newValue);
                        }
                      }}
                      rightIcon={
                        <AppView>
                          <AppIcon name="close" type="ant" color="white" />
                        </AppView>
                      }
                    />
                  );
                })}
              </AppView>
            )}
            <Header
              title={I18n.t("select-location")}
              onPress={() => {
                AppNavigation.push({
                  name: "mapScreen",
                  passProps: {
                    onLocationChangeCallback: async (loc) => {
                      // this.onChange(loc);
                      handleChange("longitude")(loc.longitude);
                      handleChange("latitude")(loc.latitude);

                      locationPlace = await getPlaceName(
                        loc.latitude,
                        loc.longitude
                      );
                      this.setState({
                        locationPlace,
                      });
                      console.log("loc ==>>", locationPlace);
                    },
                  },
                });
              }}
            />

            {this.state.locationPlace.length !== 0 && (
              <AppButton
                marginBottom={5}
                marginRight={5}
                marginTop={5}
                title={this.state.locationPlace[0]}
                color="white"
                paddingHorizontal={7}
                width={60}
                height={5}
                numberOfLines={1}
                borderRadius={20}
                onPress={() => {}}
                rightIcon={
                  <AppView>
                    <AppIcon name="close" type="ant" color="white" />
                  </AppView>
                }
              />
            )}

            <AppView stretch height={6} marginTop={5}>
              <AppText paddingHorizontal={7}>
                {I18n.t("distance")} -- {this.state.distance}{" "}
              </AppText>
              {/* start value 100 Km  :: distance INT() */}
              <Slider
                style={{
                  width: "100%",
                  flex: 1,
                  scaleX: this.props.rtl ? -1 : undefined,
                }}
                minimumValue={50}
                maximumValue={200}
                minimumTrackTintColor="#FFCC00"
                maximumTrackTintColor="#000000"
                inverted
                value={100}
                onValueChange={(distance) => {
                  this.setState({
                    distance: distance.toFixed(0),
                  });
                }}
              />
            </AppView>

            {this.renderPrices()}

            <AppButton
              backgroundColor="primary"
              stretch
              marginHorizontal={10}
              title={I18n.t("apply")}
              marginTop={10}
              onPress={handleSubmit}
              processing={isSubmitting}
            />
            <AppView paddingHorizontal={5} />
          </AppView>
        </AppScrollView>
        <CategeoryBottomShet
          ref={this.categeoryRef}
          data={this.state.categeories}
          {...props}
          search
        />
        {/* <ProfessionBottomSheet
          ref={this.professionRef}
          {...props}
          data={this.state.jobs}
        /> */}
        <CategeoryBottomShet
          ref={this.professionRef}
          data={this.state.jobs}
          profession
          search
          {...props}
        />
      </>
    );
  };

  render() {
    return (
      <AppView stretch flex>
        <AppHeader title={I18n.t("search")} image />
        {this.props.isConnected ? this.renderForm() : <NoInternet />}

        <AppErrorModal
          visible={this.state.isErrorModal}
          fromSignIn
          changeState={(v) => {
            this.setState({
              isErrorModal: v,
            });
          }}
          errorMessage={["لقد حدث خطآ اعد المحاوله"]}
          onConfirm={() => {
            this.setState({
              isErrorModal: false,
            });
          }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  isConnected: state.network.isConnected,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export const Header = ({ label, title, onPress, sppiner }) => (
  <AppView stretch paddingHorizontal={10} marginBottom={5}>
    {label && <AppText color="#E0E0E2"> {label}</AppText>}
    <AppView
      stretch
      borderRadius={5}
      backgroundColor="#F3F3F3"
      height={6}
      paddingHorizontal={3}
      onPress={() => {
        onPress();
      }}
    >
      {sppiner ? (
        <AppView stretch center height={6}>
          <AppSpinner />
        </AppView>
      ) : (
        <AppView centerY height={6} row spaceBetween stretch>
          <AppText>{title}</AppText>
          <AppIcon name="ios-arrow-down" type="ion" size={8} />
        </AppView>
      )}
    </AppView>
  </AppView>
);
