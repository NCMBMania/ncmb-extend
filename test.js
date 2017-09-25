require('./index');
const config = require('./config');
const NCMB = require('ncmb');

const ncmb = new NCMB(config.application_key, config.client_key);

const AA7 = ncmb.DataStore('AA7');
/*
AA7
  .average(['Integer', 'Integer2'])
  .then((results) => {
    console.log(results.average);
  });

AA7
  .sum(['Integer', 'Integer2'])
  .then((results) => {
    console.log(results.sum);
  });

AA7
  .each(obj => ({ plus: obj.Integer + obj.Integer2 }))
  .then((results) => {
    console.log(results);
  });
*/
AA7
  .equalTo('Boolean', true)
  .updateAll({
    Integer: 5,
    Integer2: 50,
  })
  .then((ary) => {
    console.log(ary);
  });

