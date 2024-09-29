INSERT INTO
  account (
    username,
    password,
    email,
    phone,
    updated,
    created
  )
VALUES
  (
    'username_1',
    'password_1',
    'email_1',
    'value_1',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'username_2',
    'password_2',
    'email_2',
    'value_2',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  RETURNING user_id,
  username,
  email,
  phone;