import { successMessage, pendingMessage, errorMessage } from '../logger'

export default function ({ queue, job }) {
  const { processor, onFailure, onSuccess, name } = job

  queue.process(name, (job, done) => {
    try {
      pendingMessage(job, 'executing job processor')
      processor()
      if (!onSuccess) successMessage(job, 'job executed correctly')
      onSuccess(job, successMessage)
    } catch (error) {
      if (!onFailure) errorMessage(job, error)
      onFailure(error, job, errorMessage)
    }
    done()
  })
}
