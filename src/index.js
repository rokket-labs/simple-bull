import Bull from 'bull'
import redis from './redisConf'
import signale from 'signale'
import { successMessage, pendingMessage, errorMessage } from './logger'

// Initialize a queue with workers
const startQueue = async ({ queueName, workers }) => {
  signale.pending('Creating queue and connecting with redis')
  const queue = new Bull(queueName, { redis })
  signale.success('Queue correctly created')
  await addJobsToQueue({ queue, workers })
}

const addJobsToQueue = async ({ queue, workers }) => {
  for (const {
    name,
    processor,
    every,
    limit,
    onFailure,
    onSuccess
  } of workers) {
    await queue.add(name, { foo: 'bar' }, { repeat: { every, limit } })

    queue.process(name, (job, done) => {
      try {
        pendingMessage(job, 'executing job processor')
        processor()
        if (onSuccess) onSuccess(job, successMessage)
        successMessage(job, 'job executed correctly')
      } catch (error) {
        if (onFailure) onFailure(error, job, errorMessage)
        errorMessage(job, error)
      }
      done()
    })
  }
}

export { startQueue }
