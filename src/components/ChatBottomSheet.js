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

class ChatBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [
        {
          title: "ارسال صوره",
          id: 1,
          iconName: "camera-off",
          iconType: "feather",
        },
        {
          title: "التقاط صوره",
          id: 2,
          iconName: "camera-off",
          iconType: "feather",
        },
        {
          title: "ارسال رساله صوتيه",
          id: 3,
          iconName: "keyboard-voice",
          iconType: "material",
        },

        {
          title: "ارسال رابط",
          id: 4,
          iconName: "attachment",
          iconType: "material",
        },
        {
          title: "ارسال مكان",
          id: 5,
          iconName: "location-pin",
          iconType: "entypo",
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
    const { initialValue, rest, data } = this.props;

    return (
      <AppView stretch flex>
        <AppView flex stretch>
          <SelectionOptionsGroup
            {...rest}
            horizontal
            onSelect={(value, text) => {
            //   const data = this.state.data.filter((v) => v.id === value);
              this.onSubmit(value);
            }}
            initialValue={initialValue}
          >
            {this.state.data &&
              this.state.data.map((item, index) => (
                <OptionButton
                  buttonBold={false}
                  text={item.title}
                  value={item.id}
                  key={index}
                  icon
                  // 0.28.0
                  iconType={item.iconType}
                  iconName={item.iconName}

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
        height={50}
        borderTopLeftRadius={10}
        borderTopRightRadius={10}
      >
        <AppView
          height={8}
          row
          stretch
          paddingHorizontal={5}
          style={cardShadowStyle}
          bottomSelf
        >
          <AppView stretch flex />
          <AppButton
            transparent
            leftIcon={<AppIcon name="close" type="ant" />}
            center
            left
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

export default ChatBottomSheet;
