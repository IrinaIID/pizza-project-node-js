import { rulesConfig } from '../shipment-rules.js';
import { WarehouseStrategy } from './warehouse.strategy.js';

export function getStrategy(countryCode: string, warehouse: string) {
  const country = countryCode.toLowerCase();
  const wh = warehouse.toLowerCase();

  const countryRules = rulesConfig[country];

  if (!countryRules) {
    throw new Error(`Unsupported country: ${countryCode}`);
  }

  const warehouseRules = countryRules[wh];

  if (!warehouseRules) {
    throw new Error(`Unsupported warehouse: ${warehouse} for country ${countryCode}`);
  }

  return new WarehouseStrategy(warehouseRules);
}
