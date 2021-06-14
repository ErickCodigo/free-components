import {ControllerFloatingMenu} from "./components/ControllerFloatingMenu/";
import {VerticalDropdownMenu} from "./components/DropdownMenu";
import Logo from "./components/Logo/Logo";

export default function App() {
    const routes = [
        {
            name: "PAGOS",
            children: [
                {name: "Conciliación: Extracción Documentos de Pagos", href: "Conciliacion_Extraccion"},
                {name: "Conciliación: Estados de Documentos de Pagos", href: "Conciliacion_Estados"},
                {name: "Autorizar Documentos de Pagos: Montos Mayores", href: "Autorizador"},
                {name: "Generación de Lotes", href: "OperadorGeneracionLotes"},
                {name: "Consulta SUNAT: Embargos Telemáticos", href: "ConsultaSunat"},
                {name: "Lotes Generados", href: "OperadorLotesGenerados"},
                {name: "Revisión de lotes", href: "Revisor"},
            ]
        },
        {
            name: "CONFIGURACIÓN",
            children: [
                {name: "Configuración de Riesgos Agrupadores: Creación y Estado", href: "RiesgoAgrupadores_Creacion"},
                {
                    name: "Configuración de Riesgos Agrupadores: Asignación a Productos",
                    href: "RiesgosAgrupadores_Asignacion"
                },
                {name: "Configuración de Grupos de Pago", href: "MontosMayores_GruposPago"},
                {name: "Config - Switch H2H", href: "Switch_H2H"},
                {name: "Config - Switch SUNAT", href: "Switch_SUNAT"},
            ]
        },
        {
            name: "ADMINISTRACIÓN",
            children: [
                {
                    name: "Configuración de Autorización de Montos Mayores: Rangos y Autorizadores",
                    href: "MontosMayores_Rangos"
                }, //mio
                {name: "Configuración de Autorización de Montos Mayores: Asignación de Grupos de Pago", href: ""},
                {
                    name: "Configuración de Firmas de Lotes: Rangos y Tipos de Autorización",
                    href: "FirmasApoderados_RangosyTipos"
                },
                {
                    name: "Configuración de Firmas de Lotes: Asignación de Firmantes",
                    href: "FirmasApoderados_Asignacion"
                },
                {name: "Autorización de Ordenes de Configuración", href: "OrdenesConfiguracion"}, //mio
            ]
        },
        {
            name: "CONSULTAS",
            children: [
                {name: "Consultas - Provision de Fondos", href: "Consultas_Provision_Fondos"},
                {name: "Consultas - Flujo de Caja", href: "Consultas_Flujo_Caja"},
                {
                    name: "Consultas - Por Documento de Pago o Beneficiario",
                    href: "Consultas_Documento_Pago_Beneficiario"
                },
                {name: "Consultas - Lote", href: "Consultas_Lote"},
                {name: "Consultas - Reporte Abono en Cuenta", href: "Consultas_Reporte_Abono_Cuenta"}
            ]
        }, {
            name: "GRUPOS DE PAGO MODIFICADO",
            href: "GruposPagoModificado"
        },
    ];

    return (
        <ControllerFloatingMenu isDefaultOpen>
            <Logo/>
            <VerticalDropdownMenu isDefaultExpand routes={routes}/>
        </ControllerFloatingMenu>
    );
}
