"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("regenerator-runtime/runtime");

var _logger = require("../logger");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _default(_ref) {
  var queue = _ref.queue,
      job = _ref.job;
  var processor = job.processor,
      onFailure = job.onFailure,
      onSuccess = job.onSuccess,
      name = job.name;
  queue.process(name,
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(job, done) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              (0, _logger.pendingMessage)(job, 'executing job processor');
              _context.next = 4;
              return processor(job.data);

            case 4:
              if (!onSuccess) (0, _logger.successMessage)(job, 'job executed correctly');
              onSuccess(job, _logger.successMessage);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              if (!onFailure) (0, _logger.errorMessage)(job, _context.t0);
              onFailure(_context.t0, job, _logger.errorMessage);

            case 12:
              done();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}