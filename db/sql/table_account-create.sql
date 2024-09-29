CREATE TABLE
  IF NOT EXISTS account (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    updated TIMESTAMP NOT NULL,
    created TIMESTAMP NOT NULL,
    last_login TIMESTAMP
  )
  /*
  <db_name>=# \d accounts
  Table "public.accounts"
  Column   |            Type             | Collation | Nullable |                  Default                  
  ------------+-----------------------------+-----------+----------+-------------------------------------------
  user_id    | integer                     |           | not null | nextval('accounts_user_id_seq'::regclass)
  username   | character varying(50)       |           | not null | 
  password   | character varying(50)       |           | not null | 
  email      | character varying(255)      |           | not null | 
  phone      | character varying(20)       |           | not null | 
  last_login | timestamp without time zone |           |          | 
  created    | timestamp without time zone |           | not null | 
  updated    | timestamp without time zone |           | not null | 
  Indexes:
  "accounts_pkey" PRIMARY KEY, btree (user_id)
  "accounts_email_key" UNIQUE CONSTRAINT, btree (email)
  "accounts_phone_key" UNIQUE CONSTRAINT, btree (phone)
  "accounts_username_key" UNIQUE CONSTRAINT, btree (username)
   */