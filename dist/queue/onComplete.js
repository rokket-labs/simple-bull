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
      queueOnSuccess = _ref.queueOnSuccess;
  queue.on('completed', function (currentJob, result) {
    var findJobByName = function findJobByName(_ref2) {
      var name = _ref2.name;
      return name === currentJob.name;
    };

    var firedJob = jobs.find(findJobByName);

    if (queueOnSuccess) {
      queueOnSuccess({
        result: result,
        job: currentJob,
        successMessage: _logger.successMessage
      });
    }

    if (firedJob.onSuccess) {
      firedJob.onSuccess({
        result: result,
        job: currentJob,
        successMessage: _logger.successMessage
      });
    } // If they decide to handle success event they have to return the message


    if (queueOnSuccess || firedJob.onSuccess) return;
    return (0, _logger.successMessage)(currentJob, result);
  });
}