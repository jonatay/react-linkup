-- Table: fleet.fleet_permission

DROP TABLE fleet.fleet_permission CASCADE;

CREATE TABLE fleet.fleet_permission
(
  id serial NOT NULL,
  name character varying(30),
  roles character varying(15)[],
  table_name character varying(30),
  ids integer[],
  permissions character varying(10)[],
  jdata json,
  CONSTRAINT fleet_permission_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE fleet.fleet_permission
  OWNER TO postgres;

 INSERT INTO fleet.fleet_permission (name, roles, table_name, ids, permissions) VALUES ('Director: fleet_tran_group', '{admin,director}', 'fleet.fleet_tran_group', '{1,2,3,4,5,6,7,8,9,10,11,12}', '{RPT}');
 INSERT INTO fleet.fleet_permission (name, roles, table_name, ids, permissions) VALUES ('Manager: fleet_tran_group', '{manager}', 'fleet.fleet_tran_group', '{1,2,3,4,5,6,7,8,9,10}', '{RPT}');



