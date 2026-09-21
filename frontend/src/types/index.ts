export interface Meal {
  id: number;
  name: string;
  meal_time: string;
  calories: number;
  protein: number;
  created_at: string;
}

export interface PantryItem {
  id: number;
  name: string;
  quantity: string;
  expiry_date: string;
  category: string;
  created_at: string;
}

export interface Weight {
  id: number;
  weight: number;
  recorded_at: string;
}

export interface Dashboard {
  calories: number;
  protein: number;
  meals: number;
  latestWeight: number | null;
}