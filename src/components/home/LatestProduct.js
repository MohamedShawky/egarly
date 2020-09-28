import React, { Component, useState, useEffect } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import { AppView, AppSpinner, showError, AppText, AppList } from "../../common";

import OfferRentCard from "./OfferRentCard";
import * as ProductRepo from "../../repo/ProductRepo";
import store from "../../store";
import { TABS_CONTENT_DIMENSIONS } from "../../actions/types";
import {
  APPBAR_HEIGHT,
  responsiveHeight,
} from "../../common/utils/responsiveDimensions";

class LatestProduct extends Component {
  state = {
    nearestProduct: [],
    loading: true,
    products: [],
    submitedOrder: [],
  };

  componentDidMount() {
    this.getAllProduct();
  }

  getAllProduct = async () => {
    try {
      const products = await ProductRepo.getAllProductProduct();

      this.setState({
        products,
        loading: false,
      });
    } catch (error) {
      this.setState({
        loading: false,
        products: [],
      });
      if (typeof error === "object") {
        showError(error.message);
      }
    }
  };

  componentDidUpdate(prevState) {
    // if (prevState.currentLocation !== this.props.currentLocation) {
    //   this.getNearstProduct();
    // }

    if (
      prevState.activePage !== this.props.activePage &&
      this.props.activePage === 1
    ) {
      this.getAllProduct();
    }
    if (prevState.loading !== this.props.loading) {
      this.setState({
        loading: this.props.loading,
        products: [],
      });
    }
  }

  render() {
    const { loading, nearestProduct, products, submitedOrder } = this.state;
    return (
      <AppView stretch flex zIndex={1000}>
        {loading ? (
          <AppView stretch flex marginTop={10} centerX>
            <AppSpinner size={12} />
          </AppView>
        ) : (
          <AppList
            data={
              this.props.data && this.props.data.length !== 0
                ? this.props.data
                : products
            }
            flatlist
            columns={2}
            style={{
              width: "100%",
              paddingTop: "5%",
            }}
            onContentSizeChange={(w, h) => {
              const listHeight = h + responsiveHeight(APPBAR_HEIGHT);
              store.dispatch({
                type: TABS_CONTENT_DIMENSIONS,
                payload: { index: 0, height: listHeight },
              });
            }}
            rowRenderer={(item) => {
              return <OfferRentCard item={item} />;
            }}
            noResultsComponent={
              <AppView stretch marginTop={30} centerX>
                <AppText>{I18n.t("ui-noResultsFound")}</AppText>
              </AppView>
            }
            staticData
            refreshControl={this.props.latest}
          />
        )}
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,
  currentLocation: state.location.current,

  allChat: state.chat,
  rtl: state.lang.rtl,
  latest:state.list
});

export default connect(mapStateToProps)(LatestProduct);
