import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import I18n from 'react-native-i18n';
import * as WorkingAreaRepo from '../../repo/WorkingAreaRepo';
import { AppView, AppSpinner, AppIcon, showError } from '../../common';
import Picker from '../../common/picker/Picker';
import * as Errors from '../../utils/Errors';
import * as CountryRepo from '../../repo/CountryRepo';

export default props => {
  const countryId = useSelector(state => state.city.countryId);
  const { errors, setFieldValue, values, touched, provider } = props;
  const [isLoading, setLoading] = useState(false);
  const [cities, setCities] = useState(null);
  const _getCities = async () => {
    try {
      if (!isLoading) setLoading(true);
      let cities = null;

      if (provider && provider.id) {
        cities = await WorkingAreaRepo.getWorkingCitiesByProviderId(
          props.provider.id,
        );
        cities = cities.map(item => ({
          ...item,
          name: item.city.name,
        }));
      } else {
        cities = await CountryRepo.getCities(countryId);
      }
      setCities(cities);
    } catch (error) {
      if (error == Errors.CONNECTION_ERROR) {
        showError(I18n.t('ui-networkConnectionError'));
      } else if (typeof error === 'object') {
        showError(error.message);
      }
    }
    if (!isLoading) setLoading(false);
  };

  useEffect(() => {
    if (cities == null) _getCities();
  }, []);

  return isLoading ? (
    <AppView stretch center padding={5} marginVertical={5}>
      <AppSpinner size={12} />
    </AppView>
  ) : cities == null ? (
    <AppView stretch center padding={5} marginVertical={5} onPress={_getCities}>
      <AppIcon flip type="ant" name="reload1" size={7} />
    </AppView>
  ) : (
    <Picker
      flex
      contentStyle={{
        flex: true,
        stretch: true,
        centerY: true,
        paddingHorizontal: 3,
      }}
      spaceBetween
      placeholder={I18n.t('city')}
      title={I18n.t('choose-city')}
      data={cities}

      label={values.city?I18n.t("city"):null} 
      searchPlaceholder={I18n.t('city')}
      keyOfLabel="name"
      keyOfValue="id"
      selectedValue={values.city ? values.city.id : null}
      error={touched.city ? errors.city : ''}
      onValueChange={(value, index) => {
        console.log('city', cities[index]);
        setFieldValue('city', cities[index]);
      }}
      leftItem={
        <AppView paddingHorizontal={2} centerY>
          <AppIcon name="ios-arrow-down" size={8} />
        </AppView>
      }
      rightItem={
        <AppView paddingHorizontal={2} centerY>
          <AppIcon name="pyramide" type="custom" size={8} />
        </AppView>
      }
    />
  );
};
