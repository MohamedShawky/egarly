import React, { Component } from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { bindActionCreators } from "redux";

import {
  AppView,
  AppButton,
  AppImage,
  AppScrollView,
  AppTabs,
  AppSpinner,
  AppText,
  AppStarRating,
} from "../../common";
import Avatar from "../../assets/imgs/avatar.png";

import { AppHeader, AppErrorModal, UpdateFormInput } from "../../components";
import { UserInfo } from "../../components/productDetails";
import Axios from "axios";
import Products from "./Products";
import Orders from "./Orders";

class UserProfile extends Component {
  state = {
    isLoading: true,
    showInvalidUserModal: false,
    data: null,
  };

  async componentDidMount() {
    try {
      const isFetch = await Axios.get(
        `http://ejarly.dev.fudexsb.com/api/user/${
          this.props.id
        }/orders/products`
      );
      console.log("is", isFetch);

      this.setState({
        isLoading: false,
        data: isFetch.data,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <>
          <AppHeader backgroundColor="white" />
          <AppView marginTop={20} />
          <AppSpinner />
        </>
      );
    }
    const { username, rate_avg, avatar } = this.state.data;
    return (
      <AppView stretch flex backgroundColor="#fff">
        <AppHeader title={username} backgroundColor="white" />
        <AppView
          stretch
          row
          marginTop={5}
          paddingVertical={5}
          marginHorizontal={5}
          borderRadius={7}
          elevation={2}
        >
          <AppImage
            circleRadius={15}
            source={
              avatar !== null
                ? { uri: `http://ejarly.dev.fudexsb.com/uploads/${avatar}` }
                : Avatar
            }
            marginHorizontal={5}
          />

          <AppView stretch>
            <AppText size={5.5}>{username} </AppText>

            <AppStarRating rate={rate_avg} size={5} />
          </AppView>
        </AppView>
        <AppTabs>
          <Products
            tabLabel={I18n.t("product")}
            data={this.state.data.products}
          />
          <Orders tabLabel={I18n.t("orders")} data={this.state.data.orders} />
        </AppTabs>
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  rtl: state.lang.rtl,
  error: state.auth.error,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
