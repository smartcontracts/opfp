import './App.scss'
import { Routes, Route } from 'react-router-dom'

import { Connect } from './pages/connect'
import { Header } from './layout/Header/Header'
// import { Footer } from './layout/Footer/Footer'

const App = () => {
  return (
    <div className="app__container">
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/contact" element={<h1>Contact</h1>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  )
}

export default App
