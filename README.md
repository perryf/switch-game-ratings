# Switch Game Review

Review of Switch games, made with Amplify, React, Vite

## Overview

This template equips you with a foundational React application integrated with AWS Amplify, streamlined for scalability and performance. It is ideal for developers looking to jumpstart their project with pre-configured AWS services like Cognito, AppSync, and DynamoDB.

## Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

## Deploying to AWS

For detailed instructions on deploying your application, refer to the [deployment section](https://docs.amplify.aws/react/start/quickstart/#deploy-a-fullstack-app-to-aws) of our documentation.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

## How to Run Locally

- `npx ampx sandbox`
- `npm run dev` -- run these two commands concurrently

## Resources & Data From

- npm `nintendo-switch-eshop` -- wrapper around Switch Eshop
- Nintendo.com
- Wikipedia
- https://spritedatabase.net (favicon)

- Removed for now

  - `"@aws-amplify/ui-react": "^6.5.5"`
  - `"@aws-amplify/ui-react-storage": "^3.3.9"`
  - `"masonic": "^4.0.1"`
  - `"nintendo-switch-eshop": "^8.0.0"`

- TODO...
  - try getting rid of `json-schema-to-ts` & `ts-algebra` in `package.json` (should be in package-lock as dependencies of other packages)
  - and adding `npm install --package-lock-only` first line of `commands:` in `amplify.yml`

## To Deploy on Github Pages

- npm run build locally
- add relative paths to anything with "/assests"
  - i.e. change "/assests/" to "./assests/"
- need to figure out a way around this...

-- todo -- add castlevania collection, borderlands presequal, pokemon card game, earthbound