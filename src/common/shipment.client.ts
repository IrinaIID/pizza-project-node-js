import { IngredientCheckRequest, IngredientCheckResponse } from '@pizza/api-contracts';

export class ShipmentClient {
  async checkIngredients(data: IngredientCheckRequest): Promise<IngredientCheckResponse> {
    const response = await fetch('http://localhost:3000/ingredients/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
}
