import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { AppList, AppText, AppView } from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";
import OrderCard from "./OrderCard";

class Favorite extends Component {
  render() {
    return (
      <AppView stretch flex centerX paddingBottom={20} width={100}>
        {/* <AppView height={3} stretch backgroundColor="transparent " /> */}
        <AppList
          flatlist
          data={this.props.data}
          staticData
          paddingTop={10}
          refreshControl={this.props.favorite}
          noResultsComponent={
            <AppView flex stretch center>
              <AppText> No Data </AppText>
            </AppView>
          }
          stretch
          rowRenderer={(item) => <OrderCard data={item} />}
        />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  favorite: state.list,
});

export default connect(
  mapStateToProps,
  null
)(Favorite);
