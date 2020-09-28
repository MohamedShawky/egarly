import React, { useState } from "react";
import { FlatList } from "react-native";
import AppSwiper from "../AppSwiper";
import {
  AppView,
  AppImage,
  AppSpinner,
  AppList,
  AppText,
  AppScrollView,
} from "../../common";

import Image1 from "../../assets/imgs/home/Group1.png";
import Image2 from "../../assets/imgs/home/Group2.png";
import Image3 from "../../assets/imgs/home/Group3.png";
import Image4 from "../../assets/imgs/home/Group4.png";
import Image5 from "../../assets/imgs/home/Group5.png";

const data = [
  { image: Image1, name: "اجهزه الكترونيه", slider_id: 1 },
  { image: Image2, name: "معدات تصوير ", slider_id: 1 },
  { image: Image3, name: "رحلات وتخيم", slider_id: 2 },
  { image: Image4, name: "اجهزه الكترونيه", slider_id: 3 },
  { image: Image5, name: "اجهزه الكترونيه", slider_id: 3 },
];

const renderItem = (item, props, selected, select) => {
  // <img src="https://ejarly.api-ksa.com/thumbs/15833294391369.png" style="width:100px;height:80px"></img>

  return (
    <AppView
      height={15}
      width={25}
      borderRadius={10}
      marginHorizontal={2}
      centerX
    
      onPress={() => {
        props.onConfirm(item.id);
        select(item.id);
      }}

      borderColor={selected ? "primary" : "white"}
      borderWidth={1}
    >
      <AppView circleRadius={20} center    backgroundColor="#F4F4F4">
        <AppImage
          circleRadius={18}
          source={{ uri: `http://ejarly.dev.fudexsb.com/thumbs/${item.image}` }}
        />
      </AppView>
      <AppView flex center>
        <AppText numberOfLines={1} center>
          {item.ar_name}
        </AppText>
      </AppView>
    </AppView>
  );
};
const ProductToRent = (props) => {
  // const [loading, data] = useGet("sliders");
  const loading = false;
  const [selectedValue, setSelectedValue] = useState(0);

  const select = (val) => {
    setSelectedValue(val);
  };
  return (
    <AppScrollView horizontal showsHorizontalScrollIndicator={false}>
      {props.data.map((item) => {
        const selected = item.id === selectedValue;
        return renderItem(item, props, selected, select);
      })}
    </AppScrollView>
  );
};

export default ProductToRent;
