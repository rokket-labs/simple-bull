import test from 'ava'
import { getUrlFromEnv } from '../../dist/redisConnection'

test(`RedisUrl from global env without auth`, t => {
  const redisUrl = getUrlFromEnv()
  t.log(redisUrl)
})

// test(`RedisUrl built from global env variables`, t => {
//   pendingMessage({ name: 'jobName' }, 'message')
//   t.pass()
// })

// test(`Error message working`, t => {
//   errorMessage({ name: 'jobName' }, 'message')
//   t.pass()
// })
