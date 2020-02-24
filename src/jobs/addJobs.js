import addJob from './addJob'
import signale from 'signale'

export default async function ({ queue, jobs }) {
  signale.pending(`Adding ${jobs.length} jobs to ${queue.name} queue`)
  for (const job of jobs) {
    await addJob({ queue, job })
    !job.frequency
      ? signale.success(`[${job.name}] Event job added successful`)
      : signale.success(`[${job.name}] Frequency job added successful`)
  }
}
