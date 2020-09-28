import * as yup from 'yup';
import I18n from 'react-native-i18n';
import { asyncValidationSchema } from '../../utils/validation';

const checkKeyExistance = (key, data) => {
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (key === data[i]) return true;
    }
  }

  return false;
};
export const buildValidationSchemaEGY = (data, formik) => {
  const obj = {
    password: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$/,
        I18n.t('signUp-password-invalid'),
      ),

    confirmPassword: yup
      .string()
      .required(I18n.t('signup-field-required'))
      .test(
        'passwords-match',
        I18n.t('signup-confirmPassword-invalid'),
        function(value) {
          return this.parent.password === value;
        },
      ),
  };

  if (checkKeyExistance('NAME', data)) {
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
  }

  if (checkKeyExistance('EMAIL', data)) {
    const syncEmailSchema = yup
      .string()
      .required(I18n.t('signup-field-required'))
      .email(I18n.t('signup-email-invalid'));
    obj.email = asyncValidationSchema(
      'email',
      I18n.t('signup-email-exists-error'),
      syncEmailSchema,
      formik,
    );
  }

  if (checkKeyExistance('PHONE', data)) {
    const syncPhoneSchema = yup
      .string()
      .required(I18n.t("signup-field-required"))
      .matches(
        /^^0?1([0-2]|5){1}[0-9]{8}$/,
        I18n.t("signup-invalid-phone-error")
      );

    obj.phone = asyncValidationSchema(
      "phone",
      I18n.t("signup-phone-exists-error"),
      syncPhoneSchema,
      formik,
      1,
    );
  }
  if (checkKeyExistance('CITY', data)) {
    obj.city = yup.string().required(I18n.t('signup-field-required'));
  }

  if (checkKeyExistance('LOCATION', data)) {
    obj.location = yup.string().required(I18n.t('signup-field-required'));
  }

  return yup.object().shape(obj);
};

// export const buildValidationSchemaSAUDIA = (data, formik) => {
//   const obj = {
//     password: yup
//       .string()
//       .required(I18n.t("signup-field-required"))
//       .matches(
//         /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*-.])[A-Za-z\d$@$!%_*_#?&-_.]{8,}$/,
//         I18n.t("signUp-password-invalid")
//       ),

//     confirmPassword: yup
//       .string()
//       .required(I18n.t("signup-field-required"))
//       .test(
//         "passwords-match",
//         I18n.t("signup-confirmPassword-invalid"),
//         function(value) {
//           return this.parent.password === value;
//         }
//       )
//   };

//   if (checkKeyExistance("NAME", data)) {
//     obj.nameAr = yup
//       .string()
//       .required(I18n.t("signup-field-required"))
//       .matches(
//         /^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF\s]*$/,
//         I18n.t("signup-name-AR-invalid")
//       )
//       .test("nameAr", I18n.t("signup-name-AR-invalid"), value => isNaN(value));

//     obj.nameEn = yup
//       .string()
//       .required(I18n.t("signup-field-required"))
//       .matches(/^[A-Za-z\s]+$/, I18n.t("signup-name-EN-invalid"))
//       .test("nameEn", I18n.t("signup-name-EN-invalid"), value => isNaN(value));
//   }

//   if (checkKeyExistance("EMAIL", data)) {
//     const syncEmailSchema = yup
//       .string()
//       .required(I18n.t("signup-field-required"))
//       .email(I18n.t("signup-email-invalid"));
//     obj.email = asyncValidationSchema(
//       "email",
//       I18n.t("signup-email-exists-error"),
//       syncEmailSchema,
//       formik
//     );
//   }

//   if (checkKeyExistance("PHONE", data)) {
//     const syncPhoneSchema = yup
//       .string()
//       .required(I18n.t("signup-field-required"))
//       .matches(
//         /^0?5(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
//         I18n.t("signup-invalid-phone-error")
//       );
//     obj.phone = asyncValidationSchema(
//       "phone",
//       I18n.t("signup-phone-exists-error"),
//       syncPhoneSchema,
//       formik
//     );
//   }

//   if (checkKeyExistance("CITY", data)) {
//     obj.country = yup.string().required(I18n.t("signup-field-required"));
//     obj.city = yup.string().required(I18n.t("signup-field-required"));
//   }

//   if (checkKeyExistance("LOCATION", data)) {
//     obj.location = yup.string().required(I18n.t("signup-field-required"));
//   }

//   return yup.object().shape(obj);
// };
