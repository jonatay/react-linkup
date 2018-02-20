-- Table: fleet.cost_centre_vehicle

-- DROP TABLE fleet.cost_centre_vehicle;

CREATE TABLE fleet.cost_centre_vehicle
(
  id serial NOT NULL,
  cost_centre_id integer,
  vehicle_id integer,
  date_from date,
  date_to date,
  CONSTRAINT cost_centre_vehicle_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.cost_centre_vehicle
  OWNER TO postgres;
