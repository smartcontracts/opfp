import React from 'react'
import { ethers } from 'ethers'
import MagicMirrorNFT from '@opfp/contracts/artifacts/contracts/MagicMirrorNFT.sol/MagicMirrorNFT.json'
import MagicMirrorManager from '@opfp/contracts/artifacts/contracts/MagicMirrorManager.sol/MagicMirrorManager.json'

import './App.css'

enum PageStatus {
  UNKNOWN,
  NOT_CONNECTED,
  NOT_MINTED,
  READY,
}

type Props = {}

type State = {
  provider: ethers.providers.Web3Provider
  address: string
  assets: any
  status: PageStatus
  transacting: boolean
  modal: boolean
  modalStep2: boolean
  mirrored: any
}

// const getNFT = async (token: string, id: string) => {
//   const res = await fetch(
//     `https://api.quixotic.io/api/v1/assets/${token}:${id}`,
//     {
//       headers: {
//         'X-API-KEY': 'UqEiG81z.uzM8dSiqswNouNMeRRjGTGMpvbDwHOLC',
//       },
//     }
//   )

//   const assets = await res.json()
//   return assets.results
// }

const getNftsByAddress = async (address: string) => {
  const res = await fetch(
    `https://api.qx.app/api/v1/account/${address}/assets/`,
    {
      headers: {
        'X-API-KEY': 'dmXaymWM.9qHFy1OHvDfhCWVJkhW2oNGvyoBsWyia',
      },
    }
  )

  const assets = await res.json()
  return assets.results
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      provider: new ethers.providers.Web3Provider((window as any).ethereum),
      address: '',
      assets: [],
      status: PageStatus.UNKNOWN,
      transacting: false,
      modal: false,
      modalStep2: false,
      mirrored: null,
    }
  }

  async componentDidMount() {
    const status = await this.getPageStatus()
    if (status !== PageStatus.NOT_CONNECTED && status !== PageStatus.UNKNOWN) {
      await this.state.provider.send('eth_requestAccounts', [])
      const account = this.state.provider.getSigner(0)
      const address = await account.getAddress()
      const assets = await getNftsByAddress(address)
      this.setState({
        address,
        status,
        assets,
      })
      if (status === PageStatus.READY) {
        console.log(await this.getMirroredNFT(address))
        this.setState({
          mirrored: await this.getMirroredNFT(address),
        })
      }
    } else {
      return this.setState({ status })
    }
  }

  async onConnectClicked() {
    await this.state.provider.send('eth_requestAccounts', [])
    const account = this.state.provider.getSigner(0)
    const address = await account.getAddress()
    return this.setState({
      address,
      status: await this.getPageStatus(),
    })
  }

  async onMintClicked() {
    const network = await this.state.provider.getNetwork()
    if (network.chainId !== 4) {
      await this.state.provider.send('wallet_switchEthereumChain', [
        { chainId: '0x4' },
      ])
    }

    const account = this.state.provider.getSigner(this.state.address)
    const nft = new ethers.Contract(
      '0x1dE1daC8A8EC70d48cadCCE1f93AeB54263a3EC8',
      MagicMirrorNFT.abi,
      account
    )

    const tx = await nft.mint()
    this.setState({ transacting: true })
    await tx.wait()
    this.setState({ transacting: false, status: await this.getPageStatus() })
  }

  async onSelectClicked() {
    this.setState({
      modal: true,
    })
  }

  async onCloseClicked() {
    this.setState({
      modalStep2: false,
    })
  }

  onAssetClicked(asset: any) {
    if (asset.selected) {
      asset.selected = false
    } else {
      asset.selected = true
    }

    this.setState({ assets: this.state.assets, modalStep2: true })
  }

  async onUpdateClicked() {
    const selected = this.state.assets.find((asset) => {
      return asset.selected
    })

    const network = await this.state.provider.getNetwork()
    if (network.chainId !== 10) {
      await this.state.provider.send('wallet_switchEthereumChain', [
        { chainId: '0xA' },
      ])
    }

    const manager = new ethers.Contract(
      '0xEF76F4523C83fbB8A2833b80b1c13489B4AB1563',
      MagicMirrorManager.abi,
      this.state.provider.getSigner(this.state.address)
    )

    const tx = await manager.setMirroredNFT({
      token: selected.collection.address,
      id: selected.token_id,
    })

    await tx.wait()
  }

  async getMirroredNFT(address: string): Promise<any> {
    const optimism = new ethers.providers.InfuraProvider('optimism')
    const manager = new ethers.Contract(
      '0xEF76F4523C83fbB8A2833b80b1c13489B4AB1563',
      MagicMirrorManager.abi,
      optimism
    )
    return manager.getMirroredNFT(address)
  }

  async getPageStatus(): Promise<PageStatus> {
    let address: string
    try {
      const account = this.state.provider.getSigner(0)
      address = await account.getAddress()
    } catch (err) {
      return PageStatus.NOT_CONNECTED
    }

    const mainnet = new ethers.providers.InfuraProvider('rinkeby')
    const nft = new ethers.Contract(
      '0x52D4E86F1B35FccF184773862D4C7e6202Ae35fE',
      MagicMirrorNFT.abi,
      mainnet
    )

    try {
      await nft.ownerOf(ethers.BigNumber.from(address))
    } catch (err) {
      return PageStatus.NOT_MINTED
    }

    return PageStatus.READY
  }

  render() {
    return (
      <div className="app">
        {this.state.modal && (
          <div className="ab-modal">
            <div
              className="ab-modalbg"
              onClick={this.onCloseClicked.bind(this)}
            ></div>
            <div className="ab-modalbox">
              {!this.state.modalStep2 &&
                this.state?.assets?.map((asset: any, index: number) => {
                  return (
                    <div
                      className={`asset-card ${
                        asset.selected ? 'selected' : ''
                      }`}
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
              {this.state.modalStep2 && (
                <div className="updater">
                  <button onClick={this.onUpdateClicked.bind(this)}>
                    UPDATE
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="app-grid">
          <div className="header">
            <h1 className="header-title">THE MAGIC MIRROR</h1>
          </div>
          <div className="action-box">
            <div className="action-box-container">
              {this.state.status === PageStatus.UNKNOWN && (
                <div className="ab-uk">
                  <h2 className="ab-title">PREPARING THE MAGIC MIRROR</h2>
                  <div className="ab-uk-spinner">
                    <div className="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              )}
              {this.state.status === PageStatus.NOT_CONNECTED && (
                <div className="ab-nc">
                  <h2 className="ab-title">WHAT IS THE MAGIC MIRROR?</h2>
                  <div className="ab-nc-description">
                    <p>
                      The Magic Mirror allows you to mirror your Optimism NFTs
                      on Ethereum so you can display them on apps like Twitter
                      that don't yet support Opitmism NFTs natively.
                    </p>
                    <p>
                      Once you connect your wallet, you'll first be prompted to
                      mint a Magic Mirror NFT on Ethereum. You only need to do
                      this once per address.
                    </p>
                    <p>
                      After you've minted your Magic Mirror NFT, you can select
                      an Optimism NFT to put inside of the Magic Mirror. You can
                      only put one NFT inside of the Magic Mirror at a time, but
                      you can update your mirrored NFT whenever you want.
                    </p>
                    <p>Ready?</p>
                  </div>
                  <button
                    className="ab-nc-connect"
                    onClick={this.onConnectClicked.bind(this)}
                  >
                    CONNECT WALLET
                  </button>
                </div>
              )}
              {this.state.status === PageStatus.NOT_MINTED && (
                <div className="ab-nm">
                  <h2 className="ab-title">MINT YOUR MAGIC MIRROR NFT</h2>
                  <button
                    className="ab-nm-mint"
                    onClick={this.onMintClicked.bind(this)}
                  >
                    {!this.state.transacting && 'MINT'}
                    {this.state.transacting && (
                      <div className="lds-ripple">
                        <div></div>
                        <div></div>
                      </div>
                    )}
                  </button>
                </div>
              )}
              {this.state.status === PageStatus.READY && (
                <div className="ab-nm">
                  <h2 className="ab-title">UPDATE MIRRORED NFT</h2>
                  <button
                    className="ab-nm-mint"
                    onClick={this.onSelectClicked.bind(this)}
                  >
                    {!this.state.transacting && 'SELECT'}
                    {this.state.transacting && (
                      <div className="lds-ripple">
                        <div></div>
                        <div></div>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
