import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { SafeAreaView } from "react-native";
import {
  AppView,
  AppText,
  AppImage,
  AppButton,
  AppNavigation,
  AppScrollView,
  AppSpinner,
} from "../../common";
import {
  AppHeader,
  NoInternet,
  AppFeedBack, 
  LoadingOverlay,
} from "../../components";
import EmptyAddress from "../../assets/imgs/empty_address.png";
import { Navigation } from "react-native-navigation";
import * as clientRepo from "../../repo/ClientRepo";
import * as errors from "../../utils/Errors";
import close from "../../assets/imgs/close.png";

class AddressBook extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    addressList: [],
    errorModal: false,
    errorTxt: "",
    loading: true,
  };

  async componentDidAppear() {
    try {
      this.setState({ loading: true });
      const addressList = await clientRepo.getAddresses(
        this.props.userData.user.id,
      );
      console.log("addresss", addressList);

      this.setState({
        addressList,
      });
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        I18n.t("ui-networkConnectionError");
      } else if (typeof error === "object") {
        this.setState({
          errorModal: true,
          errorTxt: error.message,
        });
      }
    } finally {
      this.setState({ loading: false });
    }
  }
  renderEmptyList = () => {
    return (
      <AppView
        flex
        stretch
        center
        backgroundColor='#FFF'
      >
        <AppImage
          source={EmptyAddress}
          width={40} 
          height={40}
          resizeMode="stretch" 
        />
        <AppText marginTop={15} color="#B2B2B2">
          {I18n.t("address-book-empty-content")}
        </AppText>
      </AppView>
    );
  };
  renderItemList = (val, index) => {
    return (
      <AppView
        key={index}
        stretch
        backgroundColor="#fff"
        elevation={1}
        paddingVertical={5}
        paddingHorizontal={7}
        marginBottom={1}
        onPress={() => {
          AppNavigation.push({
            name: "updateAddress",
            passProps: {
              data: val,
            },
          });
        }}
      >
        <AppText color="#212121" size={6}>
          {val.alias}
        </AppText>
        <AppText color="#7D7D7D" size={5.5}>
          {val.locationPlaceName}
        </AppText>
      </AppView>
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.connected && this.props.connected) {
      this.componentDidAppear();
    }
  }

  renderErrorModal() {
    return (
      <AppFeedBack
        visible={this.state.errorModal}
        backgroundColor="red"
        changeState={v => {
          this.setState({
            errorModal: v,
          });
        }}
        image={close}
        message={I18n.t("error")}
        hintMessage={this.state.errorTxt}
      />
    );
  }

  render() {
    return (
      <AppView flex stretch backgroundColor="#FFF">
        <AppView stretch marginBottom={1}>
        <AppHeader title={I18n.t("address-book-title")} />
        </AppView>
        {!this.props.connected ? (
            <NoInternet />
        ) : this.state.loading ? (
          <AppView flex center stretch>
          <AppSpinner /> 
          </AppView> 
        ) : (
          <AppView flex stretch>
            {/* {this.state.addressList.length ? (
              <AppView stretch height={7} centerY paddingHorizontal={7}>
                <AppText>{I18n.t("address-book-message")}</AppText>
              </AppView>
            ) : (
              null
            )} */}

            {this.state.addressList.length !== 0 ? (
              <AppScrollView stretch marginBottom={25}> 
                {this.state.addressList.map((val, index) => {
                  return this.renderItemList(val, index);
                })}
              </AppScrollView>
            ) : (
              this.renderEmptyList()
            )}

            <AppView
              stretch
              stretchChildren
              style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
            >
              <SafeAreaView>
                <AppButton
                  noBorder
                  title={I18n.t("add-new-address-button")}
                  centerX
                  stretch
                  // height={8}
                  onPress={() => AppNavigation.push("addAddress")}
                />
              </SafeAreaView>
            </AppView>
          </AppView>
        )}
        {this.renderErrorModal()}
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  connected: state.network.isConnected,
  userData: state.auth.currentUser,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddressBook);
