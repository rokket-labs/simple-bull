"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mutex =
/*#__PURE__*/
function () {
  function Mutex() {
    _classCallCheck(this, Mutex);

    this._waitingPromises = [];
    this._waitingResolvers = [];
    this.lock = this.lock.bind(this);
    this.unlock = this.unlock.bind(this);
  }

  _createClass(Mutex, [{
    key: "lock",
    value: function lock() {
      var _this = this;

      var res = Promise.all(this._waitingPromises);

      this._waitingPromises.push(new Promise(function (resolve) {
        return _this._waitingResolvers.push(resolve);
      }));

      return res;
    }
  }, {
    key: "unlock",
    value: function unlock() {
      var resolve = this._waitingResolvers.shift();

      resolve();

      this._waitingPromises.shift();
    }
  }]);

  return Mutex;
}();

exports["default"] = Mutex;