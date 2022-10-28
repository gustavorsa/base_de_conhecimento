import React, { useEffect, useState } from "react";

import styled from "styled-components";
import LogoMenu from '../../../assets/LogoMenu.png';
import UserLogo from '../../../assets/User.png'
import * as Aicons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as ImIcons from 'react-icons/Im';

import './Sidebar.css';
import MenuItem from "./MenuItem";

const menuItens = [
    {
        name: 'Dashboard', 
        to: '/',
        iconName: <BsIcons.BsSpeedometer2/>,
    },
    {
        name: 'Content', 
        to: '/content',
        iconName: <ImIcons.ImNewspaper />,
        subMenus: [
            {
                name: "Courses",
                to: '/courses'
            },
            {
                name: "Videos",
                to: '/courses'
            },
            {
                name: "Content",
                to: '/courses'
            }
        ]
    },
    {
        name: 'Design', 
        to: '/design',
        iconName:  <ImIcons.ImPencil2 />,
    },

]

const SidebarNav = (props) => {
    const [inactive, setInactive] = useState(true);

    useEffect(() => {
        if (inactive) {
            document.querySelectorAll("sub-menu").forEach((el) => {
                el.classList.remove("active")
            })
        }

        props.onCollapse(inactive)
        
    }, [inactive]);

    return (
        <div className={inactive ? 'side-menu' : 'side-menu inactive'}>
            <div className="top-section">
                {/*<div className="logo">
                    <img src={LogoMenu} />
                </div>*/}
                <div className="toggle-menu-btn">
                    {inactive ? 
                        <RiIcons.RiMenuFoldFill 
                            style={{color: 'white'}} 
                            onClick={() => setInactive(!inactive)}
                            /> 
                        : 
                        < RiIcons.RiMenuUnfoldFill 
                            style={{color: 'white'}} 
                            onClick={() => setInactive(!inactive)}
                            />
                    }
                </div>
            </div>
            <div className="search-controller">
                <button className="search-btn" onClick={() => setInactive(true)}>
                    <Aicons.AiOutlineSearch />
                </button>
                <input type="text" name="text" id="text" placeholder="Search" />
            </div>
            <div className="divider"></div>
            <div className="main-menu">
                <ul>
                    {menuItens.map((menuItem, index) => {
                        return (
                            <MenuItem
                                key={index}
                                name={menuItem.name}
                                to={menuItem.to}
                                subMenus={menuItem.subMenus || []}
                                iconName={menuItem.iconName}
                            />
                        )
                    })}
                </ul>
            </div>
            {/*<div className="side-menu-footer">
                <div className="avatar">
                    <img src={UserLogo} />
                </div>
                <div className="user-info">
                    <h5>Gustavo dos santos</h5>
                    <p>gustvsantos@hotmail.com</p>
                </div>
            </div>*/}
        </div>
    )
}

export default SidebarNav