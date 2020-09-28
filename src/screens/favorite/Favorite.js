import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { AppList, AppText, AppView } from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import CustomBottomTabs from "../Home/CustomBottomTabs";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";

class Favorite extends Component {
  render() {
    return (
      <AppView stretch flex centerX paddingBottom={20}>
        <CustomBottomTabs componentId={this.props.componentId} />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  favorite: state.list
});

export default connect(
  mapStateToProps,
  null
)(Favorite);
