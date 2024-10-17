import useStockData from "../../../hooks/useStockData";

const StockTable = () => {

    const { quantities, prices} = useStockData();
    return (
        <table className="price-table">
            <thead>
                <tr>
                    <th className="price-table__heading">Cantidad de Acciones</th>
                    <th className="price-table__heading">Precio por Acción</th>
                </tr>
            </thead>
            <tbody>
                {quantities.map((stock, index) => {
                    const price = prices[stock];
                    return (
                        <tr key={index}>
                            <td>{stock}</td>
                            <td>€ {price}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default StockTable;