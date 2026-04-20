import z from 'zod';

export const ingredientSchema = z.object({
  id: z.string().min(1, 'Ingredient id is required'),
  units: z.number().int().positive('Units must be a positive integer'),
});

export const shipmentSchema = z.object({
  targetWarehouse: z.string().min(1, 'Warehouse is required'),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
});

export type ShipmentType = z.infer<typeof shipmentSchema>;
