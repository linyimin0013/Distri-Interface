# The frontend UI project

This project was bootstrapped with [Create React App]

## Available Scripts

In the project directory, you can run:

### Install

```
npm install
// or
yarn install
```

## Edit config file

The config file path

```bash
./src/webconfig.js
```

The content is:

```javascript
const defaultConfig = {
  apiUrl:'https://matrixai.cloud',//backend api url
  contractAddress: "BvYJnEj64dAT5jrUvgrTJuvPhXRDwJ7SjjPuteycJxAQ",// solana program id
  tokenAddress:"B9pg2pG2vSZWVhe2WEngiCApFCUhwakfnPzpyR3GBKKQ"
  nodeURL:"https://api.devnet.solana.com"//rpc url
};
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

- `Test`:`yarn build-test`;
- `Production`:`yarn build`;

This will build `build` folder based on the selected environment.
