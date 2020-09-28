import Axios from "axios";
import * as OrderApi from "../api/OrderApi";
import { API_ENDPOINT_GATEWAY } from "../utils/Config";

export const orderToRent = async (productToRent = { note, products }) => {
  console.log("product ==>>", productToRent);

  const response = await OrderApi.orderToRent(productToRent);
  return response;
};

export const getOrderById =async (order_id)=>{
  const response = await OrderApi.getOrderById(order_id)
  return response.data
}

export const getMyOrder = async () => {
  const response = await OrderApi.getMyOrder();
  return response;
};
export const changeOrderStatus = async (values = { order_id, status_id }) => {
  const isChanged = await OrderApi.changeOrderStatus(values);
  return isChanged;
};
