import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { AppView, AppButton, AppIcon, AppText } from '../common';
import Fonts from '../common/defaults/fonts';
import { onSelectTab } from '../actions/BottomTabsActions';
import Colors from '../common/defaults/colors';

const BAR_HEIGHT_ANDROID = 56;
const BAR_HEIGHT_IOS = 49;
export const barHeight =
  Platform.OS === 'ios' ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;
const bc = 'white';

const tabsAr = [
  { name: 'home', type: 'custom', index: 0, label: 'الرئيسية' },
  {
    name: 'orders',
    type: 'custom',
    index: 1,
    label: 'طلباتي',
  },

  {
    name: 'fav-heart',
    type: 'custom',
    index: 2,
    label: 'المفضلة',
  },
  {
    name: 'account-box',
    type: 'material',
    index: 3,
    label: 'حسابي',
  },
];
const tabsEn = [
  { name: 'home', type: 'custom', index: 0, label: 'Home' },
  {
    name: 'orders',
    type: 'custom',
    index: 1,
    label: 'Orderes',
  },

  {
    name: 'fav-heart',
    type: 'custom',
    index: 2,
    label: 'Favourite',
  },
  {
    name: 'account-box',
    type: 'material',
    index: 3,
    label: 'Profile',
  },
];

const halfIndex = tabsAr.length / 2;
const arTabsP1 = tabsAr.slice(0, halfIndex);
const arTabsP2 = tabsAr.slice(halfIndex, tabsAr.length);

const enTabsP1 = tabsEn.slice(0, halfIndex);
const enTabsP2 = tabsEn.slice(halfIndex, tabsAr.length);

const notchWidth = barHeight * 1.5;
const yRatio = 550 / 600; //  multiplied by svg  height to get your height scaled to look like the board you drew on
const xRatio = 600 / 1200; // multiplied by svg    width to get your width scaled to look like the board you drew on
const NOTCH_BUTTON_RADIUS = 68;
class REBottomTabs extends Component {
  renderNotch = () => (
    <AppView style={styles.notchContainer} stretch>
      <Svg height={barHeight} width={notchWidth}>
        <Path
          d={`M 0 0 L 0 ${barHeight} L ${notchWidth} ${barHeight} L ${notchWidth} 0 Q ${notchWidth} ${barHeight *
            yRatio} ${notchWidth * xRatio} ${barHeight *
            yRatio} Q 0 ${barHeight * yRatio} 0 0 `}
          fill="white"
        />
        <AppButton style={styles.notchButton} centerSelf>
          <AppText
            stretch
            color="white"
            style={{ textAlign: 'center' }}
            lineHeight={9}
          >
            {I18n.t('order-service')}
          </AppText>
        </AppButton>
      </Svg>
    </AppView>
  );

  onSelectTab = currentTabIndex => {
    this.props.selectTab(currentTabIndex);
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex,
      },
    });
  };

  renderTab = item => {
    const color =
      item.index === this.props.selectedIndx
        ? {
            color: Colors.primary,
          }
        : { color: '#444444' };
    // if (item === null) this.renderNotch();
    // else {
    return (
      <AppButton
        key={`${item.name}${item.type}`}
        style={styles.tabButton}
        backgroundColor={bc}
        stretch
        borderRadius={0}
        row={false}
        center
        onPress={() => this.onSelectTab(item.index)}
      >
        <AppIcon
          style={[styles.tabIcon, color]}
          name={item.name}
          type={item.type}
        />
        <Text style={[styles.tabText, color]}>{item.label}</Text>
      </AppButton>
    );
    // }
  };

  renderSection = rtl => {
    const tabs = this.props.rtl ? [arTabsP1, arTabsP2] : [enTabsP1, enTabsP2];
    return (
      <AppView
        row
        flex
        backgroundColor={bc}
        style={[
          styles.barSection,
          rtl
            ? {
                borderTopLeftRadius: 10,
              }
            : {
                borderTopRightRadius: 10,
              },
        ]}
        // borderRadius = {5}

        spaceAround
      >
        {rtl
          ? tabs[0].map(item => this.renderTab(item))
          : tabs[1].map(item => this.renderTab(item))}
      </AppView>
    );
  };

  render() {
    return (
      <AppView style={styles.bar} row center>
        {this.renderSection(this.props.rtl)}
        {this.renderNotch()}
        {this.renderSection(!this.props.rtl)}
      </AppView>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: barHeight,
    overflow: 'visible',
    zIndex: 1000,
  },
  notchContainer: {
    width: notchWidth,
    height: barHeight,
  },
  barSection: { height: barHeight },
  notchButton: {
    width: NOTCH_BUTTON_RADIUS,
    height: NOTCH_BUTTON_RADIUS,
    borderRadius: NOTCH_BUTTON_RADIUS / 2,
    left: 0,
    right: 0,
    top: -22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: Fonts.normal,
    fontSize: 12,
    alignSelf: 'stretch',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabButton: {
    marginHorizontal: 10,
  },
});

const mapDispatchToProps = dispatch => ({
  selectTab: index => dispatch(onSelectTab(index)),
});

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  selectedIndx: state.bottomTabs.selectedIndx,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(REBottomTabs);
