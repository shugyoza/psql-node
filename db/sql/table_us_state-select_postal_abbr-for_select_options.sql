SELECT
  state_id AS id,
  postal_abbr || ' - ' || state_name AS value
FROM
  us_state
ORDER BY
  state_name;