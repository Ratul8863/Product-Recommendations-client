import React, { useContext } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footter from '../Components/Footter';
import { AuthContext } from '../Contexts/AuthContext';
import Looding1 from '../Pages/Shared/Looding/Looding1';

function MainLayout() {
  const { loading, theme } = useContext(AuthContext); // Destructure the theme from the context

  // Set base styles for the main container that will change with the theme
  const mainContainerClasses = `
    min-h-screen
    max-w-[1400px]
    mx-auto
    pb-[100px]
    transition-colors duration-500
    ${theme === 'dark' ? 'bg-[#0D1128] text-white' : 'bg-gray-100 text-gray-900'}
  `;

  // The main wrapper for the whole page. The class changes based on the theme.
  const pageWrapperClasses = `
    min-h-screen
    
    ${theme === 'dark' ? 'bg-[#0D1128] text-white' : 'bg-white text-gray-900'}
  `;
// bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300
  return (
    // Apply the theme-based class to the outermost div
    <div className={pageWrapperClasses}>
      <div className='pb-[100px]   dark:bg-gray-900 '>
          <Navbar></Navbar>
        </div>
      <div className='max-w-[1400px] mx-auto '>
        
        {
          loading ? <Looding1></Looding1> : <Outlet></Outlet>
        }
      </div>
      <div>
        <Footter></Footter>
      </div>
    </div>
  );
}

export default MainLayout;
