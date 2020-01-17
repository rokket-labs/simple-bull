"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("regenerator-runtime/runtime");

var _bull = _interopRequireDefault(require("bull"));

var _redisConf = _interopRequireDefault(require("../redisConf"));

var _signale = _interopRequireDefault(require("signale"));

var _addJobs = _interopRequireDefault(require("../jobs/addJobs"));

var _onComplete = _interopRequireDefault(require("./onComplete"));

var _onFailed = _interopRequireDefault(require("./onFailed"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _default(_x) {
  return _ref2.apply(this, arguments);
}

function _ref2() {
  _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var queueName, jobs, queueOnSuccess, queueOnFail, queue;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queueName = _ref.queueName, jobs = _ref.jobs, queueOnSuccess = _ref.queueOnSuccess, queueOnFail = _ref.queueOnFail;

            _signale["default"].pending('Creating queue and connecting with redis');

            queue = new _bull["default"](queueName, {
              redis: _redisConf["default"]
            });
            _context.next = 5;
            return queue.empty();

          case 5:
            // Queue events
            (0, _onFailed["default"])({
              queue: queue,
              jobs: jobs,
              queueOnFail: queueOnFail
            });
            (0, _onComplete["default"])({
              queue: queue,
              jobs: jobs,
              queueOnSuccess: queueOnSuccess
            });

            _signale["default"].success("Queue ".concat(queueName, " correctly created"));

            _context.next = 10;
            return (0, _addJobs["default"])({
              queue: queue,
              jobs: jobs
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _ref2.apply(this, arguments);
}