import { StyleSheet } from 'react-native';
import { getColors } from '../../common';
import {
  responsiveHeight,
  responsiveWidth,
  moderateScale,
} from '../../common/utils/responsiveDimensions';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    alignSelf: 'stretch',
  },
  scrollContainerView: {
    alignSelf: 'stretch',
    marginTop: moderateScale(10),
  },
  border: {
    borderWidth: getColors().inputBorderWidth,
    borderColor: getColors().inputBorderColor,
    width: responsiveWidth(20),
    marginHorizontal: responsiveHeight(4),
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    height: responsiveHeight(18),
    justifyContent: 'center',
  },
  textStyle: {
    marginHorizontal: moderateScale(5),
  },
  highlight: {
    color: getColors().primary,
  },
  iconContainer: {
    borderRadius: 4,
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    marginVertical: responsiveHeight(2),
  },
});
