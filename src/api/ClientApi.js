import axios from 'axios';
import { API_ENDPOINT_HOME_SERVICE } from '../utils/Config';
import * as errors from '../utils/Errors';

export const findById = async userId => {
  try {
    const res = await axios.get(
      `${API_ENDPOINT_HOME_SERVICE}clients/${userId}`,
    );
    return res.data;
  } catch (error) {
    console.log('====================================');
    console.log(JSON.parse(JSON.stringify(error)));
    console.log('====================================');
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else if (error.response.status === 404) {
      throw errors.CLIENT_NOT_FOUND;
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};

export const createClient = async identityImgs => {
  try {
    await axios.post(`${API_ENDPOINT_HOME_SERVICE}clients`, identityImgs);
    return true;
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

export const addToFav = async (clientId, ...providersId) => {
  try {
    await axios.post(
      `${API_ENDPOINT_HOME_SERVICE}clients/${clientId}/favourite`,
      {
        favouriteProviders: providersId,
      },
    );
    return true;
  } catch (error) {
    console.log(error.response);
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

export const deleteFromFav = async (clientId, ...providersId) => {
  try {
    await axios.post(
      `${API_ENDPOINT_HOME_SERVICE}clients/${clientId}/unfavourite`,
      {
        favouriteProviders: providersId,
      },
    );
    return true;
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

export const blockProvider = async (clientId, ...providersId) => {
  try {
    await axios.post(`${API_ENDPOINT_HOME_SERVICE}clients/${clientId}/block`, {
      blockedProviders: providersId,
    });
    return true;
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

export const unBlockProvider = async (clientId, ...providersId) => {
  try {
    await axios.post(
      `${API_ENDPOINT_HOME_SERVICE}clients/${clientId}/unblock`,
      {
        blockedProviders: providersId,
      },
    );
    return true;
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

export const getAddresses = async clientId => {
  const { CancelToken } = axios;

  try {
    const source = CancelToken.source();
    const response = await axios.get(
      `${API_ENDPOINT_HOME_SERVICE}clients/${clientId}/addresses`,
      {
        cancelToken: source.token,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
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

export const getUniqueAddress = async addressId => {
  const { CancelToken } = axios;

  try {
    const source = CancelToken.source();
    const response = await axios.get(
      `${API_ENDPOINT_HOME_SERVICE}/addresses/${addressId}`,
      {
        cancelToken: source.token,
      },
    );
    return response.data;
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

export const addAddress = async (
  data = { area, description, location, alias },
) => {
  try {
    await axios.post(`${API_ENDPOINT_HOME_SERVICE}addresses`, {
      area: data.area,
      description: data.description,
      location: {
        lat: data.location.lat,
        lng: data.location.lng,
      },
      alias: data.alias,
    });
    return true;
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

export const updateAddress = async (
  addressId,
  data = { area, description, location, alias },
) => {
  try {
    await axios.put(`${API_ENDPOINT_HOME_SERVICE}addresses/${addressId}`, data);
    return true;
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

export const deleteAddress = async addressId => {
  try {
    await axios.delete(`${API_ENDPOINT_HOME_SERVICE}addresses/${addressId}`);
    return true;
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

export const createAddress = async (
  values = {
    area,
    description,
    location: {
      lat,
      lng,
    },
    alias,
  },
) => {

  try {
    const res = await axios.post(
      `${API_ENDPOINT_HOME_SERVICE}addresses`,
      values,
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    console.log(error.response);

    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};

export const updateSeenNotification = async (clientId, notificationId) => {
  try {
    await axios.patch(
      `${API_ENDPOINT_HOME_SERVICE}clients/${clientId}/notifications/${notificationId}/seen`,
    );
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};

export const changeRecieveNotification = async (
  clientId,
  receivePushNotifications,
) => {
  try {
    const data = new FormData();
    data.append('receivePushNotifications', receivePushNotifications);
    await axios.patch(`${API_ENDPOINT_HOME_SERVICE}clients/${clientId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};

export const changeLanguage = async (
  clientId,
  language,
) => {
  try {
    const data = new FormData();
    data.append('language', language);
    await axios.patch(`${API_ENDPOINT_HOME_SERVICE}clients/${clientId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw errors.GENERAL_ERROR;
    }
  }
};