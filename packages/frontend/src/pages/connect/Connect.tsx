import { useNavigate } from 'react-router-dom'

import { MirrorCard } from '../../components/MirrorCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import METAMASK_LOGO from '../../assets/metamask-logo.png'
import WALLET_CONNECT_LOGO from '../../assets/wallet-connect-logo.png'
import COINBASE_LOGO from '../../assets/coinbase-logo.png'

import './Connect.scss'

export const Connect = () => {
  const navigate = useNavigate()
  const mirrorCardContent = <div className="connect__mirrorCardContent"></div>
  const mirrorCardDescription = (
    <div className="connect__mirrorCardDescription">
      <p>Connect your wallet</p>
    </div>
  )

  return (
    <AppLayout
      mirrorCard={
        <MirrorCard
          content={mirrorCardContent}
          description={mirrorCardDescription}
        />
      }
      content={
        <div className="connect__content">
          <button
            className="connect__button metamask"
            onClick={() => {
              navigate('/nft')
            }}
          >
            <div className="wrapper">
              <img src={METAMASK_LOGO} alt="MetaMask" />
              <span>MetaMask</span>
            </div>
          </button>
          <button className="connect__button mobile">
            <div className="wrapper">
              <img src={WALLET_CONNECT_LOGO} alt="Wallet connect" />
              <span>Mobile wallet</span>
            </div>
          </button>
          <button className="connect__button coinbase">
            <div className="wrapper">
              <img src={COINBASE_LOGO} alt="Coinbase" />
              <span>Coinbase wallet</span>
            </div>
          </button>
        </div>
      }
    />
  )
}
