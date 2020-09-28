import React, { Component } from 'react';
import Axios from 'axios';
import I18n from 'react-native-i18n';
import { showError, AppText, AppView, AppSpinner } from '../../../common';
import { connect } from 'react-redux';
import { OptionButton } from '../..';
import { SelectionOptionGroupMulti } from '../..';
import * as professionsRepo from '../../../repo/ProfessionsRepo';
import * as errors from '../../../utils/Errors';

class FetchProfession extends Component {
  jobObj = {
    activated: true,
    id: 0,
    name: I18n.t('all'),
  };

  state = {
    professionData: [],
    professionLoading: false,
  };

  componentDidMount() {
    this.fetchProfessions();
  }
  componentDidUpdate() {
    this.fetchProfessions();
  }

  fetchProfessions = async () => {
    if (this.state.professionData.length || this.state.professionLoading)
      return;
    let professions = this.state.professionData;
    try {
      this.setState({ professionLoading: true });
      const newProfessions = await professionsRepo.getProfessions();
      professions = [this.jobObj, ...newProfessions];
    } catch (error) {
      if (error == errors.CONNECTION_ERROR) {
        showError(I18n.t('ui-networkConnectionError'));
      } else if (typeof error == 'object') {
        showError(error.message);
      }
    } finally {
      this.setState({
        professionLoading: false,
        professionData: professions,
      });
    }
  };

  render() {
    const { professionData } = this.state;

    const { ...rest } = this.props;
    return (
      <AppView stretch>
        <AppView stretch>
          <AppText size={7} marginHorizontal={5} color="#212121" marginTop={5}>
            {I18n.t('job')}
          </AppText>
          {this.state.professionLoading ? (
            <AppView height={12} stretch center>
              <AppSpinner />
            </AppView>
          ) : (
            <SelectionOptionGroupMulti
              {...rest}
              initialValue={
                this.props.professions.length == 0
                  ? this.props.selectedProfession
                    ? [this.props.selectedProfession]
                    : [0]
                  : this.props.professions
              }
              defaultValue={[0]}
              multi
              reset={this.props.reset}
              onDeselect={() => this.props.onDeselect()}
            >
              {professionData &&
                professionData.map((item, index) => {
                  return (
                    <OptionButton
                      text={item.name}
                      value={item.id}
                      key={index + 1}
                      tagScroll
                      touchableOpacity
                    />
                  );
                })}
            </SelectionOptionGroupMulti>
          )}
        </AppView>
        <AppView
          stretch
          height={0.1}
          backgroundColor="#B9B9B9"
          marginBottom={5}
        />
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  professions: state.providersFilter.professions,
});
export default connect(mapStateToProps)(FetchProfession);
