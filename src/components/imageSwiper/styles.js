import {StyleSheet , Dimensions } from 'react-native';
import { responsiveHeight } from '../../common/utils/responsiveDimensions';
import colors from '../../common/defaults/colors';

const radius = responsiveHeight(1.4);

export default StyleSheet.create({
  dotStyles: {
    width: radius,
    height: radius,
    borderRadius: radius / 2,
    bottom: -15,
    marginLeft:10,
    // borderWidth:1,
    // borderColor:"#444",
    backgroundColor:'rgba(0,0,0,0.32)'
  },
  activeDotStyles: {
    width: radius,
    height: radius,
    borderRadius: radius / 2,
    backgroundColor: colors.primary,
    marginLeft:10,
    bottom: -15,
  },
  swiper: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.80,
  },
})