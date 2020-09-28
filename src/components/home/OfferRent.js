import React, { Component, useState, useEffect } from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import {
  AppView,
  AppSpinner,
  showError,
  AppList,
  AppIcon,
  AppNavigation,
} from "../../common";

import OfferRentCard from "./OfferRentCard";
import * as ProductRepo from "../../repo/ProductRepo";
import Image1 from "../../assets/imgs/home/Image1.png";
import Image2 from "../../assets/imgs/home/Image2.png";
import Image3 from "../../assets/imgs/home/Image3.png";
import Image4 from "../../assets/imgs/home/Image4.png";
import { EmptyContentList } from "..";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferCard from "./OfferCard";
import { barHeight } from "../CustomBottomTabs";

const data = [
  { image: Image1, slider_id: 1 },
  { image: Image2, slider_id: 1 },
  { image: Image3, slider_id: 2 },
  { image: Image4, slider_id: 3 },
];
const loading = false;

class ProductToRent extends Component {
  state = {
    nearestProduct: [],
    loading: true,
    products: [],
    submitedOrder: [],
  };
  componentDidMount() {
    this.getAllSubmitedOrder();
  }

  getAllSubmitedOrder = async () => {
    try {
      const submitedOrder = await ProductRepo.getAllSubmitedOrder();
      this.setState({
        submitedOrder,
        loading: false,
      });
      console.log("submittted Order =>>>>", submitedOrder);
    } catch (error) {
      this.setState({
        loading: false,
      });
      if (typeof error === "object") {
        showError(error.message);
      }
    }
  };

  render() {
    const { loading, nearestProduct, products, submitedOrder } = this.state;
    return (
      <>
        <AppList
          flatlist
          flex
          stretch
          paddingTop={10}
          style={{
            paddingBottom: barHeight,
          }}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}submitted_orders/all`,
            responseResolver: (response) => {
              console.log("submitted_orders ====>>>", response);

              return {
                data: response.data.data,
                pageCount: response.data.pageCount,
              };
            },

            onError: (error) => {
              console.log(JSON.parse(JSON.stringify(error.response)));
              I18n.t("ui-error-happened");
            },
          }}
          noResultsComponent={
            <EmptyContentList componentId={this.props.componentId} />
          }
          rowRenderer={(data) => (
            <OfferCard
              cardWidth={100}
              height={15}
              data={data}
              search
              onPress={() => {
                AppNavigation.push({
                  name: "offerDetails",
                  passProps: {
                    data: data,
                  },
                });
              }}
              backgroundColor="white"
              leftItem={
                <AppView>
                  <AppIcon name="keyboard-arrow-left" type="material" />
                </AppView>
              }
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.currentUser,
  isConnected: state.network.isConnected,
  currentLocation: state.location.current,

  allChat: state.chat,
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(ProductToRent);
