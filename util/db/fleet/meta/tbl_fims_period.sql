-- Table: fleet.fims_period

DROP TABLE fleet.fims_period;

CREATE TABLE fleet.fims_period
(
  id serial NOT NULL,
  year integer,
  month integer,
  when_received timestamp,
  rows_received integer,
  must_refresh boolean DEFAULT false,
  account character varying(10),
  CONSTRAINT fims_period_pk PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.fims_period
  OWNER TO postgres;
