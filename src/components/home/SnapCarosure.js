import React from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import AppSwiper from "../AppSwiper";
import {
  AppView,
  AppImage,
  AppSpinner,
  responsiveWidth,
  AppText,
  AppNavigation,
} from "../../common";
import Image1 from "../../assets/imgs/home/Image1.png";
import Image2 from "../../assets/imgs/home/Image2.png";
import Image3 from "../../assets/imgs/home/Image3.png";
import Image4 from "../../assets/imgs/home/Image4.png";
import styles from "./styles";

const data = [
  { image: Image1, slider_id: 1 },
  { image: Image2, slider_id: 1 },
  { image: Image3, slider_id: 2 },
  { image: Image4, slider_id: 3 },
];
// const sliderWidth = responsiveWidth(40);
// const itemWidth = responsiveWidth(70);
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const HomeSwiper = (props) => {
  // const [loading, data] = useGet("sliders");
  console.log("dataAdv ==>>", props);

  const { marginHorizontal } = props;
  const loading = false;
  _renderItem = ({ item, index }) => (
    <View style={{ flex: 1, marginHorizontal: 5 }}>
      <AppView
        flex
        stretch
        centerX
        {...{ key: item.id }}
        height={25}
        borderRadius={10}
        onPress={() => {
          AppNavigation.push({
            name: "productDetails",
            passProps: {
              product_id: item.product_id,
            },
          });
        }}
      >
        <AppImage
          source={{ uri: `http://ejarly.dev.fudexsb.com/thumbs/${item.image}` }}
          // height={30}
          flex
          contain
          stretch
          // width={100}
        />
      </AppView>
    </View>
  );

  if (props.dataAdv.length === 0) {
    return (
      <AppView width={100} center flex>
        {" "}
        <AppText>No data</AppText>
      </AppView>
    );
  }

  return (
    // <AppView stretch borderColor="red" borderWidth={2}>
    <Carousel
      ref={(c) => {
        this._carousel = c;
      }}
      data={props.dataAdv}
      renderItem={this._renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      containerCustomStyle={styles.slider}
      contentContainerCustomStyle={styles.sliderContentContainer}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      loop
      loopClonesPerSide={2}
      autoplay
      autoplayDelay={500}
      autoplayInterval={3000}
      // layout="stack"
    />
    // </AppView>
  );
};

export default HomeSwiper;
