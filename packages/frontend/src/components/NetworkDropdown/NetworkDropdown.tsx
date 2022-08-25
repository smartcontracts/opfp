import './NetworkDropdown.scss'

import ClickAwayListener from 'react-click-away-listener'
import { useState } from 'react'
import { useEthers, Mainnet, Optimism } from '@usedapp/core'

import {
  OP_NETWORK,
  NETWORKS,
  ETH_NETWORK,
  UNSUPPORTED_NETWORK,
} from './constants'

export const NetworkDropdown = ({}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { switchNetwork, chainId } = useEthers()

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
            : UNSUPPORTED_NETWORK.jsx}
        </div>

        {showDropdown && (
          <div className="networkDropdown__dropdown">
            {NETWORKS.map((network) => (
              <div
                onClick={() => {
                  setShowDropdown(!showDropdown)
                  switchNetwork(network.chainId)
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
