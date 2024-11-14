import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

// const schema = a.schema({
//   Game: a
//     .model({
//       datePlayed: a.date(),
//       developers: a.string().array(),
//       genres: a.string().array(),
//       lengthOfGame: a.string(), // small, medium, large // ***
//       mood: a.string().array(), // chill, fast-paced, funny, etc // ***
//       msrp: a.float(),
//       publishers: a.string(),
//       rating: a.integer().required(), // 1 -5
//       releaseDateDisplay: a.date(),
//       remake: a.boolean(), // ***
//       review: a.string(), // ***
//       title: a.string().required()
//     })
//     .authorization(allow => [allow.publicApiKey()])
// })

const schema = a.schema({
  Game: a
    .model({
      title: a.string().required(),
      description: a.string(),
      displayTitle: a.string().required(),
      releaseDateDisplay: a.date(),
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
        freeToStart: a.boolean(),
        generalFilters: a.string().array(),
        genres: a.string().array(),
        lengthOfGame: a.enum(['', 'short', 'medium', 'long']),
        mood: a.string().array(), // chill, fast-paced, funny, etc
        msrp: a.float(),
        numOfPlayers: a.string(),
        playerFilters: a.string().array(),
        publishers: a.string().array(),
        remake: a.boolean(),
        slug: a.string()
      }),
      myData: a.customType({
        datePlayed: a.string(),
        datePurchased: a.string(),
        emulatorSystem: a.string(),
        isEmulator: a.boolean(),
        physicalCopy: a.boolean(),
        played: a.boolean(),
        rating: a.integer().required(), // 1 -5
        review: a.string()
      })
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
