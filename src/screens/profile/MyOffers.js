import React, { Component } from "react";

import { AppView, AppText, AppList,AppNavigation } from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";

import I18n from "react-native-i18n";
import ProductOrderCard from "../myOrders/ProductOrderCard";
export default class MyOffers extends Component {
  render() {
    return (
      <AppView stretch flex>
        <AppList
          flatlist
          paddingTop={5}
          refreshControl={this.props.myOrderRent}
          height={100}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}orders`,

            responseResolver: (response) => {
              console.log("**** offers ", response);

              return {
                data: response.data,
                pageCount: response.data.pageCount,
              };
            },
            onError: (error) => {
              console.log("erro", JSON.parse(JSON.stringify(error)));

              return I18n.t("ui-error-happened");
            },
          }}
          noResultsComponent={
            <AppView flex stretch center>
              <AppText> No Data </AppText>
            </AppView>
          }
          stretch
          rowRenderer={(item) => (
            <ProductOrderCard
              backgroundColor="transparent"
              data={item}
              stretch
              onPress={() => {
                console.log("order +++++++++==>>", item.order.status_id);

                AppNavigation.navigateToOrderStatus(
                  item.order.status_id,
                  item.order.id
                );
              }}
            />
          )}
        />
      </AppView>
    );
  }
}
