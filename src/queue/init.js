import Bull from 'bull'
import redisConnection from '../redisConnection'

import signale from 'signale'
import addJobs from '../jobs/addJobs'
import onComplete from './onComplete'
import onFailed from './onFailed'

export default async function ({ queueName, jobs, onSuccess, onFail, redis }) {
  signale.pending('Creating queue and connecting with redis')

  const queue = new Bull(queueName, redisConnection(redis))

  await queue.empty()

  // Queue events
  onFailed({ queue, jobs, onFail })
  onComplete({ queue, jobs, onSuccess })

  signale.success(`Queue ${queueName} correctly created`)

  await addJobs({ queue, jobs })
}
