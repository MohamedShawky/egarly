import React, { Component } from 'react';
import { StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import Interactable from 'react-native-interactable';
import { connect } from 'react-redux';
import { BoxShadow } from 'react-native-shadow';
import { Menu } from '.';
import { AppView } from '../common';
import { changeMenuStatus } from '../actions/MenuAction';
import colors from '../common/defaults/colors';
import { APPBAR_HEIGHT } from '../common/utils/responsiveDimensions';

const Screen = Dimensions.get('window');
const SideMenuWidth = 0.7 * Screen.width;

const x = 0;
class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delta: 1,
    };

    this.deltaX = new Animated.Value(0);
  }
  
  componentDidUpdate(prvProps){
    if(prvProps.rtl != this.props.rtl){
      this.refs.menuInstance.snapTo({ index: this.props.rtl ? 1 : 0 });
    }
  }

  onStopInteraction(event, check) {
    let menuOpened = true;
    if (event.nativeEvent.index == this.props.rtl ? 1 : 0) {
      menuOpened = false;
    }
    this.props.onChangeMenuStatus(menuOpened);
  }

  first = false;

  onMenuPress = () => {
    const menuOpened = !this.props.menuOpened;

    if (menuOpened) {
      this.refs.menuInstance.snapTo({ index: this.props.rtl ? 0 : 1 });
    } else {
      this.refs.menuInstance.snapTo({ index: this.props.rtl ? 1 : 0 });
    }
  };

  render() {
    const { rtl, renderContent, menuOpened } = this.props;

    // let rtl = false
    const boundaries = rtl
      ? { left: -SideMenuWidth, right: 0 }
      : { left: 0, right: SideMenuWidth };
    const snapPoints = rtl
      ? [{ x: -SideMenuWidth }, { x: 0 }]
      : [{ x: 0 }, { x: Screen.width }];
    const rightScale = this.deltaX.interpolate({
      inputRange: [0, SideMenuWidth],
      outputRange: [1, 0.8],
    });
    const leftScale = this.deltaX.interpolate({
      inputRange: [-SideMenuWidth, 0],
      outputRange: [0.8, 1],
    });
    const shadowOpt = {
      width: Screen.width - 30,
      height: Screen.height - 100,
      color: '#000',
      border: 30,
      opacity: 0.15,
      x: rtl ? 0 : 25,
      y: 40,
    };
    return (
      <AppView style={styles.container}>
        <Menu
          onMenuPress={this.onMenuPress}
          componentId={this.props.componentId}
        />
        <Interactable.View
          style={{ flex: 1 }}
          ref="menuInstance"
          horizontalOnly
          snapPoints={snapPoints}
          boundaries={boundaries}
          initialPosition={{ x: 0 }}
          animatedValueX={this.deltaX}
          onSnap={this.onStopInteraction.bind(this)}
          animatedNativeDriver
        >
          <Animated.View
            style={[
              {
                transform: [
                  {
                    scale: this.props.rtl
                      ? this.deltaX.interpolate({
                          inputRange: [-SideMenuWidth, 0],
                          outputRange: [0.9, 1],
                        })
                      : this.deltaX.interpolate({
                          inputRange: [0, SideMenuWidth],
                          outputRange: [1, 0.9],
                        }),
                  },
                ],
              },
              styles.shadowContainer,
            ]}
          >
            <BoxShadow setting={shadowOpt} />
          </Animated.View>
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: 'green',
              transform: [
                {
                  scale: rtl ? leftScale : rightScale,
                },
              ],
            }}
          >
            {renderContent({
              onMenuPress: this.onMenuPress,
            })}

            {this.props.menuOpened && (
              <AppView
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: APPBAR_HEIGHT,
                  bottom: 0,
                  // backgroundColor: 'red',
                  zIndex: 1000,
                }}
              />
            )}
          </Animated.View>
        </Interactable.View>
      </AppView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.bgMain,
    // marginTop:50
  },
  shadowContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
  },
});
const mapDispatchToProps = dispatch => ({
  onChangeMenuStatus: status => dispatch(changeMenuStatus(status)),
});
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  menuOpened: state.menu.menuOpened,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideMenu);
