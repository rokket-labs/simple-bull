import Bull from 'bull'
import redis from '../redisConf'

export default async function ({ queueName, jobName, data }) {
  // Open redis connection
  const queue = new Bull(queueName, { redis })
  await queue.add(jobName, data)
  // Close redis connection
  queue.close()
}
