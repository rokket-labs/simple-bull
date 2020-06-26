import Redis from 'ioredis'

import fireJob from './jobs/fireJob'
import init from './queue/init'
import redisConnector from './redisConnector'
import redisUrl from './redisUrl'

// Making individual simple-bull instances
// Dependency Injection
class SimpleBull {
  constructor ({ queueName, redisAdapter, redisConfig }) {
    this.queueName = queueName
    this.redisAdapter = redisAdapter
    this.redisConfig = redisConfig
  }

  redisConnection () {

  }

  init ({ jobs, onSuccess, onFail }) {
    return init({ jobs, onSuccess, onFail })
  }

  fireJob ({ jobName, data }) {

  }
}

export default SimpleBull

/*

const emailQueue = new SimpleBull({
  queueName: 'email-queue'
  redisConfig: {
    host: "localhost"
    port: 89768
  }
})

const sendEmail = {
  name: 'sendEmail',
  processor: sendEmail(),
  frequency: 5000
}

const checkEmail = {
  name: 'checkEmail',
  processor: checkEmail(),
  frequency: 5000
}

emailQueue.init({
  jobs: [sendEmail, checkEmail],
  onFail: err => console.log(err),
  onSuccess: result => console.log(result)
})

*/
