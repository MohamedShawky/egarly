import React from 'react';
import * as yup from 'yup';
import I18n from 'react-native-i18n';
import axios from 'axios';
import { API_ENDPOINT_GATEWAY } from '../../utils/Config';

export const buildValidationSchemaEGY = formik => {
  const obj = {};

  obj.nameAr = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .matches(
      /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s]*$/,
      I18n.t('signup-name-AR-invalid'),
    )
    .test('nameAr', I18n.t('signup-name-AR-invalid'), value => isNaN(value));

  obj.nameEn = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .matches(/^[A-Za-z\s]+$/, I18n.t('signup-name-EN-invalid'))
    .test('nameEn', I18n.t('signup-name-EN-invalid'), value => isNaN(value));

  const email = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .email(I18n.t('signup-email-invalid'));

  const phone = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .matches(
      /^^0?1([0-2]|5){1}[0-9]{8}$/,
      I18n.t('signup-invalid-phone-error'),
    );

  obj.country = yup.string().required(I18n.t('signup-field-required'));
  obj.city = yup.string().required(I18n.t('signup-field-required'));

  obj.location = yup.string().required(I18n.t('signup-field-required'));

  return yup.object().shape(obj);
};

export const buildValidationSchemaSAUDIA = formik => {
  const obj = {};

  obj.nameAr = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .matches(
      /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s]*$/,
      I18n.t('signup-name-AR-invalid'),
    )
    .test('nameAr', I18n.t('signup-name-AR-invalid'), value => isNaN(value));

  obj.nameEn = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .matches(/^[A-Za-z\s]+$/, I18n.t('signup-name-EN-invalid'))
    .test('nameEn', I18n.t('signup-name-EN-invalid'), value => isNaN(value));

  const email = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .email(I18n.t('signup-email-invalid'));

  const phone = yup
    .string()
    .required(I18n.t('signup-field-required'))
    .matches(
      /^0?5(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      I18n.t('signup-invalid-phone-error'),
    );

  obj.country = yup.string().required(I18n.t('signup-field-required'));
  obj.city = yup.string().required(I18n.t('signup-field-required'));

  obj.location = yup.string().required(I18n.t('signup-field-required'));

  return yup.object().shape(obj);
};

// const AsyncValidation = ()
