import React, {useEffect, useState} from "react";
import clsx from "clsx";

export default function SidebarContainerItem(props) {
    const {className, href, text, children, hasChildren = false, ...rest} = props;

    const [isExpand, setIsExpand] = useState(false);
    const [currentClassName, setCurrentClassName] = useState("isCollapse");

    useEffect(() => {
        if (isExpand) setCurrentClassName("isExpanded");
        else setCurrentClassName("isCollapse");
    }, [isExpand]);

    function handlerClick(e) {
        e.preventDefault();
        setIsExpand((is) => !is);
    }

    return (
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
    );
}
