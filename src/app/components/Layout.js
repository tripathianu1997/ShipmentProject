
import React from "react";
import Navbar from './Navbar'

function Layout({ children }) {
  return (
    <div className='min-h-screen bg-gray-100 text-white text-3xl' >
    
      <header>
     <Navbar /> 
   
      </header>

      
      <main>{children}</main>

     
      <footer>
       
        
      </footer>
    </div>
  );
}

export default Layout;





