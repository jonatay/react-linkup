-- Table: fleet.cost_centre

-- DROP TABLE fleet.cost_centre;

CREATE TABLE fleet.cost_centre
(
  id serial NOT NULL,
  name character varying,
  description text,
  registrations text,
  purchase_types text,
  is_vat boolean,
  sequence integer,
  CONSTRAINT cost_centre_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.cost_centre
  OWNER TO postgres;
