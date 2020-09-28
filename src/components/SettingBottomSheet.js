import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton,
} from "../common";
import { OptionButton, BottomSheet } from ".";

class FilterBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    console.log("props.is_active",props.is_active);
    
    this.state = {
      mount: false,
      data: [
        {
          title:
            props.is_active === 1
              ? I18n.t("hide-product")
              : I18n.t("show-product"),
          searchValue: "PreViewService",
          index: 0,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 1,
          iconName: "trash",
          iconType: "feather",
        },
        // {
        //   title: I18n.t("adv-product"),
        //   searchValue: "HourlyService",
        //   index: 2,
        //   iconName: "trash",
        //   iconType: "feather"
        // },
      ],
    };
  }

  onSubmit = (value) => {
    this.props.onConfirm(value);
    this.hide();
  };

  show = () => {
    this.bottomSheetRef.current.show();
    this.setState({
      mount: true,
    });
  };

  hide = () => {
    this.bottomSheetRef.current.hide();
    this.setState({
      mount: false,
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
            onSelect={(value, text) => {
              this.onSubmit(value);
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
                  icon
                  iconName={item.iconName}
                  iconType={item.iconType}
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
              center
              height={10}
              borderTopLeftRadius={7}
              borderTopRightRadius={7}
            >
              <AppView stretch center>
                <AppText size={6} bold>
                  {I18n.t("setting-product")}
                </AppText>
              </AppView>
            </AppView>
            {this.renderFilterItems()}
          </>
        )}
      </BottomSheet>
    );
  }
}

export default FilterBottomSheet;
