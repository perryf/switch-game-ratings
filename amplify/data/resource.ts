import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Game: a
    .model({
      content: a.string(),
      datePlayed: a.date(),
      developedBy: a.string(),
      genre: a.string().array(),
      imagePath: a.string(),
      imagePathSmall: a.string(),
      name: a.string().required(),
      publishedBy: a.string(),
      releaseDate: a.string(),
      rating: a.integer(), // 1 -5
      remake: a.boolean()
    })
    .authorization(allow => [allow.publicApiKey()])
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
})
