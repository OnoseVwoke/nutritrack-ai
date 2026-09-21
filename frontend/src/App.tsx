import { useEffect, useState } from 'react';
import {
  Apple,
  Package,
  Scale,
  Trash2
} from 'lucide-react';

import { api } from './services/api';

type Tab = 'dashboard' | 'meals' | 'pantry' | 'weight';

export default function App() {
  const [tab, setTab] = useState<Tab>('dashboard');

  const [meals, setMeals] = useState<any[]>([]);
  const [pantry, setPantry] = useState<any[]>([]);
  const [weights, setWeights] = useState<any[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);

  const [error, setError] = useState('');

  const [meal, setMeal] = useState({
    name: '',
    meal_time: '',
    calories: '',
    protein: ''
  });

  const [pantryItem, setPantryItem] = useState({
    name: '',
    quantity: '',
    expiry_date: '',
    category: ''
  });

  const [weight, setWeight] = useState({
    weight: '',
    recorded_at: ''
  });

  async function loadData() {
    try {
      setError('');

      const [
        mealsData,
        pantryData,
        weightsData,
        dashboardData
      ] = await Promise.all([
        api.getMeals(),
        api.getPantry(),
        api.getWeights(),
        api.getDashboard()
      ]);

      setMeals(mealsData);
      setPantry(pantryData);
      setWeights(weightsData);
      setDashboard(dashboardData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to API'
      );
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitMeal(
    event: React.FormEvent
  ) {
    event.preventDefault();

    await api.createMeal({
      name: meal.name,
      meal_time: meal.meal_time,
      calories: Number(meal.calories),
      protein: Number(meal.protein)
    });

    setMeal({
      name: '',
      meal_time: '',
      calories: '',
      protein: ''
    });

    await loadData();
  }

  async function submitPantry(
    event: React.FormEvent
  ) {
    event.preventDefault();

    await api.createPantryItem(pantryItem);

    setPantryItem({
      name: '',
      quantity: '',
      expiry_date: '',
      category: ''
    });

    await loadData();
  }

  async function submitWeight(
    event: React.FormEvent
  ) {
    event.preventDefault();

    await api.createWeight({
      weight: Number(weight.weight),
      recorded_at: weight.recorded_at
    });

    setWeight({
      weight: '',
      recorded_at: ''
    });

    await loadData();
  }

  async function deleteMeal(id: number) {
    await api.deleteMeal(id);
    await loadData();
  }

  async function deletePantry(id: number) {
    await api.deletePantryItem(id);
    await loadData();
  }

  async function deleteWeight(id: number) {
    await api.deleteWeight(id);
    await loadData();
  }

  return (
    <>
      <header>
        <div className="container">
          <h1>NutriTrack AI</h1>

          <nav>
            <button
              className={
                tab === 'dashboard'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setTab('dashboard')
              }
            >
              Dashboard
            </button>

            <button
              className={
                tab === 'meals'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setTab('meals')
              }
            >
              Meals
            </button>

            <button
              className={
                tab === 'pantry'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setTab('pantry')
              }
            >
              Pantry
            </button>

            <button
              className={
                tab === 'weight'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setTab('weight')
              }
            >
              Weight
            </button>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {tab === 'dashboard' && (
            <>
              <h2>Nutrition Dashboard</h2>

              <div className="grid">

                <div className="card">
                  <Apple />
                  <h3>Calories</h3>

                  <div className="stat">
                    {dashboard?.calories ?? 0}
                  </div>

                  <p>Today's calories</p>
                </div>

                <div className="card">
                  <Apple />
                  <h3>Protein</h3>

                  <div className="stat">
                    {dashboard?.protein ?? 0}g
                  </div>

                  <p>Today's protein</p>
                </div>

                <div className="card">
                  <Package />
                  <h3>Meals</h3>

                  <div className="stat">
                    {dashboard?.meals ?? 0}
                  </div>

                  <p>Meals logged</p>
                </div>

                <div className="card">
                  <Scale />
                  <h3>Weight</h3>

                  <div className="stat">
                    {dashboard?.latestWeight ?? '-'}
                  </div>

                  <p>Latest weight</p>
                </div>

              </div>

              <br />

              <div className="card">
                <h3>AI Nutrition Insight</h3>

                <p>
                  Your nutrition data is being tracked
                  through the NutriTrack API.
                  More advanced AI recommendations
                  will be added in a later phase.
                </p>
              </div>
            </>
          )}

          {tab === 'meals' && (
            <>
              <h2>Meals</h2>

              <div className="card">
                <h3>Log Meal</h3>

                <form
                  className="form"
                  onSubmit={submitMeal}
                >
                  <input
                    className="field"
                    placeholder="Meal name"
                    value={meal.name}
                    onChange={e =>
                      setMeal({
                        ...meal,
                        name: e.target.value
                      })
                    }
                    required
                  />

                  <input
                    className="field"
                    type="time"
                    value={meal.meal_time}
                    onChange={e =>
                      setMeal({
                        ...meal,
                        meal_time: e.target.value
                      })
                    }
                    required
                  />

                  <input
                    className="field"
                    type="number"
                    placeholder="Calories"
                    value={meal.calories}
                    onChange={e =>
                      setMeal({
                        ...meal,
                        calories: e.target.value
                      })
                    }
                    required
                  />

                  <input
                    className="field"
                    type="number"
                    placeholder="Protein (g)"
                    value={meal.protein}
                    onChange={e =>
                      setMeal({
                        ...meal,
                        protein: e.target.value
                      })
                    }
                    required
                  />

                  <button
                    className="primary"
                    type="submit"
                  >
                    Save Meal
                  </button>
                </form>
              </div>

              <br />

              <div className="card">
                <h3>Meal History</h3>

                {meals.map(item => (
                  <div
                    className="item"
                    key={item.id}
                  >
                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <div>
                        {item.calories} kcal ·{' '}
                        {item.protein}g protein
                      </div>
                    </div>

                    <button
                      className="danger"
                      onClick={() =>
                        deleteMeal(item.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'pantry' && (
            <>
              <h2>Pantry</h2>

              <div className="card">
                <h3>Add Pantry Item</h3>

                <form
                  className="form"
                  onSubmit={submitPantry}
                >
                  <input
                    className="field"
                    placeholder="Item name"
                    value={pantryItem.name}
                    onChange={e =>
                      setPantryItem({
                        ...pantryItem,
                        name: e.target.value
                      })
                    }
                    required
                  />

                  <input
                    className="field"
                    placeholder="Quantity"
                    value={pantryItem.quantity}
                    onChange={e =>
                      setPantryItem({
                        ...pantryItem,
                        quantity: e.target.value
                      })
                    }
                    required
                  />

                  <input
                    className="field"
                    type="date"
                    value={pantryItem.expiry_date}
                    onChange={e =>
                      setPantryItem({
                        ...pantryItem,
                        expiry_date: e.target.value
                      })
                    }
                    required
                  />

                  <input
                    className="field"
                    placeholder="Category"
                    value={pantryItem.category}
                    onChange={e =>
                      setPantryItem({
                        ...pantryItem,
                        category: e.target.value
                      })
                    }
                    required
                  />

                  <button
                    className="primary"
                    type="submit"
                  >
                    Add Item
                  </button>
                </form>
              </div>

              <br />

              <div className="card">
                <h3>Inventory</h3>

                {pantry.map(item => (
                  <div
                    className="item"
                    key={item.id}
                  >
                    <div>
                      <strong>
                        {item.name}
                      </strong>

                      <div>
                        {item.quantity} ·{' '}
                        expires {item.expiry_date}
                      </div>
                    </div>

                    <button
                      className="danger"
                      onClick={() =>
                        deletePantry(item.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'weight' && (
            <>
              <h2>Weight Tracking</h2>

              <div className="card">
                <h3>Log Weight</h3>

                <form
                  className="form"
                  onSubmit={submitWeight}
                >
                  <input
                    className="field"
                    type="number"
                    step="0.1"
                    placeholder="Weight in kg"
                    value={weight.weight}
                    onChange={e =>
                      setWeight({
                        ...weight,
                        weight: e.target.value
                      })
                    }
                    required
                  />

                  <input
                    className="field"
                    type="date"
                    value={weight.recorded_at}
                    onChange={e =>
                      setWeight({
                        ...weight,
                        recorded_at: e.target.value
                      })
                    }
                    required
                  />

                  <button
                    className="primary"
                    type="submit"
                  >
                    Save Weight
                  </button>
                </form>
              </div>

              <br />

              <div className="card">
                <h3>Weight History</h3>

                {weights.map(item => (
                  <div
                    className="item"
                    key={item.id}
                  >
                    <div>
                      <strong>
                        {item.weight} kg
                      </strong>

                      <div>
                        {item.recorded_at}
                      </div>
                    </div>

                    <button
                      className="danger"
                      onClick={() =>
                        deleteWeight(item.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </main>
    </>
  );
}