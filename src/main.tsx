import React from 'react'
import ReactDOM from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
// import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import type { Schema } from '../amplify/data/resource'
import outputs from '../amplify_outputs.json'
import App from './components/App.tsx'
import './index.css'

Amplify.configure(outputs)
const client: any = generateClient<Schema>()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Authenticator> */}
    <App client={client} />
    {/* </Authenticator> */}
  </React.StrictMode>
)
