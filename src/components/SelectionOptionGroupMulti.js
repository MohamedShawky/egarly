import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { AppView, AppScrollView } from "../common";

class SelectionOptionsGroupMulti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: props.multi
        ? props.initialValue || []
        : props.initialValue || -1
    };
  }

  onReset = () => {
    this.setState({
      selectedValue: this.props.multi
        ? this.props.defaultValue || []
        : this.props.defaultValue || -1
    });
    this.props.onReset();
  };

  onSelect = (value, text, reset) => {
    if (this.props.multi) {
      const index = this.state.selectedValue.indexOf(value);

      let newValue;

      // choose All select it only and unselect other
      if (value === 0) {
        if (index === -1) {
          // add
          newValue = [value];
        } else {
          // remove
          newValue = [
            ...this.state.selectedValue.slice(0, index),
            ...this.state.selectedValue.slice(index + 1)
          ];
        }

        this.setState(prevState => ({
          selectedValue: newValue
        }));

        if (this.props.onSelect) {
          if (this.props.name)
            this.props.onSelect(this.props.name, newValue, reset);
          else this.props.onSelect(newValue);
        }
      }
      // choose any select expect All
      else {
        if (index === -1) {
          // add
          newValue = this.state.selectedValue.filter(value => value !== 0);

          newValue = [...newValue, value];
        } else {
          // remove
          newValue = [
            ...this.state.selectedValue.slice(0, index),
            ...this.state.selectedValue.slice(index + 1)
          ];
        }

        this.setState(prevState => ({
          selectedValue: newValue
        }));

        if (this.props.onSelect) {
          if (this.props.name) this.props.onSelect(this.props.name, newValue);
          else this.props.onSelect(newValue);
        }
      }
    } else {
      if (value === this.state.selectedValue) return;

      this.setState({
        selectedValue: value
      });

      if (this.props.name) this.props.onSelect(value, text);
      else if (this.props.onSelect) {
        this.props.onSelect(value, text);
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.reset !== nextProps.reset) {
      this.onReset();
      return null;
    }
  }

  render() {
    const {
      children,
      multi,
      horizontal,
      scrollable,
      wrabContent,
      paddingVertical,
      reset,
      ...rest
    } = this.props;
    const nodes =
      children && children.map
        ? children.map((child, index) => {
            let selected;
            const values = this.state.selectedValue;

            if (multi) {
              selected = values.indexOf(child.props.value) !== -1;
            } else {
              selected = child.props.value === this.state.selectedValue;
            }

            const target = children.find(
              item => item.props.value === this.state.selectedValue
            );

            let label = "";
            if (target) {
              label = target.props.text;
            }

            return React.cloneElement(child, {
              key: String(index),
              onPress: this.onSelect,
              onDeselect: this.onDeselect,
              selected,
              label,
              reset
            });
          })
        : null;

    if (horizontal && scrollable) {
      return (
        <AppView row {...rest}>
          <AppScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nodes}
          </AppScrollView>
        </AppView>
      );
    }
    if (horizontal) {
      return <React.Fragment>{nodes}</React.Fragment>;
    }
    if (wrabContent) {
      return (
        <AppView row wrap>
          {nodes}
        </AppView>
      );
    }

    return (
      <AppScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={this.props.style}
        contentContainerStyle={this.props.contentContainerStyle}
        paddingVertical={paddingVertical || 5}
        // {...rest}
      >
        {nodes}
      </AppScrollView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionOptionsGroupMulti);
