-- Table: fleet.fleet_transaction

DROP TABLE fleet.fleet_transaction;

CREATE TABLE fleet.fleet_transaction
(
  id serial NOT NULL,
  tax_year integer,
  tax_month integer,
  transaction_date date,
  process_date date,
  registration varchar(10),
  tran_type_id integer REFERENCES fleet.fleet_tran_type(id),
  tran_group_id integer REFERENCES fleet.fleet_tran_group(id),
  vehicle_id integer REFERENCES fleet.vehicle(id),
  driver_id integer REFERENCES fleet.driver(id),
  fims_voucher_id integer REFERENCES fleet.fims_voucher(id),
  merchant_id integer REFERENCES fleet.merchant(id),
  amount numeric(9,2),
  odometer integer,
  jdata json,
  CONSTRAINT transaction_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.fleet_transaction
  OWNER TO postgres;
