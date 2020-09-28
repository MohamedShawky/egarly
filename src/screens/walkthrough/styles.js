import { StyleSheet } from 'react-native';

import {
  responsiveHeight,
  moderateScale,
  responsiveWidth,
} from '../../common/utils/responsiveDimensions';
import { getColors } from '../../common';
import { getTopSpace } from '../../utils/iphoneHelper';

export default StyleSheet.create({
  dotStyles: {
    width: responsiveHeight(3.5),
    height: responsiveHeight(0.6),
    borderRadius: 0,

    backgroundColor: 'lightgrey',
    // marginTop: responsiveHeight(13),
    position: 'relative',
    bottom: responsiveHeight(30),
    justifyContent:'flex-start'
  },
  activeDotStyles: {
    width: responsiveHeight(3.5),
    height: responsiveHeight(0.6),
    borderRadius: 0,
    backgroundColor: getColors().primary,
    position: 'relative',
    bottom: responsiveHeight(30),
    justifyContent:'flex-start'

  },
  button: {
    position: 'absolute',
    bottom:responsiveHeight(3.1),
    left: responsiveWidth(5.4),
    right:responsiveWidth(5.4),
    borderRadius:5,
    marginTop:responsiveHeight(6.8)
  },
});
