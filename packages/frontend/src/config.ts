import {
  Mainnet,
  Rinkeby,
  Optimism,
  Goerli,
  OptimismGoerli,
} from '@usedapp/core'

export const CONTRACTS = {
  MIRROR_NFT: {
    [Mainnet.chainId]: '0x1dE1daC8A8EC70d48cadCCE1f93AeB54263a3EC8',
    [Rinkeby.chainId]: '0x1dE1daC8A8EC70d48cadCCE1f93AeB54263a3EC8',
    [Goerli.chainId]: '0x1dE1daC8A8EC70d48cadCCE1f93AeB54263a3EC8',
  },

  MIRROR_MANAGER: {
    [Optimism.chainId]: '0xEF76F4523C83fbB8A2833b80b1c13489B4AB1563',
    [OptimismGoerli.chainId]: '0xEF76F4523C83fbB8A2833b80b1c13489B4AB1563',
  },
}

// Is the app in developer mode
export const DEV_MODE = process.env.REACT_APP_DEV_MODE === 'true'

// Set Quixotic Api key + url
export const QUIXOTIC_API_KEY = DEV_MODE
  ? (process.env.REACT_APP_QUIXOTIC_TEST_API_KEY as string)
  : (process.env.REACT_APP_QUIXOTIC_API_KEY as string)

export const MIRROR_NFT_CHAIN_ID = DEV_MODE ? Goerli.chainId : Mainnet.chainId
export const MIRROR_NFT_NETWORK = DEV_MODE ? 'goerli' : 'mainnet'

export const MIRROR_MANAGER_NFT_CHAIN_ID = DEV_MODE
  ? OptimismGoerli.chainId
  : Optimism.chainId
export const MIRROR_MANAGER_NETWORK = DEV_MODE ? 'optimism-goerli' : 'optimism'
