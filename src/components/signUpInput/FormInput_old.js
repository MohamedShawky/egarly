import React, { Component } from 'react';
import { Image, ScrollView, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Formik } from 'formik';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as yup from 'yup';
import FastImage from 'react-native-fast-image';

import { DrawerLayout } from 'react-native-gesture-handler';
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppInput,
  AppSpinner,
  AppNavigation,
  AppPicker,
  AppFormLocation,
} from '../../common';

import { AvatarPicker, SocialButtonsSection, AppHeader } from '..';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';
// import validationSchema from './validation';
import { signUp } from '../../actions/AuthActions';
import {
  buildValidationSchemaEGY,
  buildValidationSchemaSAUDIA,
} from './validation';

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.nameAr = React.createRef();
    this.nameEn = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.confirmPassword = React.createRef();
    this.phone = React.createRef();
    this.fromikRef = React.createRef();
  }

  state = {
    dialCode: '',
    termsConditionsCheck: false,
    selectedCountryId: null,
    isProcess: false,
  };

  onSubmit = (values, { setSubmitting, isSubmitting }) => {
    this.props.signUp(values, setSubmitting);
  };

  renderCountry = ({
    handleChange,
    errors,
    values,
    setFieldError,
    setFieldValue,
    touched,
  }) => (
    <AppPicker
      labelStyle
      backgroundColor="inputBgColor"
      setInitialValueAfterFetch={1}
      backgroundColorLabel="inputBgColor"
      placeholder={I18n.t('signup-country')}
      color="#8A8A8A"
      title={I18n.t('choose-country')}
      searchTitle={I18n.t('search')}
      iconType="ion"
      iconName="ios-search"
      apiRequest={{
        url: `${API_ENDPOINT_GATEWAY}countries`,
        responseResolver: res => ({
          data: res.data,
        }),
        transformData: data => ({
          value: data.id,
          label: data.name,
          dialCode: data.dialCode,
        }),
        onError: error => {
          // showError(error.message);
        },
      }}
      initialValue={values.country}
      isTouched={touched.country}
      error={errors.country}
      onChange={(value, label, rest) => {
        setFieldError('country', '');
        setFieldValue('country', value);
        handleChange('country')(value);

        this.setState({
          dialCode: rest.dialCode,
          selectedCountryId: value,
        });
      }}
      rightItems={[<AppIcon name="ios-arrow-down" size={8} />]}
      leftItems={[
        <AppIcon name="plane" type="custom" color="#6A6A6A" size={8} />,
      ]}
      // icon
    />
  );

  renderCity = ({
    handleChange,
    values,
    errors,
    setFieldError,
    setFieldValue,
    touched,
  }) => (
    <AppPicker
      labelStyle
      placeholder={I18n.t('signup-city')}
      color="#8A8A8A"
      title={I18n.t('choose-city')}
      searchTitle={I18n.t('search')}
      iconType="feather"
      iconName="flag"
      apiRequest={{
        url: `${API_ENDPOINT_GATEWAY}countries/${
          this.state.selectedCountryId
        }/cities`,
        responseResolver: res => {
          console.log('VAluesss', res);

          return {
            data: res.data,
          };
        },
        transformData: data => ({
          value: data.id,
          label: data.name,
        }),
        onError: error => {
          console.log('Error', JSON.parse(JSON.stringify(error)));
        },
      }}
      error={errors.city}
      isTouched={touched.city}
      onChange={(value, label, _, rest) => {
        setFieldError('city', '');
        setFieldValue('city', value);
        handleChange('city')(value);
      }}
      rightItems={[<AppIcon name="ios-arrow-down" size={8} />]}
      leftItems={[
        <AppIcon name="pyramide" type="custom" color="#6A6A6A" size={8} />,
      ]}
    />
  );

  renderGender = ({
    handleChange,
    values,
    errors,
    setFieldError,
    setFieldValue,
    touched,
  }) => (
    <AppPicker
      labelStyle
      placeholder={I18n.t('sign-up-gender')}
      color="#8A8A8A"
      title={I18n.t('sign-up-gender')}
      hideSearch
      data={[
        { label: 'ذكر', value: 'MALE' },
        { label: 'انثى', value: 'FEMALE' },
      ]}
      error={errors.gender}
      isTouched={touched.gender}
      onChange={(value, label, _, rest) => {
        setFieldError('gender', '');
        setFieldValue('gender', value);
        handleChange('gender')(value);
      }}
      rightItems={[<AppIcon name="ios-arrow-down" size={8} />]}
      leftItems={[
        <AppIcon name="gender" type="custom" size={8} color="#6A6A6A" />,
      ]}
    />
  );

  renderCheckBox = ({ handleChange }) => {
    const {} = this.props;
    return (
      <AppView row marginVertical={5}>
        <AppView
          row
          onPress={() => {
            this.setState({
              termsConditionsCheck: !this.state.termsConditionsCheck,
            });
          }}
        >
          <AppView
            width={4}
            height={2.5}
            borderColor={this.state.termsConditionsCheck ? 'primary' : 'grey'}
            borderWidth={1}
            borderRadius={3}
            center
            backgroundColor={
              this.state.termsConditionsCheck ? 'primary' : 'white'
            }
          >
            {this.state.termsConditionsCheck && (
              <AppIcon name="check" type="entypo" stretch color="white" />
            )}
          </AppView>
          <AppText marginHorizontal={2.5} color="#8F8F8F">
            {I18n.t('terms-conditions-home')}
          </AppText>
        </AppView>
        <AppButton
          transparent
          noPadding
          onPress={() => {
            AppNavigation.push('termsAndCondition');
          }}
        >
          <AppText color="primary">{I18n.t('terms-conditions')}</AppText>
        </AppButton>
      </AppView>
    );
  };

  renderArabicInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => {
    const {} = this.props;
    return (
      <AppInput
        maxLength={30}
        label={I18n.t('signup-nameAr')}
        ref={this.nameAr}
        nextInput={this.nameEn}
        leftItems={<AppIcon type="material-community" name="account-circle-outline" size={12} color='#6a6a6a'/>}
        initialValue={values.nameAr}
        onBlur={handleBlur('nameAr')}
        onChange={handleChange('nameAr')}
        error={errors.nameAr}
        isTouched={touched.nameAr}
      />
    );
  };

  renderEnglishInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => {
    const {} = this.props;
    return (
      <AppInput
        label={I18n.t('signup-nameEn')}
        maxLength={30}
        ref={this.nameEn}
        nextInput={this.emailRef}
        leftItems={<AppIcon type="material-community" name="account-circle-outline" size={12} color='#6a6a6a'/>}
        initialValue={values.nameEn}
        onBlur={handleBlur('nameEn')}
        onChange={handleChange('nameEn')}
        error={errors.nameEn}
        isTouched={touched.nameEn}
      />
    );
  };

  renderEmailInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldError,
    status,
  }) => (
    <AppInput
      asyncLoading={status && status.email}
      name="email"
      leftItems={<AppIcon type="custom" name="mail" size={8} color="#6A6A6A" />}
      initialValue={values.email}
      onBlur={handleBlur('email')}
      onChange={handleChange('email')}
      error={errors.email}
      isTouched={touched.email}
      ref={this.emailRef}
      nextInput={this.password}
      email
      label={I18n.t('signup-email')}
    />
  );

  renderPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => {
    const {} = this.props;
    return (
      <AppInput
        label={I18n.t('ui-password')}
        ref={this.password}
        nextInput={this.confirmPassword}
        secure
        showSecureEye
        leftItems={<AppIcon type="material" name="lock-outline" size={12} color='#6a6a6a'/>}
        initialValue={values.password}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        error={errors.password}
        isTouched={touched.password}
      />
    );
  };

  renderConfirmPasswordInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  }) => {
    const {} = this.props;
    return (
      <AppInput
        label={I18n.t('signup-confirmPassword')}
        ref={this.confirmPassword}
        nextInput={this.phone}
        secure
        showSecureEye
        leftItems={<AppIcon type="material" name="lock-outline" size={12} color='#6a6a6a'/>}
        initialValue={values.confirmPassword}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        error={errors.confirmPassword}
        isTouched={touched.confirmPassword}
      />
    );
  };

  renderPhoneInput = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldError,
    status,
  }) => {
    const {} = this.props;
    return (
      <AppView row spaceBetween>
        <AppView flex={2}>
          <AppInput
            asyncLoading={status && status.phone}
            label={I18n.t('signup-phone')}
            ref={this.phone}
            leftItems={
              <AppIcon type="custom" name="Fill" size={8} color="#6A6A6A" />
            }
            initialValue={values.phone}
            onBlur={handleBlur('phone')}
            onChange={handleChange('phone')}
            error={errors.phone}
            isTouched={touched.phone}
            phone
            setError={setFieldError}
            name="phone"
          />
        </AppView>
        <AppView
          height={8}
          style={{ alignSelf: 'flex-start' }}
          flex
          center
          borderColor="#E6E8EA"
          backgroundColor="inputBgColor"
          borderWidth={1}
          marginLeft={5}
          borderRadius={5}
        >
          <AppText color="#8A8A8A" size={5.5}>
            {this.state.dialCode || I18n.t('sign-up-dial-code')}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  renderLocation = ({ handleChange, errors, values, touched }) => (
    <AppFormLocation
      initialValue={values.location}
      error={errors.location}
      onChange={handleChange('location')}
      placeholder={I18n.t('signup-location')}
      // marginBottom={5}
      leftItems={[
        <AppIcon name="adress" type="custom" size={8} color="#6A6A6A" />,
      ]}
      backgroundColor="inputBgColor"
      bc="#E6E8EA"
      noValidation={!touched.location}
    />
  );

  renderForm = () => (
    <Formik
      ref={this.fromikRef}
      initialValues={{
        nameAr: '',
        nameEn: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        country: '',
        city: '',
        location: '',
        profileImg: '',
        gender: '',
      }}
      validationSchema={
        this.state.dialCode === '+20'
          ? buildValidationSchemaEGY(this.fromikRef)
          : buildValidationSchemaSAUDIA(this.fromikRef)
      }
      onSubmit={(values, { setSubmitting, isSubmitting }) =>
        this.onSubmit(values, { setSubmitting, isSubmitting })
      }
    >
      {this.renderFromBody}
    </Formik>
  );

  renderFromBody = props => {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = props;
    // console.log("isSubmitting ", isSubmitting);
    console.log('const ', this.props);

    return (
      <AppView centerX stretch>
        <AvatarPicker onChange={handleChange('profileImg')} />
        <AppView marginHorizontal={10}>
          {this.renderArabicInput(props)}
          {this.renderEnglishInput(props)}
          {this.renderEmailInput(props)}
          {this.renderPasswordInput(props)}
          {this.renderConfirmPasswordInput(props)}
          {this.renderCountry(props)}
          {this.state.selectedCountryId && this.renderCity(props)}
          {this.renderPhoneInput(props)}
          {this.renderGender(props)}
          {this.renderLocation(props)}
          {this.renderCheckBox(props)}
        </AppView>
        <AppButton
          processing={
            !Object.getOwnPropertyNames(errors).length && isSubmitting
          }
          onPress={handleSubmit}
          height={7}
          disabled={!this.state.termsConditionsCheck}
          stretch
          noBorder
          title={I18n.t('skip')}
        />
      </AppView>
    );
  };

  render() {
    return <>{this.renderForm()}</>;
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  connected: state.network.isConnected,
});

const mapDispatchToProps = dispatch => ({
  signUp: bindActionCreators(signUp, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormInput);
