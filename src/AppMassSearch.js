import React, {useEffect, useMemo, useState} from "react";

// búsqueda masiva

const randomBetween = (min, max) => {
    return Math.random() * (max - min) + min;
}

const createData = (len = 0) => {
    return new Array(len).fill(null).map((_, i) => ({
        codProducto: 2101,
        estrategias: 2101,
        desProducto: "WEB VEHICULOS",
        poliza: "U01088" + i,
        tipoCanal: 201,
        canal: "FUERZA DE VENTAS",
        tipoDoc: "LV",
        documento: i + 1,
        docSunat: "0000" + Math.round(Math.random() * 500000),
        monto: parseFloat(randomBetween(400, 499).toString())
    }))
}

const reduceDataByProp = (prop, xs) => {
    return xs.reduce((accumulator, currentValue) => {
        return {...accumulator, [currentValue[prop]]: currentValue}
    }, {})
}

const AppMassSearch = () => {
    const [data, setData] = useState({list: [], dataByPoliza: {}, dataByDocumento: {}});
    const [searchValue, setSearchValue] = useState({poliza: "", documento: -1});
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        const data = createData(8000);

        // creo las condiciones para la búsqueda por indexación
        const dataByPoliza = reduceDataByProp("poliza", data);
        const dataByDocumento = reduceDataByProp("documento", data);

        setData({
            list: data,
            dataByPoliza,
            dataByDocumento
        })

    }, [])

    const handlerChange = (e) => {
        const {value, name} = e.target;
        setSearchValue(prevState => (
            {
                ...prevState,
                [name]: name === "documento" && value === "" ? -1 : value
            }
        ))
    }

    const isValidObject = (x = {}) => Object.keys(x).length;

    const computedList = useMemo(() => {

        // ------------------ ambos inputs llenados -------------------------

        // si ambos tienen resultados
        if (searchValue.poliza && searchValue.documento) {
            const result1 = data.dataByPoliza[searchValue.poliza];
            const result2 = data.dataByDocumento[searchValue.documento];

            if (isValidObject(result1) && isValidObject(result2)) {

                // preguntar si son los mismos registros
                // si es asi entonces devolver solo la primera coincidencia
                if (result1.documento === result2.documento && result1.poliza === result2.poliza)
                    return [result1];


                // sino devolver ambos
                return [result1, result2];
            }
        }


        // ------------------ alguno de ellos llenados  -------------------------

        // si solo result1 tiene resultados
        if (searchValue.poliza) {
            const result = data.dataByPoliza[searchValue.poliza];

            return result ? [result] : []
        }

        // si solo result2 tiene resultados
        if (searchValue.documento !== -1) {
            const result = data.dataByDocumento[searchValue.documento];

            return result ? [result] : []
        }


        // ------------------ si nada estuvo lleno entonces devolver la lista completa -------------------------

        return data.list;

    }, [isFilter, data.list])

    return (
        <div>
            {/* input de búsqueda */}
            <div style={{width: "100%", display: "flex", justifyContent: "center", margin: "5rem 0 1rem"}}>

                <input
                    name="poliza"
                    onChange={handlerChange}
                    style={{height: "30px", width: "200px"}}
                    placeholder="Póliza"
                    type="text"/>

                <input
                    name="documento"
                    onChange={handlerChange}
                    style={{height: "30px", marginLeft: "1rem", width: "200px"}}
                    placeholder="Documento"
                    type="text"/>

                <button onClick={() => setIsFilter(is => !is)} style={{marginLeft: "1rem"}}>Filtrar</button>
            </div>

            <div style={{maxWidth: "80%", margin: "0 auto .5rem"}}>
                <label>Cantidad de registros: {computedList.length}</label>
            </div>

            {/* tabla de resultados */}
            <div style={{maxWidth: "80%", outline: "1px solid #ddd", margin: "0 auto"}}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(10, 1fr)", padding: ".5rem"}}>
                    <div>codProducto</div>
                    <div>estrategias</div>
                    <div>desProducto</div>
                    <div>poliza</div>
                    <div>tipoCanal</div>
                    <div>canal</div>
                    <div>tipoDoc</div>
                    <div>documento</div>
                    <div>docSunat</div>
                    <div>monto</div>
                </div>


                {computedList.slice(0, 10).map((item, index) => (
                    <div key={index}
                         style={{display: "grid", gridTemplateColumns: "repeat(10, 1fr)", padding: ".5rem"}}>
                        <div>{item.codProducto}</div>
                        <div>{item.estrategias}</div>
                        <div>{item.desProducto}</div>
                        <div>{item.poliza}</div>
                        <div>{item.tipoCanal}</div>
                        <div>{item.canal}</div>
                        <div>{item.tipoDoc}</div>
                        <div>{item.documento}</div>
                        <div>{item.docSunat}</div>
                        <div>{item.monto}</div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AppMassSearch;
