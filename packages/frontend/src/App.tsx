import React from 'react'
import { ethers } from 'ethers'
import MirrorNFT from '@opfp/contracts/artifacts/contracts/MirrorNFT.sol/MirrorNFT.json'

import './App.css'

type Props = {}

type State = {
  provider: ethers.providers.Web3Provider
  account: ethers.providers.JsonRpcSigner
  address: string
  assets: any
  chars: string[]
}

const getNftsByAddress = async (address: string) => {
  const res = await fetch(
    `https://api.quixotic.io/api/v1/account/${address}/assets/`,
    {
      headers: {
        'X-API-KEY': 'UqEiG81z.uzM8dSiqswNouNMeRRjGTGMpvbDwHOLC',
      },
    }
  )

  const assets = await res.json()
  return assets.results
}

class App extends React.Component<Props, State> {
  async componentDidMount() {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    await provider.send('eth_requestAccounts', [])
    const account = provider.getSigner(0)
    const address = await account.getAddress()
    const assets = await getNftsByAddress(address)
    console.log(assets)
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    this.setState({ provider, account, address, assets, chars: [] })
  }

  onKeyDown(e: any) {
    if (this.state.chars?.length === 0 && e.key.toLowerCase() === 'l') {
      this.setState({ chars: ['l'] })
    } else if (this.state.chars?.length === 1 && e.key.toLowerCase() === 'f') {
      this.setState({ chars: ['l', 'f'] })
    } else if (this.state.chars?.length === 2 && e.key.toLowerCase() === 'g') {
      this.setState({ chars: ['l', 'f', 'g'] }, async () => {
        const nft = new ethers.Contract(
          '0x9D9bc5B35D5278222f3628068E9Cac1403F80838',
          MirrorNFT.abi,
          this.state.account
        )
        const tx = await nft.mirror(
          this.state.assets
            .filter((asset: any) => asset.selected)
            .map((asset: any) => {
              return {
                chain: 10,
                token: asset.collection.address,
                ids: [asset.token_id],
              }
            })
        )
        console.log(tx.hash)
        await tx.receipt()
        console.log('done')
        this.setState({ chars: [] })
      })
    }
  }

  onAssetClicked(asset: any) {
    if (asset.selected) {
      asset.selected = false
    } else {
      asset.selected = true
    }

    this.setState({ assets: this.state.assets })
  }

  getSelectionCount(): number {
    return this.state?.assets?.filter((asset: any) => asset.selected).length
  }

  render() {
    return (
      <div className="app">
        <div className="app-grid">
          <div className="header">
            <h1 className="header-title">OPTIMIЯROR</h1>
          </div>
          <div className="asset-container">
            <div className="asset-grid">
              {this.state?.assets?.map((asset: any, index: number) => {
                return (
                  <div
                    className={`asset-card ${asset.selected ? 'selected' : ''}`}
                    key={index}
                    onClick={this.onAssetClicked.bind(this, asset)}
                  >
                    <div className="asset-image-container">
                      <img
                        className="asset-image"
                        src={asset.image_url}
                        alt={asset.name}
                      />
                    </div>
                    <div className="asset-info-container">
                      <div className="asset-name">{asset.name}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mirror-action-container">
            <div className="mirror-action-box">
              <div
                className={`mirror-letter ${
                  this.state?.chars?.at(0) === 'l' ? 'active' : ''
                }`}
              >
                L
              </div>
              <div
                className={`mirror-letter ${
                  this.state?.chars?.at(1) === 'f' ? 'active' : ''
                }`}
              >
                F
              </div>
              <div
                className={`mirror-letter ${
                  this.state?.chars?.at(2) === 'g' ? 'active' : ''
                }`}
              >
                G
              </div>
            </div>
          </div>
          <div className="asset-container mirrored">
            <div className="asset-grid">
              {this.state?.assets?.map((asset: any, index: number) => {
                return (
                  <div
                    className={`asset-card ${asset.selected ? 'selected' : ''}`}
                    key={index}
                    onClick={this.onAssetClicked.bind(this, asset)}
                  >
                    <div className="asset-image-container">
                      <img
                        className="asset-image"
                        src={asset.image_url}
                        alt={asset.name}
                      />
                    </div>
                    <div className="asset-info-container">
                      <div className="asset-name">{asset.name}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
