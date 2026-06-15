import { ShipmentClient } from '../../common/shipment.client.js';

export class PizzaOrderingService {
  private shipmentClient = new ShipmentClient();

  async markReady(id: number) {
    const check = await this.shipmentClient.checkIngredients({
      ingredients: [
        {
          ingredientId: 'cheese',
          units: 10,
        },
      ],
    });

    if (!check.available) {
      throw new Error('Ingredients unavailable');
    }

    return {
      id,
      status: 'READY',
    };
  }
}
