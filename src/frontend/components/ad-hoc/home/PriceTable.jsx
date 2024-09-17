import useStockData from "../../../hooks/useStockData";
import { useContext } from 'react';
import { GlobalContext } from "../../../context/GlobalContext";

const StockTable = () => {

    const { quantities, prices} = useStockData();
    const { priceRanges } = useContext(GlobalContext);
    console.log(priceRanges);
    return (
        <table className="price-table">
            <thead>
                <tr>
                    <th className="price-table__heading">Cantidad de Acciones</th>
                    <th className="price-table__heading">Precio por Acción</th>
                </tr>
            </thead>
            <tbody>
                { priceRanges && priceRanges.length > 0 ? (
                    // Mostrar los rangos de precios si están disponibles
                    priceRanges.map((range, index) => (
                        <tr key={index}>
                            <td>{range.min} a {range.max}</td>
                            <td>€ {range.price}</td>
                        </tr>
                    ))
                ) : (
                    // Si no hay priceRanges, mostrar las quantities y sus precios
                    quantities && quantities.length > 0 ? (
                        quantities.map((stock, index) => {
                            const price = prices[stock];
                            return (
                                <tr key={index}>
                                    <td>{stock}</td>
                                    <td>€ {price}</td>
                                </tr>
                            );
                        })
                    ) : (
                        // Mostrar un mensaje si no hay datos
                        <tr>
                            <td colSpan="2">No hay datos disponibles</td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );
};

export default StockTable;