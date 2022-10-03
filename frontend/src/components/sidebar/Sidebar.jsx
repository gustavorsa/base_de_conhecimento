import React, { useState }  from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { SidebarData } from './SidebarData';
import { DropDowndata } from './DropDownData';
import SubMenu from '../sidebar/SubMenu';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { IconContext } from 'react-icons';

const Nav = styled.div `
    background: #15171c;
    height: 60px;
    width: 100%;
    display: flex;
    justify-self: start;
    align-items: center;
    justify-content: space-between;
`
const NavTitle = styled.div `
    color: #f5f5f5;
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const NavUser = styled(Link) `
    color: #f5f5f5;
    font-size: 1.5rem;
    margin-right: 1.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const NavIcon = styled(Link) `
    margin-left: 1rem;
    font-size: 2rem;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`
const SidebarNav = styled.nav `
    background: #15171c;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    overflow: auto;
    white-space: nowrap;

    ::-webkit-scrollbar {
        width: 1rem;
    }

    ::-webkit-scrollbar-track {//Barra de baixo
        background: #363c49;
        border-radius: 100vw;
    }

    ::-webkit-scrollbar-thumb {//Barra de cima
        background: #9c9b9b;
        border-radius: 100vw;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #7e7e7e;
    }
`
const SidebarWrap = styled.div `
    width: 100%;
`

const SiderbarMenu = styled.nav `
    background: #3c4150;
    width: 200px;
    margin-right: 1.5rem;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 60px;
    right: ${({ dropmenu }) => (dropmenu ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
    overflow: auto;
    white-space: nowrap;
    opacity: 80%;
`

const SideMenuWrap = styled.div `
    width: 100%;
`


function Sidebar() {
    const [sidebar, setSidebar] = useState(false)
    const [dropmenu, setDropmenu] = useState(false)

    const menuIcon = { 
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    }

    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    const showDropmenu = () => {
        setDropmenu(!dropmenu)
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar}/>
                    </NavIcon>
                    <NavTitle>
                        Base
                    </NavTitle>
                    <NavUser to="#">
                        <FaIcons.FaUser onClick={showDropmenu}/>
                        {dropmenu ? menuIcon.iconOpened : menuIcon.iconClosed}
                    </NavUser>
                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar}/>
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index}/>
                        })}
                    </SidebarWrap>
                </SidebarNav>
                <SiderbarMenu dropmenu={dropmenu}>
                    <SideMenuWrap onClick={showDropmenu}>
                        {DropDowndata.map((item, index) => {
                                return <SubMenu item={item} key={index}/>
                        })}
                    </SideMenuWrap>
                </SiderbarMenu>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;