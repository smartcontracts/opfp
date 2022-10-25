import ReactDOM from 'react-dom/client'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { SkeletonTheme } from 'react-loading-skeleton'
import '@rainbow-me/rainbowkit/styles.css'
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import {
  Mainnet,
  DAppProvider,
  Config,
  Goerli,
  Optimism,
  Rinkeby,
} from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

import App from './App'
import reportWebVitals from './reportWebVitals'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'MagicMirror',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Optimism.chainId]: getDefaultProvider('optimism'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [Rinkeby.chainId]: getDefaultProvider('rinkeby'),
  },
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      theme={darkTheme({
        accentColor: 'var(--primary-color)',
        accentColorForeground: 'white',
      })}
      modalSize="compact"
      chains={chains}
    >
      <BrowserRouter>
        <SkeletonTheme
          baseColor="var(--skeleton-bg)"
          highlightColor="var(--skeleton-highlight)"
        >
          <DAppProvider config={config}>
            {/* <UseDappRainbowKitAdapter /> */}
            <App />
          </DAppProvider>
        </SkeletonTheme>
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
