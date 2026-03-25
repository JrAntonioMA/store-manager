import { useEffect, useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productoSchema } from "../../../utils/validations";
import { usarCategorias } from "./useCategorias";
import { usarMutacionesProducto } from "./useMutateProducto";

export const useFormularioProducto = ({ producto, alExito, alCambioSinGuardar }) => {
    const esEdicion = !!producto;
    const { crear, actualizar } = usarMutacionesProducto();
    const { data: categorias, isLoading: categoriasCargando } = usarCategorias();
    const [dialogoBorradorAbierto, setDialogoBorradorAbierto] = useState(false);
    const [datosBorrador, setDatosBorrador] = useState(null);
    const debounceTimer = useRef(null);
    const [forceRender, setForceRender] = useState(0);

    const form = useForm({
        resolver: zodResolver(productoSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            title: "",
            category: "",
            price: 0,
            stock: 0,
            discountPercentage: 0,
            availabilityStatus: "in-stock",
            variants: [{ name: "", price: 0, stock: 0 }],
        },
    });

    const { fields, append, remove, replace } = useFieldArray({
        control: form.control,
        name: "variants",
    });

    const precio = form.watch("price") || 0;
    const descuento = form.watch("discountPercentage") || 0;
    const estadoDisponibilidad = form.watch("availabilityStatus");
    const precioFinal = precio * (1 - descuento / 100);
    const advertenciaDescuento = descuento > 50;
    const stockDeshabilitado = estadoDisponibilidad === "out-of-stock";

    useEffect(() => {
        if (alCambioSinGuardar) {
            alCambioSinGuardar(form.formState.isDirty);
        }
    }, [form.formState.isDirty, alCambioSinGuardar]);

    useEffect(() => {
        const subscription = form.watch((values) => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                if (form.formState.isDirty) {
                    localStorage.setItem("productoBorrador", JSON.stringify(values));
                }
            }, 30000);
        });
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            if (form.formState.isDirty) {
                const currentValues = form.getValues();
                localStorage.setItem("productoBorrador", JSON.stringify(currentValues));
            }
            subscription.unsubscribe();
        };
    }, [form, form.formState.isDirty]);

    useEffect(() => {
        if (producto) {
            form.reset({
                title: producto.title,
                category: producto.category,
                price: producto.price,
                stock: producto.stock,
                discountPercentage: producto.discountPercentage ?? 0,
                availabilityStatus: producto.availabilityStatus,
                variants: producto.variants || [{ name: "", price: 0, stock: 0 }],
            });
        }
    }, [producto, form.reset]);

    const categoriaAnterior = useRef(producto?.category);
    useEffect(() => {
        const categoriaActual = form.watch("category");
        if (categoriaAnterior.current && categoriaAnterior.current !== categoriaActual && !esEdicion) {
            replace([{ name: "", price: 0, stock: 0 }]);
        }
        categoriaAnterior.current = categoriaActual;
    }, [form.watch("category"), replace, esEdicion]);

    useEffect(() => {
        if (estadoDisponibilidad === "out-of-stock") {
            if (form.watch("stock") !== 0) form.setValue("stock", 0);
            fields.forEach((_, idx) => {
                if (form.watch(`variants.${idx}.stock`) !== 0) form.setValue(`variants.${idx}.stock`, 0);
            });
        }
    }, [estadoDisponibilidad, form.setValue, fields, form.watch]);

    useEffect(() => {
        if (!esEdicion && !producto) {
            const borrador = localStorage.getItem("productoBorrador");
            if (borrador) {
                try {
                    const parsed = JSON.parse(borrador);
                    const borradorCompleto = {
                        title: parsed.title || "",
                        category: parsed.category || "",
                        price: parsed.price ?? 0,
                        stock: parsed.stock ?? 0,
                        discountPercentage: parsed.discountPercentage ?? 0,
                        availabilityStatus: parsed.availabilityStatus || "in-stock",
                        variants: parsed.variants || [{ name: "", price: 0, stock: 0 }],
                    };
                    setDatosBorrador(borradorCompleto);
                    setDialogoBorradorAbierto(true);
                } catch (error) {
                    localStorage.removeItem("productoBorrador");
                }
            }
        }
    }, [esEdicion, producto]);

    const manejarRecuperarBorrador = () => {
        if (datosBorrador) {
            Object.entries(datosBorrador).forEach(([key, value]) => {
                if (key === "variants") {
                    replace(value);
                } else {
                    form.setValue(key, value, { shouldDirty: true });
                }
            });
            setForceRender(prev => prev + 1);
            setTimeout(() => {
                setDialogoBorradorAbierto(false);
                setDatosBorrador(null);
            }, 100);
        } else {
            setDialogoBorradorAbierto(false);
        }
    };

    const manejarCancelarBorrador = () => {
        localStorage.removeItem("productoBorrador");
        setDialogoBorradorAbierto(false);
        setDatosBorrador(null);
    };

    useEffect(() => {
        const manejarBeforeUnload = (e) => {
            if (form.formState.isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", manejarBeforeUnload);
        return () => window.removeEventListener("beforeunload", manejarBeforeUnload);
    }, [form.formState.isDirty]);

    const onSubmit = async (datos) => {
        try {
            if (esEdicion) {
                await actualizar.mutateAsync({ id: producto.id, ...datos });
            } else {
                await crear.mutateAsync(datos);
            }
            localStorage.removeItem("productoBorrador");
            alExito();
        } catch (error) {
            console.error(error);
        }
    };

    const tieneNombresVariantesDuplicados = () => {
        const nombres = fields.map((_, idx) => form.watch(`variants.${idx}.name`)?.trim().toLowerCase()).filter(Boolean);
        return nombres.length !== new Set(nombres).size;
    };

    return {
        form,
        categorias,
        categoriasCargando,
        dialogos: {
            borradorAbierto: dialogoBorradorAbierto,
            datosBorrador,
            manejarRecuperarBorrador,
            manejarCancelarBorrador,
        },
        estados: {
            esEdicion,
            precio,
            descuento,
            estadoDisponibilidad,
            precioFinal,
            advertenciaDescuento,
            stockDeshabilitado,
            isValid: form.formState.isValid,
            isDirty: form.formState.isDirty,
            errors: form.formState.errors,
            touchedFields: form.formState.touchedFields,
        },
        fields,
        append,
        remove,
        tieneNombresVariantesDuplicados,
        onSubmit: form.handleSubmit(onSubmit),
        forceRender, // Para posible uso en la UI, aunque no es necesario
    };
};