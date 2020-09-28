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


                    <AppText marginVertical={5} bold size={7}>
                        {I18n.t("add-note")}
                    </AppText>
                    <AppText marginVertical={5} size={5} center>
                        {I18n.t("add-notes-hint")}
                    </AppText>


                   
                   <AppInput multiline height={15} stretch/>


                    <AppButton touchableOpacity stretch backgroundColor="primary" marginVertical={10} onPress={() => changeState(false)} title={I18n.t("good")} />
                </AppView>
            </AppModal>
        )
    }


    render() {
        return <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>{this.renderInvalidModal()}</View>;
    }
}

export default SureInfoModal;
