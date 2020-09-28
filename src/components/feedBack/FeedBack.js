import React, { Component } from 'react';
import { AppView, AppText, AppModal, AppImage, AppIcon } from '../../common';

class FeedBack extends Component {
  componentWillMount() {
    console.log('Will Un Mount');

    this.props.changeState();
  }
  renderInvalidModal = () => {
    const {
      message,
      hintMessage,
      image,
      visible,
      backgroundColor,
      iconName,
      iconType,
      iconSize,
      iconColor,
      ...rest
    } = this.props;

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        hideModalContentWhileAnimating
        {...rest}
        isVisible={visible}
      >
        <AppView
          stretch
          backgroundColor="white"
          style={{width:'60%'}}
          style={{
            alignSelf: 'center',
          }}
          paddingTop={15}
          paddingBottom={25}
        >
          <AppView stretch center>
            <AppView
              circleRadius={12}
              backgroundColor={backgroundColor ? backgroundColor : 'primary'}
              center
            >
              <AppView circleRadius={12} center>
                {image && (
                  <AppImage source={image} stretch style={{width:'12%'}} height={6} />
                )}
                {iconName && <AppIcon name={iconName} type={iconType} size={iconSize} color={iconColor} />}
              </AppView>
            </AppView>
          </AppView>
          <AppView stretch paddingTop={5} center>
            <AppText size={6.5} color="primary">{message}</AppText>
          </AppView>
          {hintMessage && (
            <AppView stretch paddingTop={8} center marginHorizontal={8}>
              <AppText size={5}>{hintMessage}</AppText>
            </AppView>
          )}
        </AppView>
      </AppModal>
    );
  };

  render() {
    if (this.props.visible) {
      setTimeout(() => {
        this.props.changeState(false);
      }, 1500);
    }
    return <React.Fragment>{this.renderInvalidModal()}</React.Fragment>;
  }
}

export default FeedBack;
