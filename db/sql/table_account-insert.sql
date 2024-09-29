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
    '+0(000)000-0000',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ) RETURNING user_id,
  username,
  email,
  phone;