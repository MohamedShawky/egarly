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
} from "../../common";
import product from "../../assets/imgs/product.png";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import avatar from "../../assets/imgs/avatar.png";
import moment from "moment";

export default (props) => {
  const { order } = props;
  const date = { from_date: order.from_date, to_date: order.to_date };

  return (
    <AppView stretch {...props.rest}>
      <ProductInfo data={order.product} />
      <DateTime data={date} />
      <NumberToRent {...order} />

      <NotesRenter {...props} />
    </AppView>
  );
};
export const ProductInfo = (props) => {
  const { data } = props;

  if (data === null) return null;

  let image = "";
  if (data) {
    image = `http://ejarly.dev.fudexsb.com/uploads/${
      data.hasOwnProperty("main_photo") ? data.main_photo : data.photos[0].image
    }`;
  }
  return (
    <AppView
      stretch
      style={props.flat ? undefined : cardShadowStyle}
      elevation={props.flat ? undefined : 1.5}
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="white"
      paddingHorizontal={props.flat ? props.paddingHorizontal : 2}
      {...props.style}
    >
      <AppView row stretch>
        <AppImage
          source={data ? { uri: image } : product}
          equalSize={20}
          stretch
        />
        <AppView stretch flex marginLeft={5}>
          <AppView row spaceBetween stretch>
            <AppText bold>{data ? data.ar_title : "بلايستنشن 4"} </AppText>
            <AppPrice
              amount={data ? data.price_per_day : 40}
              amountStyle={{ color: "green" }}
              unit="sudai-real"
            />
          </AppView>
          <AppText bold>
            {data ? data.ar_description : I18n.t("label-image")}
          </AppText>
        </AppView>
      </AppView>
    </AppView>
  );
};
export const DateTime = (props) => {
  const { data, values } = props;

  if (!data && !values) return null;
  const dateNow = new Date();
  return (
    <AppView
      stretch
      marginTop={5}
      style={props.flat ? {} : cardShadowStyle}
      elevation={props.flat ? undefined : 1.5}
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="white"
      paddingHorizontal={2}
    >
      <AppText marginBottom={5} bold>
        {I18n.t("date")}{" "}
      </AppText>
      <AppView stretch row spaceBetween>
        <AppView
          flex={2}
          backgroundColor="#F3F3F3"
          borderRadius={10}
          height={5}
          center
          row
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            }
          }}
        >
          <AppIcon type="material" name="date-range" />
          <AppText marginHorizontal={1}>
            {!data
              ? props.values.from_date !== ""
                ? props.values.from_date
                : "من"
              : moment(data.from_date).format("Do/MM/YYYY")}
          </AppText>
        </AppView>

        <AppView flex={1} center>
          <AppIcon name="arrowright" type="ant" flip />
        </AppView>
        <AppView
          flex={2}
          backgroundColor="#F3F3F3"
          borderRadius={10}
          height={5}
          center
          row
          onPress={() => {
            if (props.onPress) {
              props.onPress();
            }
          }}
        >
          <AppIcon type="material" name="date-range" />
          {
            <AppText marginHorizontal={1}>
              {data
                ? moment(data.to_date).format("Do/MM/YYYY")
                : props.values.to_date !== ""
                ? props.values.to_date
                : "الي "}
            </AppText>
          }
        </AppView>
      </AppView>
    </AppView>
  );
};

export const NumberToRent = (props) => {
  const { from_date, to_date } = props;

  console.log("NumberToRent", props);

  const nowDateToStr = moment(from_date).format("Do-MM-YYYY hh:mm:ss A");
  const endDate = moment(to_date).format("Do-MM-YYYY hh:mm:ss A");

  const now = moment(nowDateToStr, "Do-MM-YYYY hh:mm:ss"); //todays date
  const end = moment(endDate, "Do-MM-YYYY hh:mm:ss"); // another date

  const duration = moment.duration(end.diff(now));
  // 14 *24 

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
      <AppView stretch spaceBetween row>
        <AppText bold>{I18n.t("count")}</AppText>
        <AppText>
          {I18n.t("number-availabl", { number: props.product.quantity })}
        </AppText>
      </AppView>

      <AppText size={5} color="labelText" marginVertical={5}>
        {I18n.t("number-to-rent")}
      </AppText>
      <AppView
        backgroundColor="#F3F3F3"
        borderRadius={10}
        height={5}
        center
        stretch
      >
        <AppText>{props.quantity}</AppText>
      </AppView>
      <AppView stretch spaceBetween row marginTop={5}>
        <AppText bold>{I18n.t("type-product")}</AppText>

        <AppText>
          {props.product.main_categories
            .map((i) => {
              return i.ar_name;
            })
            .join("/")}
        </AppText>
        {/* <AppText>العاب / اجهزة الكترونيه</AppText> */}
      </AppView>
      <AppView stretch spaceBetween row marginTop={5}>
        <AppText bold>{I18n.t("days")}</AppText>
        <AppText>
          متاح للايجار لمدة {duration.days()} يوم / {duration.hours()} ساعه
        </AppText>
      </AppView>
      <AppView stretch spaceBetween row marginTop={5}>
        <AppText bold>{I18n.t("product-case")}</AppText>
        <AppText>{props.product.status_val.ar_name}</AppText>
      </AppView>
      <AppView stretch spaceBetween row marginTop={5}>
        <AppText bold>{I18n.t("total-cost")}</AppText>
        <AppText>{props.total} </AppText>
      </AppView>
      <AppView stretch spaceBetween row marginTop={5}>
        <AppText bold size={5}>
          {I18n.t("product-trans")}
        </AppText>
        <AppText>{props.delivery_type_obj.ar_name}</AppText>
      </AppView>
      {props.product.replacement_cost !== null && (
        <AppView stretch spaceBetween row marginTop={5}>
          <AppView>
            <AppText bold>{I18n.t("product-price")}</AppText>
            <AppText>في حاله الضرر سيتم دفع تكلفه قدرها</AppText>
          </AppView>
          <AppPrice
            amount={props.product.replacement_cost}
            unit={"real"}
            amountStyle={{ color: "red" }}
            unitStyle={{ color: "red" }}
          />
        </AppView>
      )}
    </AppView>
  );
};

export const ActionsButton = (props) => {
  return (
    <AppView
      stretch
      spaceBetween
      row
      marginTop={5}
      style={[
        cardShadowStyle,
        { positioon: "absolute", bottom: 0, left: 0, right: 0 },
      ]}
      elevation={1.5}
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="white"
      paddingHorizontal={2}
    >
      <AppButton
        title={I18n.t("accept")}
        flex
        backgroundColor="#08D500"
        onPress={() => {
          props.onAcceptOrder();
        }}
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
  );
};
const NotesRenter = (props) => {
  let product = null;
  if (props.hasOwnProperty("order")) {
    product = props.order.product;
  } else {
    product = props.product;
  }

  console.log("props ===>", props);

  return (
    <AppView
      marginTop={5}
      style={cardShadowStyle}
      elevation={1.5}
      paddingVertical={5}
      borderRadius={10}
      backgroundColor="white"
      paddingHorizontal={2}
      stretch
    >
      <AppText bold marginBottom={5}>
        {I18n.t("notes-renter")}
      </AppText>
      <AppView stretch spaceBetween row marginBottom={5}>
        <AppView stretch row>
          <AppImage source={avatar} circleRadius={15} stretch />
          <AppView marginHorizontal={2}>
            <AppText>{product.user.name}</AppText>
            <AppStarRating rate={3} size={5.5} />
          </AppView>
        </AppView>
        <AppButton
          backgroundColor="primary"
          title={I18n.t("chat")}
          stretch
          onPress={() => {
            AppNavigation.push({
              name: "chat",
              passProps: {
                order_id: props.order.order_id,
                owner_id: props.order.product.user.id,
              },
            });
          }}
        />
      </AppView>
      {props.order.order.note && (
        <AppInput placeholder={props.order.order.note} editablee={false} />
      )}
    </AppView>
  );
};
