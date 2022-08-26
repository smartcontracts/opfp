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
        <span>The Magic Mirror</span> allows you to mirror your{' '}
        <span>Optimism NFTs on Ethereum</span> so you can{' '}
        <span>display them on apps like Twitter</span> that don't yet support
        Opitmism NFTs natively.
      </p>
      <p>
        Once you connect your wallet, you'll first be prompted to mint a Magic
        Mirror NFT on Ethereum. You only need to do this{' '}
        <span>once per address</span>.
      </p>
      <p>
        After you've minted your Magic Mirror NFT, you can select an Optimism
        NFT to put <span>inside of the Magic Mirror</span>. You can only put one
        NFT inside of the Magic Mirror at a time, but you can{' '}
        <span>update your mirrored NFT whenever you want</span>.
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
