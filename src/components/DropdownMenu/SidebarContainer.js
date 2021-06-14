import React from "react";
import clsx from "clsx";
import "./css/SidebarContainer.css"

export default function SidebarContainer(props) {
    const {className, children, asSubMenu = false, ...rest} = props;

    return (
        <ul
            className={clsx(
                !asSubMenu && "SidebarContainer",
                asSubMenu && "SubSidebarContainer",
                className && className
            )}
            {...rest}
        >
            {children}
        </ul>
    );
}
