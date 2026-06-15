import { z } from 'zod';

export const IngredientCheckRequestSchema = z.object({
  ingredients: z.array(
    z.object({
      ingredientId: z.string(),
      units: z.number(),
    }),
  ),
});

export const IngredientCheckResponseSchema = z.object({
  available: z.boolean(),
});

export type IngredientCheckRequest = z.infer<typeof IngredientCheckRequestSchema>;

export type IngredientCheckResponse = z.infer<typeof IngredientCheckResponseSchema>;
