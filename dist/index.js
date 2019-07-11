'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startQueue = undefined;

var _bull = require('bull');

var _bull2 = _interopRequireDefault(_bull);

var _redisConf = require('./redisConf');

var _redisConf2 = _interopRequireDefault(_redisConf);

var _signale = require('signale');

var _signale2 = _interopRequireDefault(_signale);

var _logger = require('./logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var startQueue = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var queueName = _ref.queueName,
        workers = _ref.workers;
    var queue;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _signale2.default.pending('Creating queue and connecting with redis');
            queue = new _bull2.default(queueName, { redis: _redisConf2.default });

            _signale2.default.success('Queue correctly created');

            _context.next = 5;
            return addJobs({ queue: queue, workers: workers });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function startQueue(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var addJobs = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
    var queue = _ref3.queue,
        workers = _ref3.workers;

    var _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _ref5, name, processor, every, limit;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(name, processor, every, limit) {
              return regeneratorRuntime.wrap(function _loop$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return queue.add(name, { foo: 'bar' }, { repeat: { every: every, limit: limit } });

                    case 2:

                      queue.process(name, function (job, done) {
                        try {
                          (0, _logger.pendingMessage)(job, 'executing job processor');
                          processor();
                          (0, _logger.successMessage)(job, 'job executed correctly');
                        } catch (error) {
                          (0, _logger.errorMessage)(job, error.message);
                        }
                        done();
                      });

                    case 3:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _loop, undefined);
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 4;
            _iterator = workers[Symbol.iterator]();

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context3.next = 16;
              break;
            }

            _ref5 = _step.value;
            name = _ref5.name;
            processor = _ref5.processor;
            every = _ref5.every;
            limit = _ref5.limit;
            return _context3.delegateYield(_loop(name, processor, every, limit), 't0', 13);

          case 13:
            _iteratorNormalCompletion = true;
            _context3.next = 6;
            break;

          case 16:
            _context3.next = 22;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t1 = _context3['catch'](4);
            _didIteratorError = true;
            _iteratorError = _context3.t1;

          case 22:
            _context3.prev = 22;
            _context3.prev = 23;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 25:
            _context3.prev = 25;

            if (!_didIteratorError) {
              _context3.next = 28;
              break;
            }

            throw _iteratorError;

          case 28:
            return _context3.finish(25);

          case 29:
            return _context3.finish(22);

          case 30:

            queue.on('failed', function (job, error) {
              (0, _logger.errorMessage)(job, error);
            });

          case 31:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee2, undefined, [[4, 18, 22, 30], [23,, 25, 29]]);
  }));

  return function addJobs(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.startQueue = startQueue;