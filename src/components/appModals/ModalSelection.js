import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { AppView, AppText, AppModal, AppButton, showError } from "../../common";

class ModalSelection extends Component {
  render() {
    const { isVisible, ...rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        {...rest}
      >
        <AppView
          width={80}
          backgroundColor="white"
          paddingVertical={4}
          borderRadius={5}
        >
          <AppView marginHorizontal={6} stretch paddingTop={5} centerX marginBottom={7}>
            <AppText center bold>
              {this.props.message}
            </AppText>
            <AppText center lineHeight={8.5} color="#5F5F5F" marginTop={5}>
              {this.props.hint && I18n.t("log-out-text")}
            </AppText>
          </AppView>

          <AppView row marginTop={10} marginHorizontal={6} stretch>
            <AppButton
              title={I18n.t("add-new")}
              touchableOpacity
              onPress={() => this.props.addNewProduct()}
              backgroundColor="#fff"
              borderColor="primary"
              borderWidth={1}
              height={6}
              flex
              color="primary"
              
            />
            <AppView width={5} />
            <AppButton
              title={I18n.t("select-product")}
              touchableOpacity
              onPress={() => {
                this.props.onSelectFromProducts();
              }}
              height={6}
              flex
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  }
}
const mapStateToProp = (state) => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
});
const mapDispatchToProps = (dispatch) => ({
  //   logout: bindActionCreators(logout, dispatch)
});

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(ModalSelection);
