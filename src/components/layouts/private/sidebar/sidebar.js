import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import dashboardIcon from '../../../../assets/images/dashboard-icon.png';
import chevronRight from '../../../../assets/images/chevron-right.svg';
import logo from '../../../../assets/images/test.png';
import peopleIcon from '../../../../assets/images/people-icon.png';
import passwordsIcon from '../../../../assets/images/passwords-icon.png';
import laptopIcon from '../../../../assets/images/laptop-icon.png';
import './sidebar.scss';

const Sidebar = () => {
    const [isToggled, setToggled] = useState(false);
    const [isPeopleCollapsed, setPeopleCollapsed] = useState(false);

    return (
        <ul
            className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion${
                isToggled ? ' toggled' : ''
            }`}
        >
            <Link
                className="sidebar-brand d-flex align-items-center justify-content-center"
                to="/"
            >
                <div className="sidebar-brand-icon">
                    <img src={logo} alt="logo" className="sidebar-logo" />
                </div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <NavLink exact={true} className="nav-link" to="/">
                    <img
                        src={dashboardIcon}
                        alt="icon"
                        className="nav-link-icon"
                    />
                    <span>Dashboard</span>
                </NavLink>
            </li>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <NavLink className="nav-link" to="/assets">
                    <img
                        src={laptopIcon}
                        alt="icon"
                        className="nav-link-icon"
                    />
                    <span>Assets</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink className="nav-link" to="/passwords">
                    <img
                        src={passwordsIcon}
                        className="nav-link-icon"
                        alt="icon"
                    />
                    <span>Passwords</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <div
                    className={`nav-link ${
                        !isPeopleCollapsed ? 'collapsed' : ''
                    }`}
                    onClick={() => setPeopleCollapsed((prev) => !prev)}
                >
                    <img
                        src={peopleIcon}
                        className="nav-link-icon"
                        alt="icon"
                    />
                    <span>People</span>
                    <img
                        src={chevronRight}
                        className="collapsed-icon"
                        alt="icon"
                    />
                </div>
                <div className={`collapse ${isPeopleCollapsed ? 'show' : ''}`}>
                    <div className="bg-white py-2 collapse-inner rounded">
                        <NavLink to="/onboard" className="collapse-item">
                            test 1
                        </NavLink>
                        <NavLink to="/offboard" className="collapse-item">
                            test 2
                        </NavLink>
                        <NavLink to="/pipeline" className="collapse-item">
                            test 3
                        </NavLink>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button
                    className="rounded-circle border-0 sidebarToggle"
                    onClick={() => setToggled((prev) => !prev)}
                ></button>
            </div>
        </ul>
    );
};

export default Sidebar;
