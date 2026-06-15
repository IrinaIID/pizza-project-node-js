import { PizzaReady } from '@pizza/api-contracts';

export class PizzaProductionService {
  getReadyPizzas(): PizzaReady[] {
    return [
      {
        pizzaType: 'Margherita',
        amount: 5,
      },
      {
        pizzaType: 'Pepperoni',
        amount: 3,
      },
    ];
  }
}
