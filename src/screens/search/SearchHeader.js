import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, SafeAreaView, Keyboard } from "react-native";
import I18n from "react-native-i18n";
import Axios from "axios";
import { API_ENDPOINT_HOME_SERVICE } from "../../utils/Config";
import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  getColors,
  AppInput
} from "../../common";
import { APPBAR_HEIGHT } from "../../common/utils/responsiveDimensions";

export default class SearchHeader extends Component {
  static propTypes = {
    hideBack: PropTypes.bool,
    showNotification: PropTypes.bool,
    showChat: PropTypes.bool,
    rowItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    showBasket: PropTypes.bool
  };

  static defaultProps = {
    hideBack: false,
    showNotification: false,
    showChat: false,
    rowItems: [],
    showBasket: false
  };

  constructor(props) {
    super(props);
    this.state = {
      lastSearch: props.lastSearch ? props.lastSearch : ""
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.lastSearch !== this.props.lastSearch) {
      this.setState({
        lastSearch: nextProps.lastSearch
      });
    }
  };

  goBack = () => {
    if (this.props.backHandler) {
      this.props.backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  renderLeft = () => (
    <AppView center>
      <AppButton
        flex
        color="foreground"
        leftIcon={<AppIcon name="back" type="custom" size={8} color="#fff" />}
        onPress={this.goBack}
        paddingHorizontal={8}
        backgroundColor="transparent"
      />
    </AppView>
  );

  searchResults = async () => {
    try {
      const response = await Axios.get(
        `${API_ENDPOINT_HOME_SERVICE}services?text=${this.state.lastSearch ||
          this.props.lastSearch}`
      );
      console.log("res", response.data);
      AppNavigation.push({
        name: "searchResults",
        passProps: {
          data: response.data.data,
          total: response.data.totalCount
        }
      });
    } catch (error) {
      console.log("errr", JSON.parse(JSON.stringify(error)));
    }
  };

  render() {
    const { title, flat } = this.props;

    return (
      <SafeAreaView
        style={{ backgroundColor: "#2F75E8", alignSelf: "stretch" }}
      >
        <AppView
          stretch
          backgroundColor="#2F75E8"
          style={{
            height: APPBAR_HEIGHT
          }}
          row
          spaceBetween
        >
          {this.renderLeft()}
          <AppView stretch paddingRight={5} flex paddingTop={4}>
            <AppInput
              picker
              stretch
              noValidation
              initialValue={this.state.lastSearch}
              onChange={text => {
                // const filterData = this.props.data.filter(item =>
                //   item.label.toLowerCase().includes(text.toString().toLowerCase()),
                // );
                // this.setState({
                //   searchText: text,
                //   data: filterData,
                // });

                this.setState({
                  lastSearch: text
                });
              }}
              onSubmitEditing={() => {
                this.searchResults();
                Keyboard.dismiss();
              }}
              borderRadius={5}
              height={6}
              paddingHorizontal={5}
              backgroundColor="#EEEEEE"
              placeholder={I18n.t("search-hint")}
              leftItems={[
                <AppIcon
                  color="#B0B0B0"
                  name="search"
                  type="custom"
                  size={8}
                  marginLeft={3}
                />
              ]}
            />
          </AppView>
        </AppView>
      </SafeAreaView>
    );
  }
}
