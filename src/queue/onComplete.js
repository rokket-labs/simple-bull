import { successMessage } from '../logger'

export default function ({ queue, jobs, onSuccess }) {
  queue.on('completed', function (currentJob, result) {
    const findJobByName = ({ name }) => name === currentJob.name
    const firedJob = jobs.find(findJobByName)

    if (onSuccess) {
      onSuccess({ result, job: currentJob, successMessage })
    }

    if (firedJob.onSuccess) {
      firedJob.onSuccess({ result, job: currentJob, successMessage })
    }
    currentJob.remove()
    // If they decide to handle success event they have to return the message
    if (onSuccess || firedJob.onSuccess) return

    return successMessage(currentJob, result)
  })
}
