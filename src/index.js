import Bull from 'bull'
import redis from './redisConf'
import signale from 'signale'
import { successMessage, pendingMessage, errorMessage } from './logger'

const startQueue = async ({ queueName, workers }) => {
  signale.pending('Creating queue and connecting with redis')
  const queue = new Bull(queueName, { redis })
  signale.success('Queue correctly created')

  await addJobs({ queue, workers })
}

const addJobs = async ({ queue, workers }) => {
  for (const { name, processor, every, limit } of workers) {
    await queue.add(name, { foo: 'bar' }, { repeat: { every, limit } })

    queue.process(name, (job, done) => {
      try {
        pendingMessage(job, 'executing job processor')
        processor()
        successMessage(job, 'job executed correctly')
      } catch (error) {
        errorMessage(job, error.message)
      }
      done()
    })
  }

  queue.on('failed', function (job, error) {
    errorMessage(job, error)
  })
}

export { startQueue }
