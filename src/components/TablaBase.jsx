import { Table, Spinner, Alert } from "react-bootstrap";

function TablaBase({
    columnas,
    datos,
    renderFila,
    mostrarNumeracion = false,
    pagina = 0,
    filasPorPagina = 10,
    loading = false,
}) {
    if (loading) {
        return (
            <div className="table-responsive">
                <Table striped bordered hover className="align-middle">
                    <thead className="bg-light">
                        <tr>
                            {mostrarNumeracion && <th style={{ width: "60px" }}>#</th>}
                            {columnas.map((col, idx) => (
                                <th key={idx}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: filasPorPagina || 5 }).map((_, idx) => (
                            <tr key={idx}>
                                {mostrarNumeracion && <td><div className="skeleton" style={{ width: "30px", height: "20px", backgroundColor: "#e0e4e8", borderRadius: "4px" }}></div></td>}
                                {columnas.map((_, colIdx) => (
                                    <td key={colIdx}>
                                        <div className="skeleton" style={{ width: "100%", height: "20px", backgroundColor: "#e0e4e8", borderRadius: "4px" }}></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }

    if (!datos.length) {
        return <Alert variant="info" className="text-center">No se encontraron resultados</Alert>;
    }

    return (
        <div className="table-responsive">
            <Table striped bordered hover className="align-middle">
                <thead className="bg-light">
                    <tr>
                        {mostrarNumeracion && <th style={{ width: "60px" }}>#</th>}
                        {columnas.map((col, idx) => (
                            <th key={idx}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {datos.map((item, index) => {
                        const numero = pagina * filasPorPagina + index + 1;
                        return (
                            <tr key={item.id}>
                                {mostrarNumeracion && <td>{numero}</td>}
                                {renderFila(item, numero)}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default TablaBase;