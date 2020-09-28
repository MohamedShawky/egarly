import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { moderateScale } from '../../common/utils/responsiveDimensions';
import { View } from "react-native";
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  AppModal,
  AppImage,
  getColors,
} from '../../common';
import styles from './styles';
import cardShadowStyle from '../../common/utils/cardShadowStyle';

class SureInfoModal extends Component {


  renderInvalidModal =()=>{
    const{ visible , changeState, rest,  } =this.props
    return(
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        {...rest}
        isVisible={visible}
      >
        <AppView width={80} backgroundColor="white" borderRadius={7} centerX elevation={1.2} style={cardShadowStyle} paddingHorizontal={8}>

          <AppButton circleRadius={12} leftIcon={<AppIcon name="close" type="ant" size={15}/>} leftSelf marginTop={5} transparent onPress={()=> changeState(false)} touchableOpacity/>

          <AppText bold marginVertical={5}>
            {I18n.t("sure-deliver-product")}
            </AppText>

            <AppText center lineHieght={8} color="#FF5151">
            {I18n.t("sure-deliver-product-hint")}
            </AppText>
            <AppButton touchableOpacity stretch backgroundColor="#08D500" marginVertical={10} onPress={()=> changeState(false)} title={I18n.t("has-delivered")}/>
          </AppView>
      </AppModal>
    )
  }
    

  render() {
    return <View style={{alignSelf:'stretch', alignItems:'center'}}>{this.renderInvalidModal()}</View>;
  }
}

export default SureInfoModal;
