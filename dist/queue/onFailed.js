"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _logger = require("../logger");

function _default(_ref) {
  var queue = _ref.queue,
      jobs = _ref.jobs,
      onFail = _ref.onFail;
  queue.on('failed', function (currentJob, err) {
    var findJobByName = function findJobByName(_ref2) {
      var name = _ref2.name;
      return name === currentJob.name;
    };

    var firedJob = jobs.find(findJobByName);

    if (onFail) {
      onFail({
        err: err,
        currentJob: currentJob,
        errorMessage: _logger.errorMessage
      });
    }

    if (firedJob.onFail) {
      firedJob.onFail({
        err: err,
        currentJob: currentJob,
        errorMessage: _logger.errorMessage
      });
    } // If they decide to handle fail event they have to return the message


    if (onFail || firedJob.onFail) return;
    return (0, _logger.errorMessage)(currentJob, err);
  });
}