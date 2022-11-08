import Skeleton from 'react-loading-skeleton'
import InfiniteScroll from 'react-infinite-scroll-component'

import { NFTCard } from '../NFTCard'
import { TraitCard } from '../TraitCard'

import './NFTPageContent.scss'
import 'react-loading-skeleton/dist/skeleton.css'

interface NFTCardProps {
  nfts: any[]
  traits: any[]
  showSkeleton: boolean
  showNfts: boolean
  activeNFT: number
  setActiveNFT: (nft: number) => void
  fetchNextNfts: () => void
  hasMoreNfts: boolean
}

export const NFTPageContent = ({
  nfts,
  traits,
  showSkeleton,
  showNfts,
  activeNFT,
  setActiveNFT,
  fetchNextNfts,
  hasMoreNfts,
}: NFTCardProps) => {
  const loading = (
    <div className="card__nftCardEmpty">
      <p>Fetching NFTs in wallet...</p>
    </div>
  )

  if (showSkeleton) {
    return (
      <div className="card__skeletonContainer">
        <Skeleton height="44px" borderRadius="14px" />
        <Skeleton height="44px" borderRadius="14px" />
        <Skeleton height="44px" borderRadius="14px" />
        <Skeleton height="62px" borderRadius="18px" />
      </div>
    )
  } else if (showNfts) {
    if (nfts?.length === 0) {
      return (
        <div className="card__nftCardEmpty">
          <p>No NFTs found 😓</p>
          <p>
            Check out{' '}
            <a href="https://qx.app/" target="_blank">
              Quix
            </a>{' '}
            to buy NFTs on Optimism
          </p>
        </div>
      )
    } else if (nfts && nfts[0] === 'loading') {
      return loading
    } else {
      return (
        <InfiniteScroll
          dataLength={nfts?.length || 0}
          next={fetchNextNfts}
          hasMore={hasMoreNfts}
          loader={<p className="card__loadingText">Loading...</p>}
          height={300}
          className="card__nftCardContainer"
        >
          {nfts?.map((nft, index) => (
            <NFTCard
              key={index}
              name={nft.name}
              img={nft.image_url}
              isActive={activeNFT === index}
              onClick={() => setActiveNFT(index === activeNFT ? -1 : index)}
            />
          ))}
        </InfiniteScroll>
      )
    }
  } else {
    return (
      <div className="card__container">
        {traits?.map((trait, index) => (
          <TraitCard
            key={index}
            name={trait?.trait_type}
            value={trait?.value}
          />
        ))}
      </div>
    )
  }
}
