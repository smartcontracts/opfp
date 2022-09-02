import { NFTCard } from '../NFTCard'
import { TraitCard } from '../TraitCard'

import './NFTPageContent.scss'

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
  if (showSkeleton) {
    return <div>skeleton</div>
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
        {traits.map((trait, index) => (
          <TraitCard key={index} name={trait.trait_type} value={trait.value} />
        ))}
      </div>
    )
  }
}
