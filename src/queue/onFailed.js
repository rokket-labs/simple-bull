import { errorMessage } from '../logger'

export default function ({ queue, jobs, queueOnFail }) {
  queue.on('failed', function (currentJob, err) {
    console.log('simple bull failing')
    const findJobByName = ({ name }) => name === currentJob.name
    const firedJob = jobs.find(findJobByName)

    if (queueOnFail) {
      queueOnFail({ err, currentJob, errorMessage })
    }

    if (firedJob.onFail) {
      firedJob.onFail({ err, currentJob, errorMessage })
    }
    // If they decide to handle fail event they have to return the message
    if (queueOnFail || firedJob.onFail) return

    return errorMessage(currentJob, err)
  })
}
