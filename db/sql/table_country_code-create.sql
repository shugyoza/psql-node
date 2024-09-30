CREATE TABLE
  IF NOT EXISTS country_code (
    country_id SERIAL PRIMARY KEY,
    country_name VARCHAR(50) UNIQUE NOT NULL,
    iso_alpha_2 VARCHAR(2) UNIQUE NOT NULL,
    iso_alpha_3 VARCHAR(3) UNIQUE NOT NULL,
    un_code VARCHAR(3) UNIQUE NOT NULL,
    calling_code VARCHAR(20) UNIQUE NOT NULL,
    last_update TIMESTAMP NOT NULL
  );