import React, { useState, useEffect } from "react";
import I18n from "react-native-i18n";
import MapView from "react-native-maps";
import {
  AppView,
  AppText,
  AppIcon,
  AppNavigation,
  AppButton,
  AppInput,
} from "../../common";
import { ImagePicker } from "..";
import { getPlaceName } from "../../utils";

export default (props) => {
  const { setFieldValue, values, errors , handleBlur, handleChange, touched} = props;
  const [loc, setLoc] = useState(null);
  const [latLng, setLoclatLng] = useState();
  useEffect(() => {
    if (props.values.latitude && props.values.longitude) {
      const val = {
        latitude: parseFloat(props.values.latitude),
        longitude: parseFloat(props.values.longitude),
      };
      onChange(val);
    }
  }, []);

  const onChange = async (value, noValidate) => {
    let locationName = "";
    if (value) {
      locationName = await getPlaceName(value.latitude, value.longitude);
      console.log("locationName ==>", locationName);
    }

    setLoc(locationName);
    console.log("values ==>>", locationName);

    setFieldValue("latitude", value.latitude);
    setFieldValue("longitude", value.longitude);

    console.log("valiea", value);

    setLoclatLng(value);
  };
  return (
    <AppView stretch {...props}>
      <AppView row stretch spaceBetween>
        {!props.offer ? (
          <AppText bold>
            {props.offer ? I18n.t("loc-offer") : I18n.t("location")}
          </AppText>
        ) : (
          <AppView row stretch flex>
            <AppInput
              flex
              backgroundColor="transparent"
              stretch
              editable={false}
              initialValue={values.latitude}
              onBlur={handleBlur("latitude")}
              onChange={handleChange("latitude")}
              error={errors.latitude}
              isTouched={touched.latitude}
              leftItems={
                <AppView row stretch>
                  <AppText bold>{I18n.t("loc-offer")}</AppText>
                  <AppText
                    marginHorizontal={0.5}
                    size={8}
                    color={require ? "red" : "white"}
                  >
                    *
                  </AppText>
                </AppView>
              }
              rightItems={
                <AppButton
                  leftIcon={
                    <AppIcon name="md-locate" type="ion" color="primary" />
                  }
                  transparent
                  onPress={() => {
                    AppNavigation.push({
                      name: "mapScreen",
                      passProps: {
                        onLocationChangeCallback: (val) => {
                          onChange(val);
                        },
                      },
                    });
                  }}
                />
              }
            />
          </AppView>
        )}
        {!props.offer && (
          <AppButton
            leftIcon={<AppIcon name="md-locate" type="ion" color="white" />}
            onPress={() => {
              AppNavigation.push({
                name: "mapScreen",
                passProps: {
                  onLocationChangeCallback: (val) => {
                    onChange(val);
                  },
                },
              });
            }}
          />
        )}
      </AppView>
      {loc !== null && loc !== undefined && (
        <>
          <>
            {!props.offer && (
              <AppText bold>{loc && loc[0] !== undefined && loc[0]}</AppText>
            )}
          </>
          <AppView stretch height={30} marginBottom={10} center>
            <MapView
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
              region={{
                latitude: props.values.latitude,
                longitude: props.values.longitude,
                latitudeDelta: 0.007016387588862472,
                longitudeDelta: 0.004741139709949493,
              }}
              scrollEnabled={false}
            />
            <AppView
              circleRadius={20}
              backgroundColor="primary"
              style={{
                position: "absolute",
                top: 25,

                opacity: 0.7,
              }}
            />
          </AppView>
        </>
      )}
    </AppView>
  );
};
