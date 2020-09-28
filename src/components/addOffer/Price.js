import React, { useState } from "react";
import I18n from "react-native-i18n";
import { App } from "react-native-firebase";
import {
  AppView,
  AppText,
  AppIcon,
  AppInput,
  SelectionOptionsGroup,
  AppInputError,
} from "../../common";

export default (props) => {
  const name = {
    price_per_day: 0,
    price_per_week: 1,
    price_per_month: 2,
  };

  const prices = [
    {
      pricehint: I18n.t("price_from"),
      name: "price_from",
      id: 0,
    },
    {
      pricehint: I18n.t("price_to"),
      name: "price_to",
      id: 1,
    },
  ];

  const [isSelected, setSelected] = useState(false);
  const { values, handleBlur, handleChange, errors, touched } = props;

  return (
    <AppView stretch {...props.rest}>
      {props.label ? (
        <AppText>{props.label}</AppText>
      ) : (
        <AppView row stretch marginVertical={8}>
          <AppText bold> {I18n.t("label-price")}</AppText>
          <AppText
            marginHorizontal={0.5}
            size={8}
            color={require ? "red" : "white"}
          >
            *
          </AppText>
        </AppView>
      )}
      <AppView stretch row spaceAround marginHorizontal={6}>
        {prices.map((item, index) => (
          <AppView
            height={13}
            flex
            marginHorizontal={5}
            backgroundColor={"transparent"}
            onPress={() => {
              if (props.labelDay) {
                setSelected(true);
              }
            }}
          >
            <InputPrice {...props} {...item} isSelected={isSelected} />
            <Label lable={item.pricehint} />
          </AppView>
        ))}
      </AppView>
      {/* <AppInputError
        error={props.error !== null ? props.error : " "}
        errorTextMarginHorizontal={5}
        errorTextMarginBottom={1}
        errorTextMarginBottom
        errorTextMarginTop={0}
        size={5}
      /> */}
    </AppView>
  );
};
const Label = (props) => (
  <AppView
    paddingHorizontal={2}
    borderRadius={20}
    centerY
    style={{
      position: "absolute",
      top: -5,
      zIndex: 10000,
      // left: 12,
      right: 12,
    }}
    width={15}
    backgroundColor="white"
    marginHorizontal={2}
  >
    <AppText marginBottom={1}>{props.lable}</AppText>
  </AppView>
);

const InputPrice = (props) => {
  const { values, handleBlur, handleChange, errors, touched, name } = props;

  const [isSelected, setSelected] = useState(false);

  return (
    <AppView stretch center flex>
      <AppInput
        height={11}
        borderColor={isSelected ? "primary" : "inputBgColor"}
        borderWidth={1}
        stretch
        textAlignVertical="center"
        initialValue={values[name]}
        onBlur={handleBlur(name)}
        onChange={handleChange(name)}
        backgroundColor={isSelected ? "primary" : "white"}
        error={errors[name]}
        isTouched={touched[name]}
        number
        onPress={() => {
          setSelected(!isSelected);
        }}
        {...props}
      />
    </AppView>
  );
};
