import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { MirrorCard } from '../../components/MirrorCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import {
  getNftDetails,
  getNftsByAddress,
  shortenAddress,
  shortenString,
} from '../../helpers'
import { NetworkDropdown } from '../../components/NetworkDropdown/NetworkDropdown'
import { NFTPageContent } from '../../components/NFTPageContent'
import { Account } from '../../components/Account'
import { mintDescription } from './constants'
import { getHasNft, getMirroredNFT, useMirror } from '../../hooks/useMirror'
import './NFTPage.scss'
import { MIRROR_MANAGER_NFT_CHAIN_ID, MIRROR_NFT_CHAIN_ID } from '../../config'

export const NFTPage = () => {
  const { account, chainId, switchNetwork } = useEthers()
  console.log(chainId)
  const navigate = useNavigate()
  const { mint, update, mintState } = useMirror()
  console.log(mintState)

  const [showNfts, setShowNfts] = useState(false)
  const [hasNFT, setHasNft] = useState(false)
  const [mirroredNFT, setMirroredNFT] = useState<any>(null)
  const [nfts, setNfts] = useState<any[]>([])
  const [nft, setNft] = useState<any>(null)
  const [activeNFT, setActiveNFT] = useState(-1)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isButtonSpinning] = useState(true)

  // const mirrorIsEmpty = !mirroredNFT && hasNFT
  // console.log('mirrorIsEmpty', !mirroredNFT, hasNFT, mirrorIsEmpty)

  useEffect(() => {
    // Initialization function for page data.
    const initialize = async (account) => {
      setIsPageLoading(true)
      // Get the mirror NFT + load traits if the mirrored NFT exists.
      try {
        const _mirroredNFT = await getMirroredNFT(account)
        setMirroredNFT(_mirroredNFT)

        const opfp = await getNftDetails(
          _mirroredNFT?.token,
          _mirroredNFT?.id.toNumber()
        )

        setNft(opfp)
      } catch (error) {
        console.log(error)
      }

      // Check to see if the user has the mirrored NFT.
      try {
        const _hasNFT = await getHasNft(account)

        setHasNft(_hasNFT !== '')
      } catch (error) {
        setHasNft(false)
        console.log(error)
      }

      // Gets NFTs in users wallet on optimism.
      const _nfts = await getNftsByAddress(account)
      setNfts(_nfts)
      setIsPageLoading(false)
    }

    if (!account) {
      navigate('/connect')
    } else {
      // Load NFTs
      initialize(account)
    }
  }, [account])

  // useEffect(() => {
  //   if (mintState.status === )
  // }, [])

  const getNFTImg = () => {
    let img = ''
    nfts.forEach((nft) => {
      if (
        nft?.collection?.address == mirroredNFT?.token &&
        nft?.token_id == mirroredNFT?.id.toNumber()
      ) {
        img = nft.image_url
      }
    })

    return img
  }

  const handleButtonClick = async () => {
    if (!hasNFT && !showNfts) {
      // mint mirror nft
      if (chainId !== MIRROR_NFT_CHAIN_ID) {
        switchNetwork(MIRROR_NFT_CHAIN_ID)
      }
      mint()
    } else if (hasNFT && !showNfts) {
      // toggle to show NFTs in wallet

      if (chainId !== MIRROR_MANAGER_NFT_CHAIN_ID) {
        await switchNetwork(MIRROR_MANAGER_NFT_CHAIN_ID)
        setShowNfts(true)
      }
    } else {
      // Call magic mint manager to update NFT metadata
      if (chainId !== MIRROR_MANAGER_NFT_CHAIN_ID) {
        switchNetwork(MIRROR_MANAGER_NFT_CHAIN_ID)
      }
      const tokenId = nfts[activeNFT].token_id
      const contract = nfts[activeNFT].collection.address
      update({ token: contract, id: tokenId })
    }
  }

  let contractAddress = 'Not minted'
  let tokenId = 'Not minted'
  let lastUpdated = 'N/A'
  let buttonText = 'Mint NFT'
  let mirrorCardContent = <div className="connect__mirrorCardContent" />

  if (hasNFT) {
    if (nft === null) {
      contractAddress = ''
      tokenId = 'Not set'
      lastUpdated = 'Not set'
      buttonText = 'Set Mirror NFT'
    } else {
      contractAddress = nft?.collection.address
      tokenId = nft?.token_id
      lastUpdated = shortenString(nft?.collection.name, 20)
      buttonText = 'Update NFT'
      if (!isPageLoading) {
        const nftImg = getNFTImg()
        mirrorCardContent = <img src={nftImg} alt="Magic Mirror NFT" />
      }
    }
  }

  if (showNfts) {
    buttonText = 'Confirm'
  }

  const mirrorCardDescription = (
    <div className="nftPage__mirrorCardDescription">
      <p className="title">Magic Mirror NFT</p>
      <div className="row">
        <p className="name">Collection</p>
        <p>{lastUpdated}</p>
      </div>
      <div className="row">
        <p className="name">Token ID</p>
        <p>{tokenId}</p>
      </div>
      <div className="row">
        <p className="name">NFT Contract</p>
        <p>{!hasNFT ? contractAddress : shortenAddress(contractAddress)}</p>
      </div>
    </div>
  )

  if (!account) {
    return null
  } else {
    return (
      <AppLayout
        mirrorCard={
          <MirrorCard
            showSkeleton={isPageLoading}
            content={mirrorCardContent}
            description={mirrorCardDescription}
          />
        }
        content={
          <div className="nftPage__content">
            <NetworkDropdown />
            <Account account={account} />
            {!isPageLoading && !hasNFT ? (
              mintDescription
            ) : (
              <NFTPageContent
                showNfts={showNfts}
                showSkeleton={isPageLoading}
                nfts={nfts}
                traits={nft?.traits}
                activeNFT={activeNFT}
                setActiveNFT={(nftIndex) => {
                  setActiveNFT(nftIndex)
                }}
              />
            )}
            {isPageLoading ? null : (
              <div className="card__buttonContainer">
                {showNfts && (
                  <Button
                    isSecondary={true}
                    onClick={() => {
                      setShowNfts(false)
                    }}
                    isLoading={isButtonSpinning}
                  >
                    <span>{'Back'}</span>
                  </Button>
                )}
                <Button
                  isDisabled={showNfts && activeNFT === -1}
                  onClick={handleButtonClick}
                  isLoading={isButtonSpinning}
                >
                  <span>{buttonText}</span>
                </Button>
              </div>
            )}
          </div>
        }
      />
    )
  }
}
