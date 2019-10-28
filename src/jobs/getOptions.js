import getRepeatOpts from './getRepeatOpts'

export default function (job) {
  const { delay } = job
  const repeatOpts = getRepeatOpts(job)
  return { delay, ...repeatOpts }
}
