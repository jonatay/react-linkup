-- Table: fleet.fleet_tran_type

DROP TABLE fleet.fleet_tran_type CASCADE;

CREATE TABLE fleet.fleet_tran_type
(
  id serial NOT NULL,
  name character varying(30),
  fims_purchase_types character varying(30)[],
  description text,
  jdata json,
  CONSTRAINT purchase_type_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.fleet_tran_type
  OWNER TO postgres;
