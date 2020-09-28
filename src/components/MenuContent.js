import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView } from "react-native";
import { AppView, AppButton, AppImage, getColors } from "../common";
import {
  responsiveHeight,
  responsiveWidth,
  moderateScale
} from "../common/utils/responsiveDimensions";
import MenuItem from "./menuItem/MenuItem";
import index from "../assets/imgs/index.png";
import sideAkarat from "../assets/imgs/sideAkarat.png";
import sideFaaleat from "../assets/imgs/sideFaaleat.png";
import sideGas from "../assets/imgs/sideGas.png";
import sideHome from "../assets/imgs/sideHome.png";
import sideSeha from "../assets/imgs/sideSeha.png";
import sideMrkabat from "../assets/imgs/sideMrkabat.png";

class MenuContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.inVisible) {
      return <AppView />;
    }
    return (
      <React.Fragment>
        <AppButton
          onPress={() => this.props.onClose()}
          style={[
            styles.logo,
            {
              top: this.props.signUp
                ? responsiveHeight(10.5)
                : responsiveHeight(3.5),
              right: this.props.rtl ? responsiveWidth(35) : null,
              left: this.props.rtl ? null : responsiveWidth(35),
              borderBottomLeftRadius: this.props.rtl ? moderateScale(15) : null,
              borderTopLeftRadius: this.props.rtl ? moderateScale(15) : null,
              borderBottomRightRadius: this.props.rtl
                ? null
                : moderateScale(15),
              borderTopRightRadius: this.props.rtl ? null : moderateScale(15)
            }
          ]}
          elevation={3}
        >
          <AppImage source={index} width={10} height={5} resizeMode="contain" />
        </AppButton>

        <AppView
          style={[
            styles.container,
            {
              left: this.props.rtl ? null : 0,
              right: this.props.rtl ? 0 : null
            }
          ]}
        >
          <ScrollView style={styles.scrollContainer}>
            <MenuItem iconName={sideHome} iconType="image" />
            <MenuItem iconName={sideAkarat} iconType="image" />
            <MenuItem iconName={sideMrkabat} iconType="image" />
            <MenuItem iconName={sideSeha} iconType="image" />
            <MenuItem iconName={sideGas} iconType="image" />
            <MenuItem iconName={sideFaaleat} iconType="image" />
          </ScrollView>
        </AppView>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    width: responsiveWidth(35),
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 1000
  },

  logo: {
    position: "absolute",
    width: responsiveWidth(18),
    height: responsiveHeight(6),
    borderBottomLeftRadius: moderateScale(15),
    borderTopLeftRadius: moderateScale(15),
    borderBottomRightRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    borderColor: "#ddd",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },

  circle: {
    width: responsiveWidth(4),
    height: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    margin: moderateScale(0.5)
  },
  red: {
    backgroundColor: "#D0021B"
  },
  orange: {
    backgroundColor: "#F5A623"
  },
  blue: {
    backgroundColor: "#4A90E2"
  },
  green: {
    backgroundColor: "#7ED321"
  },

  scrollContainer: {
    alignSelf: "stretch"
  },
  scrollContainerView: {
    alignSelf: "stretch",
    marginTop: moderateScale(10)
  },
  photoContainer: {
    position: "absolute",
    top: moderateScale(-165),
    right: moderateScale(-100),
    // top:responsiveHeight(-65),rr
    // right: responsiveWidth(-60),
    width: responsiveWidth(150),
    height: responsiveWidth(150),
    borderRadius: 300,
    backgroundColor: getColors().primary
  },
  avatarContainer: {
    position: "absolute",
    top: responsiveHeight(16),
    right: responsiveWidth(8),
    width: responsiveWidth(32),
    height: responsiveWidth(32),
    borderRadius: responsiveWidth(32) / 2
  },
  avatar: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: responsiveWidth(25) / 2,
    borderWidth: 5,
    borderColor: "#fff"
  },
  profileIcon: {
    color: "black",
    marginHorizontal: 25
  },
  border: {
    borderWidth: getColors().inputBorderWidth,
    alignSelf: "center",
    borderColor: getColors().inputBorderColor,
    marginTop: responsiveHeight(2),
    // marginHorizontal:responsiveHeight(10),
    width: responsiveWidth(20),
    alignItems: "center"
  },
  containerHight: {
    height: responsiveHeight(27)
  },
  textColor: {
    color: getColors().primary
  },
  icon: {
    color: "#fff",
    position: "absolute",
    top: "5%",
    right: "5%"
  },
  signLaterButtonText: {
    marginVertical: moderateScale(3),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: moderateScale(5),
    fontSize: 17
  },
  button: {},
  textStyle: {
    marginHorizontal: moderateScale(5)
  },
  wallet: {
    marginHorizontal: moderateScale(3),
    color: "white"
  },
  customeWallet: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,

    backgroundColor: getColors().primary
  },
  iconDrawer: {
    backgroundColor: getColors().primary,
    color: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  walletContainer: {
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginLeft: moderateScale(3)
  }
});
export default connect(mapStateToProps)(MenuContent);
