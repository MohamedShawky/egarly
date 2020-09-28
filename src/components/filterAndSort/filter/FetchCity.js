import React, { Component } from "react";
import Axios from "axios";
import I18n from "react-native-i18n";
import { showError, AppText, AppView, AppSpinner } from "../../../common";
import { connect } from "react-redux";
import { OptionButton } from "../..";
import { SelectionOptionGroupMulti } from "../..";
import * as countryRepo from "../../../repo/CountryRepo";
import * as errors from '../../../utils/Errors'
class FetchCity extends Component {
  cityObj = {
    id: 0,
    name: I18n.t("all")
  };

  state = {
    cityData: [],
    cityLoading: false,
  };
  componentDidMount() {
    this.fetchCites();
  }

  componentDidUpdate(){
    this.fetchCites();
  }

  fetchCites = async () => {
    if (this.state.cityData.length || this.state.cityLoading) return;
    const { currentUser } = this.props;
    const countryId = currentUser && currentUser.user.city.country.id;
    let cities;
    try {
      this.setState({ cityLoading: true });
      cities = await countryRepo.getCities(countryId);
      cities = [this.cityObj,...cities];
    } catch (error) {
      if (error == errors.CONNECTION_ERROR) {
        showError(I18n.t("ui-networkConnectionError"));
      } else if (typeof error == "object") {
        showError(error.message);
      }
    }finally{
      this.setState({
        cityLoading: false,
        cityData:cities
      });
    }
  };

  render() {
    const { cityData } = this.state;

    const { ...rest } = this.props;

    return (
      <AppView stretch>
        <AppView stretch>
          <AppText size={7} marginHorizontal={5} color="#212121">
            {I18n.t("signup-city")}
          </AppText>
          {this.state.professionLoading ? (
            <AppView height={12} stretch center>
              <AppSpinner />
            </AppView>
          ) : (
            <SelectionOptionGroupMulti
              {...rest}
              initialValue={this.props.cities.length==0?[this.props.cityId]:this.props.cities}
              defaultValue={[this.props.cityId]}
              multi
              onSelect={value => {
                this.props.onChange(value);
              }}
              reset={this.props.reset}
              onDeselect={() => this.props.onDeselect()}
            >
              {cityData &&
                cityData.map((item, index) => {
                  return (
                    <OptionButton
                      text={item.name}
                      value={item.id}
                      key={index}
                      tagScroll
                      touchableOpacity
                    />
                  );
                })}
            </SelectionOptionGroupMulti>
          )}
        </AppView>
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  cityId: state.city.cityId,
  cities:state.providersFilter.cities,
});
export default connect(mapStateToProps)(FetchCity);
