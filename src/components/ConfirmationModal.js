import React, { Component } from "react";
import { AppView, AppText, AppModal, AppButton, AppSpinner } from "../common";
import { connect } from "react-redux";
class ConfirmationModal extends Component {
  static defaultProps = {
    isAsyncConfirmProgress: false
  };

  render() {
    const { isVisible, ...rest } = this.props;

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        lock
        {...rest}
      >
        <AppView width={75} backgroundColor="white" touchableOpacity>
          <AppText
            left
            color="foreground"
            bold
            marginTop={10}
            size={6}
            marginHorizontal={5}
          >
            {this.props.title}
          </AppText>

          {/* <AppView width={70}> */}
          <AppText
            marginTop={5}
            color="#5F5F5F"
            size={5.5}
            marginHorizontal={5}
          >
            {this.props.desc}
          </AppText>
          {/* </AppView> */}

          <AppView stretch row height={8} right marginTop={15} paddingLeft={25}>
            {this.props.isAsyncConfirmProgress ? (
              <AppView stretch center flex>
                <AppSpinner size={12} />
              </AppView>
            ) : (
              <>
                {this.props.yesLabel && this.props.onConfirm && (
                  <AppButton
                    title={this.props.yesLabel}
                    backgroundColor="primary"
                    flex
                    stretch
                    margin={3}
                    paddingVertical={0}
                    touchableOpacity
                    onPress={this.props.onConfirm}
                  />
                )}

                {this.props.noLabel && this.props.onCancel && (
                  <AppButton
                    title={this.props.noLabel}
                    backgroundColor="white"
                    color="primary"
                    bc="primary"
                    br={1}
                    bw={1}
                    flex
                    stretch
                    margin={3}
                    paddingVertical={0}
                    touchableOpacity
                    onPress={this.props.onCancel}
                  />
                )}
              </>
            )}
          </AppView>
        </AppView>
      </AppModal>
    );
  }
}

const mapstateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapstateToProps)(ConfirmationModal);
