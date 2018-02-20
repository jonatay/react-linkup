DO $$
  plv8.elog(WARNING, 'plv8.version = ' + plv8.version); // Will output the PL/v8 installed as a PostgreSQL `WARNING`.
$$ LANGUAGE plv8;

