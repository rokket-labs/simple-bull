export default function (job) {
  const { frequency, limit } = job
  const isNumber = frequency => typeof frequency === 'number'

  let frequencyType

  if (!frequency) return

  // When frequency is not a number simple bull asume it's a cron
  frequencyType = isNumber(frequency)
    ? { every: frequency }
    : { cron: frequency }

  // Remove on complete
  const removeOnComplete = true

  // Remove on finishing
  const removeOnFail = true

  return { repeat: { ...frequencyType, limit }, removeOnComplete, removeOnFail }
}
