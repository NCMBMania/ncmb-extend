require('./index');
const config = require('./config');
let NCMB = require('ncmb');

let ncmb = new NCMB(config.application_key, config.client_key);

let AA7 = ncmb.DataStore('AA7');
AA7
  .average(['Integer', 'Integer2'])
  .then(function(results) {
    console.log(results.average);
  })

AA7
  .sum(['Integer', 'Integer2'])
  .then(function(results) {
    console.log(results.sum);
  })
