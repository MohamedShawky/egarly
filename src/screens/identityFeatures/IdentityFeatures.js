import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { AppView, AppText, AppIcon } from '../../common';
import styles from './styles';
import {AppHeader} from '../../components'

import {
  moderateScale,
  responsiveWidth,
} from '../../common/utils/responsiveDimensions';

class IdentityFeatures extends Component {
  componentDidMount() {
    console.log(
      'modal did mount-------------------------------------------------',
    );
  }

  onCloseModal = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    return (
      <AppView style={styles.containerModal}>
          <AppHeader
            termsAndConditionClose
            title={I18n.t('show-modal-advantage-identity')}
          />
        <AppView
          style={styles.selectPhotoContainerModal}
          paddingHorizontal={10}
        >
          <AppText size={4.8} marginVertical={5}>
            {I18n.t('show-modal-body-full')}
          </AppText>

          <AppView
            style={{ paddingHorizontal: moderateScale(15) }}
            marginBottom={4}
          >
            <AppView row style={styles.center}>
              <AppView style={styles.iconModalContainer}>
                <AppIcon
                  type="custom"
                  name="diamond"
                  size={7}
                  style={styles.iconModal}
                />
              </AppView>
              <AppText
                marginLeft={5}
                size={5.5}
                bold
                style={styles.textModalBody}
              >
                {I18n.t('show-modal-customer')}
              </AppText>
            </AppView>
            <AppText marginTop={-2} size={4.3} marginLeft={22}>
              {I18n.t('show-modal-body')}
            </AppText>
          </AppView>

          <AppView
            style={{ paddingHorizontal: moderateScale(15) }}
            marginBottom={4}
          >
            <AppView row style={styles.center}>
              <AppView style={styles.iconModalContainer}>
                <AppIcon
                  name="time-shape"
                  type="custom"
                  size={7}
                  style={styles.iconModal}
                />
              </AppView>
              <AppText
                marginLeft={5}
                bold
                size={5.5}
                style={styles.textModalBody}
              >
                {I18n.t('show-modal-pay-later')}
              </AppText>
            </AppView>
            <AppText marginTop={-2} size={4.3} marginLeft={22}>
              {I18n.t('show-modal-body')}
            </AppText>
          </AppView>

          <AppView style={{ paddingHorizontal: moderateScale(15) }}>
            <AppView row style={styles.center}>
              <AppView style={styles.iconModalContainer}>
                <AppIcon
                  type="custom"
                  name="members"
                  size={10}
                  style={styles.iconModal}
                />
              </AppView>
              <AppText
                marginLeft={5}
                bold
                size={5.5}
                style={styles.textModalBody}
              >
                {I18n.t('show-modal-percent-of-order')}
              </AppText>
            </AppView>
            <AppText marginTop={-2} size={4.3} marginLeft={22}>
              {I18n.t('show-modal-body')}
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(IdentityFeatures);
