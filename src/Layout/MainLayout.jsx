import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router'
import Footter from '../Components/Footter'

function MainLayout() {
  return (
    <div>

<Navbar></Navbar>
<Outlet></Outlet>
<Footter></Footter>


    </div>
  )
}

export default MainLayout