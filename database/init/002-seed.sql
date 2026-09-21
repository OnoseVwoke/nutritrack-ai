INSERT INTO users (email)
VALUES ('demo@nutritrack.local')
ON CONFLICT (email) DO NOTHING;

INSERT INTO meals
    (user_id, name, meal_time, calories, protein)
SELECT
    id,
    'Greek Yogurt Bowl',
    '08:10',
    340,
    24
FROM users
WHERE email = 'demo@nutritrack.local'
AND NOT EXISTS (
    SELECT 1
    FROM meals
    WHERE name = 'Greek Yogurt Bowl'
);

INSERT INTO meals
    (user_id, name, meal_time, calories, protein)
SELECT
    id,
    'Chicken Rice Bowl',
    '13:05',
    620,
    46
FROM users
WHERE email = 'demo@nutritrack.local'
AND NOT EXISTS (
    SELECT 1
    FROM meals
    WHERE name = 'Chicken Rice Bowl'
);

INSERT INTO meals
    (user_id, name, meal_time, calories, protein)
SELECT
    id,
    'Apple + Peanut Butter',
    '16:20',
    250,
    8
FROM users
WHERE email = 'demo@nutritrack.local'
AND NOT EXISTS (
    SELECT 1
    FROM meals
    WHERE name = 'Apple + Peanut Butter'
);

INSERT INTO pantry_items
    (user_id, name, quantity, expiry_date, category)
SELECT
    id,
    'Chicken Breast',
    '1.2 kg',
    '2026-09-24',
    'Protein'
FROM users
WHERE email = 'demo@nutritrack.local'
AND NOT EXISTS (
    SELECT 1
    FROM pantry_items
    WHERE name = 'Chicken Breast'
);

INSERT INTO pantry_items
    (user_id, name, quantity, expiry_date, category)
SELECT
    id,
    'Brown Rice',
    '2.5 kg',
    '2026-11-18',
    'Grains'
FROM users
WHERE email = 'demo@nutritrack.local'
AND NOT EXISTS (
    SELECT 1
    FROM pantry_items
    WHERE name = 'Brown Rice'
);

INSERT INTO weights
    (user_id, weight, recorded_at)
SELECT
    id,
    78.4,
    '2026-09-15'
FROM users
WHERE email = 'demo@nutritrack.local'
AND NOT EXISTS (
    SELECT 1
    FROM weights
    WHERE recorded_at = '2026-09-15'
);