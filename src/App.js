import "./styles.css";
import VerticalDropdownMenu from "./VerticalDropdownMenu";

export default function App() {
    const routes = [
        { name: "HOME 1", href: "/w1" },
        { name: "HOME 2", href: "/w1" },
        {
            name: "SERVICIOS",
            href: "/w2",
            children: [
                { name: "SERVICIO 1", href: "/w2/1" },
                { name: "SERVICIO 2", href: "/w2/2" },
                { name: "SERVICIO 3", href: "/w2/3" }
            ]
        },
        {
            name: "PRODUCTOS",
            href: "/w3",
            children: [
                { name: "PRODUCTO 1", href: "/w3/1" },
                { name: "PRODUCTO 2", href: "/w3/2" },
                { name: "PRODUCTO 3", href: "/w3/3" }
            ]
        },
        { name: "NOMBRES", href: "/w4" },
        { name: "APELLIDOS", href: "/w5" }
    ];

    return (
        <div className="LayoutContainer">
            <div className="ContainerLayout__Logo" onClick={() => {}}>
                <img
                    src=""
                    alt="https://marsurl.com/images/2021/06/11/LogoRimacRojo.png"
                />
            </div>
            <VerticalDropdownMenu isDefaultOpen routes={routes} />
        </div>
    );
}

/*
todo:
- obtener el alto de cada submenu (solución: el alto maximo puede ser tan alto como quieras, pero debe ser fijo, con esto en mente, no es necesario medir ningún alto.)
- dividir en varios componentes
- los padding deben ir creciendo por cada submenu
- manejar el route match
- modificar componente para hacer recursivo
- crear componente floating para manejar el aparecer y desaparecer del layout
*/
