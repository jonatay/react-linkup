const https = require("https");
const _ = require("underscore");

const auth =
  "Basic " +
  Buffer.from(
    process.env.SAGE_ONE_USERNAME + ":" + process.env.SAGE_ONE_PASSWORD
  ).toString("base64");

var host = "accounting.sageone.co.za";
// filter is array of `${f.field} ${f.opr} ${f.value}`
function performRequest(
  { endpoint, method, data, filter, fromDate, toDate },
  callback
) {
  const dataString = data ? JSON.stringify(data) : JSON.stringify({});
  const headers = {
    // 'Content-Type': 'application/json',
    // 'Content-Length': dataString.length,
    Authorization: auth
  };

  const odFilter = filter
    ? filter.map(f => `&$filter=${f.field} ${f.opr} ${f.value}`).join(" and ")
    : null;
  const odFromDate = fromDate ? `&fromDate=${fromDate.substring(0, 10)}` : null;
  const odToDate = toDate ? `&toDate=${toDate.substring(0, 10)}` : null;

  const options = {
    host: host,
    path: encodeURI(
      `/api/2.0.0/${endpoint}?apiKey={${
        process.env.SAGE_ONE_API_KEY
      }}&CompanyId=109129${odFilter ? odFilter : ""}${
        odFromDate ? odFromDate : ""
      }${odToDate ? odToDate : ""}`
    ),
    method: method,
    headers: headers
  };

  console.log(options);
  const req = https.request(options, function(res) {
    res.setEncoding("utf-8");

    let responseString = "";

    res.on("data", function(data) {
      responseString += data;
    });

    res.on("end", function() {
      try {
        const responseObject = JSON.parse(responseString);
        // console.log(responseObject);
        callback(null, responseObject);
      } catch (exception) {
        console.log(exception);
        callback(
          {
            exception: "malformed json data, check sage one api status",
            data: responseString
          },
          null
        );
      }
    });
  });

  req.write(dataString);
  req.end();
}
// performRequest('/api/2.0.0/Company/Get', 'GET', {}, function(err, data) {
//   console.log(data.TotalResults > 0 ? 'SageOneApi Works OK' : 'SageOneApi NOT WORKING');
// });

/* Extend the Underscore object with the following methods */
// Rate limit ensures a function is never called more than every [rate]ms
// Unlike underscore's _.throttle function, function calls are queued so that
//   requests are never lost and simply deferred until some other time

_.rateLimit = function(func, rate, async) {
  const queue = [];
  const timeOutRef = false;
  let currentlyEmptyingQueue = false;

  const emptyQueue = function() {
    if (queue.length) {
      currentlyEmptyingQueue = true;
      _.delay(function() {
        if (async) {
          _.defer(function() {
            queue.shift().call();
          });
        } else {
          queue.shift().call();
        }
        emptyQueue();
      }, rate);
    } else {
      currentlyEmptyingQueue = false;
    }
  };

  return function() {
    // get arguments into an array
    const args = _.map(arguments, function(e) {
      return e;
    });
    // call apply so that we can pass in arguments as parameters as opposed to an array
    queue.push(_.bind.apply(this, [func, this].concat(args)));
    if (!currentlyEmptyingQueue) {
      emptyQueue();
    }
  };
};

// NB Sage API limit is 100 calls per minute, let's go with a delay on 675 ms btw calls

module.exports = _.rateLimit(performRequest, process.env.SAGE_ONE_LIMIT_DELAY);
