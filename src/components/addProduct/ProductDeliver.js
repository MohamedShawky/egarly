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
    console.log("props.data", props.data);

    this.state = {
      mount: false,
      data:
        props.data && props.data.length
          ? props.data
          : [
              {
                id: 1,
                en_name: "استلام من مكان محدد",
                ar_name: "استلام من مكان محدد",
              },
              {
                id: 2,

                en_name: "توصيل مجاني للمستاجر",
                ar_name: "توصيل مجاني للمستاجر",
              },
            ],
    };
  }

  onSubmit = (value) => {
    this.confirm(value);
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
            // {...rest}
            horizontal
            onSelect={(value, text) => {
              const status = this.state.data.filter((i) => i.id === value);

              if (this.props.onChange) {
                const merchant = value.map((id) =>
                this.state.data.find((item) => item.id === id)
                );
                this.props.onChange(merchant);
              }
              this.props.handleChange("delivery_type")(value);
            }}
            initialValue={this.props. initialValue}

            multi={true}
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

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={35}
      >
        {this.state.mount && (
          <>
            <AppView stretch paddingHorizontal={12} center height={10}>
              <AppView stretch spaceBetween row>
                <AppText size={6} bold>
                  {I18n.t("case-product")}
                </AppText>
                <AppButton
                  noPadding
                  transparent
                  leftIcon={
                    <AppIcon name="check" type="ant" color="green" size={11} />
                  }
                  center
                  left
                  onPress={() => {
                    this.hide();
                  }}
                />
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
