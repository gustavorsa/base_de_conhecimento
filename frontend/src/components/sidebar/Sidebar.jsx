import React, { useContext, useState }  from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { SidebarData } from './SidebarData';
import SubMenu from '../sidebar/SubMenu';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as TbIcons from 'react-icons/tb';
import { IconContext } from 'react-icons';

import { AuthContext } from '../../contexts/auth';

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

const SidebarLink = styled(Link) `
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;

    &:hover {
        background: #252831;
        border-left: 4px solid;
        cursor: pointer;
    }
`

const SidebarLabel = styled.span`
    margin-left: 16px;
`

function Sidebar() {
    const [sidebar, setSidebar] = useState(false)
    const [dropmenu, setDropmenu] = useState(false)

    const {authenticate} = useContext(AuthContext);

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

    const {logout} = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            {authenticate ? 
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
                        <SidebarLink to="/perfil">
                            <div>
                                <FaIcons.FaUser/>
                                <SidebarLabel>Meu perfil</SidebarLabel>
                            </div>
                        </SidebarLink>
                        <SidebarLink to="/adminpage">
                            <div>
                                <RiIcons.RiAdminFill/>
                                <SidebarLabel>Administrador</SidebarLabel>
                            </div>
                        </SidebarLink>
                        <SidebarLink to="/login" onClick={handleLogout}>
                            <div>
                                <TbIcons.TbDoorExit/>
                                <SidebarLabel>Sair do Sistema</SidebarLabel>
                            </div>
                        </SidebarLink>
                    </SideMenuWrap>
                </SiderbarMenu>
            </IconContext.Provider> 
            : ""
            }  
        </>
    );
}

export default Sidebar;