import { useState } from 'react'
import './components/Styles.css'
import './App.css'
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import ScrollToTop from "react-scroll-to-top";
import Navbar from './static-components/Navbar'
import Shop_all from './components/Shop_all'
import Decor from './components/Decor'
import Bedroom from './components/Bedroom'
import Living_room from './components/Living_room'
import Office from './components/Office'
import Homepage from './components/Homepage'
import Story from './components/Story'
import Contact from './components/Contact'
import Help from './components/Help'
import Login from './components/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop smooth/>
        <Routes>
        <Route path='/'  element={<Homepage/>}></Route>
          <Route path="/shop_all" element={<Shop_all categories="Shop"/>} />
          <Route path='/decor' element={<Decor categories="Decor"/>}></Route>
          <Route path='/bedroom' element={<Bedroom categories='Bedroom'/>}></Route>
          <Route path='/living_room' element={<Living_room categories='Living Room'/>}></Route>
          <Route path='/office' element={<Office categories='Office'/>}></Route>
          <Route path='/story' element={<Story/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/help' element={<Help/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
