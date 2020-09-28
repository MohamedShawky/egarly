import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import {
  AppList,
  AppText,
  AppView,
  AppNavigation,
  AppButton,
  showInfo,
} from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";
import Segmented from "./Segmented";
import ProductOrderCard from "./ProductOrderCard";
import moment from "moment";

class Favorite extends Component {
  state = {
    data: [
      { id: 11, text: I18n.t("on-rent") },
      { id: 1, text: I18n.t("order-closed") },

      { id: 10, text: I18n.t("order-finished") },
      // { id: 4, text: I18n.t("refused") }
    ],
    selectedValue: 11,
  };

  onChange = (val) => {
    this.setState({
      selectedValue: val,
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
          refreshControl={this.props.myOrderRent}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}orders?${strQuery}&rented=1`,

            responseResolver: (response) => {
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
          rowRenderer={(item) => {
            return (
              <ProductOrderCard
                backgroundColor="transparent"
                data={item}
                stretch
                timer={this.state.selectedValue === 1}
                leftItem={
                  this.state.selectedValue === 11 && (
                    <AppView flex centerY left stretch>
                      <AppButton
                        title={
                          this.props.rtl
                            ? item.order.status.ar_name
                            : item.order.status.en_name
                        }
                      />
                    </AppView>
                  )
                }
                onPress={() => {
                  // if (this.state.selectedValue === 11)
                  AppNavigation.navigateToOrderStatus(
                    item.order.status.id,
                    item.order.id,
                    false
                  );
                }}
              />
            );
          }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  myOrderRent: state.list,
  rtl: state.lang.rtl,
});

export default connect(
  mapStateToProps,
  null
)(Favorite);
