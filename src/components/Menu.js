import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  AppImage,
  AppNavigation,
  AppButton,
  AppIcon,
  responsiveWidth
} from "../common";
import {
  moderateScale,
  responsiveHeight
} from "../common/utils/responsiveDimensions";
import Colors from "../common/defaults/colors";
import empty from "../assets/imgs/empityPictue.png";
import { logout } from "../actions/AuthActions";
import LogoutModal from "./LogoutModal";
import { changeMenuStatus } from "../actions/MenuAction";

class Menu extends Component {
  state = {
    collectableMoney: 0,
    isModalVisible: false,
    isLogOutVisible: false
  };

  ItemAction = callBack => {
    callBack();
  };

  renderComponent = (title, iconName, type, buttonPress, iconSize) => (
    <AppView
      row
      height={7}
      paddingHorizontal={10}
      style={{
        width: "100%"
      }}
      bbw={1}
      bc="#f0f0f0"
      onPress={() => {
        if (buttonPress === "signIn") {
          // this.props.onLogout();
          this.setState({
            isLogOutVisible: true
          });
        } else {
          this.props.onChangeMenuStatus(true);

          AppNavigation.push(buttonPress);
        }
      }}
    >
      <AppView width={5}>
        <AppIcon
          size={iconSize || 9}
          name={iconName}
          type={type}
          color="#757575"
        />
      </AppView>

      <AppText color="#757575" marginHorizontal={10}>
        {I18n.t(title)}
      </AppText>
    </AppView>
  );

  renderWallet = (title, iconName, type, buttonPress, money) => (
    <AppView
      row
      paddingVertical={5}
      paddingHorizontal={10}
      bbw={1}
      bc="#F0F0F0"
      stretch
      onPress={() => {
        AppNavigation.push(buttonPress);
      }}
    >
      <AppView stretch row>
        <AppIcon size={9} name={iconName} type={type} color="#757575" />
        <AppText color="#757575" marginHorizontal={10}>
          {I18n.t(title)}
        </AppText>
      </AppView>

      <AppView
        row
        backgroundColor="#E0EDFC"
        paddingHorizontal={6}
        borderRadius={4}
      >
        <AppText
          color="primary"
          size={String(money).length < 5 ? 7 : 4}
          size={5}
        >
          {money}
        </AppText>
        <AppText color="primary" size={5}>
          {" "}
          {I18n.t("EGP")}
        </AppText>
      </AppView>
    </AppView>
  );

  renderHeader = currentUser =>
    currentUser ? (
      <AppView marginTop={5} marginHorizontal={5}>
        <AppView row>
          <AppImage
            margin={5}
            equalSize={17}
            // borderRadius={50}
            source={{ uri: currentUser.user.profileImg.thumbnail }}
          />
          <AppView paddingVertical={-2} width={42}>
            <AppText size={6} bold numberOfLines={1}>
              {this.props.rtl
                ? currentUser.user.name.ar
                : currentUser.user.name.en}
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    ) : (
      <AppView marginTop={5} marginHorizontal={5}>
        <AppView row>
          <AppImage
            margin={5}
            equalSize={17}
            // borderRadius={50}
            source={empty}
            // onPress={() => AppNavigation.push("profile")}
          />
          <AppView paddingVertical={-2}>
            <AppText paddingHorizontal={3} size={8}>
              {I18n.t("welcome")}
            </AppText>
            <AppView row height={5}>
              <AppView
                onPress={() => {
                  //  this.props.onLogout();
                  AppNavigation.push("signIn");
                }}
              >
                <AppText size={5} color="primary">
                  {I18n.t("ui-signIn-title")}{" "}
                </AppText>
              </AppView>
              <AppText size={5} color="primary">
                /
              </AppText>
              <AppView
                onPress={() => {
                  AppNavigation.push("signUp");
                }}
              >
                <AppText size={5} color="primary">
                  {I18n.t("sign-up-title")}
                </AppText>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
      </AppView>
    );

  renderMenu(currentUser) {
    return (
      <AppView
        style={[
          styles.sideMenu
          // { right: this.props.rtl ? 0 : 100 },
          // this.props.style || {}
        ]}
      >
        {/* <SafeAreaView>{this.renderHeader(currentUser)}</SafeAreaView>/
         */}
        <SafeAreaView>
          <AppView marginTop={5} marginHorizontal={5}>
            <AppView row>
              <AppImage
                margin={5}
                equalSize={17}
                // borderRadius={50}
                source={empty}
                // onPress={() => AppNavigation.push("profile")}
              />
              <AppView paddingVertical={-2}>
                <AppText paddingHorizontal={3} size={8}>
                  {I18n.t("welcome")}
                </AppText>
                <AppView row height={5}>
                  <AppView
                    onPress={() => {
                      //  this.props.onLogout();
                      AppNavigation.push("signIn");
                    }}
                  >
                    <AppText size={5} color="primary">
                      {I18n.t("ui-signIn-title")}{" "}
                    </AppText>
                  </AppView>
                  <AppText size={5} color="primary">
                    /
                  </AppText>
                  <AppView
                    onPress={() => {
                      AppNavigation.push("signUp");
                    }}
                  >
                    <AppText size={5} color="primary">
                      {I18n.t("sign-up-title")}
                    </AppText>
                  </AppView>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </SafeAreaView>
        <AppView
          stretch
          // style={[styles.body,{width:'80%'}]}
          style={{ width: "100%" }}
          paddingVertical={5}
          right
          flex
          width={80}
        >
          {/* {currentUser &&
            this.renderComponent(
              "my-account",
              "account-circle-outline",
              "material-community",
              "profile"
            )}
          {currentUser &&
            this.renderComponent("orders", "Order", "custom", "myOrders")}
          {currentUser &&
            this.renderComponent(
              "my-order-bid",
              "vote-outline",
              "material-community",
              "myOrderBid"
            )} */}

          {/* {currentUser &&
            this.renderComponent(
              "myExternalOrders",
              "Combined-Shape",
              "custom",
              "myExternalOrders"
            )} */}

          {/* {currentUser &&
            this.renderWallet(
              "wallet",
              "wallet-outline",
              "material-community",
              "wallet",
              this.props.wallet
            )}
          {currentUser &&
            this.renderComponent(
              "my-ticket",
              "message-alert-outline",
              "material-community",
              "ticket"
            )} */}
          {/* {currentUser &&
            this.renderComponent("recyclebin", "Shape", "custom", "signIn")} */}

          {this.renderComponent("settings", "setting", "ant", "settings")}
          {currentUser &&
            this.renderComponent(
              "sign-out",
              "exit-to-app",
              "material",
              "signIn"
            )}
        </AppView>
      </AppView>
    );
  }

  render() {
    return (
      <AppView stretch>
        {this.renderMenu(
          this.props.currentUser ? this.props.currentUser : false
        )}
        <LogoutModal
          isVisible={this.state.isLogOutVisible}
          changeState={v => {
            this.setState({
              isLogOutVisible: v
            });
          }}
        />
      </AppView>
    );
  }
}

const styles = StyleSheet.create({
  sideMenu: {
    position: "absolute",
    top: 0,
    paddingHorizontal: moderateScale(10),
    flex: 1,
    width: "100%",
    marginTop: 35
  },
  header: {
    position: "absolute",
    top: moderateScale(5),
    alignItems: "center"
  },
  body: {
    position: "absolute",
    // width: responsiveWidth(100),
    top: moderateScale(48)
  },
  headerText: {
    color: "black"
  },
  scrollContainer: {
    alignSelf: "stretch"
  },
  avatar: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(20)
  },

  modalContentContainer: {
    width: moderateScale(150),
    backgroundColor: "white",
    alignSelf: "center",
    height: moderateScale(80)
  },
  modalHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary
  },
  white: {
    color: "#fff"
  },
  primary: {
    color: Colors.primary
  },
  modalConfimButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginBottom: moderateScale(10),
    width: moderateScale(50),
    height: moderateScale(18),
    marginTop: moderateScale(10),
    alignSelf: "center",
    marginHorizontal: responsiveHeight(1),
    borderRadius: 6
  },
  modalCancelButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(10),
    width: moderateScale(50),
    height: moderateScale(18),
    marginTop: moderateScale(10),
    alignSelf: "center",
    marginHorizontal: responsiveHeight(1),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary
  },
  noAddressesText: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLogout: bindActionCreators(logout, dispatch),
  onChangeMenuStatus: bindActionCreators(changeMenuStatus, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
