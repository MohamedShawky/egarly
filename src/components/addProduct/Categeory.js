import React, { useState } from "react";
import I18n from "react-native-i18n";
import { Picker } from "react-native";
import { View } from "react-native-animatable";
import {
  AppView,
  AppText,
  AppIcon,
  AppNavigation,
  AppTabs,
  AppInput,
  AppSpinner
} from "../../common";
import { ImagePicker } from "..";

export default props => {
  const [value, setValue] = useState();
  console.log("name ==>", props.name);

  return (
    <AppView stretch {...props}>
      <AppText bold>{props.label}</AppText>
      {props.labelhint && <AppText>{props.labelhint}</AppText>}
      <View
        style={{
          borderColor: "#F3F3F3",
          borderWidth: 1,
          borderRadius: 5,
          alignSelf: "stretch"
        }}
      >
        {props.quantity ? (
          <AppInput
            placeholder={I18n.t("number-product")}
            initialValue={props.values.quantity}
            onBlur={props.handleBlur("quantity")}
            onChange={props.handleChange("quantity")}
            error={props.errors.quantity}
            isTouched={props.touched.quantity}
            number
          />
        ) : props.sppiner ? (
          <AppView stretch center>
            <AppSpinner />
          </AppView>
        ) : (
          <Picker
            selectedValue={value}
            style={{
              // width: "100%",
              alignSelf: "stretch",
              backgroundColor: "transparent"
            }}
            itemStyle={{ textShadowColor: "green" }}
            onValueChange={val => {
              setValue(val);
              props.handleChange(props.name)(val);
            }}
          >
            {props.data.length !==0  &&
              props.data.map(item => {
                console.log(
                  "item ********************************** ===>>",
                  item
                );

                return (
                  <Picker.Item
                    label={item.en_name}
                    value={item.id}
                    style={{ marginTop: 50 }}
                  />
                );
              })}
          </Picker>
        )}
      </View>
    </AppView>
  );
};
