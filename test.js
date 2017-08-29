require('./index');
const config = require('./config');
const NCMB = require('ncmb');

const ncmb = new NCMB(config.application_key, config.client_key);

const AA7 = ncmb.DataStore('AA7');
AA7
  .average(['Integer', 'Integer2'])
  .then((results) => {
    // console.log(results.average);
  });

AA7
  .sum(['Integer', 'Integer2'])
  .then((results) => {
    // console.log(results.sum);
  });

AA7
  .each((obj) => {
    return { plus: obj.Integer + obj.Integer2 };
  })
  .then((results) => {
    // console.log(results);
  });
