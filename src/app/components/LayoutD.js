// components/Layout.js
import React from "react";
import Navbar from './Navbar'
import Sidebar from './Sidebar'
function LayoutD({ children }) {
  return (
    <div  className="flex">
    <Sidebar/>
    <div className="flex-1">
      <header>
     <Navbar /> 
     
      </header>

      
      <main>{children}</main>

     
      <footer>
       
        
      </footer>
    </div>
    </div>
  );
}

export default LayoutD;



