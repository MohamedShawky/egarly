import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { Platform, StyleSheet, BackHandler, AsyncStorage } from "react-native";

import Svg, { Path } from "react-native-svg";
import I18n from "react-native-i18n";
import {
  AppView,
  AppButton,
  AppIcon,
  AppText,
  AppNavigation,
  AppModal
} from "../common";
import Fonts from "../common/defaults/fonts";
import { onSelectTab } from "../actions/BottomTabsActions";
import Colors from "../common/defaults/colors";
import { getBottomSpace } from "../utils/iphoneHelper";
import colors from "../common/defaults/colors";
import AppNoAuthModal from "./NoAuthModal";

const BAR_HEIGHT_ANDROID = 56;
const BAR_HEIGHT_IOS = 49;
export const barHeight =
  Platform.OS === "ios" ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;
const bc = "white";

const notchWidth = barHeight * 2.2;

const notchHeight = barHeight;
const NOTCH_BUTTON_RADIUS = 85;

const tabsAr = [
  { name: "home", type: "custom", index: 0, label: "الرئيسية" },
  {
    name: "orders",
    type: "custom",
    index: 1,
    label: "طلباتي"
  },

  {
    name: "fav-heart",
    type: "custom",
    index: 2,
    label: "المفضلة"
  },
  {
    name: "account-box",
    type: "material",
    index: 3,
    label: "حسابي"
  }
];
const tabsEn = [
  { name: "home", type: "custom", index: 0, label: "Home" },
  {
    name: "orders",
    type: "custom",
    index: 1,
    label: "Orderes"
  },

  {
    name: "fav-heart",
    type: "custom",
    index: 2,
    label: "Favourite"
  },
  {
    name: "account-box",
    type: "material",
    index: 3,
    label: "Profile"
  }
];

const halfIndex = tabsAr.length / 2;
const arTabsP1 = tabsAr.slice(0, halfIndex);
const arTabsP2 = tabsAr.slice(halfIndex, tabsAr.length);

const enTabsP1 = tabsEn.slice(0, halfIndex);
const enTabsP2 = tabsEn.slice(halfIndex, tabsAr.length);

const clacX = val => (val * notchWidth) / 1200;

const clacY = val => (val * notchHeight) / 600;
class CustomBottomTabs extends Component {
  constructor(props) {
    super(props);
    this.backPressed = 0;
    // Navigation.events().bindComponent(this);
  }

  state = {
    isModalVisible: false,
    isNoAuthModalVisible: false
  };

  handleBackPress = () => {
    if (this.backPressed && this.backPressed > 0) {
      this.setState({
        isModalVisible: false
      });
      this.backPressed = 0;
      return true;
    }

    this.backPressed = 1;
    this.setState({
      isModalVisible: true
    });
    return true;
  };

  onSelectTab = currentTabIndex => {
    if (!this.props.userData && currentTabIndex > 0 && currentTabIndex < 3) {
      this.setState({ isNoAuthModalVisible: true });
    } else {
      this.props.selectTab(currentTabIndex);
      Navigation.mergeOptions(this.props.componentId, {
        bottomTabs: {
          currentTabIndex
        }
      });
    }
  };

  componentDidAppear() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }

  componentDidDisappear() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  renderTab = item => {
    const isCart = item.index === 2;
    const { selectedIndx } = this.props;
    const color =
      item.index === this.props.selectedIndx
        ? {
            color: Colors.primary
          }
        : { color: Colors.darkgrey };

    const { totalCount } = this.props;

    return (
      <AppView
        key={`${item.name}${item.type}`}
        style={styles.tabButton}
        backgroundColor={bc}
        stretch
        overflow="visible"
        flex
        center
        onPress={() => this.onSelectTab(item.index)}
      >
        <AppView>
          <AppIcon
            style={[styles.tabIcon, color]}
            name={item.name}
            type={item.type}
            // lineHeight={8}
          />
        </AppView>

        <AppText numberOfLines={1} style={[styles.tabText, color]}>
          {item.label}
        </AppText>
      </AppView>
    );
  };

  renderSection = rtl => {
    const tabs = this.props.rtl ? [arTabsP1, arTabsP2] : [enTabsP1, enTabsP2];
    return (
      <AppView row flex backgroundColor={bc} style={[styles.barSection]}>
        {rtl
          ? tabs[0].map(item => this.renderTab(item))
          : tabs[1].map(item => this.renderTab(item))}
      </AppView>
    );
  };

  renderExitAppModal = () => {
    const { ...rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={this.state.isModalVisible}
        closeable
        changeState={v => {
          this.backPressed = 0;
          this.setState({
            isModalVisible: v
          });
        }}
        {...rest}
      >
        <AppView
          width={75}
          backgroundColor="white"
          padding={6}
          borderRadius={5}
          center
          touchableOpacity
        >
          <AppText
            center
            marginVertical={9}
            color="#5F5F5F"
            size={6}
            bold
            lineHeight={9}
          >
            {I18n.t("exit-app-confirm")}
          </AppText>

          <AppView stretch row height={8}>
            <AppButton
              title={I18n.t("yes")}
              backgroundColor="primary"
              flex
              stretch
              margin={3}
              touchableOpacity
              onPress={async () => {
                BackHandler.exitApp();
              }}
            />

            <AppButton
              title={I18n.t("no")}
              backgroundColor="grey"
              flex
              stretch
              margin={3}
              touchableOpacity
              onPress={() => {
                this.setState(prevState => ({
                  isModalVisible: !prevState.isModalVisible
                }));
                this.backPressed = 0;
              }}
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  };

  renderSvg = () => {
    const borderFactor = 1.02;
    const corenerCurveDelta = 1;
    return (
      <AppView style={styles.notchContainer} stretch>
        <Svg height={notchHeight} width={notchWidth}>
          <Path
            d={`M ${notchWidth} ${notchHeight + corenerCurveDelta} 
            Q ${clacX(1100)} ${clacY(550)} 
            ${clacX(1050)} ${clacY(450)} 
            Q ${clacX(900)} ${clacY(150)} 
            ${clacX(600)} ${clacY(150)} 
            Q ${clacX(300)} ${clacY(150)}
             ${clacX(150)} ${clacY(450)} 
             Q ${clacX(100)} ${clacY(550)} 
             0 ${clacY(600) + corenerCurveDelta} `}
            fill={colors.inputBorderColor}
          />
          <Path
            d={`M ${notchWidth} ${notchHeight * borderFactor} 
            Q ${clacX(1100)} ${clacY(550) * borderFactor} 
            ${clacX(1050)} ${clacY(450) * borderFactor} 
            Q ${clacX(900)} ${clacY(150) * borderFactor} 
            ${clacX(600)} ${clacY(150) * borderFactor} 
            Q ${clacX(300)} ${clacY(150) * borderFactor}
             ${clacX(150)} ${clacY(450) * borderFactor} 
             Q ${clacX(100)} ${clacY(550) * borderFactor} 
             0 ${clacY(600) * borderFactor} `}
            fill="white"
          />
        </Svg>
      </AppView>
    );
  };

  onOrderClick = () => {
    if (!this.props.userData) {
      this.setState({ isNoAuthModalVisible: true });
    } else {
       AppNavigation.push("createOrderBidStepOne");
    }
  };

  renderNotch = () => {
    const borderFlexWidth = 0.25;
    return (
      <AppView stretch centerX>
        {this.renderSvg()}

        <AppView stretch centerY row backgroundColor="white">
          <AppView
            stretch
            flex={borderFlexWidth}
            borderTopColor="inputBorderColor"
            style={{ borderTopWidth: 0.5 }}
          />
          <AppView stretch flex={2} />

          <AppView backgroundColor="white">
            <AppView
              touchableOpacity
              backgroundColor="primary"
              style={styles.notchButton}
              centerSelf
              onPress={this.onOrderClick}
            >
              <AppView stretch center flex>
                <AppText
                  stretch
                  color="white"
                  style={{ textAlign: "center" }}
                  lineHeight={9}
                  size={6}
                >
                  {I18n.t("order-title-bottom-tabs")}
                </AppText>
                <AppText
                  stretch
                  color="white"
                  style={{ textAlign: "center" }}
                  lineHeight={9}
                  size={6}
                >
                  {I18n.t("service-title-bottom-tabs")}
                </AppText>
              </AppView>
            </AppView>
          </AppView>

          <AppView stretch flex={2} />
          <AppView
            stretch
            flex={borderFlexWidth}
            borderColor="inputBorderColor"
            style={{ borderTopWidth: 0.5 }}
          />
        </AppView>
      </AppView>
    );
  };

  render() {
    return (
      <AppView style={styles.bar} row center>
        {this.renderSection(this.props.rtl)}
        {this.renderNotch()}
        {this.renderSection(!this.props.rtl)}
        {this.state.isModalVisible && this.renderExitAppModal()}
        <AppNoAuthModal
          isVisible={this.state.isNoAuthModalVisible}
          stateChanged={v => this.setState({ isNoAuthModalVisible: v })}
        />
      </AppView>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    height: barHeight * 2,
    overflow: "visible"
  },
  barSection: {
    height: barHeight + getBottomSpace(),
    borderTopColor: Colors.inputBorderColor,
    borderTopWidth: 0.5
  },
  tabText: {
    fontFamily: Fonts.normal,
    fontSize: 10
    // alignSelf: 'stretch',
  },
  tabIcon: {
    fontSize: 20
  },
  tabButton: {
    marginHorizontal: 10
  },

  notchContainer: {
    width: notchWidth,
    height: barHeight
  },
  notchButton: {
    width: NOTCH_BUTTON_RADIUS,
    height: NOTCH_BUTTON_RADIUS,
    borderRadius: NOTCH_BUTTON_RADIUS / 2,
    left: 0,
    right: 0,
    top: -35,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapDispatchToProps = dispatch => ({
  selectTab: index => dispatch(onSelectTab(index))
});

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  selectedIndx: state.bottomTabs.selectedIndx,
  userData: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomBottomTabs);
