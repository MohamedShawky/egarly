import React, { Component } from "react";
import I18n from "react-native-i18n";
import { SafeAreaView } from "react-native";
import {
  AppView,
  AppText,
  AppButton,
  AppNavigation,
  AppSpinner,
  AppOtpInput,
  showError,
  responsiveWidth,
} from "../../common";
import styles from "./styles";
import * as authRepo from "../../repo/AuthRepo";
import * as errors from "../../utils/Errors";
import moment from "moment";
import momentDurationFormat from "moment-duration-format";
momentDurationFormat(moment);

export default class OtpInput extends Component {
  state = {
    code: "",
    setSubmitting: false,
    sendLoading: false,
    reset: false,
    time: moment.duration(62, "seconds"),
    allowResend: false,
    allowSubmit: false,
  };

  componentDidMount() {
    this.intervalRef = setInterval(this._subSecond, 1000);
  }

  componentDidUpdate = (prevProps, PrevState) => {
    console.log("did update");

    if (
      PrevState.allowResend !== this.state.allowResend &&
      this.state.allowResend === false
    ) {
      this.setState({
        time: moment.duration(62, "seconds"),
      });
      this.intervalRef = setInterval(this._subSecond, 1000);
    }
  };

  handleSubmit = async () => {
    this.setState({
      setSubmitting: true,
    });

    if (this.props.forget) {
      this.handleResetPassword();
    } else {
      const verifyCode = this.state.code;
      let verifiedCode = false;
      try {
        verifiedCode = await authRepo.verifyCode(verifyCode);
        console.log("=============>>>", verifiedCode);

        if (verifiedCode) {
          AppNavigation.push({
            name: "resetPassword",
            passProps: {
              code: verifyCode,
            },
          });
        } else {
          showError("الكود غير صحيح");
        }
      } catch (error) {
        if (error === errors.CONNECTION_ERROR) {
          // no connection
          this.props.onChangeState &&
            this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
        } else if (error === errors.INVALID_CODE) {
          this.props.onChangeState &&
            this.props.onChangeState(true, I18n.t("wrong-verify-code"));
        } else if (typeof error === "object") {
          showError(error.message);
        }
      } finally {
        this.setState({
          setSubmitting: false,
        });
      }
    }
  };

  handleResetPassword = async () => {
    const verifyCode = this.state.code;
    this.setState({
      setSubmitting: true,
    });

    let verifiedCode = false;
    try {
      verifiedCode = await authRepo.verifyCodeToForgetPassword(
        this.props.phone,
        verifyCode
      );
      if (verifiedCode) {
        await AppNavigation.push({
          name: "resetPassword",
          passProps: { data: this.props.phone },
        });

        this.setState(
          {
            reset: true,
          },
          () => {
            this.setState({
              reset: false,
            });
          }
        );
      }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
      } else if (error === errors.INVALID_CODE) {
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("wrong-verify-code"));
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      this.setState({
        setSubmitting: false,
      });
    }
  };

  reSendCode = async () => {
    if (this.state.sendLoading) return;

    this.setState({ errorTxt: "", sendLoading: true });
    const { phone } = this.props;

    let resendCode = false;
    try {
      resendCode = await authRepo.resendVerifyCode(phone);
      if (resendCode) {
        this.props.onChangeInfoModal(true, I18n.t("new-verify-code-sent"));
      }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      this.setState(
        {
          sendLoading: false,
          reset: true,
        },
        () => {
          this.setState({
            reset: false,
          });
        }
      );
    }
  };

  reSendCodeForgetPassword = async () => {
    if (this.state.sendLoading) return;
    const { phone } = this.props;

    this.setState({ errorTxt: "", sendLoading: true });

    let resendCode = false;
    try {
      resendCode = await authRepo.resendVerifyCodeForgetPassword(phone);
      if (resendCode) {
        this.props.onChangeInfoModal(true, I18n.t("new-verify-code-sent"));
      }
    } catch (error) {
      if (error === errors.CONNECTION_ERROR) {
        // no connection
        this.props.onChangeState &&
          this.props.onChangeState(true, I18n.t("ui-networkConnectionError"));
      } else if (typeof error === "object") {
        showError(error.message);
      }
    } finally {
      this.setState(
        {
          sendLoading: false,
          reset: true,
        },
        () => {
          this.setState({
            reset: false,
          });
        }
      );
    }
  };

  renderItems = (items) => {
    const { size } = this.props;

    const nodes = items.map((item) => {
      if (
        item.type.WrappedComponent &&
        (item.type.WrappedComponent.displayName === "Button" ||
          item.type.WrappedComponent.displayName === "Icon")
      ) {
        return React.cloneElement(item, {
          key: String(Math.random()),
          transparent: true,
          stretch: item.type.WrappedComponent.displayName === "Button",
          color: item.props.color || this.state.color,
          size: item.props.size || size * 1.5,
          backgroundColor: "transparent",
          paddingHorizontal: item.props.paddingHorizontal || size / 1.5,
          paddingVertical: 0,
        });
      }
      return React.cloneElement(item, {
        key: String(Math.random()),
        paddingHorizontal: item.props.paddingHorizontal || size / 1.5,
      });
    });

    return nodes;
  };

  _subSecond = () => {
    let newDuration = this.state.time;
    newDuration = moment.duration(newDuration, "seconds").subtract(1, "s");
    this.setState({ time: newDuration });
    if (this.state.time.asMilliseconds() === 0) {
      clearInterval(this.intervalRef);
      this.setState({ allowResend: true });
    }
  };

  render() {
    return (
      <AppView stretch centerX flex>
        {this.props.otpScreen ? (
          <>
            <AppView stretch centerX>
              <AppText marginTop={10} color="#777777" size={5.5}>
                {I18n.t("sms-message-otp")}
              </AppText>
              <AppText size={5.5}>{this.props.phone}</AppText>

              <AppText marginTop={10} color="#777777">
                {I18n.t("enter-verfication-code")}
              </AppText>
            </AppView>
          </>
        ) : null}
        {this.props.leftItems && this.props.leftItems.length
          ? this.renderItems(this.props.leftItems)
          : null}

        <AppOtpInput
          style={{
            width: responsiveWidth(90),
            height: "18%",
          }}
          pinCount={4}
          code=""
          reset={this.state.reset}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputFieldStyleAfterAdd={styles.boxStyleBaseAfterAdd}
          // codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
            this.setState(
              {
                code,
              },
              () => {
                this.handleSubmit();
              }
            );
          }}
          autoFocusOnLoad
        />

        <AppView center stretch height={20}>
          <SafeAreaView
            style={{
              flex: 1,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppButton
              processing={this.setSubmitting}
              onPress={this.handleSubmit}
              height={8}
              stretch
              backgroundColor="primary"
              marginHorizontal={7}
            >
              {this.state.setSubmitting ? (
                <AppView center>
                  <AppSpinner color="white" size={6} />
                </AppView>
              ) : (
                <AppText color="white" size={6}>
                  {I18n.t("next")}
                </AppText>
              )}
            </AppButton>
          </SafeAreaView>
        </AppView>
        <AppView stretch row center>
          <AppButton
            title={I18n.t("resend-code")}
            transparent
            noPadding
            marginLeft={2}
            disabled={this.state.time > 0}
          />

          <AppView marginRight={7}>
            <AppText color="#777777" bold right stretch>
              {moment
                .duration(this.state.time)
                .format("mm:ss", { stopTrim: "mm" })}
            </AppText>
          </AppView>
        </AppView>
      </AppView>
    );
  }
}
