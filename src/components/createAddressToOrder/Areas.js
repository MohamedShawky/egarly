import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import I18n from 'react-native-i18n';
import * as CountryRepo from '../../repo/CountryRepo';
import { AppView, AppSpinner, AppIcon, showError } from '../../common';
import Picker from '../../common/picker/Picker';
import * as Errors from '../../utils/Errors';

export default props => {
  // const providerId = 2531;
  //   const providerId = useSelector(state => state.order.provider.id);
  const { errors, setFieldValue, touched, values } = props;
  const { city, provider } = values;

  console.log('values  ******************************** -->>>', values.city);

  if (!values.city) return <></>;

  const [isLoading, setLoading] = useState(false);
  const [areas, setAreas] = useState(null);
  const _getAreas = async () => {
    try {
      if (!isLoading) setLoading(true);
      const cityId =
        values.city && values.city.city ? values.city.city.id : values.city.id;

      const areas = await CountryRepo.getAreasByCityId(cityId);
      console.log('areas', areas);
      setAreas(areas);
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
    if (areas == null) _getAreas();
  }, [values.city]);

  return isLoading ? (
    <AppView stretch center padding={5} marginVertical={5}>
      <AppSpinner size={12} />
    </AppView>
  ) : areas == null ? (
    <AppView stretch center padding={5} marginVertical={5} onPress={_getAreas}>
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
      placeholder={I18n.t('district')}
      title={I18n.t('district')}
      data={areas}
      label={values.area?I18n.t("district"):null} 
     
      searchPlaceholder={I18n.t('district')}
      keyOfLabel="name"
      keyOfValue="id"
      selectedValue={values.area ? values.area.id : null}
      error={touched.area ? errors.area : ''}
      onValueChange={(value, index) => {
        console.log('areas', areas[index]);
        setFieldValue('area', areas[index]);
      }}
      leftItem={
        <AppView paddingHorizontal={2} centerY>
          <AppIcon name="ios-arrow-down" size={8} />
        </AppView>
      }
      rightItem={
        <AppView paddingHorizontal={2} centerY>
          <AppIcon name="map" type="custom" size={8} />
        </AppView>
      }
    />
  );
};
