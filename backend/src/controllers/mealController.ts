import { Request, Response } from 'express';
import { pool } from '../db/pool.js';

const DEMO_USER_ID = 1;

export async function getMeals(
  _req: Request,
  res: Response
) {
  const result = await pool.query(
    `
    SELECT *
    FROM meals
    WHERE user_id = $1
    ORDER BY meal_time DESC
    `,
    [DEMO_USER_ID]
  );

  res.json(result.rows);
}

export async function createMeal(
  req: Request,
  res: Response
) {
  const {
    name,
    meal_time,
    calories,
    protein
  } = req.body;

  if (
    !name ||
    !meal_time ||
    calories === undefined ||
    protein === undefined
  ) {
    return res.status(400).json({
      error: 'All meal fields are required'
    });
  }

  const result = await pool.query(
    `
    INSERT INTO meals
      (user_id, name, meal_time, calories, protein)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      DEMO_USER_ID,
      name,
      meal_time,
      calories,
      protein
    ]
  );

  res.status(201).json(result.rows[0]);
}

export async function deleteMeal(
  req: Request,
  res: Response
) {
  await pool.query(
    `
    DELETE FROM meals
    WHERE id = $1
    AND user_id = $2
    `,
    [
      req.params.id,
      DEMO_USER_ID
    ]
  );

  res.json({
    message: 'Meal deleted'
  });
}