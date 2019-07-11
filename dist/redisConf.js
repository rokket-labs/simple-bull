'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var port = process.env.REDIS_PORT || 6970;
var host = process.env.REDIS_HOST || 'localhost';
var password = process.env.REDIS_PASSWORD || '';

exports.default = { port: port, host: host, password: password };