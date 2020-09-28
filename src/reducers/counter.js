import { SET_TOTAL_COUNTER } from "../actions/types";

const initialState = {
  totalCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOTAL_COUNTER:
      return { ...state, totalCount: action.payload };

    default:
      return state;
  }
};

export default reducer;
