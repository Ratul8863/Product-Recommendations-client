import React from 'react'
import loading from "../../../assets/loading1.json"
import { BarLoader } from 'react-spinners'
import Lottie from 'lottie-react'

function Looding1() {
  return (
    <div className=''>
        <Lottie className="w-32 md:w-56 mx-auto min-h-screen my-20  " animationData={loading} loop />
    </div>
    // <div className='fixed top-0 left-0 w-full z-50'><BarLoader width="100%"></BarLoader></div>
  )
}

export default Looding1