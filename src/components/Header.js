import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, SafeAreaView, BackHandler } from "react-native";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigation } from "react-native-navigation";
import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  getColors,
  AppSpinner,
  responsiveHeight,
  AppImage,
} from "../common";
import { APPBAR_HEIGHT } from "../common/utils/responsiveDimensions";
import { elevationStyles } from "../common/Base";
import { HEADER_ELEVATION } from "../common/utils/Constants";
import logoEgarly from "../assets/imgs/logoEgarly.png";

class Header extends Component {
  static propTypes = {
    hideBack: PropTypes.bool,
    showNotification: PropTypes.bool,
    showChat: PropTypes.bool,
    rowItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    showBasket: PropTypes.bool,
    count: PropTypes.number,
  };

  static defaultProps = {
    hideBack: false,
    showNotification: false,
    showChat: false,
    rowItems: [],
    showBasket: false,
  };

  state = {
    cancelDeleteToggle: false,
  };

  goBack = async () => {
    try {
      if (this.props.backHandler) {
        await this.props.backHandler();
      } else {
        await AppNavigation.pop();
      }
    } catch (error) {
      BackHandler.exitApp();
    }
  };

  componentDidMount() {
    AppNavigation.clearBackHandlerListener();
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      async () => {
        await this.goBack(); // works best when the goBack is async
        return true;
      }
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
    AppNavigation.registerBackHandlerListener();
  }

  renderNotification = () => {
    const {
      notificationCount,
      resetUnseenNotification,
      currentUser,
    } = this.props;

    return (
      <AppView
        stretch
        transparent
        ph={3}
        flexInnerTouchable
        center
        onPress={() => {
          AppNavigation.push("notifications");
        }}
      >
        <AppIcon
          reverse
          name="notification"
          type="custom"
          size={10}
          lineHeight={10}
          color="#6A6A6A"
        />

        {notificationCount > 0 && (
          <AppView
            backgroundColor="#D0021B"
            circleRadius={4.5}
            style={{
              position: "absolute",
              top: 12,
              left: this.props.rtl ? 4 : 18,
              zIndex: 10000,
            }}
            center
          >
            <AppText size={5} bold color="#FFF">
              {notificationCount > 9 ? `+9` : notificationCount}
            </AppText>
          </AppView>
        )}
      </AppView>
    );
  };

  renderChat = () => {
    const { chatCount } = this.props;
    const count = this.props.chatCount > 9 ? "+9" : this.props.chatCount;
    return (
      <AppView
        stretch
        transparent
        onPress={() => {}}
        ph={3}
        flexInnerTouchable
        center
        onPress={() => {
          console.log("chatFromProvider1", this.props.chatOnPress);
          if (this.props.chatOnPress) {
            console.log("chatFromProvider2");
            this.props.chatOnPress();
          } else {
            AppNavigation.push("chatList");
          }
        }}
      >
        <AppIcon
          reverse
          name="message"
          type="custom"
          size={10}
          color="#6A6A6A"
          lineHeight={10}
          // flip
        />

        {count !== 0 && !this.props.chatOnPress ? (
          <AppView
            backgroundColor="#D0021B"
            circleRadius={4.5}
            style={{
              position: "absolute",
              top: 12,
              left: this.props.rtl ? 4 : 18,
              zIndex: 10000,
            }}
            center
          >
            <AppText size={5} bold color="#6A6A6A">
              {count}
            </AppText>
          </AppView>
        ) : null}
      </AppView>
    );
  };

  renderRight = () => {
    const {
      showNotification,
      showChat,
      rowItems,
      onBlock,
      onFavorite,
      inFavourites,
      refresh,
      loading,
      save,
      processing,
      edit,
      onEdit,
    } = this.props;

    if (rowItems.length > 0) {
      return (
        <AppView row flex stretch marginHorizontal={2}>
          {rowItems.map((item) =>
            React.cloneElement(item, {
              key: String(Math.random()),
            })
          )}
        </AppView>
      );
    }

    return !loading ? (
      <AppView row stretch flex>
        {showNotification ? this.renderNotification() : null}
        {showChat ? this.renderChat() : null}
        {onFavorite ? this.renderFavButton(onFavorite, inFavourites) : null}
        {edit ? this.renderEditButton(onEdit) : null}
        {refresh ? this.renderRefresh(refresh) : null}
        {save ? this.renderSaveButton(save, processing) : null}
      </AppView>
    ) : (
      <AppView row stretch marginHorizontal={8}>
        <AppSpinner size={10} color="white" />
      </AppView>
    );
  };

  renderLeft = () => {
    const {
      hideBack,
      termsAndConditionClose,
      showMenu,
      goToMenu,
      showDismissIcon,
    } = this.props;

    if (termsAndConditionClose || showDismissIcon)
      return (
        <AppButton
          leftIcon={
            <AppIcon
              reverse
              name="clear"
              type="material"
              size={13}
              color="#6A6A6A"
            />
          }
          circleRadius={15}
          backgroundColor="transparent"
          mh={3}
          size={8}
          onPress={() => {
            AppNavigation.pop();
          }}
        />
      );

    if (showMenu) {
      return this.renderMenuButton(goToMenu);
    }

    if (hideBack) {
      return <AppView stretch flex />;
    }

    return (
      <AppView center>
        <AppButton
          flex
          color="foreground"
          leftIcon={
            <AppIcon
              flip
              name="ios-arrow-back"
              type="ion"
              size={8}
              color="#6A6A6A"
            />
          }
          onPress={this.goBack}
          paddingHorizontal={8}
          backgroundColor="transparent"
        />
      </AppView>
    );
  };

  renderEditButton = (onEdit) => (
    <AppView
      stretch
      transparent
      ph={3}
      flexInnerTouchable
      center
      onPress={onEdit}
      borderRadius={20}
    >
      <AppIcon
        reverse
        name="edit"
        type="entypo"
        size={10}
        lineHeight={10}
        color="#6A6A6A"
      />
    </AppView>
  );

  renderSaveButton = (save, processing) => (
    <AppView stretch transparent flexInnerTouchable>
      <AppButton
        flat
        processing={processing}
        flex
        color="white"
        title={I18n.t("save")}
        onPress={save}
        backgroundColor="transparent"
      />
    </AppView>
  );

  renderRefresh = (onRefresh) => (
    <AppView
      stretch
      transparent
      marginTop={1}
      circleRadius={12}
      flexInnerTouchable
      center
      borderRadius={40}
      onPress={onRefresh}
    >
      <AppIcon
        reverse
        name="reload"
        type="custom"
        size={8}
        lineHeight={10}
        color="#6A6A6A"
      />
    </AppView>
  );

  renderFavButton = (onFavorite, inFavourites) => (
    <AppView
      stretch
      transparent
      ph={3}
      pv={3}
      flexInnerTouchable
      center
      onPress={onFavorite}
      borderRadius={40}
    >
      <AppIcon
        reverse
        name={inFavourites ? "favorite" : "favorite-border"}
        type="material"
        size={10}
        lineHeight={10}
        color="#6A6A6A"
      />
    </AppView>
  );

  renderMenuButton = (goToMenu) => (
    <AppView center>
      <AppButton
        flex
        color="foreground"
        leftIcon={
          <AppIcon reverse type="feather" size={8} name="menu" color="#fff" />
        }
        onPress={goToMenu}
        backgroundColor="transparent"
      />
    </AppView>
  );

  render() {
    const { title, flat } = this.props;
    return (
      <SafeAreaView
        style={[
          {
            backgroundColor: "#FFFFFF",
            alignSelf: "stretch",
            elevation: 1.5,
          },
        ]}
      >
        <AppView
          stretch
          // backgroundColor="#aaa516"
          backgroundColor={
            this.props.backgroundColor ? this.props.backgroundColor : "white"
          }
          style={{
            height: APPBAR_HEIGHT,
            // marginTop: 20,
          }}
          row
          spaceBetween
          elevation={this.props.flat ? undefined : 1.2}
        >
          {this.renderLeft()}

          {this.props.image ? (
            <AppView flex={4} center>
              {/* <AppText size={8} bold numberOfLines={1} color="#6A6A6A">
              {title}
            </AppText> */}
              <AppView
                stretch
                center
                style={{ position: "absolute", top: -30, left: 0, right: 0 }}
              >
                <AppImage source={logoEgarly} cover height={9} width={40} />
              </AppView>
            </AppView>
          ) : (
            <AppView flex={this.props.walk ? 3 : 5} stretch center>
              <AppText
                size={6}
                bold
                numberOfLines={1}
                // marginLeft={2}
                color="#6A6A6A"
              >
                {title}
              </AppText>
            </AppView>
          )}
          {this.renderRight()}
        </AppView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
