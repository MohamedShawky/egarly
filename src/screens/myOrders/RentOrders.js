import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { AppList, AppText, AppView , AppNavigation} from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";
import Segmented from "./Segmented";
import ProductOrderCard from "./ProductOrderCard";

class Favorite extends Component {
  state = {
    data: [
      { id: 11, text: I18n.t("on-rent") },

      { id: 1, text: I18n.t("order-closed") },
      { id: 10, text: I18n.t("order-finished") }
    ],
    selectedValue: 11
  };

  onChange = val => {
    this.setState({
      selectedValue: val
    });
  };

  render() {
    let strQuery = `status_id=${this.state.selectedValue}`;
    if (this.state.selectedValue === 10) {
       strQuery = `statuses=${this.state.selectedValue},12`;
    }
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
          refreshControl={this.props.rentedOrder}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}orders?${strQuery}&leased=1`,

            responseResolver: response => {
              console.log(
                "**** _________leased_______________ submitted_orders",
                response.data
              );

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

const mapStateToProps = state => ({
  rentedOrder: state.list
});

export default connect(mapStateToProps, null)(Favorite);
