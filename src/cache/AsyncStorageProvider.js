// current user in local storage
import AsyncStorage from "@react-native-community/async-storage";

export const getCurrentUser = async () => {
  let currentUser = null;

  try {
    currentUser = await AsyncStorage.getItem("@CurrentUser");
  } catch (error) {
    console.log("AsyncStorage#getItem error: ", error.message);
  }

  if (currentUser) {
    currentUser = JSON.parse(currentUser);
  }
  return currentUser;
};

export const saveCurrentUser = async currentUser => {
  try {
    user = await AsyncStorage.setItem(
      "@CurrentUser",
      JSON.stringify(currentUser)
    );
    return user;
  } catch (error) {
    console.log("AsyncStorage#getItem error: ", error.message);
  }
};

export const deleteCurrentUser = async () => {
  try {
    await AsyncStorage.removeItem("@CurrentUser");
    return true;
  } catch (error) {
    return false;
    console.log("AsyncStorage#getItem error: ", error.message);
  }
};

// current fcm token storage
export const getFCMToken = async () => {
  let token = null;

  try {
    token = JSON.parse(await AsyncStorage.getItem("@fcmToken"));
  } catch (error) {
    console.log("AsyncStorage#getItem error: ", error.message);
  }
  return token;
};

export const saveFCMToken = async token => {
  try {
    await AsyncStorage.setItem("@fcmToken",JSON.stringify(token));
  } catch (error) {
    console.log("AsyncStorage#setItem error: ", error.message);
  }
};

export const deleteFCMToken = async () => {
  try {
    await AsyncStorage.removeItem("@fcmToken");
    return true;
  } catch (error) {
    console.log("AsyncStorage#removeItem error: ", error.message);
    return false;
  }
};
