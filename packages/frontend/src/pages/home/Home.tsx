import { MirrorCard } from '../../components/MirrorCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import './Home.scss'

export const Home = () => {
  return (
    <div className="Home">
      <AppLayout mirrorCard={<MirrorCard />} content={<h1>Content</h1>} />
    </div>
  )
}
