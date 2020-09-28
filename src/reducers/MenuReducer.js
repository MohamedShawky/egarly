import * as types from '../actions/types';

const initialState = {
  menuOpened: false,
};

const MenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_MENU_STATUS:
      console.log('status -->', action.payload);

      return { ...state, menuOpened: action.payload };

    default:
      return state;
  }
};

export default MenuReducer;
