"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startQueue = void 0;

require("regenerator-runtime/runtime");

require("core-js/stable");

var _bull = _interopRequireDefault(require("bull"));

var _redisConf = _interopRequireDefault(require("./redisConf"));

var _signale = _interopRequireDefault(require("signale"));

var _logger = require("./logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Initialize a queue with workers
var startQueue =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var queueName, workers, queue;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queueName = _ref.queueName, workers = _ref.workers;

            _signale["default"].pending('Creating queue and connecting with redis');

            queue = new _bull["default"](queueName, {
              redis: _redisConf["default"]
            });

            _signale["default"].success('Queue correctly created');

            _context.next = 6;
            return addJobsToQueue({
              queue: queue,
              workers: workers
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function startQueue(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.startQueue = startQueue;

var getFrecuency = function getFrecuency(frequency) {
  if (typeof frequency === 'number') return {
    every: frequency
  };
  return {
    cron: frequency
  };
};

var addJobsToQueue =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref3) {
    var queue, workers, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            queue = _ref3.queue, workers = _ref3.workers;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 4;
            _loop =
            /*#__PURE__*/
            regeneratorRuntime.mark(function _loop() {
              var _step$value, name, processor, frequency, limit, delay, onFailure, onSuccess;

              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _step$value = _step.value, name = _step$value.name, processor = _step$value.processor, frequency = _step$value.frequency, limit = _step$value.limit, delay = _step$value.delay, onFailure = _step$value.onFailure, onSuccess = _step$value.onSuccess;
                      _context2.next = 3;
                      return queue.add(name, {
                        foo: 'bar'
                      }, {
                        repeat: _objectSpread({}, getFrecuency(frequency), {
                          limit: limit,
                          delay: delay
                        })
                      });

                    case 3:
                      queue.process(name, function (job, done) {
                        try {
                          (0, _logger.pendingMessage)(job, 'executing job processor');
                          processor();
                          if (onSuccess) onSuccess(job, _logger.successMessage);
                          (0, _logger.successMessage)(job, 'job executed correctly');
                        } catch (error) {
                          if (onFailure) onFailure(error, job, _logger.errorMessage);
                          (0, _logger.errorMessage)(job, error);
                        }

                        done();
                      });

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _loop);
            });
            _iterator = workers[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 12;
              break;
            }

            return _context3.delegateYield(_loop(), "t0", 9);

          case 9:
            _iteratorNormalCompletion = true;
            _context3.next = 7;
            break;

          case 12:
            _context3.next = 18;
            break;

          case 14:
            _context3.prev = 14;
            _context3.t1 = _context3["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 18:
            _context3.prev = 18;
            _context3.prev = 19;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 21:
            _context3.prev = 21;

            if (!_didIteratorError) {
              _context3.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context3.finish(21);

          case 25:
            return _context3.finish(18);

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, null, [[4, 14, 18, 26], [19,, 21, 25]]);
  }));

  return function addJobsToQueue(_x2) {
    return _ref4.apply(this, arguments);
  };
}();