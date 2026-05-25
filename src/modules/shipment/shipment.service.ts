import { BusinessRuleError } from '../../common/errors.js';
import { getStrategy } from './strategies/strategy.factory.js';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { shipments } from '../../db/schema.js';

type IngredientInput = {
  id: string;
  units: number;
};

type ShipmentEntity = {
  ingredientId: string;
  units: number;
  warehouse: string;
  country: string;
};

class ShipmentRepository {
  private db;
  constructor() {
    const pool = new Pool({
      connectionString:
        //@TODO: use env variable
        process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5432/pizza',
    });
    this.db = drizzle(pool);
  }

  async createShipment(entity: ShipmentEntity) {
    return this.db.insert(shipments).values({
      ingredientId: entity.ingredientId,
      units: entity.units,
      warehouse: entity.warehouse,
      country: entity.country,
    });
  }
}

export class ShipmentService {
  private repository: ShipmentRepository;
  constructor() {
    this.repository = new ShipmentRepository();
  }

  async registerShipment(
    countryCode: string,
    targetWarehouse: string,
    ingredients: IngredientInput[],
  ): Promise<ShipmentEntity[]> {
    const strategy = getStrategy(countryCode, targetWarehouse);
    const now = new Date();

    if (!strategy.validateWorkingHours(now)) {
      throw new BusinessRuleError(`Warehouse ${targetWarehouse} is closed at this time`);
    }

    const result: ShipmentEntity[] = [];

    for (const ingredient of ingredients) {
      if (!strategy.validateMinUnits(ingredient.units)) {
        throw new BusinessRuleError(`Ingredient ${ingredient.id} below minimum units`);
      }

      if (!strategy.validateMaxUnits(ingredient.units)) {
        let remaining = ingredient.units;
        const maxUnits = strategy.getMaxUnits();

        while (remaining > 0) {
          const chunk = Math.min(remaining, maxUnits);

          result.push({
            ingredientId: ingredient.id,
            units: chunk,
            warehouse: targetWarehouse,
            country: countryCode,
          });

          remaining -= chunk;
        }
      } else {
        result.push({
          ingredientId: ingredient.id,
          units: ingredient.units,
          warehouse: targetWarehouse,
          country: countryCode,
        });
      }
    }

    await Promise.all(result.map((s) => this.repository.createShipment(s)));
    return result;
  }
}
