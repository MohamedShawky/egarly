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
      <AppView stretch flex paddingBottom={20} width={100}>
        {/* <AppView height={3} stretch backgroundColor="transparent " /> */}
        <AppList
          flatlist
          columns={2}
          data={this.props.data}
          staticData
          paddingTop={10}
          style={{
            // width: "100%",
            paddingVertical: "5%",

           paddingLeft:7,
            flexDirection: this.props.rtl ? "row-reverse" : "row",
            flexWrap: "wrap",
          }}
          contentContainerStyle={{
            // alignItems: "center",
            paddingBottom: "10%",
          }}
          refreshControl={this.props.favorite}
          noResultsComponent={
            <AppView flex stretch center>
              <AppText> No Data </AppText>
            </AppView>
          }
          stretch
          rowRenderer={(item) => (
            <OfferRentCard
              backgroundColor="transparent"
              item={item}
              stretch
              // favorite
            />
          )}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  favorite: state.list,
  rtl: state.lang.rtl,
});

export default connect(
  mapStateToProps,
  null
)(Favorite);
