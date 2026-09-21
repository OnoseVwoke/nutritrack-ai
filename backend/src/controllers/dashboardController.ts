import { Request, Response } from 'express';
import { pool } from '../db/pool.js';

const DEMO_USER_ID = 1;

export async function getDashboard(
  _req: Request,
  res: Response
) {
  const meals = await pool.query(
    `
    SELECT
      COALESCE(SUM(calories), 0) AS calories,
      COALESCE(SUM(protein), 0) AS protein,
      COUNT(*) AS meals
    FROM meals
    WHERE user_id = $1
    `,
    [DEMO_USER_ID]
  );

  const latestWeight = await pool.query(
    `
    SELECT weight
    FROM weights
    WHERE user_id = $1
    ORDER BY recorded_at DESC
    LIMIT 1
    `,
    [DEMO_USER_ID]
  );

  res.json({
    calories: Number(meals.rows[0].calories),
    protein: Number(meals.rows[0].protein),
    meals: Number(meals.rows[0].meals),
    latestWeight:
      latestWeight.rows.length > 0
        ? Number(latestWeight.rows[0].weight)
        : null
  });
}