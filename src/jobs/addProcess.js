import { successMessage, pendingMessage, errorMessage } from '../logger'
// import { lock, unlock } from '../mutex'

export default function ({ queue, job }) {
  const { processor, onFailure, onSuccess, name } = job

  queue.process(name, async (job, done) => {
    try {
      pendingMessage(job, 'executing job processor')
      await processor(job.data)
      if (!onSuccess) successMessage(job, 'job executed correctly')
      onSuccess(job, successMessage)
    } catch (error) {
      if (!onFailure) errorMessage(job, error)
      onFailure(error, job, errorMessage)
    }
    done()
  })
}
