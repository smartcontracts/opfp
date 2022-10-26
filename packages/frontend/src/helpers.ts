import { shortenAddress as extShortenAddress } from '@usedapp/core'

import { DEV_MODE, QUIXOTIC_API_KEY } from './config'

export const shortenEthEns = (str: string) => {
  if (str.length <= 13) {
    return str
  }
  const [name, ethDomain] = str.split('.')
  return `${name.substring(0, 3)}...${name.slice(-3)}.${ethDomain}`
}

export const shortenAddress = (address: string) => {
  if (!address) {
    return ''
  }
  if (address.endsWith('.eth')) {
    return shortenEthEns(address)
  }
  return extShortenAddress(address)
}

export const getNftsByAddress = async (address: string) => {
  const url = DEV_MODE ? 'testnet-api' : 'api'
  debugger
  try {
    const response = await fetch(
      `https://${url}.qx.app/api/v1/account/${address}/assets/`,
      {
        headers: {
          'X-API-KEY': QUIXOTIC_API_KEY,
        },
      }
    )

    const json = await response.json()
    return json.results
  } catch (e) {
    console.error(e)
    return []
  }
}

export const getNftDetails = async (contract: string, id: string) => {
  if (!contract || !id) {
    return null
  }
  const url = DEV_MODE ? 'testnet-api' : 'api'
  const res = await fetch(
    `https://${url}.qx.app/api/v1/asset/${contract}:${id}/`,
    {
      headers: {
        'X-API-KEY': QUIXOTIC_API_KEY,
      },
    }
  )

  const nft = await res.json()
  return nft
}

export const getOpfp = async (chainId: number, address: string) => {
  const res = await fetch(
    `http://opfp.art/api/mirror/uri/${chainId}/${address}`
  )

  const opfp = await res.json()
  console.log(opfp)
}

export const shortenString = (str: string, length: number) => {
  if (!str) {
    return ''
  }
  if (str.length <= length) {
    return str
  } else {
    return str.substring(0, length) + '...'
  }
}

// checks if the input (address or ens) resolves to a valid ETH address.
// export const validateAddressOrEns = async (input: string | null) => {
//   let address: string | null = null

//   try {
//     address = await readOnlyProviders[1].resolveName(input as string)
//   } catch (err: any) {
//     if (err.code === 'INVALID_ARGUMENT') {
//       return false
//     }
//   }

//   return address
// }
