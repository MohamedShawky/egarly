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
  AppImage,
} from "../common";
import {
  APPBAR_HEIGHT,
  responsiveHeight,
} from "../common/utils/responsiveDimensions";
import { HEADER_ELEVATION } from "../common/utils/Constants";
import cardShadowStyle from "../common/utils/cardShadowStyle";
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
          resetUnseenNotification(currentUser.user.id);
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
          name="chat-bubble-outline"
          type="material"
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
            <AppText size={5} bold color="#FFF">
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
    } = this.props;

    if (rowItems.length > 0) {
      return (
        <AppView row center stretch marginHorizontal={2}>
          {rowItems.map((item) =>
            React.cloneElement(item, {
              key: String(Math.random()),
            })
          )}
        </AppView>
      );
    }

    return !loading ? (
      <AppView row stretch marginHorizontal={8}>
        {showChat ? this.renderChat() : null}
        {showNotification ? this.renderNotification() : null}

        {onFavorite ? this.renderFavButton(onFavorite, inFavourites) : null}
        {onBlock ? this.renderBlockButton(onBlock) : null}
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
      search,
    } = this.props;

    if (search)
      return (
        <AppView row stretch>
          {this.renderMenuButton(goToMenu)}
          {this.props.location && this.props.location}
        </AppView>
      );

    if (showMenu) {
      return this.renderMenuButton(goToMenu);
    }

    if (hideBack) {
      return <AppView stretch width={5} />;
    }

    return (
      <AppView center>
        <AppButton
          flex
          color="foreground"
          leftIcon={
            <AppIcon reverse name="back" type="custom" size={8} color="#fff" />
          }
          onPress={this.goBack}
          paddingHorizontal={8}
          backgroundColor="transparent"
        />
      </AppView>
    );
  };

  renderBlockButton = (onBlock) => (
    <AppView
      stretch
      transparent
      ph={3}
      flexInnerTouchable
      center
      onPress={onBlock}
      borderRadius={20}
    >
      <AppIcon
        reverse
        name="block"
        type="entypo"
        size={10}
        lineHeight={10}
        color="#fff"
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
        color="#fff"
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
        color="white"
      />
    </AppView>
  );

  renderMenuButton = (goToMenu) => (
    <AppView center pl={5}>
      <AppButton
        leftIcon={
          <AppIcon name="search" type="feather" size={13} color="grey" />
        }
        backgroundColor="transparent"
        size={8}
        onPress={() => {
          AppNavigation.push("search");
        }}
        equalSize={15}
      />
    </AppView>
  );

  render() {
    const { title, flat } = this.props;
    return (
      <SafeAreaView
        style={{
          backgroundColor: "#FFF",
          alignSelf: "stretch",
          height: responsiveHeight(12),
          // marginTop: 20,
        }}
      >
        <AppView
          stretch
          backgroundColor="white"
          style={[
            cardShadowStyle,
            {
              height: APPBAR_HEIGHT+20,
            },
          ]}
          row
          spaceBetween
          elevation={HEADER_ELEVATION}
        >
          {this.renderLeft()}
          <AppView flex={2} center>
            {/* <AppText size={8} bold numberOfLines={1} color="#6A6A6A">
              {title}
            </AppText> */}
            <AppView   stretch center   style={{position:'absolute',top:-30, left:0, right:0}} >
              <AppImage source={logoEgarly} cover height={9} width={40} />
            </AppView>
          </AppView>
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
