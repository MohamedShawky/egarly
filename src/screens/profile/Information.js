import React, { Component } from "react";
import {
  AppView,
  AppButton,
  AppText,
  AppIcon,
  AppNavigation,
} from "../../common";
import I18n from "react-native-i18n";
import { HEADER_ELEVATION } from "../../common/utils/Constants";
import cardShadowStyle from "../../common/utils/cardShadowStyle";
import { LogoutModal } from "../../components";
import { connect } from "react-redux";
import { logout } from "../../actions/AuthActions";
import { bindActionCreators } from "redux";
import ShareModal from "../../components/appModals/ShareModal";

class Information extends Component {
  state = {
    isLogOutVisible: false,
    isShareVisible: false,
    data: [
      {
        iconName: "md-person",
        iconType: "ion",
        text: I18n.t("edit-info"),
        name: "updateProfile",
        onPress: () =>
          AppNavigation.push({
            name: "updateProfile",
            passProps: {},
          }),
      },
      {
        iconName: "lock-outline",
        iconType: "material",
        text: I18n.t("setting-change-password"),
        onPress: () =>
          AppNavigation.push({
            name: "changePassword",
            passProps: {},
          }),
      },

      {
        iconName: "wallet",
        iconType: "entypo",
        text: I18n.t("wallet"),
        name: "wallet",
        onPress: () =>
          AppNavigation.push({
            name: "wallet",
            passProps: {},
          }),
      },
      {
        iconName: "calendar",
        iconType: "ant",
        text: I18n.t("calendar"),
        name: "calender",
        onPress: () =>
          AppNavigation.push({
            name: "calender",
            passProps: {},
          }),
      },

      {
        iconName: "md-settings",
        iconType: "ion",
        text: I18n.t("settings"),
        name: "settings",
        onPress: () =>
          AppNavigation.push({
            name: "settings",
            passProps: {},
          }),
      },
      {
        iconName: "ios-share-alt",
        iconType: "ion",
        text: I18n.t("share"),
        onPress: () =>
          this.setState({
            isShareVisible: true,
          }),
      },
    ],
  };
  renderApproveAccount = () => {
    return (
      <AppButton
        title={I18n.t("approve")}
        stretch
        marginBottom={7}
        marginHorizontal={10}
        onPress={() => {
          AppNavigation.push("approveAccount");
        }}
      />
    );
  };
  renderItems = () => {
    return <Items />;
  };
  render() {
    console.log("isVisible", this.props);

    return (
      <AppView stretch flex paddingTop={10}>
        {this.renderApproveAccount()}
        <AppView wrap row center>
          {this.state.data.map((i, index) => (
            <Items {...i} key={index} />
          ))}
        </AppView>
        <AppView
          centerSelf
          marginTop={10}
          onPress={() => {
            this.props.onModalVisible();
          }}
        >
          <AppText>{I18n.t("log-out")}</AppText>
        </AppView>
        <ShareModal
          visible={this.state.isShareVisible}
          changeState={() => {
            this.setState({
              isShareVisible: false,
            });
          }}
        />
      </AppView>
    );
  }
}

const Items = (props) => {
  return (
    <AppView
      {...props.rest}
      equalSize={25}
      center
      backgroundColor="primary"
      margin={5}
      borderRadius={7}
      elevation={HEADER_ELEVATION}
      style={cardShadowStyle}
      onPress={() => {
        props.onPress();
        // AppNavigation.push({
        //   name: props.name,
        //   passProps: {},
        // });
      }}
    >
      <AppIcon
        name={props.iconName}
        type={props.iconType}
        size={10}
        color="white"
      />
      <AppText color="white" center>
        {props.text}
      </AppText>
    </AppView>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
  isConnected: state.network.isConnected,
});
const mapDispatchToProps = (dispatch) => ({
  // onLogout: bindActionCreators(logout, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Information);
