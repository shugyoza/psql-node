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
    'username_value',
    'password_value',
    'email_value',
    'phone_number_value',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ) RETURNING user_id,
  username,
  email,
  phone;