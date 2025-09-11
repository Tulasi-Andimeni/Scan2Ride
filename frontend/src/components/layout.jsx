
import { useState } from 'react';
import Sidebartwo from './Side';
import Nav from './nav';
import { Outlet } from 'react-router-dom';
import './layout.css';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <div className="layout">
      <Sidebartwo onToggle={handleSidebarToggle} />
      <div className={`layout-right ${sidebarOpen ? 'shifted' : ''}`}>
        <Nav />
        <div className="main-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Layout;

// import React, { useState } from 'react';
// import Sidebartwo from './Side';
// import Nav from './nav';
// import { Outlet } from 'react-router-dom';
// import './layout.css';

// function Layout() {
//   const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar open by default

//   const handleSidebarToggle = (isOpen) => {
//     setSidebarOpen(isOpen);
//   };

//   return (
//     <div className="layout">
//       <Sidebartwo onToggle={handleSidebarToggle} />
      
//       <div className={`layout-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//         <Nav />
//         <main className="main-content">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Layout;



