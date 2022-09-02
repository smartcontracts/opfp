import Skeleton from 'react-loading-skeleton'

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
}

export const NFTPageContent = ({
  nfts,
  traits,
  showSkeleton,
  showNfts,
  activeNFT,
  setActiveNFT,
}: NFTCardProps) => {
  console.log(nfts)
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
    return (
      <div className="card__nftCardContainer">
        {nfts.map((nft, index) => (
          <NFTCard
            key={index}
            name={nft.name}
            img={nft.image_url}
            isActive={activeNFT === index}
            onClick={() => setActiveNFT(index === activeNFT ? -1 : index)}
          />
        ))}
      </div>
    )
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
