import React, { Component } from "react";

import {
  AppView,
  AppScrollView,
  AppIcon,
  AppNavigation,
  AppImage,
  AppInputError,
} from "../common";

import LightBox from "./LightBox";
import upload from "../assets/imgs/upload.png";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
export default class Imagesicker extends Component {
  static defaultProps = {
    maxImages: 10,
    noValidation: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: props.data ? props.data || [] : [],
      isLightBoxVisible: false,
      currentImageIndex: undefined,
      isTouched: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isTouched: nextProps.isTouched,
    });
  }

  handleChange = () => {
    const { name, onChange, requiredImages, maxImages } = this.props;

    let imgs = this.state.images;
    if (requiredImages && requiredImages !== this.state.images.length) {
      imgs = [];
    }

    if (maxImages === 1) {
      if (imgs.length) imgs = imgs[0];
      else imgs = "";
    }

    if (onChange) {
      if (name) {
        onChange(
          name,
          imgs,
          requiredImages === 1
            ? false
            : !(
                this.state.images.length === 0 ||
                (requiredImages && imgs.length === requiredImages)
              )
        );
      } else onChange(imgs);
    }
  };

  onPickImage = () => {
    const options = {
      noData: true,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        console.log("response ==>", response);

        const { uri, width, height } = response;
        this.setState(
          (prevState) => ({
            images: [...prevState.images, uri],
          }),
          () => {
            this.handleChange();
          }
        );
        // if (response.originalRotation === 90 ) {
        //   this.resize(uri, width, height);
        // } else {
        //   this.setState(
        //     (prevState) => ({
        //       images: [...prevState.images, uri],
        //     }),
        //     () => {
        //       this.handleChange();
        //     }
        //   );
        // }
      }
    });
  };
  resize = (uri, width, height) => {
    ImageResizer.createResizedImage(uri, width, height, "JPEG", 100, -180)
      .then(({ uri }) => {
        this.setState(
          (prevState) => ({
            images: [...prevState.images, uri],
          }),
          () => {
            this.handleChange();
          }
        );
      })
      .catch((err) => {
        console.log(err);
        return Alert.alert(
          "Unable to resize the photo",
          "Check the console for full the error message"
        );
      });
  };
  addNewImage = () => {
    if (!this.props.editable) return;

    if (this.props.pickImage) {
      this.onPickImage();
    } else {
      AppNavigation.push({
        name: "photoSelection",
        passProps: {
          headerTitle: this.props.headerTitle,
          action: (uri) => {
            this.setState(
              (prevState) => ({
                images: [...prevState.images, uri],
              }),
              () => {
                this.handleChange();
              }
            );
          },
        },
      });
    }
  };

  showImage = (index) => {
    if (!this.props.editable) return;

    this.setState({
      isLightBoxVisible: true,
      currentImageIndex: index,
    });
  };

  renderPlaceholder = () => (
    <AppView
      disabled
      borderColor={this.props.borderColor ? this.props.borderColor : "primary"}
      borderWidth={1}
      circleRadius={this.props.circleRadius ? this.props.circleRadius : 12}
      backgroundColor="#f5f5f5"
      center
      marginHorizontal={this.props.maxImages ? 3 : undefined}
      onPress={!this.props.disabledAddButton ? this.addNewImage : null}
    >
      <AppIcon name="add" type="material" size={12} color="#BFC0BF" />
    </AppView>
  );

  renderPlaceholderImage = () => (
    <AppView
      center
      onPress={this.addNewImage}
      backgroundColor="white"
      width={22}
      height={11}
      borderColor="#E6E8EA"
      borderWidth={1}
      borderRadius={7}
      // marginRight={this.props.margin}
    >
      <AppIcon name="add" type="material" size={12} color="primary" />
    </AppView>
  );

  render() {
    const {
      error,
      upload,
      errorTextMarginHorizontal,
      noPlaceholder,
      circleRadius,
      noValidation,
      view,
      ...rest
    } = this.props;

    const Container = upload
      ? this.renderPlaceholderImage()
      : noPlaceholder
      ? null
      : this.renderPlaceholder();
    const ContainerWraper = view ? AppView : AppScrollView;
    return (
      <>
        <ContainerWraper
          {...rest}
          horizontal
          stretch
          alwaysBounceHorizontal={false}
        >
          {this.state.images.map((img, index) =>
            upload ? (
              <AppImage
                key={String(index)}
                source={{
                  uri: img,
                }}
                borderWidth={1}
                borderColor="grey"
                marginHorizontal={
                  this.props.marginHorizontalPick ? 3 : undefined
                }
                // equalSize={15}
                borderRadius={7}
                width={22}
                height={11}
                // circleRadius={circleRadius || 12}
                onPress={() => {
                  this.showImage(index);
                }}
              />
            ) : (
              <AppImage
                key={String(index)}
                source={{
                  uri: img,
                }}
                borderWidth={1}
                borderColor="grey"
                circleRadius={this.props.circleRadius ? circleRadius : 12}
                marginHorizontal={3}
                onPress={() => {
                  this.showImage(index);
                }}
              />
            )
          )}
          {this.state.images.length < this.props.maxImages ? Container : null}
        </ContainerWraper>
        {noValidation && (
          <AppInputError
            error={this.state.isTouched ? error : " "}
            errorTextMarginHorizontal={errorTextMarginHorizontal ? 4 : 10}
            size={5}
          />
        )}

        <LightBox
          isVisible={this.state.isLightBoxVisible}
          images={this.state.images}
          currentImageIndex={this.state.currentImageIndex}
          changeImages={(imgs) => {
            this.setState(
              {
                images: imgs,
              },
              () => {
                this.handleChange();
              }
            );
          }}
          changeState={(v) => {
            this.setState({
              isLightBoxVisible: v,
            });
          }}
        />
      </>
    );
  }
}
