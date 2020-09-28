import React, { Component } from 'react';
import { AppView, AppText, AppIcon } from '../../../common';
import I18n from 'react-native-i18n';

export default class SortRender extends Component {

  show = () => {
    this.props.filterBottomSheetRef.current.show();
  };

  render() {
    return (

      <AppView
        backgroundColor={this.props.sorted ? 'primary' : '#FFF'}
        stretch
        elevation={2}
        center
        row
        paddingHorizontal={2}
        borderRadius={5}
        borderWidth={0.5}
        borderColor="#F2F2F2"
        onPress={() => {
          this.show();
        }}
        paddingVertical={2}
      >
        <AppIcon
          name="Sort"
          type="custom"
          size={9}
          marginRight={2}
          color={!!this.props.sorted ? 'white' : "#0C0C0C"}
        />
        <AppView row>
          <AppText row bold color={!!this.props.sorted ? 'white' : "#0C0C0C"}>
            {I18n.t('ordered')}
          </AppText>
          {!!this.props.sorted && (
            <AppText color="white"> : {this.props.sorted}</AppText>
          )}
        </AppView >
      </AppView>
    )
  }
}