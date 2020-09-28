import React, { Component } from "react";

import I18n from "react-native-i18n";
import { connect } from "react-redux";
import {
  AppList,
  AppText,
  AppView,
  AppButton,
  showSuccess,
  AppNavigation,
} from "../../common";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import OfferRentCard from "../../components/home/OfferRentCard";
import { barHeight } from "../../components/CustomBottomTabs";
import { AppHeader } from "../../components";
import Axios from "axios";

class Favorite extends Component {
  state = {
    isLoading: false,
    data: [],
  };
  onSubmit = async() => {
    console.log("is share ==>>");
    
    this.setState({
      isLoading: true,
    });
    try {
      const res =await Axios.post(`${API_ENDPOINT_GATEWAY}share/to/friend`, {
        email: "shawkymohamed138@gmail.com",
      });
      console.log("res",res);
      
      this.setState({
        isLoading: false,
      });
      showSuccess(res.data.message);
      AppNavigation.pop();
    } catch (error) {
      console.log("error", error);
    }
  };
  render() {
    return (
      <AppView stretch flex paddingBottom={20} width={100}>
        <AppHeader title={"قائمه المشاركه"} />
        <AppList
          flatlist
          columns={2}
          paddingTop={10}
          style={{
            width: "100%",
            paddingVertical: "5%",
          }}
          contentContainerStyle={{
            // alignItems: "center",
            flexWrap: "wrap",
            paddingBottom: "10%",
          }}
          refreshControl={this.props.share}
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}share/list`,

            responseResolver: (response) => {
              console.log("**** ________________________", response);

              this.setState({
                data: response.data,
              });
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
          rowRenderer={(data) => (
            <OfferRentCard
              backgroundColor="transparent"
              item={data.product}
              stretch
              shareList
            />
          )}
        />
        {this.state.data.length > 0 && (
          <AppButton
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
            title={I18n.t("shareNow")}
            stretch
            marginBottom={5}
            marginHorizontal={7}
            processing={this.state.isLoading}
            onPress={() => {
              this.onSubmit();
            }}
          />
        )}
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  share: state.list,
});

export default connect(mapStateToProps, null)(Favorite);
