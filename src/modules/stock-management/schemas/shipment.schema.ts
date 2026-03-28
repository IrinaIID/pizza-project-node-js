import z from 'zod';

const ingredientSchema = z.object({
  ingredientName: z.string().min(1, 'Ingredient name is required'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  unit: z.enum(['kg', 'g', 'l', 'ml', 'pcs']),
});

export const shipmentSchema = z.object({
  dishName: z.string().min(1, 'Dish name is required'),
  ingredients: z.array(ingredientSchema).min(1, 'At least one ingredient is required'),
});

export type ShipmentType = z.infer<typeof shipmentSchema>;
