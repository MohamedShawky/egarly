import { API_ENDPOINT_HOME_SERVICE } from '../utils/Config';
import axios from 'axios';
import * as errors from '../utils/Errors';

export const appSettings = async () => {
  try {
    const earningOnOrder = await axios.get(
      `${API_ENDPOINT_HOME_SERVICE}app-settings/`,
    );
    return earningOnOrder.data;
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message,
      };
    }
  }
};
