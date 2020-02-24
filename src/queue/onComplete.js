import { successMessage } from '../logger'

export default function ({ queue, jobs, queueOnSuccess }) {
  queue.on('completed', function (currentJob, result) {
    console.log(result, 'this is the result')
    const findJobByName = ({ name }) => name === currentJob.name
    const firedJob = jobs.find(findJobByName)

    if (queueOnSuccess) {
      queueOnSuccess({ result, job: currentJob, successMessage })
    }

    if (firedJob.onSuccess) {
      firedJob.onSuccess({ result, job: currentJob, successMessage })
    }
    currentJob.remove()
    // If they decide to handle success event they have to return the message
    if (queueOnSuccess || firedJob.onSuccess) return

    return successMessage(currentJob, result)
  })
}
