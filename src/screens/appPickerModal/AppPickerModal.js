import React, { Component } from 'react';
import { Keyboard, FlatList } from 'react-native';
import { connect } from 'react-redux';

import I18n from 'react-native-i18n';
import {
  AppView,
  AppIcon,
  AppButton,
  AppInput,
  AppText,
  AppNavigation,
} from '../../common';
import RenderItem from './RenderItem';
import { AppHeader } from '../../components';

class AppPickerModal extends Component {
  componentDidMount() {
    console.log('data -->>', this.props.data);
  }

  state = {
    searchText: '',
    data: this.props.data,
  };

  renderPickerData = () => (
    <FlatList
      style={{
        alignSelf: 'stretch',
      }}
      data={this.state.data}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => (
        <RenderItem
          selected={
            this.props.addresses
              ? item.label === this.props.label &&
                item.value === this.props.value
              : item.label === this.props.label
          }
          item={item}
          onSelect={this.props.onSelect}
          // dataSet={this.props.newSet}
          componentId={this.props.componentId}
          address={this.props.addresses}
          data={this.state.data}
        />
      )}
    />
  );

  setData = value => {
    const transformData = {
      value: value.area,
      label: value.description,
      alias: value.alias,
      ...value,
    };
    const newData = [...this.state.data, transformData];
    this.setState({
      data: newData,
    });
  };

  addItem = newItem => {
    let newData = this.state.data.filter(item => item.value != newItem.value);
    newData = [newItem, ...newData];
    this.setState({
      data: newData,
    });

    if (this.props.newSet) {
      this.props.newSet(newData);
    }
  };

  renderSearchInput = () => {
    const {} = this.props;
    return (
      <AppView
        stretch
        paddingHorizontal={5}
        paddingTop={6}
        borderBottomWidth={0.1}
        elevation={2}
      >
        <AppInput
          size={6}
          picker
          stretch
          noValidation
          initialValue={this.state.searchText}
          onChange={text => {
            const filterData = this.props.data.filter(item =>
              item.label.toLowerCase().includes(text.toString().toLowerCase()),
            );

            this.setState({
              searchText: text,
              data: filterData,
            });
          }}
          label={this.props.searchTitle}
          leftItems={[
            <AppIcon  type="custom" name="search" color="#B0B0B0" size={8} />,
          ]}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          borderRadius={5}
          height={7}
          paddingHorizontal={5}
          backgroundColor="#EEEEEE"
        />
      </AppView>
    );
  };

  renderNoResulte = () => (
    <AppView stretch center flex>
      <AppText bold>{I18n.t('ui-noResultsFound')}</AppText>
    </AppView>
  );

  refresh = () => {};

  render() {
    const { title, hideSearch } = this.props;

    return (
      <AppView flex stretch>
        <AppHeader title={title} />
        {!hideSearch && this.renderSearchInput()}
        {this.props.addresses && (
          <AppView
            stretch
            backgroundColor="#F7F7F7"
            paddingVertical={5}
            paddingHorizontal={7}
          >
            <AppText> {I18n.t('location-problem')} </AppText>
          </AppView>
        )}
        {this.state.data.length === 0
          ? this.renderNoResulte()
          : this.renderPickerData()}
        {this.props.addresses && !this.props.orderBid && (
          <AppButton
            title={I18n.t('add-new-addresses')}
            absolute
            bottom
            left
            right
            stretch
            noBorder
            onPress={() => {
              AppNavigation.push({
                name: 'createAddressFromOrder',
                passProps: {
                  addItem: this.addItem,
                },
              });
            }}
          />
        )}
        {this.props.addresses && this.props.orderBid && (
          <AppButton
            title={I18n.t('add-new-addresses')}
            absolute
            bottom
            left
            right
            stretch
            noBorder
            onPress={() => {
              AppNavigation.push({
                name: 'createAddressFromOrderBid',
                passProps: {
                  addItem: this.addItem,
                  selectedProvider: this.props.selectedProvider,
                },
              });
            }}
          />
        )}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppPickerModal);
