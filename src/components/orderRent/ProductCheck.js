import React, { useState } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppIcon,
  AppNavigation,
  AppImage,
  AppPrice,
  AppButton,
  AppStarRating,
  AppInput,
  AppSpinner,
  showError,
  showSuccess,
} from "../../common";
import { ImagePicker } from "..";
import product from "../../assets/imgs/product.png";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import { Price } from "../addProduct";
import avatar from "../../assets/imgs/avatar.png";
import { ProductInfo, DateTime, NumberToRent } from "./ProductInfo";
import Axios from "axios";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";

export default (props) => {
  console.log("props ------- ==>>>", props.order);
  const order = props.order.products[0];
  const date = { from_date: order.from_date, to_date: order.to_date };

  return (
    <AppView stretch {...props.rest}>
      <ProductInfo data={props.order.products[0].product} />
      <DateTime data={date} />
      <NumberToRent {...order} />
      <Notes {...props} />
      {/* {props.order.owner_id === order.product.user_id ? (
        <AppView
          stretch
          marginTop={5}
          style={cardShadowStyle}
          elevation={1.5}
          paddingVertical={5}
          borderRadius={10}
          backgroundColor="white"
          paddingHorizontal={2}
        >
          <AppView stretch row spaceBetween>
            <AppView flex={3}>
              <AppText bold numberOfLines={1}>
                {I18n.t("note-5")}
              </AppText>
            </AppView>
            <AppText
              color="#79A6CD"
              numberOfLines={1}
              onPress={() => {
                AppNavigation.push({
                  name: "termsAndCondition",
                  passProps: {
                    order: true,
                  },
                });
              }}
              size={4.5}
            >
              {I18n.t("terms-and-condition-title")}
            </AppText>
          </AppView>
        </AppView>
      ) : (
        <Notes {...props} />
      )} */}
      <Agreement {...props} />
    </AppView>
  );
};

// export const ProductInfo = (props) => (
//   <AppView
//     stretch
//     {...props.rest}
//     style={cardShadowStyle}
//     elevation={1.5}
//     paddingVertical={5}
//     borderRadius={10}
//     backgroundColor="white"
//     paddingHorizontal={2}
//   >
//     <AppView row stretch>
//       <AppImage source={product} equalSize={20} stretch />
//       <AppView stretch flex>
//         <AppView row spaceBetween stretch>
//           <AppText bold>بلايستنشن 4 </AppText>
//           <AppPrice amount={40} unit="sudai-real" />
//         </AppView>
//         <AppText bold> {I18n.t("label-image")}</AppText>
//       </AppView>
//     </AppView>
//   </AppView>
// );

// const DateTime = (props) => (
//   <AppView
//     stretch
//     marginTop={5}
//     style={cardShadowStyle}
//     elevation={1.5}
//     paddingVertical={5}
//     borderRadius={10}
//     backgroundColor="white"
//     paddingHorizontal={2}
//   >
//     <AppText marginBottom={5}>{I18n.t("date")} </AppText>
//     <AppView stretch row spaceBetween>
//       <AppView
//         flex={2}
//         backgroundColor="#F3F3F3"
//         borderRadius={10}
//         height={5}
//         center
//         row
//       >
//         <AppIcon type="material" name="date-range" />
//         <AppText marginHorizontal={1}>12/10/2017</AppText>
//       </AppView>
//       <AppView flex={1} center>
//         <AppIcon name="arrowright" type="ant" flip />
//       </AppView>
//       <AppView
//         flex={2}
//         backgroundColor="#F3F3F3"
//         borderRadius={10}
//         height={5}
//         center
//         row
//       >
//         <AppIcon type="material" name="date-range" />
//         <AppText marginHorizontal={1}>12/10/2017</AppText>
//       </AppView>
//     </AppView>
//   </AppView>
// );

// const NumberToRent = (props) => (
//   <AppView
//     stretch
//     marginTop={5}
//     style={cardShadowStyle}
//     elevation={1.5}
//     paddingVertical={5}
//     borderRadius={10}
//     backgroundColor="white"
//     paddingHorizontal={2}
//   >
//     <AppView stretch spaceBetween row>
//       <AppText bold>{I18n.t("count")}</AppText>
//       <AppText>{I18n.t("number-availabl", { number: 20 })}</AppText>
//     </AppView>

//     <AppText size={5} color="labelText" marginVertical={5}>
//       {I18n.t("number-to-rent")}
//     </AppText>
//     <AppView
//       backgroundColor="#F3F3F3"
//       borderRadius={10}
//       height={5}
//       center
//       stretch
//     >
//       <AppText>5</AppText>
//     </AppView>
//     <AppView stretch spaceBetween row marginTop={5}>
//       <AppText bold>{I18n.t("type-product")}</AppText>
//       <AppText>العاب / اجهزة الكترونيه</AppText>
//     </AppView>
//     <AppView stretch spaceBetween row>
//       <AppText bold>{I18n.t("days")}</AppText>
//       <AppText>متاح للايجار لمدة 2 يوم</AppText>
//     </AppView>
//   </AppView>
// );

export const ActionsButton = (props) => (
  <AppView
    stretch
    paddingVertical={5}
    borderRadius={10}
    backgroundColor="white"
    paddingHorizontal={2}
  >
    {props.sppiner ? (
      <AppView stretch center>
        <AppSpinner />
      </AppView>
    ) : (
      <AppView stretch spaceBetween row>
        <AppButton
          title={I18n.t("conifrm-preview")}
          flex
          backgroundColor="primary"
          onPress={() => {
            props.onPreviewRequest();
          }}
          disabled={props.disabled}
        />
        <AppView width={5} />
        <AppButton
          title={I18n.t("refuse")}
          flex
          backgroundColor="#FF5151"
          onPress={() => {
            props.onRefuseOrder();
          }}
        />
      </AppView>
    )}
    <AppButton
      title={I18n.t("add-new-product")}
      stretch
      borderColor="labelText"
      borderWidth={1}
      backgroundColor="white"
      marginTop={5}
      color="labelText"
      processing={props.isRefused}
    />
  </AppView>
);

export const ActionsButtonOwner = (props) => (
  <AppView
    stretch
    paddingVertical={5}
    borderRadius={10}
    backgroundColor="white"
    paddingHorizontal={2}
  >
    {props.sppiner ? (
      <AppView stretch center>
        <AppSpinner />
      </AppView>
    ) : (
      <AppView stretch spaceBetween row>
        <AppButton
          title={I18n.t("request-preview")}
          flex
          backgroundColor="green"
          onPress={() => {
            props.onPreviewRequest();
          }}
        />
        <AppView width={5} />
        <AppButton
          title={"الفاء العمليه"}
          flex
          backgroundColor="#FF5151"
          onPress={() => {
            props.onRefuseOrder();
          }}
          processing={props.isRefused}
        />
      </AppView>
    )}
  </AppView>
);

const Notes = (props) => {
  const notes = [
    {
      notes: I18n.t("note-1"),
    },
    {
      notes: I18n.t("note-2"),
    },
    {
      notes: I18n.t("note-3"),
    },
    {
      notes: I18n.t("note-4"),
    },
  ];
  return (
    <AppView
      stretch
      marginTop={5}
      style={cardShadowStyle}
      elevation={1.5}
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="white"
      paddingHorizontal={2}
    >
      <AppText bold> {I18n.t("notes-to-check")}</AppText>
      {notes.map((item, index) => (
        <AppView stretch row flex>
          <AppText bold>
            {index + 1} - {item.notes}
          </AppText>
        </AppView>
      ))}
      <AppView stretch row spaceBetween>
        <AppView flex={3}>
          <AppText bold numberOfLines={1}>
            {5} - {I18n.t("note-5")}
          </AppText>
        </AppView>
        <AppText
          color="#79A6CD"
          numberOfLines={1}
          onPress={() => {
            AppNavigation.push({
              name: "termsAndCondition",
              passProps: {
                order: true,
              },
            });
          }}
          size={4.5}
        >
          {I18n.t("terms-and-condition-title")}
        </AppText>
      </AppView>
    </AppView>
  );
};

export const Agreement = (props) => {
  let note = false;
  const { handleBlur, errors, handleChange, touched, values } = props;

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const sendNote = async () => {
    try {
      setLoading(true);
      const add = await Axios.post(
        `${API_ENDPOINT_GATEWAY}order/update_note/${props.order.id}`,
        {
          owner_note: text,
        }
      );
      console.log("add",add);
      
      showSuccess("تم اضافه ملاحظه");
      setText("");
    } catch (error) {
      console.log("errro ==>", error.response);

      showError(I18n.t("ui-error-happened"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppView
      stretch
      marginTop={5}
      style={cardShadowStyle}
      elevation={1.5}
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="white"
      paddingHorizontal={2}
    >
      <AppText bold>{I18n.t("agreement")}</AppText>
      <AppView
        backgroundColor="#F3F3F3"
        borderRadius={10}
        paddingVertical={3}
        centerY
        stretch
      >
        <AppView row stretch>
          <AppView circleRadius={10} center backgroundColor="#5FE45A">
            <AppIcon name="checkcircle" type="ant" color="white" size={10} />
          </AppView>
          <AppText marginHorizontal={3}>{I18n.t("agree")}</AppText>
        </AppView>
      </AppView>
      <AppText bold>{I18n.t("check")}</AppText>
      <AppText color="labelText">{I18n.t("check-notes")}</AppText>

      {props.ownerOrRenter && (
        <>
          <AppView
            backgroundColor="#F3F3F3"
            borderRadius={10}
            paddingVertical={3}
            center
            stretch
            borderWidth={1.5}
            borderColor="#5FE45A"
            marginTop={5}
            onPress={() => {
              if (text && !loading) {
                sendNote();
              }
            }}
          >
            {loading ? (
              <AppSpinner />
            ) : (
              <AppText>{I18n.t("add-notes")}</AppText>
            )}
          </AppView>
          <AppInput
            marginTop={5}
            placeholder={I18n.t("notes")}
            initialValue={text}
            onChange={(v) => {
              setText(v);
            }}
          />
        </>
      )}

      {note && (
        <AppInput
          placeholder={I18n.t("label-desc")}
          height={20}
          multiline
          initialValue={values.description}
          onBlur={handleBlur("description")}
          onChange={handleChange("description")}
          error={errors.description}
          isTouched={touched.description}
        />
      )}
    </AppView>
  );
};
