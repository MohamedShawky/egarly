import * as yup from 'yup';
import I18n from 'react-native-i18n';

export const validationSchema = () =>
  yup.object().shape({
    type: yup.string().required(I18n.t('signup-field-required')),
    orderNumber: yup.string().when('isOrder', {
      is: true,
      then: yup
        .string()
        .required(I18n.t('signup-field-required'))
        .matches(/^(\d)*$/, I18n.t('condition-number')),
    }),
    message: yup.string().required(I18n.t('signup-field-required')),
    isOrder: yup.boolean(),
  });
