import { WarehouseRules } from '../schemas/warehouse-rules.shema.js';

export class WarehouseStrategy {
  constructor(private rules: WarehouseRules) {}

  validateWorkingHours(date: Date): boolean {
    const hour = date.getHours();

    return hour >= this.rules.workingHours.start && hour <= this.rules.workingHours.end;
  }

  validateMinUnits(units: number): boolean {
    return units >= this.rules.minUnits;
  }

  validateMaxUnits(units: number): boolean {
    return units <= this.rules.maxUnits;
  }

  getMaxUnits(): number {
    return this.rules.maxUnits;
  }
}
