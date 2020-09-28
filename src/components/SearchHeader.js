import React, { Component } from "react";
import { SafeAreaView, Keyboard } from "react-native";
import I18n from "react-native-i18n";
import { connect } from "react-redux";

// import debounce from 'debounce-promise';
import { API_ENDPOINT_HOME_SERVICE } from "../utils/Config";
import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  AppInput,
  AppList,
  AppImage,
  AppTabs,
  AppSpinner
} from "../common";
import Picker from "../common/picker/Picker";

import { EmptyContentList } from ".";
import {
  APPBAR_HEIGHT,
  responsiveWidth
} from "../common/utils/responsiveDimensions";
import searchService from "../assets/imgs/searchService.png";
import { HEADER_ELEVATION } from "../common/utils/Constants";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSearch: props.lastSearch ? props.lastSearch : "",
      inputText: "",
      filterSheetReady: false,
      text: null,
      value: null,
      data: [],
      profession: [],
      professionId: null,
      loading: true
    };
    this.timeOutId = null;
    this.filterBottomSheetRef = React.createRef();
  }

  async componentDidMount() {
    try {
      this._initSearchInputFocusDelay();
    } catch (error) {
      this.setState({
        loading: false
      });
      console.log("error", error);
    }
  }

  debaounceSearch = text => {
    this.setState({
      inputText: text
    });
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
    this.timeOutId = null;
    this.timeOutId = setTimeout(() => {
      this.setState({
        lastSearch: text
      });
    }, 1000);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.lastSearch !== this.props.lastSearch) {
      this.setState({
        lastSearch: nextProps.lastSearch
      });
    }
  };

  _initSearchInputFocusDelay() {
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.focus();
      }
    }, 1200);
  }

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
        leftIcon={
          <AppIcon
            name="ios-arrow-round-back"
            type="ion"
            size={15}
            color="#6A6A6A"
            flip
          />
        }
        onPress={this.goBack}
        paddingHorizontal={8}
        backgroundColor="transparent"
      />
    </AppView>
  );

  renderInputSearch = () => {
    const {} = this.props;
    return (
      <AppView
        stretch
        backgroundColor="#fff"
        style={{
          height: APPBAR_HEIGHT
        }}
        row
        spaceBetween
      >
        {this.renderLeft()}
        <AppView stretch paddingRight={8} flex paddingTop={3}>
          <AppInput
            picker
            stretch
            noValidation
            initialValue={this.state.inputText}
            ref={ref => (this.searchInput = ref)}
            onChange={text => {
              console.log("text", text);

              if (text === null || text === "") {
                this.setState({
                  data: []
                });
              }
              this.debaounceSearch(text);
            }}
            onSubmitEditing={() => {
              // this.searchResults();
              Keyboard.dismiss();
            }}
            borderRadius={5}
            height={6}
            paddingHorizontal={5}
            backgroundColor="#E6E6E6"
            placeholder={I18n.t("search-hint")}
            leftItems={[
              <AppIcon
                type="custom"
                name="search"
                color="#B0B0B0"
                size={8}
                marginLeft={3}
                flip
              />
            ]}
          />
        </AppView>
      </AppView>
    );
  };

  renderListResult = () => {
    const { text, lastSearch } = this.state;
    const { cityId } = this.props;
    if (lastSearch === "") {
      return (
        <AppView stretch flex center>
          <AppImage source={searchService} equalSize={50} />
          <AppText bold color="#000000" size={6.5} marginTop={5}>
            {I18n.t("search-for-service")}
          </AppText>
          <AppText center color="#919191" marginTop={8}>
            {I18n.t("search-for-service-hint")}
          </AppText>
        </AppView>
      );
    }

    let sortType = null;
    let sortBy = null;
    if (this.state.value === 1) {
      sortType = "ASC";
    } else if (this.state.value === 2) sortType = "DESC";

    if (this.state.value !== 3 && this.state.value !== null) {
      sortBy = "PRICE";
    }
    if (this.state.value === 3) {
      sortBy = "SERVICE_RATE";
    }

    let strBuild = "";
    if (this.state.lastSearch !== "") {
      strBuild = `text=${this.state.lastSearch}`;
    }

    if (
      this.state.lastSearch !== "" &&
      this.state.value !== null &&
      this.state.value !== 3
    ) {
      strBuild = `${strBuild}&sortBy=${sortBy}&sortType=${sortType}`;
    }

    if (
      sortBy === "SERVICE_RATE" &&
      this.state.lastSearch !== "" &&
      this.state.value === 3
    ) {
      strBuild = `${strBuild}&sortBy=${sortBy}`;
    }

    if (this.state.professionId !== null) {
      strBuild = `${strBuild}&profession=${this.state.professionId}`;
    }
    if (strBuild === "") {
      return null;
    }

    return (
      <>
        {this.state.lastSearch !== "" || this.state.text !== null ? (
          <AppView paddingTop={7} flex backgroundColor="#F2F2F2" stretch>
            <AppList
              flatlist
              flex
              stretch
              apiRequest={{
                url: `${API_ENDPOINT_HOME_SERVICE}services?city=${cityId}&${strBuild}`,
                responseResolver: response => {
                  console.log("Res fuzzy:::::::");
                  console.log(response);
                  this.setState({
                    data: response.data.data
                  });

                  return {
                    data: response.data.data,
                    pageCount: response.data.pageCount
                  };
                },

                onError: error => {
                  console.log(JSON.parse(JSON.stringify(error.response)));
                  I18n.t("ui-error-happened");
                }
              }}
              noResultsComponent={
                <EmptyService componentId={this.props.componentId} />
              }
              rowRenderer={data => (
                <ServiceCard
                  cardWidth={100}
                  height={15}
                  data={data}
                  search
                  backgroundColor="white"
                />
              )}
            />
          </AppView>
        ) : null}
      </>
    );
  };

  show = () => {
    this.filterBottomSheetRef.current.show();
  };

  onSelect = val => {
    console.log("value has selected", val);
    this.setState({
      professionId: val
    });
  };

  renderSortBy = () => (
    <AppView
      paddingHorizontal={8}
      row
      stretch
      spaceBetween
      paddingVertical={5}
      backgroundColor="white"
    >
      <AppView row>
        <AppText bold size={7} color="#0C0C0C">
          {this.state.data.length}
        </AppText>
        <AppText size={6} marginLeft={1}>
          {" "}
          {I18n.t("service")}
        </AppText>
      </AppView>
      <AppView stretch row>
        <AppView
          backgroundColor={this.state.value ? "primary" : "#FFF"}
          stretch
          borderRadius={5}
          borderColor="#F2F2F2"
          borderWidth={0.5}
          elevation={2}
          center
          row
          paddingHorizontal={2}
          paddingVertical={2}
          style={
            this.props.rtl
              ? { marginLeft: responsiveWidth(4) }
              : { marginRight: responsiveWidth(4) }
          }
          onPress={() => {
            this.show();
          }}
        >
          <AppIcon
            name="sort"
            type="material"
            size={9}
            marginRight={2}
            color={this.state.value ? "white" : "#0C0C0C"}
          />
          <AppView row>
            <AppText bold row color={this.state.value ? "white" : "#0C0C0C"}>
              {I18n.t("ordered")}
            </AppText>
            {this.state.value && (
              <AppText color="white">: {this.state.text}</AppText>
            )}
          </AppView>
        </AppView>

        {this.state.loading ? (
          <AppSpinner />
        ) : (
          <Picker
            textStyle={{ color: "primary", center: true }}
            stretch
            elevation={2}
            center
            row
            contentStyle={{ stretch: true }}
            placeholderStyle={{
              bold: true,
              color: "#0C0C0C",
              marginRight: 1.5
            }}
            placeholder={I18n.t("job")}
            height={5}
            paddingHorizontal={1}
            borderRadius={5}
            selectedValue={this.state.professionId}
            noValidation
            title={I18n.t("job")}
            backgroundColor="white"
            paddingVertical={2}
            borderWidth={0.5}
            borderColor="#F2F2F2"
            data={this.state.profession}
            searchPlaceholder={I18n.t("search-profession")}
            keyOfLabel="name"
            keyOfValue="id"
            onValueChange={id => {
              this.setState({
                professionId: id
              });
            }}
            rightItem={
              <AppView paddingHorizontal={2} centerY>
                <AppIcon
                  name="filter-list"
                  type="material"
                  size={9}
                  marginRight={2}
                  color="#0C0C0C"
                />
              </AppView>
            }
          />
        )}
      </AppView>
    </AppView>
  );

  render() {
    const { title, flat } = this.props;

    return (
      <AppView stretch flex backgroundColor="#F2F2F2">
        <AppView stretch elevation={HEADER_ELEVATION}>
          <SafeAreaView
            style={{
              backgroundColor: "#fff",
              alignSelf: "stretch"
            }}
          >
            {this.renderInputSearch()}
          </SafeAreaView>
          {this.state.data && this.renderSortBy()}
        </AppView>

        {this.renderListResult()}
        <FilterSheetSearch
          height={32}
          ref={this.filterBottomSheetRef}
          sortBy={value => (this.sortBy = value)}
          onConfirm={(value, text) => {
            this.setState({
              value,
              // lastSearch: text,
              text
            });
          }}
          initialValue={this.state.value}
          onLayout={() => {
            this.setState({
              filterSheetReady: true
            });
          }}
        />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  cityId: state.city.cityId
});

export default connect(mapStateToProps)(SearchHeader);
