import z from 'zod';

export const paramsSchema = z.object({
  countryCode: z.string().length(2, 'Country code must be ISO-2'),
});

export type ParamsType = z.infer<typeof paramsSchema>;
