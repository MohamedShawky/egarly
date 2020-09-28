import { StyleSheet, Dimensions, Platform } from 'react-native';

import {
  moderateScale,
  responsiveHeight,
  responsiveWidth,
} from '../../common/utils/responsiveDimensions';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const height =
  Dimensions.get('window').height - APPBAR_HEIGHT - STATUSBAR_HEIGHT;

export default StyleSheet.create({
  logo: {
    position: 'absolute',
    top: responsiveHeight(10.5),
    right: 0,
    width: responsiveWidth(18),
    height: responsiveHeight(6),
    borderBottomLeftRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(15),
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    alignSelf: 'stretch',
  },
});
