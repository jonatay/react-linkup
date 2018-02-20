-- Table: fleet.merchant

DROP TABLE fleet.merchant CASCADE;

CREATE TABLE fleet.merchant
(
  id serial NOT NULL,
  name character varying(30),
  town character varying(30),
  oil_coy character varying(30),
  fims_names character varying(30)[],
  jdata json, 
  CONSTRAINT merchant_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);

ALTER TABLE fleet.merchant
  OWNER TO postgres;