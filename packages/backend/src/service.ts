import {
  BaseServiceV2,
  ExpressRouter,
  validators,
} from '@eth-optimism/common-ts'
import { abi as MagicMirrorNFT } from '@opfp/contracts/artifacts/contracts/MagicMirrorNFT.sol/MagicMirrorNFT.json'
import { abi as MagicMirrorManager } from '@opfp/contracts/artifacts/contracts/MagicMirrorManager.sol/MagicMirrorManager.json'
import { ethers } from 'ethers'
import fetch from 'node-fetch'

type Options = {
  optimismRpcProvider: ethers.providers.StaticJsonRpcProvider
  optimismKovanRpcProvider: ethers.providers.StaticJsonRpcProvider
}

type Metrics = {}

type State = {}

export class OPFPBackendService extends BaseServiceV2<Options, Metrics, State> {
  constructor(options?: Partial<Options>) {
    super({
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      version: require('../package.json').version,
      name: 'opfp-backend',
      options,
      optionsSpec: {
        optimismRpcProvider: {
          validator: validators.staticJsonRpcProvider,
          desc: 'optimism RPC provider',
          secret: true,
        },
        optimismKovanRpcProvider: {
          validator: validators.staticJsonRpcProvider,
          desc: 'optimism kovan RPC provider',
          secret: true,
        },
      },
      metricsSpec: {},
    })
  }

  async routes(router: ExpressRouter) {
    router.get('/mirror/uri/:chain/:owner', async (req, res) => {
      if (!ethers.utils.isAddress(req.params.owner)) {
        return res.status(400).send('invalid token address')
      }

      const providers = {
        [10]: this.options.optimismRpcProvider,
        [69]: this.options.optimismKovanRpcProvider,
      }

      const provider = providers[req.params.chain]
      if (!provider) {
        return res.status(400).send('invalid chain ID')
      }

      // Same address on every network
      const manager = new ethers.Contract(
        '0xEF76F4523C83fbB8A2833b80b1c13489B4AB1563',
        MagicMirrorManager,
        provider
      )

      let mirrored: any
      try {
        mirrored = await manager.getMirroredNFT(req.params.owner)
      } catch (err) {
        return res.status(400).send('unable to get NFT')
      }

      let uri: string
      try {
        const nft = new ethers.Contract(
          mirrored.token,
          MagicMirrorNFT,
          provider
        )
        uri = await nft.tokenURI(mirrored.id)
      } catch (err) {
        return res.status(400).send('unable to get token URI from contract')
      }

      if (uri.startsWith('ipfs://')) {
        uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
      }

      try {
        const ret = await fetch(uri)
        const body = await ret.json()
        return res.json(body)
      } catch (err) {
        return res.status(400).send('unable to pull token URI data from remote')
      }
    })
  }

  async main() {
    // Do we need to do anything here?
  }
}
