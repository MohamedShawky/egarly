import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import { SafeAreaView } from "react-native";
import {
  AppView,
  AppIcon,
  AppInput,
  AppButton,
  AppPicker,
  AppFormLocation,
  AppNavigation,
  showError,
  AppScrollView,
  AppSpinner
} from "../../common";
import Picker from "../../common/picker/Picker";

import { buildValidationSchema } from "./Validation";
import { AppHeader, NoInternet } from "../../components";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import AppErrorModal from "../../components/feedBackModal/FeedBackModal";
import * as errors from "../../utils/Errors";
import * as clientRepo from "../../repo/ClientRepo";

class AddAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCountryId: this.props.currentUser.user.city.country.id,
      selectedCityId: this.props.currentUser.user.city.id,
      errorModal: false,
      errorTxt: "",
      cities: [],
      loadedCities: false,
      District: [],
      loadedDistrict: false
    };
    this.fromikRef = React.createRef();
  }

  componentDidMount() {}

  onSubmit = async (values, { setSubmitting }) => {
    try {
      const data = {
        area: values.district,
        description: values.addressInDetails,
        location: {
          lat: values.location.latitude,
          lng: values.location.longitude
        },
        alias: values.homeAddress
      };
      const isAdded = await clientRepo.addAddress(data);
      isAdded && AppNavigation.pop();
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        this.setState({
          errorModal: true,
          errorTxt: I18n.t("ui-networkConnectionError")
        });
      } else if (typeof error === "object") {
        this.setState({
          errorModal: true,
          errorTxt: error.message
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  renderLocation = (handleChange, errors, values, touched) => (
    <AppView marginBottom={12} stretch>
      <AppFormLocation
        initialValue={values.location}
        error={errors.location}
        onChange={handleChange("location")}
        placeholder={I18n.t("signup-location")}
        color="#6A6A6A"
        leftItems={[
          <AppView pl={3} centerY>
            <AppIcon
              name="location-on"
              color="#6A6A6A"
              type="material"
              size={8}
            />
          </AppView>
        ]}
        backgroundColor="inputBgColor"
        bc="#E6E8EA"
        noValidation={!touched.location}
      />
    </AppView>
  );

  renderFromBody = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldError,
    setFieldValue
  }) => (
    <AppView flex stretch centerX marginTop={7} marginHorizontal={10}>
      <AppScrollView flex stretch pb={5}>
        <AppInput
          label={I18n.t("home-address")}
          leftItems={
            <AppView pl={5} centerY>
              <AppIcon type="ant" name="form" color="#6A6A6A" size={8} />
            </AppView>
          }
          initialValue={values.homeAddress}
          onBlur={handleBlur("homeAddress")}
          onChange={handleChange("homeAddress")}
          color="#6A6A6A"
          error={errors.homeAddress}
          isTouched={touched.homeAddress}
        />

        {this.renderLocation(handleChange, errors, values, touched)}
        <AppInput
          label={I18n.t("address-in-details")}
          leftItems={
            <AppView pl={7.5} centerY>
              <AppIcon
                type="entypo"
                color="#6A6A6A"
                name="direction"
                size={8}
              />
            </AppView>
          }
          initialValue={values.addressInDetails}
          onBlur={handleBlur("addressInDetails")}
          onChange={handleChange("addressInDetails")}
          error={errors.addressInDetails}
          color="#6A6A6A"
          isTouched={touched.addressInDetails}
        />
      </AppScrollView>
      <AppView stretch stretchChildren>
        <SafeAreaView>
          <AppButton
            bottomSelf
            marginHorizontal={-10}
            title={I18n.t("save")}
            stretch
            processing={isSubmitting}
            onPress={handleSubmit}
            noBorder
          />
        </SafeAreaView>
      </AppView>
    </AppView>
  );

  render() {
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("new-address")} />
        {this.props.isConnected ? (
          <>
            <Formik
              ref={this.fromikRef}
              initialValues={{
                homeAddress: "",
                city: this.state.selectedCityId,
                district: "",
                addressInDetails: "",
                location: ""
              }}
              validationSchema={buildValidationSchema(this.fromikRef)}
              onSubmit={(values, { setSubmitting }) =>
                this.onSubmit(values, { setSubmitting })
              }
            >
              {this.renderFromBody}
            </Formik>
            <AppErrorModal
              visible={this.state.errorModal}
              fromSignIn
              changeState={v => {
                this.setState({
                  errorModal: v
                });
              }}
              errorMessage={[this.state.errorTxt]}
              onConfirm={() => {
                this.setState({
                  errorModal: false
                });
              }}
            />
          </>
        ) : (
          <NoInternet />
        )}
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  cityId: state.city.cityId,
  isConnected: state.network.isConnected
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAddress);
