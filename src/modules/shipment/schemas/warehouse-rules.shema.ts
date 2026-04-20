import z from 'zod';

export const warehouseRulesSchema = z.object({
  workingHours: z.object({
    start: z.number().int().min(0).max(23),
    end: z.number().int().min(0).max(23),
  }),
  minUnits: z.number().int().positive(),
  maxUnits: z.number().int().positive(),
});

export const rulesConfigSchema = z.record(z.string(), z.record(z.string(), warehouseRulesSchema));

export type WarehouseRules = z.infer<typeof warehouseRulesSchema>;
export type RulesConfig = z.infer<typeof rulesConfigSchema>;
