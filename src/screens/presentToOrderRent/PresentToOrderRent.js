import React, { Component } from "react"
import { AppHeader } from "../../components"
import { AppView, AppText, AppInput, AppScrollView, AppButton } from "../../common";
import I18n from "react-native-i18n";
import { Formik } from "formik";
import validationSchema from "./Validation";
class ReantOrder extends Component {


    renderForm = () => {
        return (
            <Formik
                initialValues={{ nameCredit: "", numberCredit: "" , dateCredit:"", passwordCredit:""}}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) =>
                    this.onSubmit(values, { setSubmitting })
                }
            >
                {this.renderFromBody}
            </Formik>
        )
    }
    renderFromBody = props => {
        const { values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting } = props
        return (
            <>
                <AppInput
                    hint={I18n.t("name-credit-hint")}
                    placeholder={I18n.t("name-credit")}
                    initialValue={values.nameCredit}
                    onBlur={handleBlur("nameCredit")}
                    onChange={handleChange("nameCredit")}
                    error={errors.nameCredit}
                    isTouched={touched.nameCredit} 
                    hintColor="labelText"/>
                <AppInput
                    hint={I18n.t("number-credit-hint")}
                    placeholder={I18n.t("number-credit")}
                    initialValue={values.numberCredit}
                    onBlur={handleBlur("numberCredit")}
                    onChange={handleChange("numberCredit")}
                    error={errors.numberCredit}
                    isTouched={touched.numberCredit} 
                    hintColor="labelText"/>
                    <AppView stretch row scpaceBetween>
                <AppInput
                    hint={I18n.t("date-credit-hint")}
                    placeholder={"YY / MM /DD"}
                    initialValue={values.dateCredit}
                    onBlur={handleBlur("dateCredit")}
                    onChange={handleChange("dateCredit")}
                    error={errors.dateCredit}
                    isTouched={touched.dateCredit} 
                    hintColor="labelText"
                    flex/>
                    <AppView width={5}/>
                <AppInput
                    hint={I18n.t("password-credit-hint")}
                    placeholder={I18n.t("password-credit")}
                    initialValue={values.passwordCredit}
                    onBlur={handleBlur("passwordCredit")}
                    onChange={handleChange("passwordCredit")}
                    error={errors.passwordCredit}
                    isTouched={touched.passwordCredit} 
                    hintColor="labelText"
                    flex/>
                    </AppView>
                    <AppButton backgroundColor="primary" stretch onPress={handleSubmit} processing={isSubmitting} title={I18n.t("pay")}marginTop={20}/>
            </>

        )
    }
    render() {
        return (
            <AppView stretch flex>
                <AppHeader title={I18n.t("add-rent-order")} />
                <AppScrollView stretch flex paddingTop={10} paddingHorizontal={7}>

                    {this.renderForm()}
                </AppScrollView>
            </AppView>
        )
    }
}

export default ReantOrder;