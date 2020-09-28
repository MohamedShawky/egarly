import React, { Component } from "react";

import { AppView, AppText, AppList, AppNavigation } from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";

import I18n from "react-native-i18n";
import OfferRentCard from "../../components/home/OfferRentCard";
import { connect } from "react-redux";

 class MyProduct extends Component {
  render() {
    return (
      <AppView stretch flex>
        <AppList
          flatlist
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}products`,

            responseResolver: (response) => {
              console.log("resss", response.data);

              return {
                data: response.data.data,
                pageCount: response.data.pageCount,
              };
            },

            onError: (error) => {
              console.log(JSON.parse(JSON.stringify(error)));
              return I18n.t("ui-error-happened");
            },
          }}
          columns={2}
          style={{
            width: "100%",
            paddingTop: "5%",
          }}
          rowRenderer={(item) => {
            return (
              <OfferRentCard
                item={item}
                onPress={() => {
                  AppNavigation.push({
                    name: "updateProduct",
                    passProps: {
                      data: item,
                    },
                  });
                }}
              />
            );
          }}
          noResultsComponent={
            <AppView stretch marginTop={30} centerX>
              <AppText>{I18n.t("ui-noResultsFound")}</AppText>
            </AppView>
          }
          refreshControl={this.props.myProductList}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  myProductList:state.list
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProduct);