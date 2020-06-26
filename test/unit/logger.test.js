import test from 'ava'
import { successMessage, pendingMessage, errorMessage } from '../../dist/logger'

test(`Success message working`, t => {
  successMessage({ name: 'jobName' }, 'message')
  t.pass()
})

test(`Pending message working`, t => {
  pendingMessage({ name: 'jobName' }, 'message')
  t.pass()
})

test(`Error message working`, t => {
  errorMessage({ name: 'jobName' }, 'message')
  t.pass()
})
