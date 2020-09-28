import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton,
  AppScrollView,
} from "../common";
import { OptionButton, BottomSheet } from ".";
import CategeoryCard from "./CategeoryCard";
import cardShadowStyle from "../common/utils/cardShadowStyle";

class CategeoryBottomShet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [
        {
          title: I18n.t("hide-product"),
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
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 2,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 3,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 4,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 5,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 6,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 7,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 8,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 9,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 10,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 11,
          iconName: "trash",
          iconType: "feather",
        },
      ],
      profession: [
        {
          title: I18n.t("hide-product"),
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
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 2,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 3,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 4,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 5,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 6,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 7,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 8,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 9,
          iconName: "trash",
          iconType: "feather",
        },
        {
          title: I18n.t("hide-product"),
          searchValue: "PreViewService",
          index: 10,

          iconName: "eye-with-line",
          iconType: "entypo",
        },
        {
          title: I18n.t("delete-product"),
          searchValue: "HourlyService",
          index: 11,
          iconName: "trash",
          iconType: "feather",
        },
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
    const { initialValue, profession, rest, data } = this.props;

    return (
      <AppView stretch flex>
        <AppScrollView stretch flex paddingHorizontal={5}>
          <AppView
            flex
            stretch
            wrap
            centerX
            spaceAround
            row
            maringHorizontal={5}
          >
            <SelectionOptionsGroup
              {...rest}
              horizontal
              maxSelect={ !this.props.search ? 2 : false}
              
              onSelect={(value, text) => {
                // this.onSubmit(value);
                console.log("value", data);

                if (this.props.profession) {
                  console.log("value, text", value, text);
                  this.props.handleChange("profession")(value);
                } else {
                  this.props.handleChange("categories")(value);
                  if (this.props.onChange) {
                    const merchant = value.map((id) =>
                      data.find((item) => item.id === id)
                    );
                    this.props.onChange(merchant);
                  }
                }
              }}
              initialValue={this.props.profession ?this.props.values.profession : this.props.values.categories}
              multi={true}
            >
              {data &&
                data.map((item, index) => (
                  <CategeoryCard
                    value={item.id}
                    key={index}
                    data={item}
                    onPress={() => {}}
                  />
                ))}
            </SelectionOptionsGroup>
          </AppView>
        </AppScrollView>
      </AppView>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={80}
      >
        <AppView
          height={8}
          row
          stretch
          paddingHorizontal={5}
          elevation={1.2}
          style={cardShadowStyle}
          marginBottom={10}
        >
          <AppView flex center>
            {this.props.profession ? (
              <AppText>{I18n.t("select-job")}</AppText>
            ) : (
              <AppText>{I18n.t("select-categeroy")}</AppText>
            )}
          </AppView>
          <AppButton
            transparent
            leftIcon={<AppIcon name="check" type="ant" color="green" size={12}/>}
            center
            left
            noPadding
            onPress={() => {
              this.hide();
            }}
          />
        </AppView>
        {this.state.mount && <>{this.renderFilterItems()}</>}
      </BottomSheet>
    );
  }
}

export default CategeoryBottomShet;
