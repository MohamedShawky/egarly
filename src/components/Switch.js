import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, I18nManager, NativeModules } from 'react-native';
import { AppView, AppText, AppImage, AppStarRating, AppIcon } from '../common';
import { ItemMore } from '.';

class SwitchOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSwitch: props.value,
    };
    console.log('values', props.value);
  }

  renderSwitch = () => {
    const { text, description } = this.props;
    return (
      <>
        <AppView stretch backgroundColor="white" {...this.props}    >
          <ItemMore
            leftItem={
              <Switch
                style={
                  NativeModules.I18nManager.localeIdentifier == 'ar_EG'
                    ? {
                        transform: [
                          {
                            scale: -1,
                          },
                        ],
                      }
                    : null
                }
                trackColor={{
                  true: this.props.rtl ? '#C6C5C5' : '#b9cded',
                  false: this.props.rtl ? '#b9cded' : '#C6C5C5',
                }}
                ios_backgroundColor="#ccc"
                thumbColor={
                  (this.props.rtl && this.props.value) ||
                  (!this.props.rtl && this.props.value)
                    ? '#2F75E8'
                    : 'white'
                }
                value={
                  this.props.rtl ? !this.props.value : this.props.value
                }
                onValueChange={v => {
                  // this.setState({
                  //   isSwitch: this.props.rtl ? !v : v,
                  // });
                  this.props.onChange(this.props.rtl ? !v : v);
                }}
              />
            }
            rightItem={
              <AppView style={{ maxWidth: '80%' }}>
                <AppText size={5.5} bold color="#212121">
                  {text}
                </AppText>
                {description && <AppText size={4.5}>{description}</AppText>}
              </AppView>
            }
            backgroundColor="white"
            {...this.props.itemStyle}
            noBorder
          />
        </AppView>
      </>
    );
  };

  render() {
    const { rest } = this.props;
    return <>{this.renderSwitch()}</>;
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(SwitchOrder);
