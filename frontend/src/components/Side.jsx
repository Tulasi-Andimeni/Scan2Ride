import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Side.css';
import { useState } from 'react';

function Sidebartwo({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get current path

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      navigate('/logout');
    }
  };

  const navItems = [
    { icon: "fa-house", label: "Home", path: "/home" },
    { icon: "fa-qrcode", label: "Scanner", path: "/scanpage" },
    { icon: "fa-user", label: "Students", path: "/home/studentdetails" },
    { icon: "fa-bus", label: "Buses", path: "/home/buspage" },
    { icon: "fa-id-badge", label: "Drivers", path: "/home/drivers" },
    { icon: "fa-right-from-bracket", label: "Logout", isLogout: true }
  ];

  return (
    <div className='sidebar-container'>
      <div className={`sidebar2-background ${isOpen ? 'open' : ''}`}>
        <div className="sidebar2-top">
          <i
            className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} toggle-icon`}
            onClick={toggleSidebar}
          ></i>
        </div>
        <div className="sidebar2-navigation">
          {isOpen && <div className="sidebar2-logo"></div>}
          {isOpen && <p className="sidebar2-title">SCAN 2 RIDE</p>}
          <ul>
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path; // ✅ check active path
              return (
                <li
                  key={index}
                  className={`sidebar2-list ${isActive ? 'active' : ''}`} // ✅ add active class
                >
                  {item.isLogout ? (
                    <div
                      onClick={handleLogout}
                      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                      <i className={`fa-solid ${item.icon}`}></i>
                      {isOpen && <span className="sidebar2-label">{item.label}</span>}
                    </div>
                  ) : (
                    <Link to={item.path}>
                      <i className={`fa-solid ${item.icon}`}></i>
                      {isOpen && <span className="sidebar2-label">{item.label}</span>}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebartwo;

