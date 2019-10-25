import Bull from 'bull'
import redis from '../redisConf'

export default async function ({ queueName, jobName, data }) {
  const queue = new Bull(queueName, { redis })
  await queue.add(jobName, data)
}
