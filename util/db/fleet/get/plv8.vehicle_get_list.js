CREATE OR REPLACE FUNCTION fleet.vehicle_get_by_role_daterange() returns json as $$

const sqlSelect = "SELECT "


$$ language plv8 IMMUTABLE;
