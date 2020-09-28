import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RectButton } from 'react-native-gesture-handler';
import { AppView, AppText, AppButton, AppIcon, AppImage } from '../../common';
import styles from './styles';

class MenuItems extends Component {
  render() {
    const {
      text,
      iconName,
      onPress,
      iconType,
      focused,
      backgroundColor,
      ...rest
    } = this.props;

    return (
      <React.Fragment>
        <RectButton
          centerX
          onPress={onPress}
          style={[styles.button, focused ? styles.highlight : null]}
        >
          <AppView
            center
            backgroundColor={backgroundColor}
            style={[styles.iconContainer]}
          >
            {iconType === 'image' ? (
              <AppImage
                source={iconName}
                resizeMode="contain"
                width={18}
                height={12}
              />
            ) : (
              <AppIcon
                type="ant"
                name="google"
                size={this.props.size || 8}
                color={focused ? 'primary' : 'black'}
              />
            )}
          </AppView>
        </RectButton>
        <AppView center style={styles.border} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl,
});

export default connect(
  mapStateToProps,
  null,
)(MenuItems);
