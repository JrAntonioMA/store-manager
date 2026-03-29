import { Form, Button, Card, Alert, Spinner, InputGroup, Row, Col, Container } from "react-bootstrap";
import { Controller } from "react-hook-form";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { useFormularioProducto } from "../hook/useFormularioProducto";

function ProductoForm({ producto, alExito, alCancelar, alCambioSinGuardar, fullWidth = false }) {
    const {
        form,
        categorias,
        categoriasCargando,
        dialogos,
        estados,
        fields,
        append,
        remove,
        tieneNombresVariantesDuplicados,
        onSubmit,
    } = useFormularioProducto({ producto, alExito, alCambioSinGuardar });

    const { control, register, setValue } = form;
    const { errors, isDirty, isValid, touchedFields } = estados;
    const {
        borradorAbierto,
        manejarRecuperarBorrador,
        manejarCancelarBorrador,
        salidaAbierto,
        confirmarSalida,
        cancelarSalida,
    } = dialogos;

    const wrapperStyle = fullWidth
        ? { width: "100%", padding: 0 }
        : { maxWidth: "800px", margin: "0 auto", padding: "2rem 0" };

    return (
        <Container fluid className={fullWidth ? "p-0" : ""} style={wrapperStyle}>
            <Card className="border-0 rounded-4 overflow-hidden shadow-lg">
                <Card.Header
                    className="p-4 border-0"
                    style={{
                        background: "linear-gradient(135deg, #0f1f38 0%, #1a2c4a 100%)",
                        color: "white",
                    }}
                >
                    <h5 className="mb-1 fw-bold">
                        {estados.esEdicion ? "Editar producto" : "Nuevo producto"}
                    </h5>
                    <small className="opacity-75">
                        {estados.esEdicion
                            ? "Actualiza los datos del producto"
                            : "Completa la información para agregar un nuevo producto"}
                    </small>
                </Card.Header>

                <Card.Body className="p-4">
                    {categoriasCargando ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" style={{ color: "#f55449" }} />
                        </div>
                    ) : (
                        <Form onSubmit={onSubmit}>
                            <div className="mb-4">
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre del producto *</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-transparent border-end-0">
                                            <i className="bi bi-shop" style={{ color: "#8e7970" }}></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            {...register("title")}
                                            isInvalid={!!errors.title && touchedFields.title}
                                            className="rounded-start-0"
                                            style={{ borderRadius: "0 8px 8px 0" }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {touchedFields.title && errors.title?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Categoría *</Form.Label>
                                    <Controller
                                        name="category"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <>
                                                <InputGroup>
                                                    <InputGroup.Text className="bg-transparent border-end-0">
                                                        <i className="bi bi-tags" style={{ color: "#8e7970" }}></i>
                                                    </InputGroup.Text>
                                                    <Form.Select
                                                        {...field}
                                                        isInvalid={!!fieldState.error}
                                                        className="rounded-start-0"
                                                        style={{ borderRadius: "0 8px 8px 0" }}
                                                    >
                                                        <option value="">Selecciona una categoría</option>
                                                        {categorias?.map((cat) => (
                                                            <option key={cat.slug} value={cat.slug}>
                                                                {cat.name}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                </InputGroup>
                                                <Form.Control.Feedback type="invalid">
                                                    {fieldState.error?.message}
                                                </Form.Control.Feedback>
                                            </>
                                        )}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="switch"
                                        id="availability-switch"
                                        label={
                                            estados.estadoDisponibilidad === "in-stock"
                                                ? "Producto en venta"
                                                : "Producto descontinuado"
                                        }
                                        checked={estados.estadoDisponibilidad === "in-stock"}
                                        onChange={(e) =>
                                            setValue(
                                                "availabilityStatus",
                                                e.target.checked ? "in-stock" : "out-of-stock"
                                            )
                                        }
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Precio base *</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-transparent border-end-0">
                                            <i className="bi bi-currency-dollar" style={{ color: "#8e7970" }}></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            step="0.01"
                                            {...register("price", { valueAsNumber: true })}
                                            isInvalid={!!errors.price && touchedFields.price}
                                            className="rounded-start-0"
                                            style={{ borderRadius: "0 8px 8px 0" }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {touchedFields.price && errors.price?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Stock total *</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-transparent border-end-0">
                                            <i className="bi bi-box-seam" style={{ color: "#8e7970" }}></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            step="1"
                                            {...register("stock", { valueAsNumber: true })}
                                            isInvalid={!!errors.stock && touchedFields.stock}
                                            disabled={estados.stockDeshabilitado}
                                            className="rounded-start-0"
                                            style={{ borderRadius: "0 8px 8px 0" }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {touchedFields.stock && errors.stock?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>

                                <div className="mb-3">
                                    <Form.Label>Descuento (%)</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text className="bg-transparent border-end-0">
                                            <i className="bi bi-percent" style={{ color: "#8e7970" }}></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            step="0.1"
                                            {...register("discountPercentage", { valueAsNumber: true })}
                                            isInvalid={!!errors.discountPercentage}
                                            className="rounded-start-0"
                                            style={{ borderRadius: "0 8px 8px 0" }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.discountPercentage?.message}
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                    {estados.advertenciaDescuento && (
                                        <Alert variant="warning" className="mt-2 py-1">
                                            Descuento superior al 50%
                                        </Alert>
                                    )}

                                    <div
                                        className="mt-3 p-3 bg-light rounded d-flex justify-content-between align-items-center"
                                        style={{ border: "1px solid #e0e4e8" }}
                                    >
                                        <span className="text-secondary">Precio final</span>
                                        <span className="h6 mb-0 fw-bold" style={{ color: "#f55449" }}>
                                            ${estados.precioFinal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" style={{ borderColor: "#e0e4e8" }} />

                            <div className="mb-4">
                                <h6 className="fw-semibold mb-1" style={{ color: "#0f1f38" }}>
                                    Variantes
                                </h6>
                                <small className="text-secondary">
                                    Agrega variantes como tallas, colores, etc. (mínimo 1, máximo 5)
                                </small>

                                {fields.map((field, index) => (
                                    <Card
                                        key={field.id}
                                        className="mb-3 shadow-sm border"
                                        style={{ borderRadius: "12px", borderColor: "#e0e4e8" }}
                                    >
                                        <Card.Body className="p-3">
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="text-danger p-0"
                                                    onClick={() => remove(index)}
                                                    disabled={fields.length === 1}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </Button>
                                            </div>

                                            <Row>
                                                <Col md={12} className="mb-2">
                                                    <Form.Group>
                                                        <Form.Label>Nombre de la variante</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Text className="bg-transparent border-end-0">
                                                                <i className="bi bi-palette" style={{ color: "#8e7970" }}></i>
                                                            </InputGroup.Text>
                                                            <Form.Control
                                                                {...register(`variants.${index}.name`)}
                                                                isInvalid={!!errors.variants?.[index]?.name}
                                                                className="rounded-start-0"
                                                                style={{ borderRadius: "0 8px 8px 0" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.variants?.[index]?.name?.message}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6} className="mb-2">
                                                    <Form.Group>
                                                        <Form.Label>Precio</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Text className="bg-transparent border-end-0">
                                                                <i className="bi bi-tag" style={{ color: "#8e7970" }}></i>
                                                            </InputGroup.Text>
                                                            <Form.Control
                                                                type="number"
                                                                step="0.01"
                                                                {...register(`variants.${index}.price`, { valueAsNumber: true })}
                                                                isInvalid={!!errors.variants?.[index]?.price}
                                                                className="rounded-start-0"
                                                                style={{ borderRadius: "0 8px 8px 0" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.variants?.[index]?.price?.message}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>

                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label>Stock</Form.Label>
                                                        <InputGroup>
                                                            <InputGroup.Text className="bg-transparent border-end-0">
                                                                <i className="bi bi-box" style={{ color: "#8e7970" }}></i>
                                                            </InputGroup.Text>
                                                            <Form.Control
                                                                type="number"
                                                                step="1"
                                                                {...register(`variants.${index}.stock`, { valueAsNumber: true })}
                                                                isInvalid={!!errors.variants?.[index]?.stock}
                                                                disabled={estados.stockDeshabilitado}
                                                                className="rounded-start-0"
                                                                style={{ borderRadius: "0 8px 8px 0" }}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.variants?.[index]?.stock?.message}
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => append({ name: "", price: 0, stock: 0 })}
                                    disabled={fields.length >= 5}
                                    className="mt-2"
                                    style={{
                                        borderColor: "#f55449",
                                        color: "#f55449",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <i className="bi bi-plus-lg"></i> Agregar variante
                                </Button>

                                {tieneNombresVariantesDuplicados() && (
                                    <Alert variant="danger" className="mt-3">
                                        No puede haber dos variantes con el mismo nombre.
                                    </Alert>
                                )}
                                {errors.variants?.message && (
                                    <Alert variant="danger" className="mt-3">
                                        {errors.variants.message}
                                    </Alert>
                                )}
                                {errors.stock?.message && (
                                    <Alert variant="danger" className="mt-3">
                                        {errors.stock.message}
                                    </Alert>
                                )}
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={alCancelar}
                                    className="px-4"
                                    style={{ borderRadius: "8px" }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="danger"
                                    disabled={
                                        !isValid ||
                                        (estados.esEdicion && !isDirty) ||
                                        tieneNombresVariantesDuplicados()
                                    }
                                    style={{
                                        backgroundColor: "#f55449",
                                        borderColor: "#f55449",
                                        borderRadius: "8px",
                                    }}
                                    className="px-4"
                                >
                                    {estados.esEdicion ? "Actualizar producto" : "Crear producto"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>

            <ConfirmDialog
                abierto={borradorAbierto}
                titulo="Borrador guardado"
                mensaje="Hay un borrador guardado ¿Deseas recuperarlo?"
                alConfirmar={manejarRecuperarBorrador}
                alCancelar={manejarCancelarBorrador}
                textoConfirmar="Recuperar"
                textoCancelar="Descartar"
            />

            <ConfirmDialog
                abierto={salidaAbierto}
                titulo="Cambios sin guardar"
                mensaje="Tienes cambios sin guardar ¿Seguro que quieres salir?"
                alConfirmar={confirmarSalida}
                alCancelar={cancelarSalida}
                textoConfirmar="Salir"
                textoCancelar="Quedarme"
            />
        </Container>
    );
}

export default ProductoForm;