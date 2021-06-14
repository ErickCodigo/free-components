import './ControllerFloatingMenu.css';
import {useState} from "react";
import clsx from "clsx";

export default function ControllerFloatingMenu(props) {
    const {children, isDefaultOpen = true} = props;
    const [isOpen, setIsOpen] = useState(isDefaultOpen);

    return (
        <div className={clsx("ControllerFloatingMenu", !isOpen && "hide")}>
            {children}
        </div>
    );
}

/*
todo:
- obtener el alto de cada submenu (solución: el alto maximo puede ser tan alto como quieras, pero debe ser fijo, con esto en mente, no es necesario medir ningún alto.)
- los padding deben ir creciendo por cada submenu (hecho: pero hay un inconveniente con el hover)
- dividir en varios componentes (solución: hecho)
- manejar el route match
- modificar componente para hacer recursivo : esto es para otra rama
*/
