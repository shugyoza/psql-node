CREATE TABLE
  IF NOT EXISTS us_city (
    city_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    city_name VARCHAR(50) UNIQUE NOT NULL,
    -- state_id as FK because one city can be in multiple states
    us_state SERIAL REFERENCES us_state (state_id)
  );