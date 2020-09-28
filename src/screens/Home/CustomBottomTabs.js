import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import Svg, { Path } from "react-native-svg";
import { connect } from "react-redux";
import { Platform, StyleSheet, Text } from "react-native";
import {
  AppView,
  AppButton,
  AppIcon,
  AppNavigation,
  moderateScale,
  AppText,
} from "../../common";
import Fonts from "../../common/defaults/fonts";
import { onSelectTab } from "../../actions/BottomTabsActions";
import Colors from "../../common/defaults/colors";
import { BottomSheet } from "../../components";
import I18n from "react-native-i18n";

const BAR_HEIGHT_ANDROID = 55;
const BAR_HEIGHT_IOS = 49;
export const barHeight =
  Platform.OS === "ios" ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;
const bc = "#FDFCFC";
const tabs = [
  { name: "homeP", type: "custom", index: 0, label: "الرئيسيه" },
  { name: "chat", type: "custom", index: 2, label: "الطلبات" },
  { name: "notifications", type: "custom", index: 1, label: "المفضله" },

  { name: "grid", type: "custom", index: 3, label: "المزيد" },
];
const halfIndex = tabs.length / 2;
const firstSection = tabs.slice(0, halfIndex);
const secondSection = tabs.slice(halfIndex, tabs.length);
const notchWidth = barHeight * 1.2;
const yRatio = 550 / 600; //  multiplied by svg  height to get your height scaled to look like the board you drew on
const xRatio = 600 / 1200; // multiplied by svg    width to get your width scaled to look like the board you drew on
const NOTCH_BUTTON_RADIUS = 60;
class CustomBottomTabs extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
  }
  state = {
    isPress: false,
  };

  renderNotch = () => (
    <AppView style={styles.notchContainer} stretch>
      <Svg height={barHeight} width={notchWidth}>
        <Path
          d={`M 0 0 L 0 ${barHeight} L ${notchWidth} ${barHeight} L ${notchWidth} 0 Q ${notchWidth} ${barHeight *
            yRatio} ${notchWidth * xRatio} ${barHeight *
            yRatio} Q 0 ${barHeight * yRatio} 0 0 `}
          fill="white"
        />
        <AppButton
          style={styles.notchButton}
          centerSelf
          backgroundColor="primary"
          onPress={() => {
            if (this.state.isPress) {
              this.setState(
                {
                  isPress: false,
                },
                () => {
                  this.bottomSheetRef.current.hide();
                }
              );
            } else {
              this.setState(
                {
                  isPress: true,
                },
                () => {
                  this.bottomSheetRef.current.show();
                }
              );
            }

            // AppNavigation.push("addProduct");
          }}
        >
          <AppView
            borderColor="white"
            borderWidth={1}
            center
            style={{ transform: [{ rotate: "45deg" }] }}
          >
            {this.state.isPress ? (
              <AppIcon
                name={"close"}
                type="ant"
                color={bc}
                size={9}
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            ) : (
              <AppIcon
                name={this.state.isPress ? "close" : "plus"}
                type="ant"
                color={bc}
                size={10}
                style={
                  !this.state.isPress
                    ? { transform: [{ rotate: "-45deg" }] }
                    : {}
                }
              />
            )}
          </AppView>
        </AppButton>
      </Svg>
    </AppView>
  );

  onSelectTab = (currentTabIndex) => {
    this.props.selectTab(currentTabIndex);
    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex,
      },
    });
  };

  renderTab = (item) => {
    const isChat = item.index === 2;
    const { totalCount , notifications} = this.props;

    const isNotification = item.index === 1;
    const color =
      item.index === this.props.selectedIndx
        ? {
            color: Colors.primary,
          }
        : { color: "#444444" };
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
        {isChat && totalCount > 0 && (
          <AppView
            borderColor="#fff"
            borderWidth={2}
            backgroundColor="#D0021B"
            circleRadius={5.5}
            style={{
              position: "absolute",
              bottom: 1,
              top: -2,
              left: -2,
              zIndex: 1000,
            }}
            center
          >
            <AppText size={4.5} bold color="#FFF">
              {totalCount < 10 ? totalCount : "+9"}
            </AppText>
          </AppView>
        )}
        {isNotification && (
          <AppView
            borderColor="#fff"
            borderWidth={2}
            backgroundColor="#D0021B"
            circleRadius={5.5}
            style={{
              position: "absolute",
              bottom: 1,
              top: -2,
              left: -2,
              zIndex: 1000,
            }}
            center
          >
            <AppText size={4.5} bold color="#FFF">
              {notifications < 10 ? notifications : "+9"}
            </AppText>
          </AppView>
        )}
        <AppIcon
          style={[styles.tabIcon, color]}
          name={item.name}
          type={item.type}
        />
        {/* <Text style={[styles.tabText, color]}>{item.label}</Text> */}
      </AppButton>
    );
    // }
  };

  renderSection = (rtl) => (
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
        ? firstSection.map((item) => this.renderTab(item))
        : secondSection.map((item) => this.renderTab(item))}
    </AppView>
  );

  render() {
    return (
      <>
        <AppView style={styles.bar} row center>
          <AppView
            style={{
              position: "absolute",
              top: 0,
              // bottom: 0,
              left: 0,
              right: 0,
              // backgroundColor:'red',
            }}
            center
          >
            {/* <AppIcon
              name="bottomNav"
              type="custom"
              color="white"
              size={30}
            >
              </AppIcon> */}
          </AppView>
          {this.renderSection(this.props.rtl)}
          {this.renderNotch()}
          {this.renderSection(!this.props.rtl)}
        </AppView>
        <BottomSheet
          ref={this.bottomSheetRef}
          height={40}
          backgroundColor="transparent"
          bottomTab
        >
          <AppView
            stretch
            flex
            transparent
            center
            onPress={() => {
              this.setState(
                {
                  isPress: false,
                },
                () => {
                  this.bottomSheetRef.current.hide();
                }
              );
            }}
          >
            <AppButton
              title={I18n.t("add-product")}
              width={40}
              height={5.5}
              borderRadius={20}
              marginBottom={10}
              backgroundColor="white"
              color="grey"
              onPress={() => {
                AppNavigation.push("addProduct");
              }}
            />
            <AppButton
              title={I18n.t("add-order")}
              width={40}
              height={5.5}
              borderRadius={20}
              backgroundColor="white"
              color="grey"
              onPress={() => {
                AppNavigation.push("addOffer");
              }}
            />
          </AppView>
        </BottomSheet>
      </>
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
    alignItems: "center",
    height: barHeight,
    overflow: "visible",
  },
  notchContainer: {
    width: notchWidth,
    height: barHeight,
    overflow: "visible",
  },
  barSection: { height: barHeight },
  notchButton: {
    width: NOTCH_BUTTON_RADIUS,
    height: NOTCH_BUTTON_RADIUS,
    borderRadius: NOTCH_BUTTON_RADIUS / 2,
    left: 0,
    right: 0,
    top: -18,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontFamily: Fonts.normal,
    fontSize: 12,
    alignSelf: "stretch",
  },
  tabIcon: {
    fontSize: 20,
  },
  tabButton: {
    marginHorizontal: 10,
  },
});

const mapDispatchToProps = (dispatch) => ({
  selectTab: (index) => dispatch(onSelectTab(index)),
});

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  selectedIndx: state.bottomTabs.selectedIndx,
  totalCount: state.counter.totalCount,
  notifications: state.notifications.unseenCount,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomBottomTabs);
