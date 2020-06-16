import Bull from 'bull'
import redisConnection from '../redisConnection'

export default async function ({ queueName, jobName, data, redis }) {
  // Subscribe to queue
  const queue = new Bull(queueName, redisConnection(redis))
  await queue.add(jobName, data)
}
