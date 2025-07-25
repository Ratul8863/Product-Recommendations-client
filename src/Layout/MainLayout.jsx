import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router'
import Footter from '../Components/Footter'
import { AuthContext } from '../Contexts/AuthContext'
import Looding1 from '../Pages/Shared/Looding/Looding1'

function MainLayout() {
  const {loading} = useContext(AuthContext)
  return (
    <>
    <div className='max-w-[1400px] mx-auto'>

<div className='pb-[100px] '>
  <Navbar></Navbar>
</div>
{
  loading ? <Looding1></Looding1> : <Outlet></Outlet>
}


    </div>
    <div>
<Footter></Footter>
</div>
    </>
    
  )
}

export default MainLayout