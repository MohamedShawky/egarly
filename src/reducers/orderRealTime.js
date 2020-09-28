import { SET_SUBSCREIBED } from '../actions/types';

const initialState = {
  isSubscribed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCREIBED:
      return { ...state, isSubscribed: action.payload };
    default:
      return state;
  }
};

export default reducer;
