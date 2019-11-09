import { pendingMessage } from '../logger'

export default function ({ queue, job }) {
  const { processor, name } = job

  // This is the asynchronous way to proccess a job
  queue.process(name, async job => {
    try {
      pendingMessage(job, 'executing job processor')
      return processor(job.data)
    } catch (error) {
      return error
    }
  })
}
