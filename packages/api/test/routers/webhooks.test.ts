import { expect } from 'chai'
import 'mocha'
import nock from 'nock'
import { User } from '../../src/entity/user'
import { Webhook } from '../../src/entity/webhook'
import { authTrx } from '../../src/repository'
import { createTestUser, deleteTestUser } from '../db'
import { request } from '../util'

describe('Webhooks Router', () => {
  const token = process.env.PUBSUB_VERIFICATION_TOKEN || ''
  const webhookBaseUrl = 'https://localhost:3000'
  const webhookPath = `/webhooks`

  let user: User
  let webhook: Webhook

  before(async () => {
    // create test user and login
    user = await createTestUser('fakeUser')
    await request
      .post('/local/debug/fake-user-login')
      .send({ fakeEmail: user.email })

    webhook = await authTrx(
      (t) =>
        t.getRepository(Webhook).save({
          url: webhookBaseUrl + webhookPath,
          user: { id: user.id },
          eventTypes: ['PAGE_CREATED'],
        }),
      undefined,
      user.id
    )
  })

  after(async () => {
    // clean up
    await deleteTestUser(user.id)
  })

  describe('trigger webhooks', () => {
    it('should trigger webhooks', async () => {
      const data = {
        message: {
          data: Buffer.from(
            JSON.stringify({ userId: user.id, type: 'page' })
          ).toString('base64'),
          publishTime: new Date().toISOString(),
        },
      }

      nock(webhookBaseUrl).post(webhookPath).reply(200)

      const res = await request
        .post('/svc/pubsub/webhooks/trigger/created?token=' + token)
        .send(data)
        .expect(200)
      expect(res.text).to.eql('OK')
    })
  })
})
