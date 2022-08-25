import { shortenAddress as extShortenAddress } from '@usedapp/core'

export const shortenEthEns = (str: string) => {
  if (str.length <= 13) {
    return str
  }
  const [name, ethDomain] = str.split('.')
  return `${name.substring(0, 3)}...${name.slice(-3)}.${ethDomain}`
}

export const shortenAddress = (address: string) => {
  if (address.endsWith('.eth')) {
    return shortenEthEns(address)
  }
  return extShortenAddress(address)
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
