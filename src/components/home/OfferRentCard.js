import React, { useState } from "react";
import { FlatList, Image } from "react-native";
import { useDispatch } from "react-redux";
import AppSwiper from "../AppSwiper";
import {
  AppView,
  AppImage,
  AppSpinner,
  AppList,
  AppText,
  AppButton,
  AppIcon,
  AppNavigation,
  showSuccess,
  showError,
  responsiveHeight,
  responsiveWidth,
} from "../../common";
import plier from "../../assets/imgs/ladder.png";
import * as ProductRepo from "../../repo/ProductRepo";
import { refreshList } from "../../actions/list";

import Share from "react-native-share";
import { View } from "react-native-animatable";
import FastImage from "react-native-fast-image";

const ProductToRent = (props) => {
  // const [loading, data] = useGet("sliders");

  const dispatch = useDispatch();
  const loading = false;
  const [isAddToFav, addToFav] = useState(
    props.favorite ? true : props.item.isFavorite
  );
  if (!props.item) {
    return null;
  }
  const [isShare, setShare] = useState(props.shareList ? true : false);

  const addToFavorite = async () => {
    try {
      const isAdd = await ProductRepo.addProductToFavorite(props.item.id);
      dispatch(refreshList("favorite"));
    } catch (error) {
      console.log("sfs");
    }
  };

  const removeToFavorite = async () => {
    try {
      const isRemoved = await ProductRepo.removeProductToFavorite(
        props.item.id
      );
      dispatch(refreshList("favorite"));
    } catch (error) {
      console.log("sfs");
    }
  };
  let image = "15831642987279.png";
  if (
    props.item &&
    props.item.hasOwnProperty("main_photo") &&
    props.item.main_photo
  ) {
    image = props.item.main_photo;
  }

  const [isShareLoading, setShareLoading] = useState(false);
  const addToShare = async () => {
    try {
      setShareLoading(true);
      const isAdd = await ProductRepo.addProductToShare(props.item.id);
      setShareLoading(false);
      dispatch(refreshList("share"));
    } catch (error) {
      setShareLoading(false);
      console.log("sfs");
    }
  };

  const removeToShare = async () => {
    console.log("removeToShare");

    setShareLoading(true);
    try {
      const isRemoved = await ProductRepo.removeProductToShare(props.item.id);
      setShareLoading(false);
      dispatch(refreshList("share"));
    } catch (error) {
      setShareLoading(false);
      console.log("sfs");
    }
  };
  return (
    <AppView
      height={23}
      width={!props.cardWidth ? 45 : undefined}
      {...props}
      // borderRadius={10}
      marginHorizontal={2}
      centerX
      marginBottom={5}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        } else {
          AppNavigation.push({
            name: "productDetails",
            passProps: {
              data: props.item,
            },
          });
        }
      }}
    >
      {/* <AppView
        height={23}
        {...props}
        width={!props.cardWidth ? 45 : undefined}
        center
        // backgroundColor="#F4F4F4"
        // elevation={1.5}
      > */}
      <View
        style={{
          // // flex:1,
          height: responsiveHeight(23),
          width: !props.cardWidth ? responsiveWidth(45) : undefined,
          borderRadius: 10,

          backgroundColor: "#F4F4F4",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: `http://dev.fudexsb.com/demo/ejarly/public/uploads/${image}`,
          }}
          style={{
            // flex: 1,
            height: responsiveHeight(23),
            width: !props.cardWidth ? responsiveWidth(45) : undefined,
            // borderRadius:10,
            // borderColor: "red",
            // borderWidth:1
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        {/* <img style="width:80px;height:50px;border: 1px solid #ddd;border-radius:4px " src="https://ejarly.api-ksa.com/uploads/15831642987279.png"></img> */}

        <AppView
          stretch
          row
          spaceBetween
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
          {/* <AppButton
            leftIcon={
              <AppIcon
                name="share"
                type="entypo"
                size={12}
                color={isShare ? "#FF5151" : "primary"}
              />
            }
            processing={isShareLoading}
            transparent
            onPress={() => {
              let options = {
                title: "Share via Egarly",
                message: `${props.item.name_ar}`,

                url: `http://ejarly.dev.fudexsb.com/uploads/${image}`,
              };
              Share.open(options);
            }}
          /> */}
          <AppButton
            leftIcon={
              <AppIcon
                name="heart"
                type="ant"
                size={12}
                color={isAddToFav ? "#FF5151" : "white"}
              />
            }
            transparent
            onPress={() => {
              addToFav(!isAddToFav);
              if (isAddToFav) {
                removeToFavorite();
              } else {
                addToFavorite();
              }
            }}
          />
        </AppView>

        <AppView stretch flex left style={{ justifyContent: "flex-end" }}>
          <AppText numberOfLines={1} center margin={5} color="primary" bold>
            {props.item.price_per_day} ر.س
          </AppText>
        </AppView>
      </View>
      {/* </AppView> */}
    </AppView>
  );
};

export default ProductToRent;
