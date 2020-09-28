import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { AppList, AppView } from '../../common';
import {
  AppHeader,
  ProviderCard,
  NoInternet,
  EmptyContentList,
} from '../../components';

import { API_ENDPOINT_HOME_SERVICE } from '../../utils/Config';

class BlockList extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  renderProvidersBlockList = () => {
    const clientId = this.props.currentUSer.user.id;
    return (
      <AppList
        idPathInData="id"
        flatlist
        refreshControl={this.props.blockList}
        ref={this.refList}
        apiRequest={{
          url: `${API_ENDPOINT_HOME_SERVICE}clients/${clientId}/blocked-providers`,

          responseResolver: response => {
            this.setState({
              data: response.data.data,
            });

            console.log('resss', response.data.data);

            return {
              data: response.data.data,
              pageCount: response.data.pageCount,
            };
          },

          onError: error => {
            console.log(JSON.parse(JSON.stringify(error)));
            return I18n.t('ui-error-happened');
          },
        }}
        // height={21}
        rowRenderer={data => (
          // <AppView elevation={0.5} marginTop={8} marginHorizontal={8}>
          <ProviderCard
            backgroundColor="white"
            elevation={0.5}
            marginTop={8}
            marginHorizontal={8}
            data={data}
            height={17}
            blockList
          />
          // </AppView>
        )}
        noResultsComponent={
          <EmptyContentList
            componentId={this.props.componentId}
            result={I18n.t('no-blocked-providers')}
          />
        }
      />
    );
  };

  render() {
    return (
      <AppView stretch flex backgroundColor="bg">
        <AppView stretch marginBottom={1}>
          <AppHeader title={I18n.t('block-list')} />
        </AppView>
        {this.props.isConnected ? (
          this.renderProvidersBlockList()
        ) : (
          <NoInternet />
        )}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUSer: state.auth.currentUser,
  isConnected: state.network.isConnected,
  blockList: state.list.blockList,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlockList);
