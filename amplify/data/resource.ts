import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Game: a
    .model({
      title: a.string().required(),
      description: a.string(),
      displayTitle: a.string().required(),
      releaseDateDisplay: a.date(),
      includeInReviews: a.boolean(),
      images: a.customType({
        boxart: a.string(),
        descriptionImage: a.string(),
        horizontalHeaderImage: a.string()
      }),
      gameInfo: a.customType({
        developers: a.string().array(),
        engine: a.string(),
        esrbDescriptors: a.string().array(),
        esrbRating: a.string(),
        fileSize: a.string(),
        franchises: a.string().array(),
        freeToStart: a.boolean(),
        generalFilters: a.string().array(),
        genres: a.string().array(),
        lengthOfGame: a.string(), // enum: short, medium, or long
        tags: a.string().array(), // indie, chill, fast-paced, funny, etc
        msrp: a.float(),
        numOfPlayers: a.string(),
        playerFilters: a.string().array(),
        publishers: a.string().array(),
        remake: a.boolean(),
        resourceLinks: a.string().array(),
        slug: a.string()
      }),
      myData: a.customType({
        datePlayed: a.string(),
        datePurchased: a.string(),
        fullOrDemo: a.string(), // demo or full
        emulatorSystem: a.string(),
        isEmulator: a.boolean(),
        missingFromAPI: a.boolean(),
        physicalCopy: a.boolean(),
        played: a.boolean(),
        rating: a.integer().required(), // 1 -5
        review: a.string()
      })
    })
    // .authorization(allow => [allow.publicApiKey().to(['read']), allow.owner()])
    .authorization(allow => [allow.publicApiKey()])
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 360
    }
  }
})
