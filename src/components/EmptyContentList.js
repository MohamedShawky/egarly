import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import { AppView, AppText, getColors, AppImage } from '../common';
import embty from '../assets/imgs/illustration.png';

class CategoryEmpty extends Component {
  renderImageSection = () => {
    const { text } = this.props;
    return (
      <AppView
        marginTop={63}
        centerX
        style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}
      >
        <AppImage
          source={embty}
          widthFromStyle source={embty} style={{width:"100%" , height:"100%"}}
          resizeMode="contain"
          marginBottom={4}
        />
      </AppView>
    );
  };

  render() {
    console.log('****************************************');

    return (
      <AppView {...this.props} flex stretch center backgroundColor="white">
        {this.renderImageSection()}
        <AppText bold size={6} color="#454545" marginVertical={3}>
          {I18n.t('ui-noResultsFound')}
        </AppText>
        <AppText bold size={4.5} color="#6A6A6A">
          {this.props.result}
        </AppText>
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryEmpty);
