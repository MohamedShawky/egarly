import { StyleSheet , Dimensions} from 'react-native';

import Colors from '../../common/defaults/colors';

import {
  moderateScale,
  responsiveWidth,
  responsiveHeight,
} from '../../common/utils/responsiveDimensions';

const width = Dimensions.width;
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  containerModal: {
    flex: 1,
    backgroundColor:'#FFF'
  },
  page: {
    alignItems: 'center',
    paddingHorizontal: 50,
    marginTop: '40%',
  },
  bagContainer: {
    borderWidth: 4,
    borderColor: Colors.primary,
    borderRadius: 200,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonContainer: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  headerText: {
    color: Colors.primary,
  },

  headerTextModal: {
    color: '#565656',
  },
  textModalBody: {
    color: 'black',
  },
  textModalBody2: {
    color: 'black',
    alignSelf: 'stretch',
  },
  marginModalBody: {
    marginVertical: moderateScale(5),
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignSelf: 'stretch',
  },
  nextButton: {
    backgroundColor: Colors.primary,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },

  enterCode: {
    color: 'black',
    alignSelf: 'stretch',
  },
  inputContainer: {
    width: '50%',
    borderBottomWidth: Colors.inputBorderWidth,
    borderBottomColor: Colors.inputBorderColor,
    marginHorizontal: moderateScale(2),
  },
  service: {
    color: Colors.primary,
  },
  windowsIcon: {
    color: 'black',
    // marginHorizontal: moderateScale(3)
  },
  input: {
    alignSelf: 'stretch',
    width: '100%',
  },
  iconModalContainer: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(10),
    marginHorizontal: responsiveWidth(3),
  },
  iconModal: {
    color: 'white',
  },
  windowsIconModal: {
    color: '#565656',
    marginHorizontal: moderateScale(3),
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(2),
  },
  windowsIconModalSecur: {
    color: 'white',
    marginHorizontal: moderateScale(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  enterCodeContainer: {
    marginVertical: moderateScale(15),
    marginHorizontal: moderateScale(10),
  },
  enterCodeContainerModal: {
    height: responsiveHeight(8),
    alignItems: 'center',
    // justifyContent:'center'
    alignSelf: 'stretch',
  },
  descriptionsContainer: {
    marginTop: '7%',
    marginBottom: '4%',
    marginHorizontal: '13%',
    alignSelf: 'stretch',
  },

  rowViewContainer: {
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(10),
    alignSelf: 'stretch',
  },

  selectPhotoContainer: {
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(8),
    // width: "100%",
    height: responsiveWidth(20),
  },
  selectPhotoContainerModal: {
    borderRadius: 10,
    alignSelf: 'stretch',   
    borderWidth: Colors.inputBorderWidth,
    borderColor: Colors.inputBorderColor,
  },
  bottomBorder: {
    borderBottomWidth: 2,
    borderColor: 'blue',
  },

  nextButtonText: {
    color: 'white',
  },
  signLaterButtonIcon: {
    color: 'white',
    paddingHorizontal: 5,
  },
  signLaterButtonText: {
    color: 'white',
  },
  enterCodeIcon: {
    color: Colors.primary,
  },

  checkMarkIcon: {
    color: 'black',
  },
  border: {
    borderWidth: Colors.inputBorderWidth,
    alignSelf: 'stretch',
    marginTop: moderateScale(3),
    borderColor: Colors.inputBorderColor,
  },
  building: {},
  borderPlatform: {
    borderWidth: Colors.inputBorderWidth,
    alignSelf: 'stretch',
    borderColor: Colors.inputBorderColor,
  },
  inActiveStyle: {
    backgroundColor: Colors.inActiveText,
  },
  activeStyle: {
    backgroundColor: Colors.activeText,
  },
  signLaterButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    marginLeft: '20%',
  },
  textBorderContainer: {
    marginVertical: moderateScale(15),
    alignSelf: 'stretch',
  },
  modalText: {
    color: Colors.primary,
    marginHorizontal: moderateScale(3),
  },
  creatAccountButton: {
    backgroundColor: Colors.primary,
    borderRadius: 7,
    alignSelf: 'stretch',
  },
  containerCreateAccount: {
    marginHorizontal: moderateScale(7),
  },
  createButtonText: {
    color: 'white',
  },
  floatingButton: {
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    backgroundColor: 'red',
  },
  floatingButtonView: {
    borderColor: Colors.primary,
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: moderateScale(8),
  },
  flotingIcon: {
    color: Colors.primary,
    borderRadius: responsiveWidth(14) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(15) / 2,
    position: 'absolute',
  },
  avatar: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: 30,
  },

  floating: {
    width: '100%',
    marginTop: moderateScale(5),
  },

  floatingButton1: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(15) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },

  floatingButton2: {
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(15) / 2,
    marginHorizontal: moderateScale(8),
  },
  overlay: {
    zIndex: 3000,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    // justifyContent: "center"
  },
  overImage: {
    zIndex: 3000,
    marginTop: moderateScale(35),
    marginBottom: moderateScale(8),
    height: responsiveHeight(65),
    width: '73%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    borderRadius: 5,
  },
  overLayIcon: {
    color: Colors.primary,
    borderRadius: responsiveWidth(15) / 2,
  },
  overLayIconArrow: {
    color: 'white',
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: moderateScale(20),
    justifyContent: 'center',
    marginHorizontal: responsiveHeight(2.5),
  },
  iconSpace: {
    justifyContent: 'space-between',
  },
  overLayIconTrash: {
    color: 'red',
    borderRadius: responsiveWidth(15) / 2,
  },
  overLayIconContainer: {
    width: responsiveWidth(11),
    height: responsiveWidth(11),
    borderRadius: responsiveWidth(11) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'white',
    marginHorizontal: moderateScale(2),
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
