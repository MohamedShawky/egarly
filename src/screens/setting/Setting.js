import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { NativeModules } from "react-native";
import { bindActionCreators } from "redux";
import {
  AppView,
  ListTile,
  AppPicker,
  AppIcon,
  AppSpinner,
  showError,
  AppTabs,
  AppText,
  AppNavigation,
} from "../../common";
import Picker from "../../common/picker/Picker";
import { AppHeader, NoInternet, Switch } from "../../components";
import colors from "../../common/defaults/colors";
import * as clientRepo from "../../repo/ClientRepo";
import * as errors from "../../utils/Errors";
import { setLang } from "../../actions/lang";
import { changeMenuStatus } from "../../actions/MenuAction";
import CustomBottomTabs from "../Home/CustomBottomTabs";
import { logout } from "../../actions/AuthActions";
import LogoutModal from "../../components/LogoutModal";

class Setting extends Component {
  state = {
    loading: false,
    receivePushNotifications: true,
    loadPicker: false,
    originalRtl: this.props.rtl,
    isLogOutVisible: false,
  };

  async componentDidMount() {
    const { currentUser } = this.props;
    // if (currentUser) {
    //   try {
    //     const { id } = currentUser.user;
    //     const client = await clientRepo.getClient(id);
    //     this.setState({
    //       loading: false,
    //       receivePushNotifications: client.receivePushNotifications
    //     });
    //   } catch (error) {
    //     if (error === errors.CONNECTION_ERROR) {
    //       // no connection
    //       showError(I18n.t("ui-networkConnectionError"));
    //     } else if (typeof error === "object") {
    //       showError(error.message);
    //     }
    //   }
    // }
  }

  onChangeLang = async (lang) => {
    const { currentUser } = this.props;
    if (currentUser) {
      try {
        const { id } = currentUser.user;
        // await clientRepo.changeLanguageRepo(id, lang);
        this.setState({ originalRtl: !this.state.originalRtl });
        return true;
      } catch (error) {
        this.props.rtl
          ? this.props.setLang("en", false)
          : this.props.setLang("ar", true);
        if (error === errors.CONNECTION_ERROR) {
          // no connection
          showError(I18n.t("ui-networkConnectionError"));
        } else if (typeof error === "object") {
          showError(error.message);
        }
        return false;
      }
    }
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.rtl !== this.props.rtl) {
      const lang = this.props.rtl ? "ar" : "en";
      if (this.props.rtl !== this.state.originalRtl) {
        this.setState({ loadPicker: true });
        await this.onChangeLang(lang).then(() => {
          this.setState({ loadPicker: false });
        });
      } else {
        this.setState({ loadPicker: true }, () => {
          this.setState({ loadPicker: false });
        });
      }
    }
  }

  onchangeNotfication = async (value) => {
    const { id } = this.props.currentUser.user;
    try {
      this.setState({
        loading: true,
      });
      // await clientRepo.changeRecieveNotificationRepo(id, value);
      this.setState({ receivePushNotifications: !this.state.receivePushNotifications });
    } catch (error) {
      // if (error === errors.CONNECTION_ERROR) {
      //   // no connection
      //   showError(I18n.t("ui-networkConnectionError"));
      // } else if (typeof error === "object") {
      //   showError(error.message);
      // }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  renderLoadPicker = () => (
    <AppView
      stretch
      backgroundColor="white"
      center
      height={10}
      paddingHorizontal={7}
    >
      <AppView
        stretch
        backgroundColor="#E6E8EA"
        borderRadius={4}
        height={8}
        center
      >
        <AppSpinner />
      </AppView>
    </AppView>
  );

  renderPicker = () => (
    <AppView
      height={8}
      stretch
      mb={7.5}
      borderColor="#CFCFCF"
      borderBottomWidth={0.5}
    >
      <Picker
        mt={7}
        hideSearch
        height={8}
        backgroundColor="#FFF"
        contentStyle={{
          centerY: true,
          flex: 1,
          stretch: true,
          left: this.props.rtl,
          right: !this.props.rtl,
        }}
        data={[
          {
            label: I18n.t("arabic-lang"),
            value: "ARABIC",
          },
          {
            label: I18n.t("english-lang"),
            value: "ENGLISH",
          },
        ]}
        title={I18n.t("app-lang")}
        selectedValue={this.props.rtl ? "ARABIC" : "ENGLISH"}
        keyOfLabel="label"
        keyOfValue="value"
        onValueChange={(value) => {
          if (value === "ARABIC") {
            this.props.setLang("ar", true);
          } else if (value === "ENGLISH") {
            this.props.setLang("en", false);
          }
        }}
        leftItem={
          <AppView paddingHorizontal={8} centerY>
            <AppIcon
              name={this.props.rtl ? "ios-arrow-back" : "ios-arrow-forward"}
              size={6}
            />
          </AppView>
        }
        rightItem={
          <AppView paddingHorizontal={4} centerY row>
            <AppIcon name="earth" type="custom" size={9} />
            <AppText paddingHorizontal={5}>{I18n.t("app-lang")}</AppText>
          </AppView>
        }
      />
    </AppView>
  );

  renderItem = (
    lable,
    iconName,
    iconType,
    rightItem,
    onPress = null,
    iconSize = 10
  ) => (
    <AppView
      onPress={onPress}
      borderColor="#CFCFCF"
      borderBottomWidth={0.5}
      mb={0.5}
      ph={8.5}
      stretch
      height={8}
      centerY
      row
      backgroundColor="#FFF"
    >
      <AppView row flex height={10}>
        <AppIcon name={iconName} type={iconType} size={iconSize} />
        <AppText paddingHorizontal={5} size={5.5}>
          {lable}
        </AppText>
      </AppView>
      <AppView>{rightItem}</AppView>
    </AppView>
  );

  renderContent = () => (
    <>
      {this.state.loadPicker ? this.renderLoadPicker() : this.renderPicker()}
      {this.props.currentUser &&
        this.renderItem(
          I18n.t("notifications"),
          "alarm",
          "custom",
          this.state.loading ? (
            <AppSpinner />
          ) : (
            <Switch
              itemStyle={{ height: 7 }}
              width={15}
              value={this.state.receivePushNotifications}
              onChange={v => this.onchangeNotfication(v)}
            />
          )
        )}
      <AppView mt={7} />
      {this.renderItem(
        I18n.t("rate-us"),
        "rate",
        "custom",
        <AppIcon
          paddingHorizontal={4}
          name={this.props.rtl ? "ios-arrow-back" : "ios-arrow-forward"}
          size={6}
        />,
        () => {
          AppNavigation.push({
            name: "aboutUs",
            passProps: {},
          });
        }
      )}
      {this.renderItem(
        I18n.t("help"),
        "messages",
        "custom",
        <AppIcon
          paddingHorizontal={4}
          name={this.props.rtl ? "ios-arrow-back" : "ios-arrow-forward"}
          size={6}
        />,
        () => {
          AppNavigation.push({
            name: "aboutUs",
            passProps: {},
          });
        }
      )}

      {this.renderItem(
        I18n.t("about-us-w"),
        "about",
        "custom",
        <AppIcon
          paddingHorizontal={4}
          name={this.props.rtl ? "ios-arrow-back" : "ios-arrow-forward"}
          size={6}
        />,
        () => {
          AppNavigation.push({
            name: "aboutUs",
            passProps: {},
          });
        }
      )}
     
      {this.renderItem(
        I18n.t("terms-and-condition-title"),
        "whistl",
        "custom",
        <AppIcon
          paddingHorizontal={4}
          name={this.props.rtl ? "ios-arrow-back" : "ios-arrow-forward"}
          size={6}
        />,
        () => {
          AppNavigation.push({
            name: "termsAndCondition",
            passProps: {
              order: true,
            },
          });
        }
      )}

      {/* {this.renderItem(
        I18n.t("share-list"),
        "share",
        "entypo",
        <AppIcon
          paddingHorizontal={4}
          name={this.props.rtl ? "ios-arrow-back" : "ios-arrow-forward"}
          size={6}
        />,
        () => {
          AppNavigation.push({
            name: "shareList",
            passProps: {},
          });
        }
      )} */}
      {/* {this.renderItem(
        I18n.t("sign-out"),
        "exit-to-app",
        "material",
        <AppIcon
          paddingHorizontal={4}
          name={this.props.rtl ? "ios-arrow-back" : "ios-arrow-forward"}
          size={6}
        />,
        () => {
          this.setState({
            isLogOutVisible: true,
          });
        }
      )} */}
      {/* <CustomBottomTabs componentId={this.props.componentId} /> */}
    </>
  );

  render() {
    return (
      <AppView flex stretch backgroundColor="#F2F2F2">
        <AppHeader title={I18n.t("settings")} />
        {this.props.isConnected ? this.renderContent() : <NoInternet />}
        
      </AppView>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
  isConnected: state.network.isConnected,
});
const mapDispatchToProps = (dispatch) => ({
  setLang: bindActionCreators(setLang, dispatch),
  onLogout: bindActionCreators(logout, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
