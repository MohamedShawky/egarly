import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import {
  AppView,
  AppText,
  SelectionOptionsGroup,
  AppButton,
} from '../../../common';
import { OptionButton, BottomSheet } from '../..';

class OrdersFilterBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      //  ["PENDING", "ACCEPTED", "ARRIVED", "ON_THE_WAY", "IN_PROGRESS", "FINISHED_WORK"]
      data: props.data,
    };
    this.value = this.props.initialValue;
  }

  onSubmit = choosen => {
    this.props.onConfirm(choosen ? this.value.filter(x => x != 0) : [0]);
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
            multi
            onSelect={(value, text) => {
              this.value = value;
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
        height={this.props.closeOrders ? 43 : 60}
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
                {I18n.t('choose_order_status')}
              </AppText>
            </AppView>
            {this.renderFilterItems()}
            <AppView stretch center>
              <AppView row spaceBetween style={{ width: "88%" }} marginVertical={6} >
                <AppButton
                  touchableOpacity
                  title={I18n.t('apply')}
                  noBorder
                  borderWidth={1}
                  borderColor="primary"
                  style={{
                    borderRadius: 6,
                    width: "46%",
                  }}
                  onPress={() => {
                      this.onSubmit(!(this.value.length == 0 || (this.value.length == 1 && this.value[0] == 0)))
                  }}
                />
                <AppButton
                  touchableOpacity
                  title={I18n.t('show_all')}
                  stretch
                  backgroundColor="#FFF"
                  color="primary"
                  borderWidth={1}
                  borderColor="primary"
                  style={{
                    borderRadius: 6,
                    width: "46%",
                  }}
                  onPress={() => {
                    this.onSubmit(false);
                  }}
                />
              </AppView>
            </AppView>
          </>
        )}
      </BottomSheet>
    );
  }
}

export default OrdersFilterBottomSheet;
