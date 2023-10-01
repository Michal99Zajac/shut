import { SESClient } from '@aws-sdk/client-ses'

import { config } from '#/config'

const ses = new SESClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.access.key,
    secretAccessKey: config.aws.access.secret,
  },
})

export { ses }
export default ses
