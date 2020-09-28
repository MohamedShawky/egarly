import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import { bindActionCreators } from "redux";
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppInput,
  AppSpinner,
  AppFormLocation,
  AppScrollView,
  AppNavigation,
  responsiveHeight,
} from "../../common";

import { AvatarPicker } from "..";
import { buildValidationSchemaEGY } from "./validation";
import { updateProfile } from "../../actions/UpdateProfileActions";
import * as Errors from "../../utils/Errors";
import Picker from "../../common/picker/Picker";
import { getPlaceName } from "../../utils";
import MapView from "react-native-maps";
import { GOOGLE_KEY } from "../../utils/Config";
import Axios from "axios";
import validationSchema from "./validation"
const { CancelToken } = Axios;

const countryId = 1;
const cities = null;
class UpdateFormInput extends Component {
  constructor(props) {
    super(props);

    this.nameAr = React.createRef();
    this.nameEn = React.createRef();
    this.email = React.createRef();

    this.phone = React.createRef();
    this.fromikRef = React.createRef();
    this.latitudeDelta = 0.007016387588862472;
    this.longitudeDelta = 0.004741139709949493;
  }

  state = {
    dialCode: "+20",
    selectedCountryId: null,
    isLoading: true,
    cities: [],
    locationName: null,
  };

  async componentDidMount() {
    // await this.getCities();
  }

  onSubmit = (values, { setSubmitting, isSubmitting }) => {
    this.props.updateProfile(values, setSubmitting);
  };

  renderAvatar = ({ values, handleChange }) => {
    const { data, currentUser } = this.props;
    return (
      <AppView stretch paddingHorizontal={7} paddingTop={5}>
        <AvatarPicker
          onChange={handleChange("avatar")}
          initialUriValue={currentUser.user.avatar !== null && values.avatar}
        />
      </AppView>
    );
  };

  renderForm = () => {
    const { currentUser } = this.props;

    return (
      <Formik
        initialValues={{
          userName: currentUser
            ? currentUser.user.hasOwnProperty("username") &&
              currentUser.user.username !== null
              ? currentUser.user.username
              : currentUser.user.first_name
            : "",
          firstName: currentUser ? currentUser.user.first_name : "",
          lastName: currentUser ? currentUser.user.last_name : "",
          phone: currentUser
            ? currentUser.user.phone && currentUser.user.phone
            : "",
          email: currentUser ? currentUser.user.email : "",
          avatar: currentUser
            ? currentUser.user.avatar !== null
              ? `http://ejarly.dev.fudexsb.com/uploads/${
                  currentUser.user.avatar
                }`
              : ""
            : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, isSubmitting }) =>
          this.onSubmit(values, { setSubmitting, isSubmitting })
        }
      >
        {this.renderFromBody}
      </Formik>
    );
  };
  renderAdvantage = (name, type, text) => {
    return (
      <AppView stretch row height={5}>
        <AppView circleRadius={5.5} backgroundColor="#27AE60" center>
          <AppIcon name={name} type={type} color="white" />
        </AppView>
        <AppText marginHorizontal={7}>{text}</AppText>
      </AppView>
    );
  };
  onPickLocation = async (val) => {
    const locationName = await getPlaceName(val.latitude, val.longitude);

    console.log("locationName", locationName);

    if (this.mapRef) {
      this.mapRef.animateToRegion(
        {
          ...val,
          latitudeDelta: this.latitudeDelta,
          longitudeDelta: this.longitudeDelta,
        },
        400
      );
    }
    // await getPlaceName

    this.setState({
      locationName: locationName[0],
      location: val,
    });
  };
  onMapRegionChange = (region) => {
    this.viewportLat = region.latitude;
    this.viewportLng = region.longitude;
  };
  async componentDidMount() {
    this.animateToMyLocation();
  }
  fetchLocationName = async (lat, lng) => {
    if (this.source) {
      this.source.cancel("Network Operation Canceled.");
    }

    try {
      console.log("response ==>>");

      this.source = CancelToken.source();
      console.log("response ==>>");

      const response = await Axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}&language=ar`,
        {
          cancelToken: this.source.token,
        }
      );
      console.log("response ==>>");

      if (response.data.status !== "OK") {
        throw new Error(`Geocode error: ${response.data.status}`);
      }

      this.source = null;

      this.setState(
        {
          locationName: response.data.results[0].formatted_address,
        },
        () => {
          console.log("location", this.state.locationName);
        }
      );
    } catch (error) {
      if (Axios.isCancel(error[0])) {
        console.log("FETCH LOCATION NAME REQUEST CANCELLED");
      } else {
        this.setState({
          loadingLocationName: false,
          locationNameError: I18n.t("unknown-location"),
          // errorModalVisible: true,
          // errorModalMessage: I18n.t('failed-get-your-location'),
        });
      }
    }
  };
  animateToMyLocation = async (loc) => {
    if (loc) {
      this.fetchLocationName(loc.latitude, loc.longitude);
    } else {
      this.fetchLocationName(
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude
      );
    }

    this.animateTimer = setTimeout(() => {
      this.setState(
        {
          location: this.props.currentLocation,
        },
        () => {
          if (this.mapRef) {
            this.mapRef.animateToRegion(
              {
                ...this.props.currentLocation,
                latitudeDelta: this.latitudeDelta,
                longitudeDelta: this.longitudeDelta,
              },
              400
            );
          }
        }
      );
    }, 1000);
  };
  renderFromBody = (props) => {
    console.log("current user ===>>", this.props.currentUser);

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
      <>
        <AppScrollView
          stretch
          flex
          paddingHorizontal={7}
          paddingBottom={10}
          borderTopWidth={0.5}
          borderTopColor="#F4F2F0"
        >
          {this.renderAvatar(props)}
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("userName")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.userName}
            onBlur={handleBlur("userName")}
            onChange={handleChange("userName")}
            error={errors.userName}
            isTouched={touched.userName}
            height={6}
          />
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("firstName")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            editable={false}
            initialValue={values.firstName}
            onBlur={handleBlur("firstName")}
            onChange={handleChange("firstName")}
            error={errors.firstName}
            isTouched={touched.firstName}
            height={6}
          />
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("lastName")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.lastName}
            onBlur={handleBlur("lastName")}
            onChange={handleChange("lastName")}
            error={errors.lastName}
            isTouched={touched.lastName}
            height={6}
            editable={false}

          />
          <AppView stretch>
            <AppButton
              // stretch
              // width={30}
              transparent
              onPress={() => {
                AppNavigation.push({
                  name: "mapScreen",
                  passProps: {
                    onLocationChangeCallback: (val) => this.onPickLocation(val),
                  },
                });
              }}
              noPadding
              center={false}
              title={
                this.state.locationName !== null
                  ? this.state.locationName
                  : I18n.t("location-de")
              }
              color="primary"
            />
          </AppView>
          <AppView style={{ width: "100%", height: responsiveHeight(25) }}>
            <MapView
              provider="google"
              ref={(ref) => (this.mapRef = ref)}
              style={{ width: "100%", height: responsiveHeight(25) }}
              rotateEnabled={false}
              showsUserLocation={false}
              showsMyLocationButton={false}
              showsCompass={false}
              scrollEnabled={false}
              onRegionChange={this.onMapRegionChange}
            />
            <AppView
              stretch
              center
              style={{
                position: "absolute",
                top: responsiveHeight(8),
                left: 0,
                right: 0,
              }}
            >
              <AppView circleRadius={15} backgroundColor="primary" />
            </AppView>
          </AppView>
          <AppView stretch paddingVertical={10}>
            <AppText bold>{I18n.t("personal-data")}</AppText>
            <AppText>{I18n.t("personal-data-hint")}</AppText>
          </AppView>
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("phone")}</AppText>
          </AppView>
          <AppView stretch row backgroundColor="#F3F3F3">
            <AppView width={20} center>
              <AppText>+02</AppText>
            </AppView>
            <AppView
              width={0.5}
              marginHorizontal={1}
              // marginTop={2}
              // marginBottom={2}
              stretch
              backgroundColor="grey"
            />
            <AppInput
              // leftItems={<AppIcon type="custom" name="street" size={8} />}
              initialValue={values.phone}
              onBlur={handleBlur("phone")}
              onChange={handleChange("phone")}
              error={errors.phone}
              isTouched={touched.phone}
              height={6}
              phone
              flex
            />
          </AppView>
          <AppView stretch marginBottom={3}>
            <AppText>{I18n.t("email")}</AppText>
          </AppView>
          <AppInput
            // leftItems={<AppIcon type="custom" name="street" size={8} />}
            initialValue={values.email}
            onBlur={handleBlur("email")}
            onChange={handleChange("email")}
            error={errors.email}
            isTouched={touched.email}
            height={6}
            email
          />

          <AppButton
            title={I18n.t("save")}
            onPress={handleSubmit}
            processing={isSubmitting}
            stretch
            backgroundColor="primary"
            marginTop={15}
          />
        </AppScrollView>
      </>
    );
  };

  render() {
    return <>{this.renderForm()}</>;
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  connected: state.network.isConnected,
  currentUser: state.auth.currentUser,
  currentLocation: state.location.current,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: bindActionCreators(updateProfile, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateFormInput);
