import { z } from "zod";

const aNumeroOIndefinido = (val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
};

const precioDecimal = () =>
    z.preprocess(
        aNumeroOIndefinido,
        z.number({
            required_error: "El precio es requerido",
            invalid_type_error: "Debe ser un número válido",
        })
            .min(0, "No puede ser negativo")
            .refine((val) => Number(val.toFixed(2)) === val, "Máximo 2 decimales")
    );

const stockNoNegativo = () =>
    z.preprocess(
        aNumeroOIndefinido,
        z.number({
            required_error: "El stock es requerido",
            invalid_type_error: "Debe ser un número válido",
        })
            .int("Debe ser un número entero")
            .min(0, "Debe ser 0 o un número positivo")
    );

export const productoSchema = z
    .object({
        title: z
            .string()
            .min(3, "Mínimo 3 caracteres")
            .max(80, "Máximo 80 caracteres")
            .regex(/^[a-zA-Z0-9\s\-]+$/, "Solo letras, números, espacios y guiones"),
        category: z.string().min(1, "Selecciona una categoría"),
        price: precioDecimal(),
        stock: stockNoNegativo(),
        discountPercentage: z
            .preprocess(
                aNumeroOIndefinido,
                z.number({ invalid_type_error: "Debe ser un número válido" })
                    .min(0, "Mínimo 0%")
                    .max(100, "Máximo 100%")
                    .optional()
            )
            .default(0),
        availabilityStatus: z.enum(["in-stock", "out-of-stock"]),
        variants: z
            .array(
                z.object({
                    name: z.string().min(1, "Nombre requerido"),
                    price: precioDecimal(),
                    stock: stockNoNegativo(),
                })
            )
            .min(1, "Debe tener al menos una variante")
            .max(5, "Máximo 5 variantes"),
    })
    .superRefine((data, ctx) => {
        data.variants.forEach((variant, idx) => {
            if (variant.price < data.price) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `El precio de "${variant.name}" no puede ser menor que el precio base (${data.price})`,
                    path: ["variants", idx, "price"],
                });
            }
            if (variant.price > data.price * 3) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `El precio de "${variant.name}" no puede superar ${(data.price * 3).toFixed(2)}`,
                    path: ["variants", idx, "price"],
                });
            }
        });

        const nombres = data.variants.map((v) => v.name?.trim().toLowerCase()).filter(Boolean);
        if (nombres.length !== new Set(nombres).size) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Los nombres de las variantes no pueden repetirse",
                path: ["variants"],
            });
        }

        const totalStockVariantes = data.variants.reduce((sum, v) => sum + v.stock, 0);
        if (totalStockVariantes > data.stock) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `La suma de stocks (${totalStockVariantes}) supera el stock total (${data.stock})`,
                path: ["stock"],
            });
        }
    });