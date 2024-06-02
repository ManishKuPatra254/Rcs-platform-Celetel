import { useState } from 'react';
import { FaTh, } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaAlignLeft } from "react-icons/fa6";
import { IoBook } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import main_logo from '../assets/Group.svg'

// eslint-disable-next-line react/prop-types
const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/sendrcs",
            name: "Send Rcs",
            icon: <FaMessage />
        },
        {
            path: "/templateslist",
            name: "Templates",
            icon: <IoBook />
        },
    ]
    return (
        <div className="container">
            <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <img style={{ display: isOpen ? "block" : "none" }} src={main_logo} alt="" />
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaAlignLeft onClick={toggle} style={{ cursor: "pointer" }} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path}
                            key={index}
                            className={({ isActive }) => (isActive ? 'link active' : 'link')}>
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;