import { errorMessage } from '../logger'

export default function ({ queue, jobs, onFail }) {
  queue.on('failed', function (currentJob, err) {
    const findJobByName = ({ name }) => name === currentJob.name
    const firedJob = jobs.find(findJobByName)

    if (onFail) {
      onFail({ err, currentJob, errorMessage })
    }

    if (firedJob.onFail) {
      firedJob.onFail({ err, currentJob, errorMessage })
    }
    // If they decide to handle fail event they have to return the message
    if (onFail || firedJob.onFail) return

    return errorMessage(currentJob, err)
  })
}
