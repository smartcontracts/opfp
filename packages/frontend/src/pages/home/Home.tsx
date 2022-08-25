import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { MirrorCard } from '../../components/MirrorCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import './Home.scss'

export const Home = () => {
  const navigate = useNavigate()
  const mirrorCardContent = <div className="home__mirrorCardContent"></div>
  const mirrorCardDescription = (
    <div className="home__mirrorCardDescription">
      <p>Welcome to the magic mirror.</p>
    </div>
  )

  const homeContent = (
    <div className="home__content">
      <p>
        The Magic Mirror allows you to mirror your Optimism NFTs on Ethereum so
        you can display them on apps like Twitter that don't yet support
        Opitmism NFTs natively.
      </p>
      <p>
        Once you connect your wallet, you'll first be prompted to mint a Magic
        Mirror NFT on Ethereum. You only need to do this once per address.
      </p>
      <p>
        After you've minted your Magic Mirror NFT, you can select an Optimism
        NFT to put inside of the Magic Mirror. You can only put one NFT inside
        of the Magic Mirror at a time, but you can update your mirrored NFT
        whenever you want.
      </p>
      <Button
        onClick={() => {
          navigate('/connect')
        }}
      >
        Continue...
      </Button>
    </div>
  )

  return (
    <div className="home__container">
      <AppLayout
        mirrorCard={
          <MirrorCard
            content={mirrorCardContent}
            description={mirrorCardDescription}
          />
        }
        content={homeContent}
      />
    </div>
  )
}
