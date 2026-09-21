import { Request, Response } from 'express';
import { pool } from '../db/pool.js';

const DEMO_USER_ID = 1;

export async function getPantry(
  _req: Request,
  res: Response
) {
  const result = await pool.query(
    `
    SELECT *
    FROM pantry_items
    WHERE user_id = $1
    ORDER BY expiry_date ASC
    `,
    [DEMO_USER_ID]
  );

  res.json(result.rows);
}

export async function createPantryItem(
  req: Request,
  res: Response
) {
  const {
    name,
    quantity,
    expiry_date,
    category
  } = req.body;

  if (
    !name ||
    !quantity ||
    !expiry_date ||
    !category
  ) {
    return res.status(400).json({
      error: 'All pantry fields are required'
    });
  }

  const result = await pool.query(
    `
    INSERT INTO pantry_items
      (
        user_id,
        name,
        quantity,
        expiry_date,
        category
      )
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      DEMO_USER_ID,
      name,
      quantity,
      expiry_date,
      category
    ]
  );

  res.status(201).json(result.rows[0]);
}

export async function deletePantryItem(
  req: Request,
  res: Response
) {
  await pool.query(
    `
    DELETE FROM pantry_items
    WHERE id = $1
    AND user_id = $2
    `,
    [
      req.params.id,
      DEMO_USER_ID
    ]
  );

  res.json({
    message: 'Pantry item deleted'
  });
}