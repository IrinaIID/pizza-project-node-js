import { ShipmentClient } from '../../common/shipment.client.js';
import { scheduleStaleOrder } from '../../jobs/order.stale.job.js';

export class PizzaOrderingService {
  private shipmentClient = new ShipmentClient();

  async markReady(id: number) {
    await scheduleStaleOrder(id);

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
