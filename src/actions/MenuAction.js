import { CHANGE_MENU_STATUS } from './types';

export const changeMenuStatus = status => dispatch =>
  dispatch({ type: CHANGE_MENU_STATUS, payload: status });
