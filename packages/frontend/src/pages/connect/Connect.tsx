import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { MirrorCard } from '../../components/MirrorCard'
import { AppLayout } from '../../layout/AppLayout/AppLayout'
import WALLET_ICON from '../../assets/wallet.webp'
import './Connect.scss'
import { Button } from '../../components/Button'

export const Connect = () => {
  const { address } = useAccount()
  const navigate = useNavigate()
  const { openConnectModal } = useConnectModal()

  useEffect(() => {
    if (address) {
      navigate('/nft')
    }
  })

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
          <Button onClick={openConnectModal}>Connect Wallet</Button>
          <p>
            Please connect your wallet above in order to use the MagicMirror.
          </p>
          {/* <button className="connect__button mobile">
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
          </button> */}
        </div>
      }
    />
  )
}
