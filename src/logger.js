import signale from 'signale'

const getUTCDate = () => {
  let now = new Date()
  const month = now.getUTCMonth() + 1 // months from 1-12
  const day = now.getUTCDate()
  const year = now.getUTCFullYear()
  return `${year}-${month}-${day}`
}

const getUTCTime = () => {
  let now = new Date()
  const minutes = now.getMinutes()
  const hours = now.getHours()
  const seconds = now.getSeconds()
  return `${hours}:${minutes}:${seconds}`
}

const successMessage = (job, message) => {
  const msg = signale.scope(getUTCDate(), getUTCTime(), job.name)
  msg.success({
    message: message || 'executed successfully'
  })
}

const pendingMessage = (job, message) => {
  const msg = signale.scope(getUTCDate(), getUTCTime(), job.name)
  msg.pending({
    message
  })
}
const errorMessage = (job, message) => {
  const msg = signale.scope(getUTCDate(), getUTCTime(), job.name)
  msg.fatal(message)
}

export { successMessage, pendingMessage, errorMessage }
