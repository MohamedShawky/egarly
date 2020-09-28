import React from "react";
import AppSwiper from "../AppSwiper";
import { AppView, AppImage, AppSpinner } from "../../common";

import Image1 from "../../assets/imgs/home/Image1.png";
import Image2 from "../../assets/imgs/home/Image2.png";
import Image3 from "../../assets/imgs/home/Image3.png";
import Image4 from "../../assets/imgs/home/Image4.png";

// const data = [
//   { image: Image1, slider_id: 1 },
//   { image: Image2, slider_id: 1 },
//   { image: Image3, slider_id: 2 },
//   { image: Image4, slider_id: 3 }
// ];

const HomeSwiper = ({ marginHorizontal, data }) => {
  // const [loading, data] = useGet("sliders");
  const loading = false;

  // let image = "15831642987279.png";
  // if (props.item.photos && props.item.photos.length) {
  //   image = props.item.photos[0].image;
  // }
  return (
    <AppSwiper
      autoplay
      showsPagination
      height={30}
      containerStyle={{
        justifyContent: "center",
        alignItems: "center"
        // elevation: 1.5
      }}
      dotStyle={{ marginBottom: 30 }}
      activeDotStyle={{ marginBottom: 30 }}
    >
      {loading ? (
        <AppSpinner />
      ) : (
        data.map(item => (
          <AppView
            {...{ marginHorizontal }}
            flex
            stretch
            center
            {...{ key: item.slider_id }}
          >
            {/* <AppImage source={{ uri: item.img_url }} stretch height={25} /> */}
            <AppImage source={{ uri : `http://ejarly.dev.fudexsb.com/uploads/${item.image}`}} stretch height={28} />
          </AppView>
        ))
      )}
    </AppSwiper>
  );
};

export default HomeSwiper;
