import * as types from "../actions/types";
import { windowHeight, responsiveHeight } from "../common";

// const windowHeight = 100;
const initialState = {
  dim: [0, 0, 0]
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.TABS_CONTENT_DIMENSIONS:
      const dim = [...state.dim];
      dim[payload.index] = payload.height;
      return { ...state,dim };
    default:
      return state;
  }
};
