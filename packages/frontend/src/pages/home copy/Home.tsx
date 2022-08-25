import { Button } from '../../components/Button'
import { MirrorCard } from '../../components/MirrorCard'
import { TraitCard } from '../../components/TraitCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import './Home.scss'

export const Home = () => {
  const mirrorCardContent = (
    <img src="https://quixotic.io/_next/image?url=https%3A%2F%2Ffanbase-1.s3.amazonaws.com%2Fnft_image%2F0x5c9D55b78FEBCC2061715BA4f57EcF8EA2711F2c%2F2186%2F1659351251%2Fimage.png&w=1200&q=75"></img>
  )
  const mirrorCardDescription = <div>Description</div>

  return (
    <div className="home__container">
      <AppLayout
        mirrorCard={
          <MirrorCard
            content={mirrorCardContent}
            description={mirrorCardDescription}
          />
        }
        content={<div className="home__content"></div>}
      />
    </div>
  )
}
