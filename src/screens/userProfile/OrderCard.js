import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { AppList, AppText, AppView } from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";
import moment from "moment";

class Favorite extends Component {
  render() {
    return (
      <AppView stretch flex elevation={2} marginBottom={5} height={10} paddingHorizontal={7} marginHorizontal={5} borderRadius={7} paddingBottom={2}>
        <AppView stretch row spaceBetween flex>
          <AppText bold>حاله الاوردر</AppText>
          <AppText color="primary">{this.props.data.status.ar_name}</AppText>
        </AppView>

        <AppText>{moment(this.props.data.created_at).fromNow()}</AppText>
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
