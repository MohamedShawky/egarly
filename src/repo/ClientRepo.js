import * as clientApi from "../api/ClientApi";
import * as errors from "../utils/Errors";

export const isClient = async ({ userId }) => {
  try {
    const client = await clientApi.findById(userId);
    if (client) {
      return true;
    }
  } catch (error) {
    if (error === errors.CLIENT_NOT_FOUND) {
      return false;
    }
    throw error;
  }
};

export const createClient = async (identityImgs, user) => {
  const isClientCreated = await clientApi.createClient(identityImgs);
  notificationRepo.initSubscribtion(user);
  return isClientCreated;
};

export const addToFav = async (user, ...providersId) => {
  if (user) {
    const added = await clientApi.addToFav(user.user.id, ...providersId);
    return added;
  }
  throw errors.AUTHENTICATION_REQUIRED;
};

export const deleteFromFav = async (user, ...providersId) => {
  if (user) {
    const deleted = await clientApi.deleteFromFav(user.user.id, ...providersId);
    return deleted;
  }
  throw errors.AUTHENTICATION_REQUIRED;
};

export const blockProvider = async (user, ...providersId) => {
  if (user) {
    const isBlocked = await clientApi.blockProvider(
      user.user.id,
      ...providersId
    );
    return isBlocked;
  }
  throw errors.AUTHENTICATION_REQUIRED;
};

export const unBlockProvider = async (user, ...providersId) => {
  if (user) {
    const unBlocked = await clientApi.unBlockProvider(
      user.user.id,
      ...providersId,
    );
    return unBlocked;
  } 
    throw errors.AUTHENTICATION_REQUIRED;
  
};

export const getAddresses = async clientId => {
  const myAddresses = await clientApi.getAddresses(clientId);
  return myAddresses;
};

export const getUniqueAddress = async addressId => {
  const myAddresses = await clientApi.getUniqueAddress(addressId);
  return myAddresses;
};

export const addAddress = async data => {
  const isAdded = await clientApi.addAddress(data);
  return isAdded;
};

export const updateAddress = async (addressId, data) => {
  const isUpdated = await clientApi.updateAddress(addressId, data);
  return isUpdated;
};

export const deleteAddress = async addressId => {
  const isDeleted = await clientApi.deleteAddress(addressId);
  return isDeleted;
};

export const createAddress = async (
  values = {
    area,
    description,
    location: {
      lat,
      lng
    },
    alias
  }
) => {
  const address = await clientApi.createAddress(values);
  return address;
};

export const updateSeenNotification = async (clientId, notificationId) => {
  const isSeen = await clientApi.updateSeenNotification(
    clientId,
    notificationId
  );
  return isSeen;
};

export const changeRecieveNotificationRepo = async (
  clientId,
  receivePushNotifications
) => {
  const isChanged = await clientApi.changeRecieveNotification(
    clientId,
    receivePushNotifications
  );
  return isChanged;
};

export const getClient = async userId => {
  try {
    const client = await clientApi.findById(userId);
    return client;
  } catch (error) {
    if (error === errors.CLIENT_NOT_FOUND) {
      return false;
    }
    throw error;
  }
};

export const changeLanguageRepo = async (clientId, language) => {
  const isChanged = await clientApi.changeLanguage(clientId, language);
  return isChanged;
};
