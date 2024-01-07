import React, { ReactNode, FC} from "react";
import { NavItem } from "./navItem/navItem";
import './navBar.css'
import {navItemInterface} from '../../../App'



interface FCprops{
    navItems : navItemInterface[],
    children : React.ReactNode
}

export const NavBar :FC<FCprops> = ({navItems, children})=>{

    const navItemsJSX = navItems.map((item, index)=>{
        return(
        <NavItem key={index} name={item.name} eventlistener={item.stateChanger}></NavItem>
        )
    })

    return (
        <div className="pageLayout">
            <div className="navBar">
                {navItemsJSX}
            </div>
            {children}
        </div>

    )
}
