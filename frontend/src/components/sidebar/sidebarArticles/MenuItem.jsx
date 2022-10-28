import React, { useState } from 'react';

import * as ImIcons from 'react-icons/Im';
import { NavLink } from 'react-router-dom';

const MenuItem = (props) => {
    const [expand, setExpand] = useState(false);

    const {name, subMenus, iconName, to} = props;

    return (
        <li>
            <NavLink 
            to={to}
            className="menu-item" 
            onClick={() => setExpand(!expand)}>
                <div className="menu-icon">
                    {iconName}
                </div>
                <span>{name}</span>
            </NavLink>
            {subMenus ?
                <ul className={expand ? "sub-menu active" : "sub-menu"}>
                    {subMenus.map((menu, index) => {
                        return (
                        <li key={index}>
                            <NavLink to={menu.to}>{menu.name}</NavLink>
                        </li>
                        )
                    })}
                </ul> 
                : null
            }
        </li>
    );
}

export default MenuItem;
