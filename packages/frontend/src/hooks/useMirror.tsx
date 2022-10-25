import MagicMirrorNFT from '@opfp/contracts/artifacts/contracts/MagicMirrorNFT.sol/MagicMirrorNFT.json'
import MagicMirrorManager from '@opfp/contracts/artifacts/contracts/MagicMirrorManager.sol/MagicMirrorManager.json'
import { ethers } from 'ethers'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

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

export const useUpdateNft = (contract, token) => {
  const { config: setMirroredNFTConfig } = usePrepareContractWrite({
    addressOrName: CONTRACTS.MIRROR_MANAGER[MIRROR_MANAGER_NFT_CHAIN_ID],
    contractInterface: MagicMirrorManager.abi,
    functionName: 'setMirroredNFT',
    args: [contract, token],
  })

  const {
    data,
    isLoading,
    write: update,
  } = useContractWrite(setMirroredNFTConfig)

  const updateState = {
    data,
    isLoading,
  }

  return { update, updateState }
}

// Hook exposing mint + update calls for mirror NFT.
export const useMirror = () => {
  const { config: mintConfig } = usePrepareContractWrite({
    addressOrName: CONTRACTS.MIRROR_NFT[MIRROR_NFT_CHAIN_ID],
    contractInterface: MagicMirrorNFT.abi,
    functionName: 'mint',
  })

  const {
    data: mintData,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
    write: mint,
  } = useContractWrite(mintConfig)

  const mintState = {
    data: mintData,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
  }

  return { mint, mintState }
}
