import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Navbar from './static-components/Navbar'
import Shop_all from './components/Shop_all'
import Decor from './components/Decor'
import Bedroom from './components/Bedroom'
import Living_room from './components/Living_room'
import Office from './components/Office'
import Homepage from './components/Homepage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Homepage/>}></Route>
          <Route path='/shop_all' element={<Shop_all/>}></Route>
          <Route path='/decor' element={<Decor/>}></Route>
          <Route path='/bedroom' element={<Bedroom/>}></Route>
          <Route path='/living_room' element={<Living_room/>}></Route>
          <Route path='/office' element={<Office/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
