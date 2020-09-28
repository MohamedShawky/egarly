import * as yup from 'yup';
import I18n from 'react-native-i18n';
import moment from 'moment';

export default () =>
  yup.object().shape({
    // timeFrom: yup
    //   .string()
    //   .required(I18n.t('input-required-error')),
    //   .test('time', I18n.t('time-less-than-now'), function(value) {
    //     if (
    //       moment(
    //         `${this.parent.dateFrom} ${value}`,
    //         'Do MMMM YYYY h:mm:ss a',
    //       ).isSameOrAfter(moment().subtract(1, 'minutes')) ||
    //       !this.parent.dateFrom
    //     ) {
    //       return true;
    //     }
    //     return false;
    //   }),
    // timeTo: yup
    //   .string()
    //   .required(I18n.t('input-required-error'))
    //   .test('time', I18n.t('time-less-than'), function(value) {
    //     if (
    //       moment(
    //         `${this.parent.dateTo} ${value}`,
    //         'Do MMMM YYYY h:mm:ss a',
    //       ).isSameOrAfter(
    //         moment(
    //           `${this.parent.dateFrom} ${this.parent.timeFrom}`,
    //           'Do MMMM YYYY h:mm:ss a',
    //         ),
    //       ) ||
    //       !this.parent.dateTo
    //     ) {
    //       return true;
    //     }
    //     return false;
    //   }),
    dateFrom: yup.string().required(I18n.t('input-required-error')),
    dateTo: yup
      .string()
      .required(I18n.t('input-required-error'))
      .test('date', I18n.t('date-less-than'), function(value) {
        if (
          moment(value, 'Do MM YYYY').isSameOrAfter(
            moment(this.parent.dateFrom, 'Do MM YYYY'),
          )
        ) {
          return true;
        }
        return false;
      }),
  });
