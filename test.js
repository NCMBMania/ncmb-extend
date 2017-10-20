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

AA7
  .equalTo('Boolean', true)
  .updateAll({
    Integer: 5,
    Integer2: 50,
  })
  .then((ary) => {
    console.log(ary);
  });

const Data = ncmb.DataStore('Data');
Data
  .greaterThan('createDate', new Date('2016-03-15 18:42:15'))
  .fetchMore()
  .then((data) => {
    console.log(data.length);
  })
  .catch((err) => {
    console.log(err);
  });
  */

const DataExtend = ncmb.DataStoreEX('Data', {
  validates: {
    int: {
      type: 'number',
      required: true,
      min: 5,
      max: 10,
    },
    name: {
      type: 'string',
      required: false,
      min: 5,
      max: 20,
    },
    option1: {
      type: 'string',
      required: true,
    },
  },
  defaults: {
    int: 0,
    name: '',
    option1: 1,
  },
});

const item = new DataExtend({ int: 11 });
item
  .set('name', 'Test, test, test, test, test')
  .save()
  .then((obj) => {
    console.log(obj);
  })
  .catch((err) => {
    console.log(err);
  });
