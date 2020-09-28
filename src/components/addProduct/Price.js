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
      pricehint: props.labelDay || I18n.t("by-day"),
      name: "price_per_day",
      id: 0,
    },
    {
      pricehint: props.labelWeek || I18n.t("by-week"),
      name: "price_per_week",
      id: 1,
    },
    {
      pricehint: props.labelMonth || I18n.t("by-month"),
      name: "price_per_month",
      id: 2,
    },
  ];
  const [price, setPrice] = useState(false);
  const [id, setid] = useState();

  const [isSelected, setSelected] = useState(false);
  const { values, handleBlur, handleChange, errors, touched } = props;

  return (
    <AppView stretch {...props.rest}>
      {props.adv ? null : props.label ? (
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
      <AppView stretch row sapceBetween>
        {prices.map((item, index) => (
          <AppView
            height={15}
            flex
            marginHorizontal={item.id === 1 ? 4 : undefined}
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
      {/* {props.error !== null && ( */}
      <AppInputError
        error={props.error !== null ? props.error : " "}
        errorTextMarginHorizontal={5}
        errorTextMarginBottom={1}
        errorTextMarginBottom
        errorTextMarginTop={0}
        size={5}
      />

      {/* )} */}
      {props.quantity && (
        <AppView stretch marginTop={-2}>
          <AppText bold>{props.label}</AppText>
          {props.labelhint && <AppText>{props.labelhint}</AppText>}

          <AppInput
            marginTop={1}
            placeholder={I18n.t("number-product")}
            initialValue={props.values.quantity}
            onBlur={props.handleBlur("quantity")}
            onChange={props.handleChange("quantity")}
            error={props.errors.quantity}
            isTouched={props.touched.quantity}
            number
          />
        </AppView>
      )}
      {!props.distinction_status_id && (
        <>
          <AppView row stretch>
            <AppText bold marginTop={5}>
              {I18n.t("label-re-use")}
            </AppText>
            {/* <AppText color="#FF9292"  size={8}>*</AppText> */}
          </AppView>
          <AppText size={5} color="labelText" marginVertical={5}>
            ( {I18n.t("label-re-use-hint")})
          </AppText>
          <AppInput
            placeholder={I18n.t("label-re-use")}
            initialValue={values.replacement_cost}
            onBlur={handleBlur("replacement_cost")}
            onChange={handleChange("replacement_cost")}
            error={errors.replacement_cost}
            isTouched={touched.replacement_cost}
            number
          />
        </>
      )}
    </AppView>
  );
};
const Label = (props) => (
  <AppView
    paddingHorizontal={5}
    borderRadius={20}
    centerY
    style={{
      position: "absolute",
      top: -5,
      zIndex: 10000,
      left: 10,
      right: 10,
    }}
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
        height={13}
        borderColor={isSelected ? "primary" : "inputBgColor"}
        borderWidth={1}
        stretch
        textAlignVertical="center"
        initialValue={values[name]}
        onBlur={handleBlur(name)}
        onChange={handleChange(name)}
        backgroundColor={isSelected ? "primary" : "white"}
        error={errors[name]}
        isTouched={touched.price_per_day}
        // style={{backgroundColor:'white'}}
        number
        onPress={() => {
          setSelected(!isSelected);
        }}
        {...props}
      />
    </AppView>
  );
};
