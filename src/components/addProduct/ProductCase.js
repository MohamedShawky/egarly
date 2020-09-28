import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton,
} from "../../common";
import { OptionButton, BottomSheet } from "../";

class FilterBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: props.data
        ? props.data
        : [
            {
              id: 1,
              en_name: " new",
              ar_name: "جديد",
            },
            {
              id: 2,

              en_name: "Exellent",
              ar_name: "ممتاز",
            },
            {
              id: 3,
              en_name: "Very Good",
              ar_name: "جيد جدا",
            },
            {
              id: 4,
              en_name: "Good",
              ar_name: "جيد",
            },
            {
              id: 5,
              en_name: "nice",
              ar_name: "لا بآس",
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
    const { initialValue, rest } = this.props;
    console.log("initialValue", initialValue);

    return (
      <AppView stretch height={15} flex>
        <AppView flex stretch>
          <SelectionOptionsGroup
            {...rest}
            horizontal
            onSelect={(value, text) => {
              const status = this.state.data.filter((i) => i.id === value);
              console.log("statues", status);

              this.onSubmit(status[0]);
            }}
            initialValue={this.props.initialValue}
            multi={this.props.data}
          >
            {this.state.data &&
              this.state.data.map((item, index) => (
                <OptionButton
                  buttonBold={false}
                  text={item}
                  value={item.id}
                  key={index}
                  search
                  iconName={item.iconName}
                  case
                />
              ))}
          </SelectionOptionsGroup>
        </AppView>
      </AppView>
    );
  };

  renderTitle = () => {
    return (
      <AppView stretch paddingHorizontal={12} center height={10}>
        <AppView stretch spaceBetween row>
          <AppText size={6} bold>
            {I18n.t("case-product")}
          </AppText>
          <AppButton
            transparent
            leftIcon={
              <AppIcon name="check" type="ant" color="green" size={11} />
            }
            center
            left
            noPadding
            onPress={() => {
              this.hide();
            }}
          />
        </AppView>
      </AppView>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={this.props.data ? 35 : 48}
      >
        {this.state.mount && (
          <>
            {this.props.data ? (
              this.renderTitle()
            ) : (
              <AppView stretch paddingHorizontal={12} center height={10}>
                <AppView stretch center>
                  <AppText size={6} bold>
                    {I18n.t("case-product")}
                  </AppText>
                </AppView>
              </AppView>
            )}
            {this.renderFilterItems()}
          </>
        )}
      </BottomSheet>
    );
  }
}

export default FilterBottomSheet;
