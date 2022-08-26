import { useNavigate } from 'react-router-dom'
import { useEthers } from '@usedapp/core'
import { useEffect } from 'react'

import { MirrorCard } from '../../components/MirrorCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import METAMASK_LOGO from '../../assets/metamask-logo.png'
import WALLET_CONNECT_LOGO from '../../assets/wallet-connect-logo.png'
import COINBASE_LOGO from '../../assets/coinbase-logo.png'
import WALLET_ICON from '../../assets/wallet.webp'

import './Connect.scss'

export const Connect = () => {
  const { activateBrowserWallet, account } = useEthers()
  const navigate = useNavigate()

  useEffect(() => {
    if (account) {
      navigate('/nft')
    }
  }, [account])

  const mirrorCardContent = (
    <div className="connect__mirrorCardContent">
      <img className="walletIcon" src={WALLET_ICON} />
    </div>
  )

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
              activateBrowserWallet()
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
