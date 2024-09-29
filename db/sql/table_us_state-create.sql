CREATE TABLE
  IF NOT EXISTS us_state (
    state_id SERIAL PRIMARY KEY,
    state_name VARCHAR(50) UNIQUE NOT NULL,
    postal_abbr VARCHAR(2) UNIQUE NOT NULL,
    fips_code VARCHAR(2) UNIQUE NOT NULL,
    last_update TIMESTAMP NOT NULL
  )