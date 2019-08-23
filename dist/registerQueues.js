"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _redisConf = _interopRequireDefault(require("./redisConf"));

var _bull = _interopRequireDefault(require("bull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(worker) {
  // Limit the amount of concurrent workers
  // Limit the duration of each worker
  var limiter = {
    max: 1000,
    duration: 5000 // Set timer of each worker

  };
  var repeat = {
    every: 10000,
    limit: 1000
  };
  var delay = 5000;
  var queue = new _bull["default"](worker.name, {
    redis: _redisConf["default"]
  });
  queue.add({
    foo: 'bar'
  }, {
    repeat: repeat
  });
  queue.process(function (job) {
    console.log("Working on Job ".concat(worker.name));
    return Promise.resolve();
  });
  queue.on('completed', function (job, result) {
    console.log("Job completed with result ".concat(result));
  });
  queue.on('failed', function (job, err) {
    // A job failed with reason `err`!
    console.log(err);
  });
}