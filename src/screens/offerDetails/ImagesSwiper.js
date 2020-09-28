import React, { PureComponent } from "react";
import { Platform, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import Share from "react-native-share";
import { ImagePlaceholder } from "../../components";
import {
  AppView,
  AppIcon,
  AppNavigation,
  AppText,
  responsiveHeight,
  AppButton,
} from "../../common";
import styles from "./styles";
import {
  addProductToFavorite,
  removeProductToFavorite,
} from "../../api/ProductApi";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 64;

export default class ImagesSwiper extends PureComponent {
  state = {
    isAddToFav: this.props.isAddToFav,
  };

  render() {
    return (
      <Swiper
        loop
        horizontal
        autoplayTimeout={4}
        dotStyle={styles.dotStyles}
        activeDotStyle={[styles.dotStyles, styles.activeDotStyles]}
        index={2}
        containerStyle={styles.swiper}
      >
        {this.props.imgs.length > 0 ? (
          this.props.imgs.map((img) => (
            <ImagePlaceholder
              key={img}
              style={{ flex: 1 }}
              duration={1000}
              // showFullScreen={false}
              showActivityIndicator={true}
              src={`http://ejarly.dev.fudexsb.com/uploads/${img}`}
              placeholder={`http://ejarly.dev.fudexsb.com/uploads/${img}`}
            />
          ))
        ) : (
          <AppView stretch flex center>
            <AppText>No Photo </AppText>
          </AppView>
        )}
      </Swiper>
    );
  }
}
