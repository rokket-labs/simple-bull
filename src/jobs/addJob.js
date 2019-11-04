import addProcess from './addProcess'
import getOptions from './getOptions'

export default async function ({ queue, job }) {
  const { name, data } = job

  const options = getOptions(job)

  // Attach job function to queue
  addProcess({ queue, job })
  console.log(options)

  if (!job.frequency) return
  console.log(options)
  await queue.add(name, data, options)
}
