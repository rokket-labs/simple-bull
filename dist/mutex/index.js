"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lock = lock;
exports.unlock = unlock;

require("regenerator-runtime/runtime");

var _Mutex = _interopRequireDefault(require("./Mutex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var promises = {};

function getMutex(id) {
  var mutex = promises[id];

  if (!mutex) {
    mutex = new _Mutex["default"](id);
    promises[id] = mutex;
  }

  return mutex;
}

function lock(_x) {
  return _lock.apply(this, arguments);
}

function _lock() {
  _lock = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    var mutex;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mutex = getMutex(id);
            _context.next = 3;
            return mutex.lock();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _lock.apply(this, arguments);
}

function unlock(_x2) {
  return _unlock.apply(this, arguments);
}

function _unlock() {
  _unlock = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id) {
    var mutex;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            mutex = getMutex(id);
            mutex.unlock();

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _unlock.apply(this, arguments);
}