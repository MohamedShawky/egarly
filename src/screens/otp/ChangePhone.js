import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { bindActionCreators } from "redux";
import { Formik } from "formik";
import AppHeader from "../../components/Header";
import { validationSchemaEGY, validationSchemaSAUDIA } from "./Validation";
import { setCurrentUser } from "../../actions/AuthActions";
import {
  AppView,
  AppText,
  AppButton,
  AppInput,
  AppNavigation,
  AppIcon
} from "../../common";
import { AppErrorModal } from "../../components";
import * as authRepo from '../../repo/AuthRepo';
import * as errors from '../../utils/Errors';

class ChangePhone extends Component {
  constructor(props) {
    super(props);

    this.fromikRef = React.createRef();
  }

  state = {
    isVisible: false,
    errorText: ""
  };

  onSubmit = async (values, { setSubmitting }) => {
    let phone = "";
    const dailCode = this.props.currentUser.user.city.country.dialCode;
    if (dailCode === "+20" && values.phone.startsWith("0")) {
      phone = dailCode + values.phone.slice(1);
    } else {
      phone = dailCode + values.phone;
    }
    let isChangePhone = false;
    try {
      isChangePhone = await authRepo.changePhone(phone);
      console.log("After Fetch");
      
      if (isChangePhone) {
        const userAfterUpdatePhone = this.props.currentUser;

      const user = {
        ...userAfterUpdatePhone,
        user: {
          ...userAfterUpdatePhone.user,
          phone
        }
      };
      this.props.setCurrentUser(user);
      
      if (this.props.onChange) {
        this.props.onChange();
      }
      AppNavigation.pop();
    }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.setState({
          isVisible: true,
          errorText: I18n.t("ui-networkConnectionError")
        });
      } else if (typeof error === 'object') {
        this.setState({
          isVisible: true,
          errorText: error.message
        });
      }
    } finally {
      setSubmitting(false);
    }
   
  };

  renderPhoneInput = ({
    errors,
    handleBlur,
    handleChange,
    values,
    touched,
    status
  }) => {
    const { currentUser } = this.props;
    return (
      <AppView row spaceBetween>
        <AppView flex={3.5}>
          <AppInput
            name="phone"
            phone
            isTouched={touched.phone}
            initialValue={values.phone}
            onBlur={handleBlur("phone")}
            onChange={handleChange("phone")}
            error={errors.phone}
            asyncLoading={status && status.phone}
            // setError={setFieldError}
            label={I18n.t("signup-phone")}
            labelColor="primary"
            number
            leftItems={[<AppIcon flip name="phone" type="entypo" size={10} />]}
          />
        </AppView>
        <AppView
          height={7.5}
          style={{ alignSelf: "flex-start" }}
          flex
          center
          borderColor="#8A8A8A"
          borderWidth={1}
          marginLeft={5}
          borderRadius={5}
        >
          <AppText color="#8A8A8A" size={5.5}>
            {currentUser && currentUser.user.city.country.dialCode}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  renderFormInputs = props => (
    <React.Fragment>
      <AppView stretch marginHorizontal={8}>
        {this.renderPhoneInput(props)}
      </AppView>
      {this.renderChangeButton(props)}
    </React.Fragment>
  );

  renderChangeButton = ({errors, isSubmitting, handleSubmit }) => (
    <AppButton
      title={I18n.t("change-phone-resend-code")}
      centerX
      processing={!Object.getOwnPropertyNames(errors).length && isSubmitting}
      onPress={handleSubmit}
      stretch
      style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
      height={8}
    />
  );

  createValidationSchema = () => {
    const {dialCode,id} = this.props.currentUser.user.city.country;
    return (
     dialCode === "+20"
      ?validationSchemaEGY( id, this.fromikRef)
      :validationSchemaSAUDIA(id,this.fromikRef)
    );
  };

  renderForm = () => (
    <AppView stretch flex centerX>
      <Formik
        ref={this.fromikRef}
        initialValues={{
          phone: ""
        }}
        validationSchema={this.createValidationSchema()}
        onSubmit={(values, { setSubmitting }) =>
          this.onSubmit(values, { setSubmitting })
        }
      >
        {this.renderFormInputs}
      </Formik>
    </AppView>
  );

  render() {
    return (
      <AppView flex backgroundColor="white">
        <AppHeader title={I18n.t("change-phone")} />
        <AppView
          centerX
          stretch
          marginHorizontal={23}
          marginVertical={13}
          paddingBottom={5}
        >
          <AppText bold size={5} color="grey">
            {I18n.t("otpScreen-change-phone-text")}
          </AppText>
        </AppView>

        {this.renderForm()}
        <AppErrorModal
          visible={this.state.isVisible}
          fromSignIn
          changeState={v => {
            this.setState({
              isVisible: v
            });
          }}
          errorMessage={[this.state.errorText]}
          onConfirm={() => {
            this.setState({
              isVisible: false
            });
          }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: bindActionCreators(setCurrentUser, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePhone);
