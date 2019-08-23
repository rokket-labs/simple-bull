"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var port = process.env.REDIS_PORT || 6970;
var host = process.env.REDIS_HOST || 'localhost';
var password = process.env.REDIS_PASSWORD || '';
var _default = {
  port: port,
  host: host,
  password: password
};
exports["default"] = _default;