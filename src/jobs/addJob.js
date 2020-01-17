import addProcess from './addProcess'
import getOptions from './getOptions'

export default async function ({ queue, job }) {
  const { name, data } = job

  const options = getOptions({ job, queue })

  // Attach job function to queue
  addProcess({ queue, job })

  if (!job.frequency) return
  console.log('adding')
  await queue.add(name, data, options)
}
