import { useState } from 'react'

import { Button } from '../../components/Button'
import { MirrorCard } from '../../components/MirrorCard'
import { NFTCard } from '../../components/NFTCard'
import { TraitCard } from '../../components/TraitCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'

import './NFTPage.scss'

export const NFTPage = () => {
  const [showNfts, setShowNfts] = useState(false)
  const [activeNFT, setActiveNFT] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)

  const mirrorCardContent = (
    <img
      src="https://quixotic.io/_next/image?url=https%3A%2F%2Ffanbase-1.s3.amazonaws.com%2Fnft_image%2F0x5c9D55b78FEBCC2061715BA4f57EcF8EA2711F2c%2F3539%2F1659352981%2Fimage.png&w=2048&q=75"
      alt="nft"
    />
  )

  const mirrorCardDescription = (
    <div className="nftPage__mirrorCardDescription">
      <p className="title">Magic Mirror NFT</p>
      <div className="row">
        <p className="name">Contract</p>
        <p>0x123...123</p>
      </div>
      <div className="row">
        <p className="name">Token ID</p>
        <p>123123...</p>
      </div>
      <div className="row">
        <p className="name">Last updated</p>
        <p>1 day ago</p>
      </div>
    </div>
  )

  const traits = [
    {
      name: 'background',
      value: 'yellow',
    },
    {
      name: 'helmet',
      value: 'flower',
    },
    {
      name: 'visor',
      value: 'sky',
    },
    {
      name: 'chain',
      value: 'silver',
    },
    {
      name: 'body',
      value: 'robotaskj aksks hvh ',
    },
    {
      name: 'outfit',
      value: 'camo tee blah blah',
    },
  ]

  const nfts = [
    {
      name: 'Magic Mirror asfsf asf  asf as dfs fa sf sdf fasd fs',
      image:
        'https://quixotic.io/_next/image?url=https%3A%2F%2Ffanbase-1.s3.amazonaws.com%2Fnft_image%2F0x5c9D55b78FEBCC2061715BA4f57EcF8EA2711F2c%2F3539%2F1659352981%2Fimage.png&w=2048&q=75',
    },

    {
      name: 'Magic Mirror',
      image:
        'https://quixotic.io/_next/image?url=https%3A%2F%2Ffanbase-1.s3.amazonaws.com%2Fnft_image%2F0x5c9D55b78FEBCC2061715BA4f57EcF8EA2711F2c%2F3539%2F1659352981%2Fimage.png&w=2048&q=75',
    },
    {
      name: 'Magic Mirror',
      image:
        'https://quixotic.io/_next/image?url=https%3A%2F%2Ffanbase-1.s3.amazonaws.com%2Fnft_image%2F0x5c9D55b78FEBCC2061715BA4f57EcF8EA2711F2c%2F3539%2F1659352981%2Fimage.png&w=2048&q=75',
    },
  ]

  const updateNFT = () => {
    setShowNfts(!showNfts)
    setIsLoading(true)
  }

  return (
    <AppLayout
      mirrorCard={
        <MirrorCard
          content={mirrorCardContent}
          description={mirrorCardDescription}
        />
      }
      content={
        <div className="nftPage__content">
          <h3>
            <div className="dot"></div> Optimism
          </h3>
          <h1>0x123...123</h1>

          {showNfts ? (
            <div className="card__nftCardContainer">
              {nfts.map((nft, index) => (
                <NFTCard
                  name={nft.name}
                  img={nft.image}
                  isActive={activeNFT === index}
                  onClick={() => setActiveNFT(index === activeNFT ? -1 : index)}
                />
              ))}
            </div>
          ) : (
            <div className="card__container">
              {traits.map((trait) => (
                <TraitCard name={trait.name} value={trait.value} />
              ))}
            </div>
          )}

          <Button onClick={updateNFT} isLoading={isLoading}>
            <span>Update NFT</span>
          </Button>
        </div>
      }
    ></AppLayout>
  )
}
