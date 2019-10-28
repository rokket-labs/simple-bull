"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _logger = require("../logger");

function _default(_ref) {
  var queue = _ref.queue,
      job = _ref.job;
  var processor = job.processor,
      onFailure = job.onFailure,
      onSuccess = job.onSuccess,
      name = job.name;
  queue.process(name, function (job, done) {
    try {
      (0, _logger.pendingMessage)(job, 'executing job processor');
      processor(job.data);
      if (!onSuccess) (0, _logger.successMessage)(job, 'job executed correctly');
      onSuccess(job, _logger.successMessage);
    } catch (error) {
      if (!onFailure) (0, _logger.errorMessage)(job, error);
      onFailure(error, job, _logger.errorMessage);
    }

    done();
  });
}