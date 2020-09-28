import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { AppList, AppText, AppView, AppNavigation } from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";
import { ProductInfo } from "../../components/orderRent/ProductInfo";
import Segmented from "./Segmented";
import ProductOrderCard from "./ProductOrderCard";

class Favorite extends Component {
  state = {
    data: [
      { id: 1, text: I18n.t("order-closed") },
      { id: 11, text: I18n.t("order-finished") },
      { id: 2, text: I18n.t("refuse") }
    ],
    selectedValue: 11
  };

  onChange = val => {
    this.setState({
      selectedValue: val
    });
  };

  render() {
    return (
      <AppView stretch flex centerX paddingBottom={20}>
        <Segmented
          data={this.state.data}
          selectedValue={this.state.selectedValue}
          onChange={this.onChange}
        />
        <AppList
          flatlist
          paddingTop={5}
          refreshControl={this.props.favorite}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}orders`,

            responseResolver: response => {
              return {
                data: response.data,
                pageCount: response.data.pageCount
              };
            },
            onError: error => {
              console.log("erro", JSON.parse(JSON.stringify(error)));

              return I18n.t("ui-error-happened");
            }
          }}
          noResultsComponent={
            <AppView flex stretch center>
              <AppText> No Data </AppText>
            </AppView>
          }
          stretch
          rowRenderer={item => (
            <ProductOrderCard
              height={15}
              PENDING
              onPress={() => {
                AppNavigation.push({
                  name: "orderRent",
                  passProps: {
                    componentId: this.props.componentId,
                    data: item
                  }
                });
              }}
            />
          )}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  favorite: state.list
});

export default connect(mapStateToProps, null)(Favorite);
