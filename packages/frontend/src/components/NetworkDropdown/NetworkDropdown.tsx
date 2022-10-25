import './NetworkDropdown.scss'

import ClickAwayListener from 'react-click-away-listener'
import { useState } from 'react'
import { Mainnet, Optimism, Rinkeby } from '@usedapp/core'
import { useNetwork, useSwitchNetwork } from 'wagmi'

import {
  OP_NETWORK,
  NETWORKS,
  ETH_NETWORK,
  UNSUPPORTED_NETWORK,
  RINKEBY_NETWORK,
} from './constants'

export const NetworkDropdown = ({}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const { switchNetwork } = useSwitchNetwork()
  const { chain } = useNetwork()
  const chainId = chain?.id

  const handleClickAway = () => {
    setShowDropdown(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="networkDropdown__container">
        <div
          className="networkDropdown__pill"
          onClick={() => {
            setShowDropdown(!showDropdown)
          }}
        >
          {chainId === Mainnet.chainId
            ? ETH_NETWORK.jsx
            : chainId === Optimism.chainId
            ? OP_NETWORK.jsx
            : chainId === Rinkeby.chainId
            ? RINKEBY_NETWORK.jsx
            : UNSUPPORTED_NETWORK.jsx}
        </div>

        {showDropdown && (
          <div className="networkDropdown__dropdown">
            {NETWORKS.map((network, index) => (
              <div
                key={index}
                onClick={() => {
                  setShowDropdown(!showDropdown)
                  switchNetwork?.(network.chainId)
                }}
                className="networkDropdown__item"
              >
                {network.jsx}
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  )
}
