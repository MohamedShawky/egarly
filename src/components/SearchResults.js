import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { AppView, AppText, AppImage, AppStarRating, AppIcon } from '../common';
import testimg from '../assets/imgs/rec.png';

class SearchResults extends Component {
  renderImage = () => {
    const { cardWidth, height } = this.props;

    const width = cardWidth;
    return (
      <AppView width={width * 0.4} stretch>
        <AppImage
          source={{ uri: this.props.data.mainImg.medium }}
          width={width * 0.4}
          height={height}
        />
      </AppView>
    );
  };

  renderDescription = () => {
    const { data, width } = this.props;
    return (
      <AppView stretch width={width * 0.6} padding={5} flex>
        <AppView stretch flex topSelf top>
          <AppText bold>{data.name}</AppText>
        </AppView>
        <AppView stretch flex centerSelf centerY>
          <AppText numberOfLines={2} lineHeight={8} color="#919191">
            {data.description}
          </AppText>
        </AppView>
        <AppView bottom stretch row flex bottomSelf>
          <AppText color="primary" bold size={8}>
            {data.price}
          </AppText>
          <AppText marginTop={3} padding={1} color="lightgrey">
            {I18n.t('EGP')}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  render() {
    const { rest } = this.props;
    return (
      <AppView
        // flex
        row
        borderRadius={5}
        elevation={5}
        stretch
        {...this.props}
        {...rest}
      >
        {this.renderImage()}
        {this.renderDescription()}
      </AppView>
    );
  }
}

export default SearchResults;
