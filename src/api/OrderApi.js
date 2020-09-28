import Axios from "axios";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";
import * as errors from "../utils/Errors";
import { showSuccess } from "../common";

export const orderToRent = async (productToRent = { note, products }) => {
  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}order/add`,
      productToRent
    );
    console.log("reponse ===================", response);
    if (response.data.status) {
      showSuccess(response.data.message);
    }

    return response;
  } catch (error) {
    console.log("error ===================", error.response);

    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message
      };
    }
  }
};

export const getMyOrder = async () => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}orders`);
    console.log("reponse ===================", response);
    if (response.data.status) {
      showSuccess(response.data.message);
    }

    return response;
  } catch (error) {
    console.log("error ===================", error.response);

    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message
      };
    }
  }
};

export const changeOrderStatus = async (values = { order_id, status_id }) => {
  console.log("values", values);

  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}order/change_status`,
      values
    );
    console.log("reponse ===================", response);

    return true;
  } catch (error) {
    console.log("error ===================", error);

    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message
      };
    }
  }
};

export const getOrderById = async orderId => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}order/${orderId}`);
    console.log("reponse ===================", response);

    return response;
  } catch (error) {
    console.log("error ===================", error.response);

    if (!error.response) {
      throw errors.CONNECTION_ERROR;
    } else {
      throw {
        error: errors.GENERAL_ERROR,
        message: JSON.parse(JSON.stringify(error)).message
      };
    }
  }
};
