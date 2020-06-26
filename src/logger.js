import signale from 'signale'

signale.config({
  displayTimestamp: true,
  displayDate: true,
  underlineMessage: true

})

const successMessage = (job, message) => {
  const msg = signale.scope(job.name)
  return msg.success({
    message: message || 'executed successfully'
  })
}

const pendingMessage = (job, message) => {
  const msg = signale.scope(job.name)
  return msg.pending({
    message
  })
}
const errorMessage = (job, message) => {
  const msg = signale.scope(job.name)
  return msg.fatal(message)
}

export { successMessage, pendingMessage, errorMessage }
