import createDeepstream from "deepstream.io-client-js";
import { DEEPSTREAM_ENDPOINT } from "../../utils/Config";
import * as errors from "../../utils/Errors";

const options = {
  maxReconnectInterval: 1000,
  reconnectIntervalIncrement: 200,
  // maxReconnectAttempts: Infinity,
  heartbeatInterval: 60000,
  // reconnectIntervalIncrement: 1000,
  maxReconnectAttempts: Infinity,
  silentDeprecation: true
  // heartbeatInterval: 6000,
};

let client = null;

export const createClient = onConnectionStateChanged => {
  console.log("create client -- d");

  client = createDeepstream(DEEPSTREAM_ENDPOINT, options);
  client.on("connectionStateChanged", connection => { 
    if (onConnectionStateChanged) onConnectionStateChanged(connection);
    console.log(`Connection State Changed: ${connection}`);   
  });
  client.on("error", (error, event, topic) => console.log(error, event, topic));
};

export const getClient = () => client;

export const anonymousLogin = () => {
  client.login();
};

export const authLogin = (accessToken, type, userId, onSuccess) => { 
  console.log("DS login",accessToken, type, userId);
  return new Promise((resolve, reject) => {
    if (!client) {
      console.log("test ",{
        id: userId,
        accessToken,
        loginAs: ("HSA-"+type).toLowerCase() 
      });
      
      createClient();
      client.login(
        {
          id: userId,
          accessToken,
          loginAs: ("HSA-"+type).toLowerCase() 
        },
        (success, data) => {
          console.log("DS callback",success, data);
          console.log(success);
          if (success) resolve(data);
          else reject(new Error("DeepStream error"));
        }
      );
    } else {
      console.log("DS already created");
      // client.presence.getAll((error, usernames) => {
      //   console.log("TCL: authLogin -> error, usernames", error, usernames)
      //     // error = null, usernames = ['Homer', 'Marge', 'Lisa']
      //   })

      resolve();
    }
  });
};

export const close = () => {
  client.close();
  client = null;
};
