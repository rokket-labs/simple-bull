import redis from './redisConf'
import Bull from 'bull'

export default function (worker) {
  // Limit the amount of concurrent workers
  // Limit the duration of each worker
  const limiter = {
    max: 1000,
    duration: 5000
  }

  // Set timer of each worker
  const repeat = {
    every: 10000,
    limit: 1000
  }

  const delay = 5000

  const queue = new Bull(worker.name, { redis })

  queue.add({ foo: 'bar' }, { repeat })

  queue.process(job => {
    console.log(`Working on Job ${worker.name}`)
    return Promise.resolve()
  })

  queue.on('completed', (job, result) => {
    console.log(`Job completed with result ${result}`)
  })

  queue.on('failed', function (job, err) {
    // A job failed with reason `err`!
    console.log(err)
  })
}
