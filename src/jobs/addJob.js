import addProcess from './addProcess'
import getTicker from './getTicker'

export default async function ({ queue, job }) {
  const { name, data } = job

  // Build ticker object
  const ticker = getTicker(job)

  // Attach job function to queue
  addProcess({ queue, job })

  if (ticker) await queue.add(name, data, ticker)
}
