-- Table: fleet.vehicle_cost_centre

DROP TABLE fleet.vehicle_cost_centre;

CREATE TABLE fleet.vehicle_cost_centre
(
  id serial NOT NULL,
  vehicle_id integer,
  cost_centre_id integer,
  date_from date, -- 
  date_to date,
  CONSTRAINT vehicle_cost_centre_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.vehicle_cost_centre
  OWNER TO postgres;

