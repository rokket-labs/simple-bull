export default function (job) {
  const { frequency, delay, limit } = job
  const isNumber = frequency => typeof frequency === 'number'

  let frequencyType

  if (!frequency) return

  // When frequency is not a number simple bull asume it's a cron
  frequencyType = isNumber(frequency)
    ? { every: frequency }
    : { cron: frequency }

  return { repeat: { ...frequencyType, limit, delay } }
}
