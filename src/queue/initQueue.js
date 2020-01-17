import Bull from 'bull'
import redis from '../redisConf'

import signale from 'signale'
import addJobs from '../jobs/addJobs'
import onComplete from './onComplete'
import onFailed from './onFailed'

export default async function ({
  queueName,
  jobs,
  queueOnSuccess,
  queueOnFail
}) {
  signale.pending('Creating queue and connecting with redis')

  const queue = new Bull(queueName, { redis })
  await queue.empty()
  // Queue events
  onFailed({ queue, jobs, queueOnFail })
  onComplete({ queue, jobs, queueOnSuccess })

  signale.success(`Queue ${queueName} correctly created`)

  await addJobs({ queue, jobs })
}
