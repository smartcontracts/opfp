import { useContractFunction, Rinkeby, Optimism } from '@usedapp/core'
import MagicMirrorNFT from '@opfp/contracts/artifacts/contracts/MagicMirrorNFT.sol/MagicMirrorNFT.json'
import MagicMirrorManager from '@opfp/contracts/artifacts/contracts/MagicMirrorManager.sol/MagicMirrorManager.json'
import { Contract, ethers } from 'ethers'

import { CONTRACTS } from '../config'

// Config
const MIRROR_NFT_CHAIN_ID = Rinkeby.chainId

// Calls Mirror Manager contract to get mirror NFT contract address + token id.
export const getMirroredNFT = async (address: string): Promise<any> => {
  const optimism = new ethers.providers.InfuraProvider('optimism')
  const manager = new ethers.Contract(
    CONTRACTS.MIRROR_MANAGER[Optimism.chainId],
    MagicMirrorManager.abi,
    optimism
  )
  return manager.getMirroredNFT(address)
}

// Calls Mirror NFT contract to see if account owns the respective mirror NFT.
export const getHasNft = async (account) => {
  const rinkeby = new ethers.providers.InfuraProvider('rinkeby')

  const mirror = new ethers.Contract(
    CONTRACTS.MIRROR_NFT[MIRROR_NFT_CHAIN_ID],
    MagicMirrorNFT.abi,
    rinkeby
  )

  const tokenID = account
    ? ethers.BigNumber.from(account)
    : ethers.BigNumber.from(0)

  return mirror.ownerOf(tokenID)
}

// Hook exposing mint + update calls for mirror NFT.
export const useMirror = () => {
  const mirrorContract = new Contract(
    CONTRACTS.MIRROR_NFT[MIRROR_NFT_CHAIN_ID],
    MagicMirrorNFT.abi
  )

  const { send: mint, state: mintState } = useContractFunction(
    mirrorContract,
    'mint',
    {}
  )

  const mirrorManagerContract = new Contract(
    CONTRACTS.MIRROR_MANAGER[Optimism.chainId],
    MagicMirrorManager.abi
  )

  const { send: update, state: updateState } = useContractFunction(
    mirrorManagerContract,
    'setMirroredNFT',
    {}
  )

  return { mint, mintState, update, updateState }
}
