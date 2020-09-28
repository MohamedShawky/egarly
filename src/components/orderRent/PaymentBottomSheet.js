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

class PaymentBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [
        {
          id: 1,
          en_name: " new",
          ar_name: "محفظتي )( حسابي في ايجارلي",
        },
        {
          id: 2,

          en_name: "Exellent",
          ar_name: "نقدا",
        },
        {
          id: 3,
          en_name: "Very Good",
          ar_name: "قيزا",
        },
        {
          id: 4,
          en_name: "Good",
          ar_name: "ماستر",
        },
        {
          id: 5,
          en_name: "nice",
          ar_name: "مدي",
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

    return (
      <AppView stretch height={15} flex>
        <AppView flex stretch>
          <SelectionOptionsGroup
            {...rest}
            horizontal
            onSelect={(value, text) => {
                const status = this.state.data.filter((i) => i.id === value);


              this.onSubmit(status[0]);
            }}
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
        <AppButton
          stretch
          backgroundColor="primary"
          title={I18n.t("next")}
          onPress={() => this.hide()}
          marginBottom={5}
          marginHorizontal={7}
        />
      </AppView>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={55}
      >
        {this.state.mount && (
          <>
            <AppView stretch paddingHorizontal={12}  row height={10}>
              <AppView stretch center flex>
                <AppText size={6} bold>
                  {I18n.t("payment-method")}
                </AppText>
              </AppView>
              <AppIcon
                name="close"
                type="ant"
                onPress={() => {
                  this.hide();
                }}
              />
            </AppView>
            {this.renderFilterItems()}
          </>
        )}
      </BottomSheet>
    );
  }
}

export default PaymentBottomSheet;
