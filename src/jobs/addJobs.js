import addJob from './addJob'

export default async function ({ queue, jobs }) {
  for (const job of jobs) {
    await addJob({ queue, job })
  }
}
