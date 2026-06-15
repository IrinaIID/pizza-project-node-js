import { z } from 'zod';

export const PizzaReadySchema = z.object({
  pizzaType: z.string(),
  amount: z.number().positive(),
});

export type PizzaReady = z.infer<typeof PizzaReadySchema>;
