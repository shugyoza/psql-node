INSERT INTO
  us_state (state_name, postal_abbr, fips_code, last_update)
VALUES
  ('State Name Value', 'ZZ', '01', CURRENT_TIMESTAMP) RETURNING state_id,
  state_name,
  postal_abbr,
  fips_code,
  last_update;