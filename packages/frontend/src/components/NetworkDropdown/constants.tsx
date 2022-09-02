import { Mainnet, Optimism, Rinkeby } from '@usedapp/core'

export const OP_NETWORK = {
  chainId: Optimism.chainId,
  jsx: (
    <>
      <div className="dot red"></div> <span>Optimism</span>
    </>
  ),
}

export const ETH_NETWORK = {
  chainId: Mainnet.chainId,
  jsx: (
    <>
      <div className="dot purple"></div> <span>Ethereum</span>
    </>
  ),
}

export const RINKEBY_NETWORK = {
  chainId: Rinkeby.chainId,
  jsx: (
    <>
      <div className="dot yellow"></div> <span>Rinkeby</span>
    </>
  ),
}

export const UNSUPPORTED_NETWORK = {
  chainId: -1,
  jsx: (
    <>
      <div className="dot yellow"></div> <span>Unsupported</span>
    </>
  ),
}

export const NETWORKS = [OP_NETWORK, ETH_NETWORK]
