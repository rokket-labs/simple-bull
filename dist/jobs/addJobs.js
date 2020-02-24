"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("regenerator-runtime/runtime");

var _addJob = _interopRequireDefault(require("./addJob"));

var _signale = _interopRequireDefault(require("signale"));

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
    var queue, jobs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, job;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queue = _ref.queue, jobs = _ref.jobs;

            _signale["default"].pending("Adding ".concat(jobs.length, " jobs to ").concat(queue.name, " queue"));

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 5;
            _iterator = jobs[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 15;
              break;
            }

            job = _step.value;
            _context.next = 11;
            return (0, _addJob["default"])({
              queue: queue,
              job: job
            });

          case 11:
            !job.frequency ? _signale["default"].success("[".concat(job.name, "] Event job added successful")) : _signale["default"].success("[".concat(job.name, "] Frequency job added successful"));

          case 12:
            _iteratorNormalCompletion = true;
            _context.next = 7;
            break;

          case 15:
            _context.next = 21;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](5);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 21:
            _context.prev = 21;
            _context.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context.prev = 24;

            if (!_didIteratorError) {
              _context.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context.finish(24);

          case 28:
            return _context.finish(21);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 17, 21, 29], [22,, 24, 28]]);
  }));
  return _ref2.apply(this, arguments);
}