import {
  Mainnet,
  Rinkeby,
  Optimism,
  Goerli,
  OptimismGoerli,
} from '@usedapp/core'

export const CONTRACTS = {
  MIRROR_NFT: {
    [Mainnet.chainId]: '',
    [Rinkeby.chainId]: '0x1dE1daC8A8EC70d48cadCCE1f93AeB54263a3EC8',
    [Goerli.chainId]: '0x1dE1daC8A8EC70d48cadCCE1f93AeB54263a3EC8',
  },

  MIRROR_MANAGER: {
    [Optimism.chainId]: '0xEF76F4523C83fbB8A2833b80b1c13489B4AB1563',
    [OptimismGoerli.chainId]: '0xEF76F4523C83fbB8A2833b80b1c13489B4AB1563',
  },
}

export const QUIXOTIC_API_KEY = 'UqEiG81z.uzM8dSiqswNouNMeRRjGTGMpvbDwHOLC'

export const MIRROR_NFT_CHAIN_ID = Goerli.chainId
export const MIRROR_NFT_NETWORK = 'goerli'

export const MIRROR_MANAGER_NFT_CHAIN_ID = OptimismGoerli.chainId
export const MIRROR_MANAGER_NETWORK = 'optimism-goerli'
