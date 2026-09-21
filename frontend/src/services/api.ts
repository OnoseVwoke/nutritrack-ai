const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API request failed');
  }

  return response.json();
}

export const api = {
  getMeals: () =>
    request<any[]>('/meals'),

  createMeal: (data: {
    name: string;
    meal_time: string;
    calories: number;
    protein: number;
  }) =>
    request<any>('/meals', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  deleteMeal: (id: number) =>
    request<any>(`/meals/${id}`, {
      method: 'DELETE'
    }),

  getPantry: () =>
    request<any[]>('/pantry'),

  createPantryItem: (data: {
    name: string;
    quantity: string;
    expiry_date: string;
    category: string;
  }) =>
    request<any>('/pantry', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  deletePantryItem: (id: number) =>
    request<any>(`/pantry/${id}`, {
      method: 'DELETE'
    }),

  getWeights: () =>
    request<any[]>('/weights'),

  createWeight: (data: {
    weight: number;
    recorded_at: string;
  }) =>
    request<any>('/weights', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  deleteWeight: (id: number) =>
    request<any>(`/weights/${id}`, {
      method: 'DELETE'
    }),

  getDashboard: () =>
    request<any>('/dashboard')
};