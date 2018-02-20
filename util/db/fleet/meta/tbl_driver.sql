-- Table: fleet.driver

DROP TABLE fleet.driver;

CREATE TABLE fleet.driver
(
  id serial NOT NULL,
  name character varying(30),
  employee_code character varying(5),
  fims_names character varying(20)[],
  employee_id integer REFERENCES hr.employee(id),
  jdata json, 
  CONSTRAINT driver_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.driver
  OWNER TO postgres;