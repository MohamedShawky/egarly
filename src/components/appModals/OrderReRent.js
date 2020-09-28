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
                <AppView width={80} backgroundColor="white" paddingVertical={10} borderRadius={7} centerX elevation={1.2} style={cardShadowStyle} paddingHorizontal={8}>

                    <AppImage marginTop={5} circleRadius={20} source={avatarClient} />

                    <AppText marginVertical={5}>
                        Mohamed
            </AppText>


                    <AppText bold  size={6.5}>
                        {I18n.t("order-re-rent")}
                    </AppText>

                    <AppText bold marginVertical={5} size={7} color="primary">
                        يوم
            </AppText>

                    <AppText marginBottom={5} center row>
                        {I18n.t("deliver-time")}
                        <AppText>
                            ٩ صياحا
                     </AppText>
                    </AppText>


                    <AppButton touchableOpacity stretch backgroundColor="#08D500" onPress={() => changeState(false)} title={I18n.t("accept")} />
                    <AppButton touchableOpacity stretch backgroundColor="#FF5151" marginVertical={5} onPress={() => changeState(false)} title={I18n.t("refuse")} />
                    <AppButton touchableOpacity stretch backgroundColor="#B2B2B2" onPress={() => changeState(false)} title={I18n.t("chat")} />

                </AppView>
            </AppModal>
        )
    }


    render() {
        return <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>{this.renderInvalidModal()}</View>;
    }
}

export default SureInfoModal;
