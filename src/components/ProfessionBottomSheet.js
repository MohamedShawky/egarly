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
import { date } from "yup";

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
    };
  }

  onSubmit = (value) => {
    if (this.props.onConfirm) this.props.onConfirm(value);
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
    const { initialValue, profession, rest } = this.props;
    let { data } = this.state;
    if (this.props.profession) {
      data = this.state.profession;
    }
    if (this.props.data) data = this.props.data;

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
              initialValue={initialValue}
              onSelect={(value) => {
                // if (this.props.onConfirm) this.props.onConfirm(value);

                this.props.handleChange("job_id")(value);
                if (this.props.onConfirm) {
                  const merchant = data.filter((id) => id.id === value);
                  this.props.onConfirm(merchant);
                }
              }}
              multi={false}
            >
              {data &&
                data.map((item, index) => {
                  return (
                    <CategeoryCard
                      value={item.id}
                      key={index}
                      data={item}
                      onPress={() => {}}
                    />
                  );
                })}
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
        borderTopRightRadius={7}
        borderTopLeftRadius={7}
      >
        <AppView
          height={8}
          row
          stretch
          paddingHorizontal={5}
          elevation={1.2}
          style={cardShadowStyle}
          // marginBottom={10}
        >
          <AppView flex center>
            <AppText>{I18n.t("select-job")}</AppText>
          </AppView>
          <AppButton
            transparent
            leftIcon={
              <AppIcon name="check" type="ant" color="green" size={12} />
            }
            center
            left
            onPress={() => {
              this.hide();
            }}
          />
        </AppView>
        <AppView stretch center marginVertical={5}>
          <AppView width={65} center>
            <AppText center>{I18n.t("select-job-hint")}</AppText>
          </AppView>
        </AppView>
        {this.state.mount && <>{this.renderFilterItems()}</>}
      </BottomSheet>
    );
  }
}

export default CategeoryBottomShet;
