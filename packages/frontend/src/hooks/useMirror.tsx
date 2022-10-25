import { useContractFunction } from '@usedapp/core'
import MagicMirrorNFT from '@opfp/contracts/artifacts/contracts/MagicMirrorNFT.sol/MagicMirrorNFT.json'
import MagicMirrorManager from '@opfp/contracts/artifacts/contracts/MagicMirrorManager.sol/MagicMirrorManager.json'
import { Contract, ethers } from 'ethers'

import {
  CONTRACTS,
  MIRROR_MANAGER_NETWORK,
  MIRROR_MANAGER_NFT_CHAIN_ID,
  MIRROR_NFT_CHAIN_ID,
  MIRROR_NFT_NETWORK,
} from '../config'

// Calls Mirror Manager contract to get mirror NFT contract address + token id.
export const getMirroredNFT = async (address: string): Promise<any> => {
  const network = new ethers.providers.InfuraProvider(MIRROR_MANAGER_NETWORK)
  const manager = new ethers.Contract(
    CONTRACTS.MIRROR_MANAGER[MIRROR_MANAGER_NFT_CHAIN_ID],
    MagicMirrorManager.abi,
    network
  )

  try {
    const result = await manager.getMirroredNFT(address)
    return result
  } catch (error) {
    console.log(error)
    return null
  }
}

// Calls Mirror NFT contract to see if account owns the respective mirror NFT.
export const getHasNft = async (account) => {
  const network = new ethers.providers.InfuraProvider(MIRROR_NFT_NETWORK)

  const mirror = new ethers.Contract(
    CONTRACTS.MIRROR_NFT[MIRROR_NFT_CHAIN_ID],
    MagicMirrorNFT.abi,
    network
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
    CONTRACTS.MIRROR_MANAGER[MIRROR_MANAGER_NFT_CHAIN_ID],
    MagicMirrorManager.abi
  )

  const { send: update, state: updateState } = useContractFunction(
    mirrorManagerContract,
    'setMirroredNFT',
    {}
  )

  return { mint, mintState, update, updateState }
}
