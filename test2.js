const config = require('./config');
const Query = require('ncmb/lib/query');

Query.prototype.new_method = (params) => {
  console.log(`これは新しいメソッドです。 ${params}`);
};

const NCMB = require('ncmb');

const ncmb = new NCMB(config.application_key, config.client_key);

const Item = ncmb.DataStore('Item');
Item.new_method('これは引数');

Item.prototype.new_method = (params) => {
  console.log(`これはインスタンスの新しいメソッドです。 ${params}`);
};

const item = new Item();
item.new_method('これは引数');
