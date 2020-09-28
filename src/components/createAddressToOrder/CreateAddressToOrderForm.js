import React from "react";
import { SafeAreaView } from "react-native";
import {
  AppView,
  AppFormLocation,
  AppInput,
  AppIcon,
  AppScrollView,
  AppCheckbox,
  AppText,
  AppButton
} from "../../common";
import { Formik } from "formik";
import { validationSchema } from "./Validation";
import Cities from "./Cities";
import Areas from "./Areas";
import I18n from "react-native-i18n";
import { HEADER_ELEVATION } from "../../common/utils/Constants";

export default props => {
  const { onSubmit ,provider} = props;

  _renderLocation = ({ handleChange, errors, values, touched }) => (
    <AppView marginBottom={12} stretch>
      <AppFormLocation
        initialValue={values.location}
        error={errors.location}
        onChange={handleChange("location")}
        placeholder={I18n.t("signup-location")}
        leftItems={[<AppIcon name="adress" type="custom" size={8} />]}
        backgroundColor="#E6E8EA"
        bc="#E6E8EA"
        noValidation={!touched.location}
      />
    </AppView>
  );

  _addressDetails = ({ handleBlur, handleChange, errors, values, touched }) => {
    return (
      <AppInput
        label={I18n.t("address-in-details")}
        leftItems={<AppIcon type="custom" name="home-adress" size={8} />}
        initialValue={values.addressInDetails}
        onBlur={handleBlur("addressInDetails")}
        onChange={handleChange("addressInDetails")}
        error={errors.addressInDetails}
        isTouched={touched.addressInDetails}
      />
    );
  };

  _renderAlias = ({ handleBlur, handleChange, errors, values, touched }) =>
    values.addToAddressBook ? (
      <AppInput
        label={I18n.t("home-address")}
        leftItems={<AppIcon type="custom" name="street" size={8} />}
        initialValue={values.alias}
        onBlur={handleBlur("alias")}
        onChange={handleChange("alias")}
        error={errors.alias}
        isTouched={touched.alias}
      />
    ) : (
      <></>
    );

  _renderFromBody = props => {
    const { values, handleSubmit, isSubmitting, setFieldValue } = props;
    return (
      <AppView stretch marginTop={7} flex>
        <AppScrollView
          marginHorizontal={10}
          stretch
          showsVerticalScrollIndicator={false}
          flex
        >
          <Cities {...props}  provider={provider}/>
          <Areas {...props} />
          {_renderLocation(props)}
          {_addressDetails(props)}
          <AppView
            row
            marginBottom={7}
            padding={2}
            stretch
            onPress={() => {
              setFieldValue("addToAddressBook", !values.addToAddressBook);
            }}
          >
            <AppCheckbox size={5} checked={values.addToAddressBook} />
            <AppText size={4.5}>{I18n.t("add-to-addressBook")}</AppText>
          </AppView>
          {_renderAlias(props)}
        </AppScrollView>
        <SafeAreaView style={{ alignSelf: "stretch" }}>
          <AppView paddingVertical={5} stretch elevation={HEADER_ELEVATION}>
            <AppButton
              marginHorizontal={10}
              title={I18n.t("save")}
              stretch
              processing={isSubmitting}
              onPress={handleSubmit}
              noBorder
              bottomSelf
            />
          </AppView>
        </SafeAreaView>
      </AppView>
    );
  };

  return (
    <Formik
      initialValues={{
        alias: "",
        city: "",
        area: "",
        addressInDetails: "",
        location: "",
        addToAddressBook: false
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {_renderFromBody}
    </Formik>
  );
};
