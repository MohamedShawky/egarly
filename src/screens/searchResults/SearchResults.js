import React, { Component } from "react";
import { Keyboard, FlatList, SafeAreaView, Platform } from "react-native";
import { connect } from "react-redux";

import { Navigation } from "react-native-navigation";
import I18n from "react-native-i18n";
import Axios from "axios";
import {
  AppView,
  AppIcon,
  AppButton,
  AppInput,
  AppText,
  AppList,
  AppNavigation,
  AppPicker
} from "../../common";
import { SearchResults, SearchHeader, AppHeader } from "../../components";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";

class SearchResult extends Component {
  render() {
    return (
      <AppView flex stretch backgroundColor="#EBEBEB">
        <AppHeader title="نتائج البحث" />
        <AppList
          flatlist
          columns={2}
          style={{
            width: "100%",
            paddingTop: "5%"
          }}
          data={this.props.data}
          rowRenderer={data => (
            <OfferRentCard
              backgroundColor="transparent"
              item={data}
              width={45}
            />
          )}
          staticData
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  userData: state.auth.currentUser
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult);
