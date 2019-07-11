'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (worker) {
  // Limit the amount of concurrent workers
  // Limit the duration of each worker
  var limiter = {
    max: 1000,
    duration: 5000

    // Set timer of each worker
  };var repeat = {
    every: 10000,
    limit: 1000
  };

  var delay = 5000;

  var queue = new _bull2.default(worker.name, { redis: _redisConf2.default });

  queue.add({ foo: 'bar' }, { repeat: repeat });

  queue.process(function (job) {
    console.log('Working on Job ' + worker.name);
    return Promise.resolve();
  });

  queue.on('completed', function (job, result) {
    console.log('Job completed with result ' + result);
  });

  queue.on('failed', function (job, err) {
    // A job failed with reason `err`!
    console.log(err);
  });
};

var _redisConf = require('./redisConf');

var _redisConf2 = _interopRequireDefault(_redisConf);

var _bull = require('bull');

var _bull2 = _interopRequireDefault(_bull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }