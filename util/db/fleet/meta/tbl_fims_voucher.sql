-- Table: fleet.fims_voucher

DROP TABLE fleet.fims_voucher;

CREATE TABLE fleet.fims_voucher
(
  id serial NOT NULL,
  cut_off_date character varying(10),
  account_number character varying(10),
  account_name character varying(30),
  cost_centre character varying(30),
  cost_centre_name character varying(30),
  registration character varying(10),
  batch character varying(10),
  driver character varying(50),
  vehicle_description character varying(50),
  transaction_date character varying(10),
  process_date character varying(10),
  merchant_name character varying(50),
  merchant_town character varying(50),
  oil_company character varying(25),
  odometer character varying(15),
  fuel_litres character varying(15),
  oil_litres character varying(15),
  private_usage character(1),
  warnings text,
  purchase_description character varying(50),
  toll_lane character varying(20),
  toll_vehicle_class character varying(15),
  toll_transaction_type character varying(20),
  toll_match_indicator character varying(25),
  amount character varying(11),
  toll_discount character varying(15),
  batch_index integer,
  request_period integer,
  CONSTRAINT voucher_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.fims_voucher
  OWNER TO postgres;