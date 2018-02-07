const db = require('../../services/postgres/db');

const sqlGetVehicle = `
SELECT * FROM fleet.vehicle
`;

exports.vehicleList = (req, res) => {
  db
    .any(sqlGetVehicle)
    .then(data => res.json(data))
    .catch(e => res.json(e));
};
