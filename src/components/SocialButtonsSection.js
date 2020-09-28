import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AppView, AppText } from "../common";
import SocialButton from "./SocialButton";
import { onSignInFacebook, onSignInGoogle } from "../actions/AuthActions";
import googleImg from "../assets/imgs/google.png";
import facebookImg from "../assets/imgs/facebook.png";

class SocialSection extends Component {
  render() {
    return (
      <AppView stretch center {...this.props}>
        <AppText marginBottom={this.props.titleMarginBottom || 8} size={5}>
          {this.props.text}
        </AppText>
        <AppView row stretch center>
          <SocialButton
            stretch
            transparent
            socialImage={googleImg}
            onPress={this.props.onSignInGoogle}
            size={15}
            marginHorizontal={5}
          />

          <SocialButton
            size={15}
            stretch
            transparent
            socialImage={facebookImg}
            onPress={this.props.onSignInFacebook}
            marginHorizontal={5}
          />
        </AppView>
      </AppView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onSignInGoogle: bindActionCreators(onSignInGoogle, dispatch),
  onSignInFacebook: bindActionCreators(onSignInFacebook, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialSection);
