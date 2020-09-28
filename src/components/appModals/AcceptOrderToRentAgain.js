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
    AppInput,
    AppPrice,
} from '../../common';
import styles from './styles';
import cardShadowStyle from '../../common/utils/cardShadowStyle';
import avatarClient from "../../assets/imgs/avatarClient.png"

class SureInfoModal extends Component {


    renderInvalidModal = () => {
        const { visible, changeState, rest, } = this.props
        return (
            <AppModal
                animationIn="bounceIn"
                animationOut="bounceOut"
                hideModalContentWhileAnimating
                {...rest}
                isVisible={visible}
            >
                <AppView width={80} backgroundColor="white" borderRadius={7} centerX elevation={1.2} style={cardShadowStyle} paddingHorizontal={8}>
                    <AppButton circleRadius={12} leftIcon={<AppIcon name="close" type="ant" size={15} />} leftSelf marginTop={5} transparent onPress={() => onChange()} touchableOpacity />


                    <AppText marginVertical={5} bold size={7}>
                        {I18n.t("order-accepted-re-rent")}
                    </AppText>
                    <AppText marginTop={10} size={5.5}>
                        {I18n.t("pay-addtional-rent")}
                    </AppText>


                    <AppView row stretch spaceBetween height={8} backgroundColor="#F3F3F3" centerY paddingHorizontal={5} marginTop={5}>
                        <AppText>
                            {I18n.t("cost-by-day", { number: 2 })}
                        </AppText>
                        <AppPrice amount={30} unit="sudai-real" />
                    </AppView>


                    <AppButton touchableOpacity stretch backgroundColor="primary" marginVertical={10} onPress={() => changeState(false)} title={I18n.t("pay-now")} />
                </AppView>
            </AppModal>
        )
    }


    render() {
        return <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>{this.renderInvalidModal()}</View>;
    }
}

export default SureInfoModal;
