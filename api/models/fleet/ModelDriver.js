
const sqlList = `
SELECT * FROM fleet.driver
`

const sqlGetByFimsName = `
SELECT * FROM fleet.driver WHERE $[fimsName] = ANY (fims_names)
`

const sqlInsertFims = `
INSERT INTO fleet.driver (name, fims_names) VALUES ( $[name], $[fims_names] )
RETURNING *
`

