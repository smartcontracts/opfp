import {
  BaseServiceV2,
  ExpressRouter,
  validators,
} from '@eth-optimism/common-ts'
import { abi as ERC721 } from '@opfp/contracts/artifacts/@openzeppelin/contracts/token/ERC721/ERC721.sol/ERC721.json'
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
    router.get('/mirror/uri/:chain/:token/:owner/:id', async (req, res) => {
      if (!ethers.utils.isAddress(req.params.token)) {
        return res.status(400).send('invalid token address')
      }

      if (!ethers.utils.isAddress(req.params.owner)) {
        return res.status(400).send('invalid owner address')
      }

      const providers = {
        [10]: this.options.optimismRpcProvider,
        [69]: this.options.optimismKovanRpcProvider,
      }

      const provider = providers[req.params.chain]
      if (!provider) {
        return res.status(400).send('invalid chain ID')
      }

      const nft = new ethers.Contract(req.params.token, ERC721, provider)

      let owner: string
      try {
        owner = await nft.ownerOf(req.params.id)
      } catch (err) {
        return res.status(400).send('unable to get owner address')
      }

      if (owner.toLowerCase() !== req.params.owner.toLowerCase()) {
        return res.status(400).send('token not owned by given owner address')
      }

      let uri: string
      try {
        uri = await nft.tokenURI(req.params.id)
      } catch (err) {
        return res.status(400).send('unable to get token URI from contract')
      }

      if (uri.startsWith('ipfs://')) {
        uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
      }

      try {
        const ret = await fetch(uri)
        const body = await ret.text()
        return res.send(body)
      } catch (err) {
        return res.status(400).send('unable to pull token URI data from remote')
      }
    })
  }

  async main() {
    // Do we need to do anything here?
  }
}
