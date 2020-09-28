import React, { Component } from "react";

import { SelectionOptionsGroup, AppView, AppButton } from "../../common";
import { OptionButton } from "../../components";
import { HEADER_ELEVATION } from "../../common/utils/Constants";
import cardShadowStyle from "../../common/utils/cardShadowStyle";

export default class Segmented extends Component {
  render() {
    return (
      <AppView
        stretch
        marginTop={5}
        // elevation={HEADER_ELEVATION}
        // style={cardShadowStyle}
        height={6}
        center
        paddingHorizontal={2}
      >
        <SelectionOptionsGroup
          wrabContent
          onSelect={val => {
            if (this.props.onChange) {
              this.props.onChange(val);
            }
          }}
          initialValue={this.props.selectedValue}
        >
          {this.props.data.map(i => (
            <OptionButton
              value={i.id}
              text={i.text}
              category
              spaceAround
              stretch
              flex
              number={this.props.data.length}
            />
          ))}
        </SelectionOptionsGroup>
      </AppView>
    );
  }
}
