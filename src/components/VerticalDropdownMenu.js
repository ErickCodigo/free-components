import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import "./VerticalDropdownMenu.css";

function VerticalMenuItem(props) {
    const {
        className,
        href,
        text,
        children,
        hasChildren = false,
        ...rest
    } = props;

    const [isExpand, setIsExpand] = useState(false);
    const [currentClassName, setCurrentClassName] = useState("isCollapse");

    useEffect(() => {
        if (isExpand) {
            setCurrentClassName("isExpanded");
        }

        if (!isExpand) {
            setCurrentClassName("isCollapse");
            // para eliminar tiene que a ver un tiempo para animar y despues de desmontar
        }
    }, [isExpand]);

    function handlerClick(e) {
        e.preventDefault();
        setIsExpand((is) => !is);
    }

    return (
        <>
            <li
                className={clsx(
                    "SidebarContainer__Item",
                    hasChildren && isExpand && "WithChildren",
                    className && className
                )}
                {...rest}
            >
                <a
                    onClick={handlerClick}
                    className={clsx("SidebarContainer__Link", className && className)}
                    href={clsx(!hasChildren && href)}
                    {...rest}
                >
                    {text}
                    {!hasChildren && children}
                </a>
                {hasChildren &&
                React.Children.map(children, (element) => {
                    return React.cloneElement(element, {
                        className: clsx("PreserveTransition", currentClassName)
                    });
                })}
            </li>
        </>
    );
}

function VerticalMenu(props) {
    const {
        className,
        children,
        asSubMenu = false,
        getMenuHeight,
        ...rest
    } = props;
    const ref = useRef(null);

    useEffect(() => {
        getMenuHeight && getMenuHeight(ref.current.clientHeight);
    }, [getMenuHeight]);

    return (
        <ul
            className={clsx(
                !asSubMenu && "SidebarContainer",
                asSubMenu && "SubSidebarContainer",
                className && className
            )}
            {...rest}
        >
            <div ref={ref}>{children}</div>
        </ul>
    );
}

export default function VerticalDropdownMenu({
                                                 routes,
                                                 isDefaultExpand = false,
                                                 isDefaultOpen = false,
                                                 ...props
                                             }) {
    const { className, ...rest } = props;

    return (
        <VerticalMenu
            className={clsx("DropdownMenu", className && className)}
            {...rest}
        >
            {routes.map((route, routeIndex) => (
                <VerticalMenuItem
                    key={routeIndex}
                    hasChildren={!!route.children}
                    href={route.href}
                    text={route.name}
                >
                    {route.children && (
                        <VerticalMenu asSubMenu>
                            {route.children.map((subItem, childIndex) => (
                                <VerticalMenuItem
                                    key={childIndex}
                                    href={subItem.href}
                                    text={subItem.name}
                                />
                            ))}
                        </VerticalMenu>
                    )}
                </VerticalMenuItem>
            ))}
        </VerticalMenu>
    );
}
