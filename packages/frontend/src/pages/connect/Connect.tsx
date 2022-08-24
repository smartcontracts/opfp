import { MirrorCard } from '../../components/MirrorCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'

import './Connect.scss'

export const Connect = () => {
  return <AppLayout mirrorCard={<MirrorCard />} content={<h1>Connect</h1>} />
}
