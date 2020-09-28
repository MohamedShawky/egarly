import React from "react";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import { AppView, responsiveWidth, moderateScale } from "../common";
import colors from "../common/defaults/colors";
import cardShadowStyle from "../common/utils/cardShadowStyle";

class AppSwiper extends React.Component {
  renderSwiper = ({
    style,
    dotStyle,
    activeDotStyle,
    children,
    showsPagination,
    autoplay
  }) => (
    <Swiper
      width={responsiveWidth(100)}
      Style={[style]}
      {...{ autoplay }}
      {...{ showsPagination }}
      dotStyle={[
        {
          width: responsiveWidth(3),
          height: responsiveWidth(3),
          borderRadius: responsiveWidth(1.5)
        },
        dotStyle
      ]}
      activeDotStyle={[
        {
          width: responsiveWidth(3),
          height: responsiveWidth(3),
          borderRadius: responsiveWidth(1.5)
        },
        activeDotStyle
      ]}
      dotColor="#FFCC00"
      activeDotColor={colors.darkgrey}
    >
      {/* <AppView stretch center> */}
      {children}
      {/* {children.map((item, key) => {
        return (
          <AppView
            flex
            stretch
            margin={5}
            elevation={2}
            centerX
            {...{ key }}
            stretch
          >
            {item}
          </AppView>
        );
      })} */}
      {/* </AppView> */}
    </Swiper>
  );

  render() {
    const {
      containerStyle,
      style,
      dotStyle,
      activeDotStyle,
      showsPagination,
      autoplay,
      children,
      ...rest
    } = this.props;
    return (
      <AppView stretch center {...rest} style={cardShadowStyle} elevation={1.5}>
        {this.renderSwiper({
          style,
          dotStyle,
          activeDotStyle,
          children,
          showsPagination,
          autoplay
        })}
      </AppView>
    );
  }
}
export default connect()(AppSwiper);
