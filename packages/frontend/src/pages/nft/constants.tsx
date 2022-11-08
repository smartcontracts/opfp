import { TraitCard } from '../../components/TraitCard'

export const mintDescription = (
  <div className="card__notMintedContainer">
    <TraitCard
      name="NFT not minted"
      value="To proceed, click the button below to mint your Magic Mirror NFT. Please ensure that you have ETH on both Ethereum and Optimism, or the transaction will fail."
    />
  </div>
)

export const updateDescription = (
  <div className="card__notMintedContainer">
    <TraitCard
      name="Set Up Your Mirror NFT"
      value="To set up your MagicMirror NFT, select any Optimism NFT in your wallet. Click the button below in order to view your NFTs."
    />
  </div>
)
