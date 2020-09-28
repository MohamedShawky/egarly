import { Dimensions, PixelRatio, Platform, StatusBar } from "react-native";

import store from "../../store";
import { FONT_SIZE_DELTA } from "./Constants";

const { roundToNearestPixel } = PixelRatio;

const decorateHeights = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export const APPBAR_HEIGHT = Platform.OS === "ios" ? 54 : 60;

export const { width: windowWidth } = Dimensions.get("window");
export const windowHeight = Dimensions.get("window").height - decorateHeights;

export const { width: screenWidth } = Dimensions.get("screen");
export const screenHeight = Dimensions.get("screen").height - decorateHeights;

const maxWidth = 420;
const maxHeight = 800;

export const aspectRatio = () => windowHeight / windowWidth;

export const responsiveWidth = w =>
  roundToNearestPixel(Math.min(maxWidth, windowWidth) * (w / 100));

export const responsiveHeight = h =>
  roundToNearestPixel(Math.min(maxHeight, windowHeight) * (h / 100));

export const heightPercent = h =>
  parseFloat(((h / windowHeight) * 100).toFixed(2));

export const moderateScale = (size, factor = 0.5) => {
  const rw = Math.min(maxWidth, windowWidth) * (size / 100);

  return roundToNearestPixel(size + (rw - size) * factor);
};

export const responsiveFontSize = (f, factor = 0.5) => {
  const rw = Math.min(maxWidth, windowWidth) * (f / 100);
  const state = store.getState();
  return roundToNearestPixel(
    f + (rw - f) * factor * (state.lang.rtl ? 1 : FONT_SIZE_DELTA)
  );
};

//export { windowWidth, windowHeight, screenWidth, screenHeight };
