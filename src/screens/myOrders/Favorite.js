import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { AppList, AppText, AppView } from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";

class Favorite extends Component {
  render() {
    return (
      <AppView stretch flex centerX paddingBottom={20} width={100}>
        <AppView height={3} stretch backgroundColor="transparent " />
        <AppList
          flatlist
          columns={2}
          paddingTop={10}
          style={{
            width: "100%",
            paddingVertical: "5%"
          }}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: "10%"
          }}
          refreshControl={this.props.favorite}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}wishlist`,

            responseResolver: response => {
              console.log("**** ________________________", response);

              return {
                data: response.data.wishlist,
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
            <OfferRentCard
              backgroundColor="transparent"
              item={item.products[0]}
              stretch
              favorite
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
