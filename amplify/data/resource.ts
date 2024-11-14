import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Game: a
    .model({
      datePlayed: a.date(),
      developers: a.string().array(),
      genres: a.string().array(),
      // imagePath: a.string(),
      // imagePathSmall: a.string(),
      lengthOfGame: a.string(), // small, medium, large
      mood: a.string().array(), // chill, fast-paced, funny, etc 
      // multiplayer: a.boolean(),
      // multiplayerNumberOfPlayers: a.integer(),
      // multiplayerType: a.string().array(), // co-op, partial co-op, versus, online, couch // ? maybe don't include this and just have info in onlineMultiplayer
      onlineFeatures: a.boolean(),
      onlineMultiplayer: a.boolean(),
      msrp: a.float(),
      publishers: a.string(),
      rating: a.integer().required(), // 1 -5
      recommended: a.boolean(), // ? may not be needed
      releaseDate: a.date(),
      remake: a.boolean(),
      review: a.string(),
      title: a.string().required(),
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
