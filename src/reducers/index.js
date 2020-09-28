import { combineReducers } from "redux";

import lang from "./lang";
import network from "./network";
import list from "./list";
import auth from "./auth";
import location from "./location";
import bottomTabs from "./bottomTabs";
import loadingOverlay from "./loadingOverlay";
import MenuReducer from "./MenuReducer";
import tabs from "./tabs";
import counter from "./counter";
import notifications from "./notifications";
import order from "./orderRealTime";
export default combineReducers({
  lang,
  network,
  list,
  auth,
  location,
  bottomTabs,
  loadingOverlay,
  menu: MenuReducer,
  tabs,
  counter,
  notifications,
  order,
});
