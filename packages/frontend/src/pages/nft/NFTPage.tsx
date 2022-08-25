import { Button } from '../../components/Button'
import { MirrorCard } from '../../components/MirrorCard'
import { TraitCard } from '../../components/TraitCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import './NFTPage.scss'

export const NFTPage = () => {
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

  const updateNFT = () => {
    console.log('updateNFT')
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
          <div className="card__container">
            {traits.map((trait) => (
              <TraitCard name={trait.name} value={trait.value} />
            ))}
          </div>
          <Button onClick={updateNFT}>
            <span>Update NFT</span>
          </Button>
        </div>
      }
    ></AppLayout>
  )
}
