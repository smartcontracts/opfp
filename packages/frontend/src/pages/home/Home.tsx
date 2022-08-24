import { Button } from '../../components/Button'
import { MirrorCard } from '../../components/MirrorCard'
import { TraitCard } from '../../components/TraitCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import './Home.scss'

export const Home = () => {
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
    <div className="home__container">
      <AppLayout
        mirrorCard={<MirrorCard />}
        content={
          <div className="home__content">
            <h3>Optimism</h3>
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
      />
    </div>
  )
}
