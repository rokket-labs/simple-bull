"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(limit) {
  return {
    max: limit,
    duration: 20000,
    bounceBack: true
  };
}