import React from 'react'
import { useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Navbar from './components/Navbar'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Land from './pages/Land'
import CreateMod from './pages/CreateMod'
import Mod from './pages/Mod'

const App = () => {
  return (
    <main className = "bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/signup" element = {<SignUp />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/createmod" element = {<CreateMod />} />
          <Route path = "/mod" element = {<Mod />} />
          <Route path = "/land" element = {<Land />} />
        </Routes>
      </Router>
    </main>
  )
}
export default App
