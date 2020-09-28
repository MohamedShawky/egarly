import React, { Component } from "react";
import I18n from "react-native-i18n";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { connect } from "react-redux";
import { AppView, AppText } from "../../common";
import styles from "./mapStyles";
import Colors from "../../common/defaults/colors";

class MapLocation extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.latitudeDelta = 0.007016387588862472;
    this.longitudeDelta = 0.004741139709949493;
  }

  animateToCustomLocation = (customLocation) => {
    this.setState(
      {
        currentLocation: { ...customLocation },
      },
      () => {
        if (this.mapRef) {
          this.mapRef.animateToRegion(
            {
              ...customLocation,
              latitudeDelta: this.latitudeDelta,
              longitudeDelta: this.longitudeDelta,
            },
            400
          );
        }
      }
    );
  };

  renderMap = () => (
    <MapView
      provider="google"
      ref={(ref) => (this.mapRef = ref)}
      style={[styles.container, {paddingTop:30}]}
      // rotateEnabled={false}
      // showsUserLocation={false}
      // showsMyLocationButton={false}
      // showsCompass={false}
      scrollEnabled={false}
      onMapReady={() =>
        this.animateToCustomLocation(this.props.currentLocation)
      }
    >
      {/* <Marker
        pinColor={Colors.primary}
        coordinate={this.props.currentLocation}
      /> */}
      <Marker coordinate={this.props.currentLocation} style={{
        position:'absolute',
        top:120,
        // bottom:-100,
      }}>
        <View
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            height: 80,
            width: 80,
            borderRadius: 40,
            opacity: 0.7,
          }}
        ></View>
      </Marker>
    </MapView>
  );

  render() {
    return (
      <AppView flex stretch>
        {this.renderMap()}
      </AppView>
    );
  }
}

const mapStateToProps = (state) => ({
  lang: state.lang.lang,
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps, null)(MapLocation);
