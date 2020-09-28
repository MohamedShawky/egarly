import React, { Component } from "react";
import { AppView, AppIcon, AppText, AppNavigation } from "../../../common";
import I18n from "react-native-i18n";

export default class FilterRender extends Component {
  state = {
    isVisible: false,
    reset: false,
    job: ""
  };
  onChange = job => {
    this.setState({
      job
    });
  };
  toggleModal = isVisible => {
    this.setState({
      isVisible
    });
  };

  show = () => {
    this.props.filterBottomSheetRef.current.show();
  };
  // )
  render() {
    return (
      <AppView
        borderColor={this.props.filteredValue.length > 0  ? "primary" :  "#D8D8D8"} 
        backgroundColor={this.props.filteredValue.length > 0  ? "primary" :  "#FFF"} 
        borderWidth={0.5}
        stretch
        center
        row
        elevation={2}
        paddingHorizontal={2}
        marginHorizontal={5}
        borderRadius={5}
        onPress={() => {
          this.show();
        }}
        paddingVertical={2}
      >
        <AppIcon
          name="Filter"
          type="custom"
          size={9}
          marginRight={2}
          color={this.props.filteredValue.length > 0 ?'white' : "#0C0C0C"}
        />
        <AppText row bold color={this.props.filteredValue.length === 0 ? "#0C0C0C" :  'white'}>
          {I18n.t('filter')}
          {this.props.filteredValue.length > 0  && (
            <AppText color="white"> ( {this.props.filteredValue.length} )</AppText>
          )}
        </AppText>
      </AppView>
    );
  }
}
