import getRepeatOpts from './getRepeatOpts'
import shortid from 'shortid'

export default function ({ job, queue }) {
  const { delay } = job
  const repeatOpts = getRepeatOpts(job)
  // Friendly job id for debugging easily
  const jobId = `${queue.name}-${job.name}-${shortid.generate()}`
  return { jobId, delay, ...repeatOpts }
}
