"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatusOfDistinguish = exports.productReport = exports.searchProduct = exports.setProductDistinguish = exports.getAllSubmitedOrder = exports.getAllProduct = exports.distinguishStatuses = exports.changeProductStatus = exports.getMyWishList = exports.getMyProduct = exports.getAllJobs = exports.getAlltatus = exports.getAllCategeory = exports.getAdvertismentById = exports.getAllAdvertisment = exports.getNearstProduct = exports.removeProductToShare = exports.addProductToShare = exports.removeProductToFavorite = exports.addProductToFavorite = exports.updateProduct = exports.addProduct = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Config = require("../utils/Config");

var errors = _interopRequireWildcard(require("../utils/Errors"));

var _common = require("../common");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addProduct = function addProduct() {
  var product,
      response,
      _args = arguments;
  return regeneratorRuntime.async(function addProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          product = _args.length > 0 && _args[0] !== undefined ? _args[0] : {
            en_title: en_title,
            ar_title: ar_title,
            categories: categories,
            en_description: en_description,
            ar_description: ar_description,
            quantity: quantity,
            price_per_day: price_per_day,
            price_per_week: price_per_week,
            price_per_month: price_per_month,
            status: status,
            images: images,
            longitude: longitude,
            latitude: latitude,
            job_id: job_id
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "product/add"), product));

        case 4:
          response = _context.sent;
          console.log("reponse", response);
          return _context.abrupt("return", response);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.log("error _________________===================", _context.t0.response);

          if (_context.t0.response) {
            _context.next = 16;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 16:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context.t0)).message
          };

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.addProduct = addProduct;

var updateProduct = function updateProduct() {
  var product,
      response,
      _args2 = arguments;
  return regeneratorRuntime.async(function updateProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          product = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {
            en_title: en_title,
            ar_title: ar_title,
            categories: categories,
            en_description: en_description,
            ar_description: ar_description,
            quantity: quantity,
            price_per_day: price_per_day,
            price_per_week: price_per_week,
            price_per_month: price_per_month,
            status: status,
            images: images,
            longitude: longitude,
            latitude: latitude
          };
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "product/add"), product));

        case 4:
          response = _context2.sent;
          console.log("reponse");
          return _context2.abrupt("return", response);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0.response);

          if (_context2.t0.response) {
            _context2.next = 16;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 16:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context2.t0)).message
          };

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.updateProduct = updateProduct;

var addProductToFavorite = function addProductToFavorite(productId) {
  var isAddToFav;
  return regeneratorRuntime.async(function addProductToFavorite$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "wishlist/add"), {
            product_id: productId
          }));

        case 3:
          isAddToFav = _context3.sent;
          console.log("*****************", isAddToFav);
          (0, _common.showSuccess)(isAddToFav.data.message);
          return _context3.abrupt("return", true);

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log("error", _context3.t0);

          if (_context3.t0.response) {
            _context3.next = 16;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 16:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context3.t0)).message
          };

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.addProductToFavorite = addProductToFavorite;

var removeProductToFavorite = function removeProductToFavorite(productId) {
  var isAddToFav;
  return regeneratorRuntime.async(function removeProductToFavorite$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "wishlist/delete"), {
            product_id: productId
          }));

        case 3:
          isAddToFav = _context4.sent;
          return _context4.abrupt("return", true);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);

          if (_context4.t0.response) {
            _context4.next = 13;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 13:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context4.t0)).message
          };

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.removeProductToFavorite = removeProductToFavorite;

var addProductToShare = function addProductToShare(productId) {
  var isAddToFav;
  return regeneratorRuntime.async(function addProductToShare$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "share/add"), {
            product_id: productId
          }));

        case 3:
          isAddToFav = _context5.sent;
          console.log("*****************", isAddToFav);
          (0, _common.showSuccess)(isAddToFav.data.message);
          return _context5.abrupt("return", true);

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log("error", _context5.t0);

          if (_context5.t0.response) {
            _context5.next = 16;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 16:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context5.t0)).message
          };

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.addProductToShare = addProductToShare;

var removeProductToShare = function removeProductToShare(productId) {
  var isAddToFav;
  return regeneratorRuntime.async(function removeProductToShare$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "share/delete"), {
            product_id: productId
          }));

        case 3:
          isAddToFav = _context6.sent;
          return _context6.abrupt("return", true);

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);

          if (_context6.t0.response) {
            _context6.next = 13;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 13:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context6.t0)).message
          };

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.removeProductToShare = removeProductToShare;

var getNearstProduct = function getNearstProduct() {
  var values,
      response,
      _args7 = arguments;
  return regeneratorRuntime.async(function getNearstProduct$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          values = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {
            longitude: longitude,
            latitude: latitude,
            distance: distance
          };
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "products/nearest"), values));

        case 4:
          response = _context7.sent;
          return _context7.abrupt("return", response.data.data);

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          console.log("nearst error ==>>", _context7.t0.response);

          if (_context7.t0.response) {
            _context7.next = 15;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 15:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context7.t0)).message
          };

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getNearstProduct = getNearstProduct;

var getAllAdvertisment = function getAllAdvertisment() {
  var response;
  return regeneratorRuntime.async(function getAllAdvertisment$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "advertisement")));

        case 3:
          response = _context8.sent;
          console.log("responsee", response);
          return _context8.abrupt("return", response.data.advertisement);

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);

          if (_context8.t0.response) {
            _context8.next = 14;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 14:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context8.t0)).message
          };

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllAdvertisment = getAllAdvertisment;

var getAdvertismentById = function getAdvertismentById(advertisementID) {
  var response;
  return regeneratorRuntime.async(function getAdvertismentById$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "advertisement/").concat(advertisementID)));

        case 3:
          response = _context9.sent;
          return _context9.abrupt("return", response);

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);

          if (_context9.t0.response) {
            _context9.next = 13;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 13:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context9.t0)).message
          };

        case 14:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAdvertismentById = getAdvertismentById;

var getAllCategeory = function getAllCategeory() {
  var response;
  return regeneratorRuntime.async(function getAllCategeory$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "categories")));

        case 3:
          response = _context10.sent;
          console.log("response categories", response);
          return _context10.abrupt("return", response.data.categories);

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](0);
          console.log("cated error ", _context10.t0.response);

          if (_context10.t0.response) {
            _context10.next = 15;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 15:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context10.t0)).message
          };

        case 16:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllCategeory = getAllCategeory;

var getAlltatus = function getAlltatus() {
  var response;
  return regeneratorRuntime.async(function getAlltatus$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "product/status")));

        case 3:
          response = _context11.sent;
          console.log("response status", response);
          return _context11.abrupt("return", response.data);

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          console.log("error ===>>>>>", _context11.t0.response);

          if (_context11.t0.response) {
            _context11.next = 15;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 15:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context11.t0)).message
          };

        case 16:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAlltatus = getAlltatus;

var getAllJobs = function getAllJobs() {
  var response;
  return regeneratorRuntime.async(function getAllJobs$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "jobs")));

        case 3:
          response = _context12.sent;
          console.log("response jobs", response);
          return _context12.abrupt("return", response.data);

        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](0);

          if (_context12.t0.response) {
            _context12.next = 14;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 14:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context12.t0)).message
          };

        case 15:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllJobs = getAllJobs;

var getMyProduct = function getMyProduct() {
  var response;
  return regeneratorRuntime.async(function getMyProduct$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "products")));

        case 3:
          response = _context13.sent;
          console.log("response products ====>>>>>>>>>", response);
          return _context13.abrupt("return", response.data);

        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](0);

          if (_context13.t0.response) {
            _context13.next = 14;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 14:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context13.t0)).message
          };

        case 15:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getMyProduct = getMyProduct;

var getMyWishList = function getMyWishList() {
  var response;
  return regeneratorRuntime.async(function getMyWishList$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "wishlist")));

        case 3:
          response = _context14.sent;
          console.log("response products ====>>>>>>>>>", response);
          return _context14.abrupt("return", response.data);

        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);

          if (_context14.t0.response) {
            _context14.next = 14;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 14:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context14.t0)).message
          };

        case 15:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getMyWishList = getMyWishList;

var changeProductStatus = function changeProductStatus() {
  var values,
      response,
      _args15 = arguments;
  return regeneratorRuntime.async(function changeProductStatus$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          values = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : {
            product_id: product_id,
            is_active: is_active
          };
          console.log("change status", values);
          _context15.prev = 2;
          _context15.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "product/change_active_status"), values));

        case 5:
          response = _context15.sent;
          console.log("response products ====>>>>>>>>>", response);
          return _context15.abrupt("return", response.data);

        case 10:
          _context15.prev = 10;
          _context15.t0 = _context15["catch"](2);
          console.log("errorr===>", JSON.parse(JSON.stringify(_context15.t0)));

          if (_context15.t0.response) {
            _context15.next = 17;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 17:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context15.t0)).message
          };

        case 18:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[2, 10]]);
};

exports.changeProductStatus = changeProductStatus;

var distinguishStatuses = function distinguishStatuses() {
  var res;
  return regeneratorRuntime.async(function distinguishStatuses$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "product/distinguish/statuses")));

        case 3:
          res = _context16.sent;
          return _context16.abrupt("return", res.data);

        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);
          console.log("error ==>>", _context16.t0.response);

          if (_context16.t0.response) {
            _context16.next = 14;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 14:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context16.t0)).message
          };

        case 15:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.distinguishStatuses = distinguishStatuses;

var getAllProduct = function getAllProduct() {
  var response;
  return regeneratorRuntime.async(function getAllProduct$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          console.log("get All Product");
          _context17.prev = 1;
          _context17.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "products/all")));

        case 4:
          response = _context17.sent;
          console.log("response ==>", response);
          return _context17.abrupt("return", response);

        case 9:
          _context17.prev = 9;
          _context17.t0 = _context17["catch"](1);
          console.log("error ==>>", JSON.parse(JSON.stringify(_context17.t0)));

          if (_context17.t0.response) {
            _context17.next = 16;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 16:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context17.t0)).message
          };

        case 17:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.getAllProduct = getAllProduct;

var getAllSubmitedOrder = function getAllSubmitedOrder() {
  var response;
  return regeneratorRuntime.async(function getAllSubmitedOrder$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "submitted_orders/all")));

        case 3:
          response = _context18.sent;
          console.log("res ---", response.data.data);
          return _context18.abrupt("return", response.data.data);

        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](0);
          console.log("error ==>>", _context18.t0);

          if (_context18.t0.response) {
            _context18.next = 15;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 15:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context18.t0)).message
          };

        case 16:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getAllSubmitedOrder = getAllSubmitedOrder;

var setProductDistinguish = function setProductDistinguish() {
  var values,
      response,
      _args19 = arguments;
  return regeneratorRuntime.async(function setProductDistinguish$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          values = _args19.length > 0 && _args19[0] !== undefined ? _args19[0] : {
            product_id: product_id,
            distinction_status_id: distinction_status_id,
            price_day: price_day,
            price_week: price_week,
            price_month: price_month,
            from_date: from_date,
            to_date: to_date,
            message: message
          };
          _context19.prev = 1;
          _context19.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "product/distinguish/request"), values));

        case 4:
          response = _context19.sent;
          console.log("res ---", response.data.data);
          return _context19.abrupt("return", response.data.data);

        case 9:
          _context19.prev = 9;
          _context19.t0 = _context19["catch"](1);
          console.log("error ==>>", _context19.t0.response);

          if (_context19.t0.response) {
            _context19.next = 16;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 16:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context19.t0)).message
          };

        case 17:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.setProductDistinguish = setProductDistinguish;

var searchProduct = function searchProduct() {
  var values,
      response,
      _args20 = arguments;
  return regeneratorRuntime.async(function searchProduct$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          values = _args20.length > 0 && _args20[0] !== undefined ? _args20[0] : {
            longitude: longitude,
            latitude: latitude,
            distance: distance,
            search_str: search_str,
            price_from: price_from,
            price_to: price_to,
            categories: categories
          };
          _context20.prev = 1;
          _context20.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "products/search"), values));

        case 4:
          response = _context20.sent;
          console.log("resresponse ---", response);
          return _context20.abrupt("return", response.data.data);

        case 9:
          _context20.prev = 9;
          _context20.t0 = _context20["catch"](1);
          console.log("error __++++ ==>>", _context20.t0.response);

          if (_context20.t0.response) {
            _context20.next = 16;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 16:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context20.t0)).message
          };

        case 17:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.searchProduct = searchProduct;

var productReport = function productReport() {
  var values,
      response,
      _args21 = arguments;
  return regeneratorRuntime.async(function productReport$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          values = _args21.length > 0 && _args21[0] !== undefined ? _args21[0] : {
            product_id: product_id,
            is_active: is_active
          };
          console.log("change status", values);
          _context21.prev = 2;
          _context21.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_Config.API_ENDPOINT_GATEWAY, "product/report"), values));

        case 5:
          response = _context21.sent;
          console.log("response products ====>>>>>>>>>", response);
          return _context21.abrupt("return", response.data);

        case 10:
          _context21.prev = 10;
          _context21.t0 = _context21["catch"](2);
          console.log("errorr===>", JSON.parse(JSON.stringify(_context21.t0)));

          if (_context21.t0.response) {
            _context21.next = 17;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 17:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context21.t0)).message
          };

        case 18:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[2, 10]]);
}; // http://ejarly.dev.fudexsb.com/api/product/distinguish/statuses


exports.productReport = productReport;

var getStatusOfDistinguish = function getStatusOfDistinguish() {
  var response;
  return regeneratorRuntime.async(function getStatusOfDistinguish$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(_Config.API_ENDPOINT_GATEWAY, "product/distinguish/statuses")));

        case 3:
          response = _context22.sent;
          console.log("response ==>", response);
          return _context22.abrupt("return", response.data);

        case 8:
          _context22.prev = 8;
          _context22.t0 = _context22["catch"](0);
          console.log("error ==>>", _context22.t0);

          if (_context22.t0.response) {
            _context22.next = 15;
            break;
          }

          throw errors.CONNECTION_ERROR;

        case 15:
          throw {
            error: errors.GENERAL_ERROR,
            message: JSON.parse(JSON.stringify(_context22.t0)).message
          };

        case 16:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getStatusOfDistinguish = getStatusOfDistinguish;