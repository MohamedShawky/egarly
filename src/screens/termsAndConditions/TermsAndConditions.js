import React, { Component } from "react";
import I18n from "react-native-i18n";
import {
  AppText,
  AppView,
  AppScrollView,
  showError,
  AppSpinner,
  AppButton,
  AppIcon,
  AppNavigation,
} from "../../common";
import { AppHeader } from "../../components";
import Axios from "axios";
import { API_ENDPOINT_GATEWAY } from "../../utils/Config";

export default class TermsAndConditions extends Component {
  state = {
    isLoading: true,
    terms: null,

    isChecked: false,
  };
  componentDidMount() {
    this.getTerms();
  }
  getTerms = async () => {
    try {
      const terms = await Axios.get(`${API_ENDPOINT_GATEWAY}page/2`);
      console.log("terms =>", terms);

      this.setState({
        isLoading: false,
        terms: terms.data.page,
      });
    } catch (error) {
      showError("error");
      this.setState({
        isLoading: false,
      });
    }
  };
  render() {
    const { terms } = this.state;
    return (
      <AppView flex stretch>
        <AppHeader title={I18n.t("terms-and-condition-title")} />
        {this.state.isLoading ? (
          <AppView stretch flex center>
            <AppSpinner />
          </AppView>
        ) : (
          <AppScrollView>
            <AppView marginTop={10} marginBottom={30} marginHorizontal={17}>
              <AppView>
                {/* <AppText bold>
                {I18n.t('terms-and-condition-first-header')}
              </AppText> */}
              </AppView>
              {/* <AppView>
              <AppText>{I18n.t('terms-and-condition-first-details')}</AppText>
            </AppView> */}
              {this.state.terms !== null ? (
                <>
                  <AppView marginTop={15}>
                    <AppText bold>{terms.ar_title.trim()}</AppText>
                  </AppView>
                  <AppView>
                    <AppText bold>{terms.ar_description}</AppText>
                  </AppView>
                </>
              ) : null}
            </AppView>
          </AppScrollView>
        )}
        {!this.props.order && (
          <>
            <AppView marginTop={5} stretch row paddingHorizontal={7}>
              <AppView
                width={7}
                height={3}
                borderRadius={4}
                borderColor="grey"
                borderWidth={1}
                center
                onPress={() => {
                  this.setState({
                    isChecked: !this.state.isChecked,
                  });
                }}
                backgroundColor={this.state.isChecked ? "primary" : "white"}
              >
                {this.state.isChecked && <AppIcon name="check" type="ant" />}
              </AppView>
              <AppText marginHorizontal={5} color="primary">
                {I18n.t("terms-and-condition-title")}
              </AppText>
            </AppView>
            <AppButton
              stretch
              onPress={() => {
                AppNavigation.pop();
                this.props.handleSubmit();
              }}
              processing={this.props.isSubmitting}
              margin={7}
              title={"اتمام الطلب"}
              // backgroundColor="primary"
              disabled={!this.state.isChecked}
            />
          </>
        )}
      </AppView>
    );
  }
}
