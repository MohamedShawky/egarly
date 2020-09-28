import React, { Component } from 'react';
import { Keyboard, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import {
  AppView,
  AppIcon,
  AppButton,
  AppInput,
  AppRadioButton,
  AppRadioGroup,
  AppText,
  AppNavigation,
} from '../../common';
import AppPickerHeader from './AppPickerHeader';

class RenderItem extends Component {
  renderPickerData = () => (
    <AppView
      stretch
      borderBottomColor="grey"
      borderBottomWidth={0.5}
      backgroundColor="#F2F2F2"
      row
      paddingHorizontal={10}
    >
      <AppView
        bc={this.props.selected ? 'primary' : '#ACB5BB'}
        bw={2}
        circle
        circleRadius={6}
        center
        onPress={() => {
          this.props.onSelect(this.props.item);
          AppNavigation.pop(this.props.componentId);
        }}
      >
        {this.props.selected ? (
          <AppView circle circleRadius={3} backgroundColor="primary" />
        ) : null}
      </AppView>
      <AppButton
        center={false}
        title={this.props.item.label}
        stretch
        onPress={() => {
          console.log('props', this.props.item);

          this.props.onSelect(this.props.item);
          AppNavigation.pop(this.props.componentId);
        }}
        flex
        backgroundColor="transparent"
        height={7}
        color="#6A6A6A"
        size={5.5}
        bold
      />
    </AppView>
  );

  renderPickerAddress = () => (
    <AppView
      stretch
      borderBottomColor="grey"
      borderBottomWidth={0.5}
      backgroundColor="white"
      row
      paddingHorizontal={5.5}
    >
      <AppButton
        center={false}
        paddingVertical={3.5}
        stretch
        flex
        backgroundColor="transparent"
        onPress={() => {
          this.props.onSelect(this.props.item);
          // this.props.dataSet(this.props.data);
          AppNavigation.pop(this.props.componentId);
        }}
        paddingHorizontal={3}
      >
        <AppView stretch>
          <AppText size={5.5} color="#6A6A6A" bold>
            {this.props.item.alias}
          </AppText>

          <AppText color="#7D7D7D">{this.props.item.label} </AppText>
        </AppView>
      </AppButton>
      {this.props.selected ? (
        <AppView backgroundColor="primary" circleRadius={8} center>
          <AppIcon name="check" type="entypo" color="white" />
        </AppView>
      ) : null}
    </AppView>
  );

  render() {
    return (
      <>
        {this.props.address
          ? this.renderPickerAddress()
          : this.renderPickerData()}
      </>
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
)(RenderItem);
