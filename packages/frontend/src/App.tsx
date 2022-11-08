import './App.scss'
import { Routes, Route } from 'react-router-dom'

import { Connect } from './pages/connect'
import { Header } from './layout/Header/Header'
import { Home } from './pages/home'
import { NFTPage } from './pages/nft'
import { Footer } from './layout/Footer/Footer'

const App = () => {
  return (
    <div className="app__container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/nft" element={<NFTPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
