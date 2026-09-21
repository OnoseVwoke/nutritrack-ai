import { Request, Response } from 'express';
import { pool } from '../db/pool.js';

const DEMO_USER_ID = 1;

export async function getWeights(
  _req: Request,
  res: Response
) {
  const result = await pool.query(
    `
    SELECT *
    FROM weights
    WHERE user_id = $1
    ORDER BY recorded_at DESC
    `,
    [DEMO_USER_ID]
  );

  res.json(result.rows);
}

export async function createWeight(
  req: Request,
  res: Response
) {
  const {
    weight,
    recorded_at
  } = req.body;

  if (!weight || !recorded_at) {
    return res.status(400).json({
      error: 'Weight and date are required'
    });
  }

  const result = await pool.query(
    `
    INSERT INTO weights
      (user_id, weight, recorded_at)
    VALUES
      ($1, $2, $3)
    RETURNING *
    `,
    [
      DEMO_USER_ID,
      weight,
      recorded_at
    ]
  );

  res.status(201).json(result.rows[0]);
}

export async function deleteWeight(
  req: Request,
  res: Response
) {
  await pool.query(
    `
    DELETE FROM weights
    WHERE id = $1
    AND user_id = $2
    `,
    [
      req.params.id,
      DEMO_USER_ID
    ]
  );

  res.json({
    message: 'Weight deleted'
  });
}