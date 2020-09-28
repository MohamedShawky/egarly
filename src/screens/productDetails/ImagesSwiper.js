import React, { PureComponent } from "react";
import { Platform, Dimensions,  } from "react-native";
import Swiper from "react-native-swiper";
import Share from "react-native-share"
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
  renderBack = () => (
    <AppView
      stretch
      backgroundColor="#fff"
      row
      spaceBetween
      style={[
        styles.headerTitle,
        {
          // height: HEADER_HEIGHT,
        },
      ]}
    >
      <AppView stretch center width={20} marginTop={5}>
        <AppView
          center
          circleRadius={8}
          touchableOpacity
          onPress={() => {
            if (this.state.isAddToFav) {
              this.removeToFavorite();
            } else {
              this.addToFavorite();
            }
          }}
          backgroundColor={this.state.isAddToFav ? "white" : "rgba(0,0,0,.8)"}
        >
          <AppIcon
            name="heart"
            type="ant"
            size={8}
            color={this.state.isAddToFav ? "#FF5151" : "white"}
          />
        </AppView>
        <AppView
          center
          circleRadius={8}
          touchableOpacity
          marginTop={2}
          backgroundColor={"rgba(0,0,0,.8)"}
          onPress={() => {
            let options = {
              title: "Share via egarly",
              message: `Share via egarly`,
            };
            Share.open(options)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                err && console.log(err);
              });
          }}
        >
          <AppIcon
            name="share"
            type="entypo"
            size={8}
            color={this.props.isAddToFav ? "#FF5151" : "white"}
          />
        </AppView>
      </AppView>
      <AppView flex={3} center />
      <AppView stretch flex />
      <AppView stretch marginTop={5} centerX width={20}>
        <AppView
          center
          circleRadius={8}
          touchableOpacity
          onPress={this.props.onPress}
          backgroundColor="rgba(0,0,0,.8)"
        >
          <AppIcon name="close" type="ant" size={10} color="white" />
        </AppView>
      </AppView>
    </AppView>
  );

  addToFavorite = async () => {
    try {
      const isAdd = await addProductToFavorite(this.props.product_id);
      this.setState({
        isAddToFav: true,
      });
      dispatch(refreshList("favorite"));
    } catch (error) {
      console.log("sfs");
    }
  };
  removeToFavorite = async () => {
    try {
      const isRemoved = await removeProductToFavorite(this.props.product_id);
      this.setState({
        isAddToFav: false,
      });
      dispatch(refreshList("favorite"));
    } catch (error) {
      console.log("sfs");
    }
  };
  render() {
    return (
      <>
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
                src={`http://ejarly.dev.fudexsb.com/uploads/${img.image}`}
                placeholder={`http://ejarly.dev.fudexsb.com/uploads/${
                  img.image
                }`}
              />
            ))
          ) : (
            <AppView stretch flex center>
              <AppText>No Photo </AppText>
            </AppView>
          )}
        </Swiper>

        {this.renderBack()}
      </>
    );
  }
}
