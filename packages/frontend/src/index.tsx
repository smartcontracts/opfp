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

import App from './App'
import reportWebVitals from './reportWebVitals'

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.optimismGoerli,
    chain.goerli,
  ],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
    publicProvider(),
  ]
)

console.log(process.env.REACT_APP_ALCHEMY_ID)
const { connectors } = getDefaultWallets({
  appName: 'MagicMirror',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

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
          {/* <UseDappRainbowKitAdapter /> */}
          <App />
        </SkeletonTheme>
      </BrowserRouter>
    </RainbowKitProvider>
  </WagmiConfig>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
