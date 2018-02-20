-- Table: fleet.vehicle

DROP TABLE fleet.vehicle CASCADE;

CREATE TABLE fleet.vehicle
(
  id serial NOT NULL,
  name character varying(30),
  registration character varying(10),
  make character varying(20),
  model character varying(20),
  year integer,
  fims_registrations  character varying(10)[],
  fims_names character varying(30)[],
  fims_drivers  character varying(30)[],
  jdata json, 
  CONSTRAINT vehicle_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.vehicle
  OWNER TO postgres;
