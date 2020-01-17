"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessage = exports.pendingMessage = exports.successMessage = void 0;

var _signale = _interopRequireDefault(require("signale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUTCDate = function getUTCDate() {
  var now = new Date();
  var month = now.getUTCMonth() + 1; // months from 1-12

  var day = now.getUTCDate();
  var year = now.getUTCFullYear();
  return "".concat(year, "-").concat(month, "-").concat(day);
};

var getUTCTime = function getUTCTime() {
  var now = new Date();
  var minutes = now.getMinutes();
  var hours = now.getHours();
  var seconds = now.getSeconds();
  return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
};

var successMessage = function successMessage(job, message) {
  var msg = _signale["default"].scope(getUTCDate(), getUTCTime(), job.name);

  msg.success({
    message: message || 'executed successfully'
  });
};

exports.successMessage = successMessage;

var pendingMessage = function pendingMessage(job, message) {
  var msg = _signale["default"].scope(getUTCDate(), getUTCTime(), job.name);

  msg.pending({
    message: message
  });
};

exports.pendingMessage = pendingMessage;

var errorMessage = function errorMessage(job, message) {
  var msg = _signale["default"].scope(getUTCDate(), getUTCTime(), job.name);

  msg.fatal(message);
};

exports.errorMessage = errorMessage;