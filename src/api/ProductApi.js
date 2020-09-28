import Axios from "axios";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";
import * as errors from "../utils/Errors";
import { showSuccess } from "../common";

export const addProduct = async (
  product = {
    en_title,
    ar_title,
    categories,
    en_description,
    ar_description,
    quantity,
    price_per_day,
    price_per_week,
    price_per_month,
    status,
    images,
    longitude,
    latitude,
    job_id,
  }
) => {
  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}product/add`,
      product
    );
    console.log("reponse", response);

    return response;
  } catch (error) {
    console.log("error _________________===================", error.response);

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

export const addOffer = async (
  product = {
    en_title,
    ar_title,
    categories,
    en_description,
    ar_description,
    quantity,
    price_per_day,
    price_per_week,
    price_per_month,
    status,
    images,
    longitude,
    latitude,
    job_id,
  }
) => {
  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}submitted_order/add`,
      product
    );
    console.log("reponse", response);

    return response;
  } catch (error) {
    console.log("error _________________===================", error.response);

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
export const updateProduct = async (
  product = {
    en_title,
    ar_title,
    categories,
    en_description,
    ar_description,
    quantity,
    price_per_day,
    price_per_week,
    price_per_month,
    status,
    images,
    longitude,
    latitude,
  },
  product_id
) => {
  console.log("product_id", product_id);

  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}product/update/${product_id}`,
      product
    );
    console.log("reponse===>>", response);

    return response;
  } catch (error) {
    console.log("error.response", error);

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

export const addProductToFavorite = async (productId) => {
  try {
    const isAddToFav = await Axios.post(`${API_ENDPOINT_GATEWAY}wishlist/add`, {
      product_id: productId,
    });
    console.log("*****************", isAddToFav);
    // showSuccess(isAddToFav.data.message);

    return true;
  } catch (error) {
    console.log("error", error);

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

export const removeProductToFavorite = async (productId) => {
  try {
    const isAddToFav = await Axios.post(
      `${API_ENDPOINT_GATEWAY}wishlist/delete`,
      {
        product_id: productId,
      }
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

export const addProductToShare = async (productId) => {
  try {
    const isAddToFav = await Axios.post(`${API_ENDPOINT_GATEWAY}share/add`, {
      product_id: productId,
    });
    console.log("*****************", isAddToFav);
    showSuccess(isAddToFav.data.message);

    return true;
  } catch (error) {
    console.log("error", error);

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

export const removeProductToShare = async (productId) => {
  try {
    const isAddToFav = await Axios.post(`${API_ENDPOINT_GATEWAY}share/delete`, {
      product_id: productId,
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
export const getNearstProduct = async (
  values = { longitude, latitude, distance }
) => {
  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}products/nearest`,
      values
    );
    return response.data.data;
  } catch (error) {
    console.log("nearst error ==>>", error.response);

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

export const getAllAdvertisment = async () => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}advertisement`);

    console.log("responsee", response);

    return response.data.advertisement;
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

export const getAdvertismentById = async (advertisementID) => {
  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}advertisement/${advertisementID}`
    );
    return response;
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

export const getAllCategeory = async () => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}categories`);
    console.log("response categories", response);

    return response.data.categories;
  } catch (error) {
    console.log("cated error ", error.response);

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

export const getAlltatus = async () => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}product/status`);
    console.log("response status", response);

    return response.data;
  } catch (error) {
    console.log("error ===>>>>>", error.response);

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

export const getAllJobs = async () => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}jobs`);
    console.log("response jobs", response);

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

export const getMyProduct = async () => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}products`);
    console.log("response products ====>>>>>>>>>", response);

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

export const getMyWishList = async () => {
  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}wishlist`);
    console.log("response products ====>>>>>>>>>", response);

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

export const changeProductStatus = async (
  values = { product_id, is_active }
) => {
  console.log("change status", values);

  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}product/change_active_status`,
      values
    );
    console.log("response products ====>>>>>>>>>", response);

    return response.data;
  } catch (error) {
    console.log("errorr===>", JSON.parse(JSON.stringify(error)));

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

export const distinguishStatuses = async () => {
  try {
    const res = await Axios.get(
      `${API_ENDPOINT_GATEWAY}product/distinguish/statuses`
    );

    return res.data;
  } catch (error) {
    console.log("error ==>>", error.response);

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

export const getAllProduct = async () => {
  console.log("get All Product");

  try {
    const response = await Axios.get(`${API_ENDPOINT_GATEWAY}products/all`);
    console.log("response ==>", response);

    return response;
  } catch (error) {
    console.log("error ==>>", JSON.parse(JSON.stringify(error)));

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

export const getAllSubmitedOrder = async () => {
  try {
    const response = await Axios.get(
      `${API_ENDPOINT_GATEWAY}submitted_orders/all`
    );
    console.log("res ---", response.data.data);

    return response.data.data;
  } catch (error) {
    console.log("error ==>>", error);

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

export const setProductDistinguish = async (
  values = {
    product_id,
    distinction_status_id,
    price_day,
    price_week,
    price_month,
    from_date,
    to_date,
    message,
  }
) => {
  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}product/distinguish/request`,
      values
    );
    console.log("res ---", response.data);

    return response.data;
  } catch (error) {
    console.log("error ==>>", error.response);

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

export const searchProduct = async (
  values = {
    longitude,
    latitude,
    distance,
    search_str,
    price_from,
    price_to,
    categories,
  }
) => {
  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}products/search`,
      values
    );
    console.log("resresponse ---", response);

    return response.data.data;
  } catch (error) {
    console.log("error __++++ ==>>", error.response);

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

export const productReport = async (values = { product_id, is_active }) => {
  console.log("change status", values);

  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}product/report`,
      values
    );
    console.log("response products ====>>>>>>>>>", response);

    return response.data;
  } catch (error) {
    console.log("errorr===>", JSON.parse(JSON.stringify(error)));

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

// http://ejarly.dev.fudexsb.com/api/product/distinguish/statuses

export const getStatusOfDistinguish = async () => {
  try {
    const response = await Axios.get(
      `${API_ENDPOINT_GATEWAY}product/distinguish/statuses`
    );
    console.log("response ==>", response);

    return response.data;
  } catch (error) {
    console.log("error ==>>", error);

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

export const getProductdetails = async (id) => {
  try {
    const response = await Axios.get(
      `${API_ENDPOINT_GATEWAY}product/details/${id}`
    );
    console.log("product/details ==>", response);

    return response.data;
  } catch (error) {
    console.log("error ==>>", error);

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

export const hideProduct = async (product_id, is_active) => {
  console.log("product_id, is_active", product_id, is_active);

  try {
    const response = await Axios.post(
      `${API_ENDPOINT_GATEWAY}product/show_hide_product/${product_id}`,
      {
        is_active: is_active,
      }
    );
    console.log("product/details ==>", response);

    return response.data;
  } catch (error) {
    console.log("error ==>>", error);

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

export const deleteProduct = async (product_id) => {
  console.log("product_id, is_active", product_id);

  try {
    const response = await Axios.post(`${API_ENDPOINT_GATEWAY}product/delete`, {
      id: product_id,
    });
    console.log("product/details ==>", response);

    return response.data;
  } catch (error) {
    console.log("error ==>>", error);

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
