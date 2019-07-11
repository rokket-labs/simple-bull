'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessage = exports.pendingMessage = exports.successMessage = undefined;

var _signale = require('signale');

var _signale2 = _interopRequireDefault(_signale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var now = new Date();

var getUTCDate = function getUTCDate() {
  var month = now.getUTCMonth() + 1; // months from 1-12
  var day = now.getUTCDate();
  var year = now.getUTCFullYear();
  return year + '-' + month + '-' + day;
};

var getUTCTime = function getUTCTime() {
  var minutes = now.getMinutes();
  var hours = now.getHours();
  var seconds = now.getSeconds();
  return hours + ':' + minutes + ':' + seconds;
};

var successMessage = function successMessage(job, message) {
  var msg = _signale2.default.scope(getUTCDate(), getUTCTime(), job.name);
  msg.success({
    message: message,
    suffix: '[' + job.name + ']'
  });
};

var pendingMessage = function pendingMessage(job, message) {
  var msg = _signale2.default.scope(getUTCDate(), getUTCTime(), job.name);
  msg.pending({
    message: message
  });
};
var errorMessage = function errorMessage(job, message) {
  var msg = _signale2.default.scope(getUTCDate(), getUTCTime(), job.name);
  msg.fatal(new Error(message));
};

exports.successMessage = successMessage;
exports.pendingMessage = pendingMessage;
exports.errorMessage = errorMessage;