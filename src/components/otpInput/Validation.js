import * as yup from "yup";

export const validationSchema = () =>
  yup.object().shape({
    verifyCode4: yup
      .string()
      .required(" ")
      .matches(/[\d]{1}/, " "),
    verifyCode3: yup
      .string()
      .required(" ")
      .matches(/[\d]{1}/, " "),
    verifyCode2: yup
      .string()
      .required(" ")
      .matches(/[\d]{1}/, " "),
    verifyCode1: yup
      .string()
      .required(" ")
      .matches(/[\d]{1}/, " ")
  });
