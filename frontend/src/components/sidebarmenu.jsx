import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const menuAnimation = {
  hidden: { opacity: 0, height: 0, padding: 0 },
  show: { opacity: 1, height: "auto" },
};

const menuItemAnimation = {
  hidden: (i) => ({ x: "-100%", transition: { duration: (i + 1) * 0.1 } }),
  show: (i) => ({ x: 0, transition: { duration: (i + 1) * 0.1 } }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };

  useEffect(() => {
    if (!isOpen) setIsMenuOpen(false);
  }, [isOpen]);

  return (
    <>
      <div className="menu" onClick={toggleMenu}>
        <div className="menu_item">
          <div className="icon">{route.icon}</div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="link_text"
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                {route.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isOpen && (
          <motion.div animate={isMenuOpen ? { rotate: -90 } : { rotate: 0 }}>
            <FaAngleDown />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="menu_container"
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {route.subRoutes.map((subRoute, i) => (
              <motion.div
                className="sub_link"
                key={i}
                variants={menuItemAnimation}
                custom={i}
              >
                <NavLink to={subRoute.path} className="link">
                  <div className="icon">{subRoute.icon}</div>
                  <div className="link_text">{subRoute.name}</div>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarMenu;
