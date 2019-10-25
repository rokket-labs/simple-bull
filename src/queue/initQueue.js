import Bull from 'bull'
import redis from '../redisConf'

import signale from 'signale'
import addJobs from '../jobs/addJobs'

export default async function ({ queueName, jobs }) {
  signale.pending('Creating queue and connecting with redis')
  const queue = new Bull(queueName, { redis })
  signale.success(`Queue ${queueName} correctly created`)
  await addJobs({ queue, jobs })
}
