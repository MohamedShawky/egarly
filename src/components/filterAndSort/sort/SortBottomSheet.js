import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppText, SelectionOptionsGroup } from '../../../common';
import { BottomSheet, OptionButton } from '../..';

class SortBottomSheet extends Component {
  constructor(props) {
    super(props);
    this.bottomSheetRef = React.createRef();
    this.state = {
      mount: false,
      data: [
        {
          title: I18n.t('most-ordered'),
          searchValue: 'noOfRequests',
          index: 1,
        },
        {
          title: I18n.t('most-rate'),
          searchValue: 'rate',
          index: 2,
        },
      ],
    };
  }

  componentDidMount() {
    // this.fetchPriceSlider();
  }

  onSubmit = () => {
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
      <AppView stretch height={15}>
        <SelectionOptionsGroup
          {...rest}
          horizontal
          onSelect={(value, text) => {
            this.props.onConfirm(value, text);
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
                search
                hide={this.hide}
              />
            ))}
        </SelectionOptionsGroup>
      </AppView>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={this.bottomSheetRef}
        onLayout={this.props.onLayout && this.props.onLayout}
        height={23}
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
              <AppText size={6} bold>{I18n.t('order-by')}</AppText>
            </AppView>
            {this.renderFilterItems()}
          </>
        )}
      </BottomSheet>
    );
  }
}

export default SortBottomSheet;
