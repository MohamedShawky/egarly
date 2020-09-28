import React, { Component } from 'react';
import styles from './styles';
import Swiper from 'react-native-swiper';
import { ImagePlaceholder } from '..';
import {connect} from 'react-redux'

class ImageSwiper extends Component {

  static defaultProps = {
    showLoading:false
  }

  render() {
    console.log('data', this.props.data);

    return (
      <Swiper
        loop
        horizontal
        autoplayTimeout={4}
        dotStyle={styles.dotStyles}
        activeDotStyle={styles.activeDotStyles}
        index={this.props.rtl ? this.props.data.length - 1 : 0 }
        containerStyle={styles.swiper}
      >
        {this.props.data.map((img,index) => (
          <ImagePlaceholder
            key={index}
            style={{ flex: 1 }}
            duration={1000}
            showActivityIndicator={this.props.showLoading}
            src={img.original || img}
            placeholder={img.medium}
          />
        ))}
      </Swiper>
    );
  }
}

const mapStateToProps = state => ({
  rtl:state.lang.rtl
})

export default  connect(mapStateToProps)(ImageSwiper)
