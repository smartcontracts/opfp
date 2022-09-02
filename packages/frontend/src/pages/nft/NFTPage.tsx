import { useEffect, useState } from 'react'
import { useEthers, Rinkeby, Optimism } from '@usedapp/core'
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

export const NFTPage = () => {
  const { account, chainId, switchNetwork } = useEthers()
  const navigate = useNavigate()
  const { mint, update } = useMirror()

  const [showNfts, setShowNfts] = useState(false)
  const [hasNFT, setHasNft] = useState(false)
  const [mirroredNFT, setMirroredNFT] = useState<any>(null)
  const [nfts, setNfts] = useState<any[]>([])
  const [nft, setNft] = useState<any>(null)
  const [activeNFT, setActiveNFT] = useState(-1)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [isButtonSpinning] = useState(false)

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
        setHasNft(_hasNFT)
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
      if (chainId !== Rinkeby.chainId) {
        switchNetwork(Rinkeby.chainId)
      }
      mint()
    } else if (hasNFT && !showNfts) {
      // toggle to show NFTs in wallet
      if (chainId !== Optimism.chainId) {
        await switchNetwork(Optimism.chainId)
      } else {
        setShowNfts(true)
      }
    } else {
      // Call magic mint manager to update NFT metadata
      if (chainId !== Optimism.chainId) {
        switchNetwork(Optimism.chainId)
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
    contractAddress = nft?.collection.address
    tokenId = nft?.token_id
    lastUpdated = shortenString(nft?.collection.name, 20)
    buttonText = 'Update NFT'
    if (!isPageLoading) {
      const nftImg = getNFTImg()
      mirrorCardContent = <img src={nftImg} alt="Magic Mirror NFT" />
    }
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
              <Button onClick={handleButtonClick} isLoading={isButtonSpinning}>
                <span>{buttonText}</span>
              </Button>
            )}
          </div>
        }
      />
    )
  }
}
