import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
// import { storage } from './storage/resource'

const backend = defineBackend({
  auth,
  data
  // storage
})

// Force a new API key to be created instead of updating the expired/missing one
backend.data.resources.cfnResources.cfnApiKey?.overrideLogicalId(
  `recoverApiKey${new Date().getTime()}`
)
