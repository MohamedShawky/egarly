import Axios from "axios";
import * as ProductApi from "../api/ProductApi";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";

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
  console.log("product ==>>", product);

  const response = await ProductApi.addProduct(product);
  return response;
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
    product_id,
  },
  product_id
) => {
  console.log("product ==>>", product);

  const response = await ProductApi.updateProduct(product, product_id);
  return response;
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
  console.log("product ==>>", product);

  const response = await ProductApi.addOffer(product);
  return response;
};

export const addProductToFavorite = async (productId) => {
  const isAddToFav = await ProductApi.addProductToFavorite(productId);
  return isAddToFav;
};

export const removeProductToFavorite = async (productId) => {
  const isAddToFav = await ProductApi.removeProductToFavorite(productId);
  return isAddToFav;
};
export const addProductToShare = async (productId) => {
  const isAddToFav = await ProductApi.addProductToShare(productId);
  return isAddToFav;
};

export const removeProductToShare = async (productId) => {
  const isAddToFav = await ProductApi.removeProductToShare(productId);
  return isAddToFav;
};

export const getNearstProduct = async (values) => {
  console.log("())()(***********************", values);

  const data = { ...values };
  data.distance = 100;
  const nearstProduct = await ProductApi.getNearstProduct(data);
  return nearstProduct;
};

export const getAllAdvertisment = async () => {
  const response = await ProductApi.getAllAdvertisment();
  return response;
};

export const getAdvertismentById = async (advertisementID) => {
  const response = await ProductApi.getAdvertismentById(advertisementID);
  return response;
};

export const getAllCategeory = async () => {
  const response = await ProductApi.getAllCategeory();
  return response;
};

export const getAlltatus = async () => {
  const response = await ProductApi.getAlltatus();
  return response;
};

export const getAllJobs = async () => {
  const response = await ProductApi.getAllJobs();
  return response;
};

export const getMyProduct = async () => {
  const response = await ProductApi.getMyProduct();
  return response;
};

export const getMyWishList = async () => {
  const response = await ProductApi.getMyWishList();
  return response;
};

export const changeProductStatus = async (
  values = { product_id, is_active }
) => {
  const response = await ProductApi.changeProductStatus(values);
  return response;
};

export const productReport = async (values = { product_id, is_active }) => {
  const response = await ProductApi.productReport(values);
  return response;
};
export const distinguishStatuses = async (values) => {
  console.log("values", values);

  const response = await ProductApi.distinguishStatuses(values);
  return response;
};

export const getAllProductProduct = async () => {
  const response = await ProductApi.getAllProduct();
  return response.data.data;
};

export const getAllSubmitedOrder = async () => {
  const response = await ProductApi.getAllSubmitedOrder();
  return response;
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
  const response = await ProductApi.setProductDistinguish(values);
  return response;
};

export const getStatusOfDistinguish = async () => {
  const response = await ProductApi.getStatusOfDistinguish();
  return response;
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
  const response = await ProductApi.searchProduct(values);
  return response;
};

export const getProductdetails = async (id) => {
  const product = await ProductApi.getProductdetails(id);
  return product;
};

export const hideProduct = async (product_id, is_active) => {
  console.log("product_id, is_active", product_id, is_active);

  const isHide = await ProductApi.hideProduct(product_id, is_active);
  return isHide;
};

export const deleteProduct = async (product_id) => {
  const isDeleted = await ProductApi.deleteProduct(product_id);
  return isDeleted;
};
