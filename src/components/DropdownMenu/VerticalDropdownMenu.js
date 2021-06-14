import React from "react";
import clsx from "clsx";
import SidebarContainer from "./SidebarContainer";
import SidebarContainerItem from "./SidebarContainerItem";
import "./css/VerticalDropdownMenu.css";

export default function VerticalDropdownMenu({routes, isDefaultExpand = false, ...props}) {
    const {className, ...rest} = props;

    return (
        <SidebarContainer
            className={clsx("DropdownMenu", className && className)}
            {...rest}
        >
            {routes.map((route, routeIndex) => (
                <SidebarContainerItem
                    key={routeIndex}
                    hasChildren={!!route.children}
                    href={route.href}
                    text={route.name}
                >
                    {route.children && (
                        <SidebarContainer asSubMenu>
                            {route.children.map((subItem, childIndex) => (
                                <SidebarContainerItem
                                    key={childIndex}
                                    href={subItem.href}
                                    text={subItem.name}
                                />
                            ))}
                        </SidebarContainer>
                    )}
                </SidebarContainerItem>
            ))}
        </SidebarContainer>
    );
}
