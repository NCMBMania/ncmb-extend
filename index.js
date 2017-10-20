const Query = require('ncmb/lib/query');
const average = require('./average');
const sum = require('./sum');
const each = require('./each');
const updateAll = require('./updateAll');
const deleteAll = require('./deleteAll');
const fetchMore = require('./fetchMore');
const DataStoreEX = require('./datastore_ex');
const NCMB = require('ncmb');

Query.prototype.average = average;
Query.prototype.sum = sum;
Query.prototype.each = each;
Query.prototype.updateAll = updateAll;
Query.prototype.deleteAll = deleteAll;
Query.prototype.fetchMore = fetchMore;

NCMB.prototype.DataStoreEX = DataStoreEX;
