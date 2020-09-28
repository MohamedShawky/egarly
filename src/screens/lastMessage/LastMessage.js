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

import { AppHeader } from "../../components";
import CustomBottomTabs from "../Home/CustomBottomTabs";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import LastMessageCard from "./LastMessageCard";
import store from "../../store";
import { SET_TOTAL_COUNTER } from "../../actions/types";
import { Navigation } from "react-native-navigation";

class LastMessage extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    Navigation.events().bindComponent(this);
    this.state = {
      visable: false,
    };
  }

  componentDidAppear() {
    this.setState({
      visable: true,
    });
  }

  componentDidDisappear() {
    this.setState({
      visable: false,
    });
  }

  render() {
    return (
      <AppView stretch flex centerX paddingBottom={20}>
        <AppHeader title={I18n.t("last-message")} hideBack />
        {this.state.visable && (
          <AppList
            flatlist
            noResultsComponent={
              <AppView flex stretch center>
                <AppText> No Data </AppText>
              </AppView>
            }
            stretch
            flex
            paddingTop={5}
            paddingBottom={30}
            backgroundColor="white"
            // http://ejarly.api-ksa.com/api/notification/logs
            apiRequest={{
              url: `${API_ENDPOINT_GATEWAY}unread_messages`,

              responseResolver: (response) => {
                console.log("**** unread_messages", response);

                store.dispatch({
                  type: SET_TOTAL_COUNTER,
                  payload: response.data.total_message,
                });
                return {
                  data: response.data.messages,
                  pageCount: response.data.pageCount,
                };
              },
              onError: (error) => {
                console.log("erro", error.response);

                return I18n.t("ui-error-happened");
              },
            }}
            rowRenderer={(item) => {
              return <LastMessageCard backgroundColor="#fff" data={item} />;
            }}
          />
        )}
        <CustomBottomTabs
          componentId={this.props.componentId}
          onPress={() => {
            this.bottomSheetRef.current.show();
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
)(LastMessage);
