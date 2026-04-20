import rawRules from './shipment-rules.json' with { type: 'json' };
import { rulesConfigSchema } from './schemas/warehouse-rules.shema.js';

export const rulesConfig = rulesConfigSchema.parse(rawRules);
