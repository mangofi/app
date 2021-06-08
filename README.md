# MangoFi App

[![Netlify Status](https://api.netlify.com/api/v1/badges/844a95bc-f091-44f7-a4b1-8b2b9070678d/deploy-status)](https://app.netlify.com/sites/mangofi-app/deploys)

## Requirements

- Node version 14 (preferably)
- Docker (optional)
- Ganache (for local development)

## Installation

### With Docker (recommended)

- Run `yarn install` and make sure all packages install correctly
- `yarn docker:setup` cleans, builds and runs a container with the app running on port 3000
- Visit [http://localhost:3000](http://localhost:3000) to access the app

### Manually

- Run `yarn install` and make sure all packages install correctly
- Run `npm rebuild node-sass` to avoid `node-sass` errors
- Run `yarn dev` to start web server
- Visit [http://localhost:3000](http://localhost:3000) to access the app

## Available commands

- `yarn dev`: Starts web server at [http://localhost:3000](http://localhost:3000) for local development
- `yarn build`: Perform a NextJS build, creating a static site, production-ready version of the app
- `yarn start`: Starts web server at [http://localhost:3000](http://localhost:3000) using the files from the NextJS build result of the app
- `yarn compile`: Executes a Truffle compilation of the contracts inside `./contracts` directory
- `yarn deploy`: Deploys the contracts in `migrations/2_deploy_contracts.js` into the Ganache development server
- `yarn deploy:ropsten`: Deploys the contracts in `migrations/2_deploy_contracts.js` into the Ropsten network
- `yarn deploy:bsctestnet`: Deploys the contracts in `migrations/2_deploy_contracts.js` into the Binance Smart Chain Testnet (currently suffering from a lot of timeouts)
- `yarn ganache:dev`: Runs a Ganache dev server
- `yarn console`: Opens Truffle console connected to local Ganache development server
- `yarn console:bsctestnet`: Opens Truffle console connected to Binance Smart Chain Testnet
- `yarn docker:build`: Builds app using `Dockerfile`
- `yarn docker:start`: Runs previously built Docker container
- `yarn docker:setup`: Cleans, builds and runs the app Docker container

## Troubleshooting

### `node-sass` errors

- Make sure you have node version 14 installed
- Stop web server (if running)
- Run `npm rebuild node-sass`
- Run web server again