import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton
} from "../../../common";
import { OptionButton, BottomSheet } from "../..";

class FilterBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [
        {
          title: I18n.t("provide_preview_service"),
          searchValue: "PreViewService",
          index: 1
        },
        {
          title: I18n.t("provide_hourly_service"),
          searchValue: "HourlyService",
          index: 2
        }
      ]
    };
    this.value = this.props.initialValue
  }

  onSubmit = () => {
    this.props.onConfirm(this.value);
    this.hide();
  };

  show = () => {
    this.bottomSheetRef.current.show();
    this.setState({
      mount: true
    });
  };

  hide = () => {
    this.bottomSheetRef.current.hide();
    this.setState({
      mount: false
    });
  };

  renderFilterItems = () => {
    const { initialValue, rest } = this.props;

    return (
      <AppView stretch height={15} flex>
        <AppView flex stretch>
          <SelectionOptionsGroup
            {...rest}
            horizontal
            multi
            onSelect={(value, text) => {
              this.value = value
            }}
            initialValue={initialValue}
          >
            {this.state.data &&
              this.state.data.map((item, index) => (
                <OptionButton
                  buttonBold={false}
                  text={item.title}
                  name="buy"
                  searchValue={item.searchValue}
                  value={item.index}
                  key={index}
                  checkBox
                />
              ))}
          </SelectionOptionsGroup>
        </AppView>
      </AppView>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={33}
      >
        {this.state.mount && (
          <>
            <AppView
              stretch
              paddingHorizontal={12}
              borderBottomColor="#D8D8D8"
              borderBottomWidth={0.3}
              height={6}
              centerY
            >
              <AppText size={6} bold>
                {I18n.t("filter")}
              </AppText>
            </AppView> 
            {this.renderFilterItems()}
            <AppButton
              touchableOpacity
              title={I18n.t("apply")}
              noBorder
              stretch
              margin={9}
              style={{
                borderRadius:6,
              }}
              onPress={() => {
                this.onSubmit()
              }}
            />
          </>
        )}
      </BottomSheet>
    );
  }
}


export default FilterBottomSheet;

