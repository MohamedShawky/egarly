import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppIcon,
  AppButton
} from "../common";
import { OptionButton, BottomSheet } from ".";
import cardShadowStyle from "../common/utils/cardShadowStyle";

class ProductStatus extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [
        {
          id: 1,
          name: I18n.t("new")
        },
        {
          id: 2,
          name: I18n.t("exellent")
        },
        {
          id: 3,
          name: I18n.t("v-good")
        },
        {
          id: 4,
          name: I18n.t("good")
        },
        {
          id: 5,
          name: I18n.t("not-bad")
        }
      ]
    };
  }

  onSubmit = value => {
    this.props.onConfirm(value);
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
      <AppView stretch flex>
        <AppView flex stretch>
          <SelectionOptionsGroup
            {...rest}
            horizontal
            onSelect={(value, text) => {
              const status = this.state.data.filter(i => i.id === value);
              console.log("statues", status);
              

              //   this.onSubmit(status);
            }}
            initialValue={initialValue}
          >
            {this.state.data &&
              this.state.data.map((item, index) => (
                <OptionButton
                  buttonBold={false}
                  text={item.name}
                  value={item.id}
                  key={index}
                  icon
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
        {this.state.mount && (
          <>
            <AppView
              stretch
              paddingHorizontal={12}
              center
              height={8}
              elevation={1.2}
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              style={cardShadowStyle}
            >
              <AppView stretch center>
                <AppText size={6} bold>
                  {I18n.t("product-status")}
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

export default ProductStatus;
