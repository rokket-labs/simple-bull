import Bull from 'bull'
import redisConf from '../redisConf'

import signale from 'signale'
import addJobs from '../jobs/addJobs'
import onComplete from './onComplete'
import onFailed from './onFailed'

export default async function ({
  queueName,
  jobs,
  queueOnSuccess,
  onFail
}) {
  signale.pending('Creating queue and connecting with redis')

  const redis = redisConf()

  const queue = new Bull(queueName, redis)

  await queue.empty()

  // Queue events
  onFailed({ queue, jobs, onFail })
  onComplete({ queue, jobs, queueOnSuccess })

  signale.success(`Queue ${queueName} correctly created`)

  await addJobs({ queue, jobs })
}
