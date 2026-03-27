import { Pagination, Form } from "react-bootstrap";

function PaginacionTabla({
    total,
    pagina,
    filasPorPagina,
    onChangePagina,
    onChangeFilas,
}) {
    const totalPaginas = Math.ceil(total / filasPorPagina);
    const paginaActual = pagina + 1;

    const handlePageChange = (newPage) => onChangePagina(newPage - 1);

    return (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
            <div className="d-flex align-items-center gap-2">
                <span className="text-secondary">Filas por página:</span>
                <Form.Select
                    size="sm"
                    style={{ width: "80px", borderRadius: "8px", borderColor: "#e0e4e8" }}
                    value={filasPorPagina}
                    onChange={(e) => {
                        onChangeFilas(parseInt(e.target.value));
                        onChangePagina(0);
                    }}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </Form.Select>
            </div>

            <Pagination size="sm" className="mb-0">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={paginaActual === 1} />
                <Pagination.Prev onClick={() => handlePageChange(paginaActual - 1)} disabled={paginaActual === 1} />
                <Pagination.Item active style={{ backgroundColor: "#f55449", borderColor: "#f55449" }}>{paginaActual}</Pagination.Item>
                <Pagination.Next onClick={() => handlePageChange(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
                <Pagination.Last onClick={() => handlePageChange(totalPaginas)} disabled={paginaActual === totalPaginas} />
            </Pagination>

            <span className="text-secondary">
                Mostrando {Math.min(filasPorPagina, total - pagina * filasPorPagina)} de {total} registros
            </span>
        </div>
    );
}

export default PaginacionTabla;