-- Table: fleet.fleet_tran_group

DROP TABLE fleet.fleet_tran_group CASCADE;

CREATE TABLE fleet.fleet_tran_group
(
  id serial NOT NULL,
  name character varying(50) UNIQUE,
  description text,
  is_vat boolean,
  fims_registrations character varying(10)[],
  fims_purchase_types character varying(30)[],
  jdata json,
  CONSTRAINT tran_group_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.fleet_tran_group
  OWNER TO postgres;
