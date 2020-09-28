import React, { Component } from "react";

import { AppView, AppText, AppList } from "../../common";
import CustomBottomTabs from "../Home/CustomBottomTabs";
import { AppHeader } from "../../components";
import { connect } from "react-redux";
import Notification from "../../components/Notifications";
import I18n from "react-native-i18n";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";
import { Navigation } from "react-native-navigation";
import store from "../../store";
import { UNSEEN_NOTIFICATION_COUNT_SET } from "../../actions/types";

class Notifications extends Component {
  constructor(props) {
    super(props);
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
      <AppView stretch flex>
        <AppHeader title={I18n.t("order-notifications")} hideBack />
        <AppList
          flatlist
          noResultsComponent={
            <AppView flex stretch center>
              <AppText> No Data </AppText>
            </AppView>
          }
          stretch
          flex
          paddingBottom={30}
          backgroundColor="white"
          // http://ejarly.api-ksa.com/api/notification/logs
          apiRequest={{
            url: `${API_ENDPOINT_GATEWAY}notification/logs`,

            responseResolver: (response) => {
              console.log("**** notification", response);
              const notification = store.getState().notifications.unseenCount;
              console.log("notification ===>", notification);

              if (notification === 0) {
                console.log("notification ===>>>");

                store.dispatch({
                  type: UNSEEN_NOTIFICATION_COUNT_SET,
                  payload: response.data.unread_notifications,
                });
              }

              return {
                data: response.data.notifications.data,
                pageCount: response.data.notifications.last_page,
              };
            },
            onError: (error) => {
              console.log("erro", error);

              return I18n.t("ui-error-happened");
            },
          }}
          rowRenderer={(item) => {
            return <Notification backgroundColor="#fff" data={item} />;
          }}
          refreshControl={this.props.notificationRefresh}
        />
        <CustomBottomTabs componentId={this.props.componentId} />
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  notificationRefresh: state.list,
});
export default connect(
  mapStateToProps,
  null
)(Notifications);
