const Query = require('ncmb/lib/query');
const average = require('./average');
const sum = require('./sum');
const each = require('./each');
const updateAll = require('./updateAll');
const deleteAll = require('./deleteAll');

Query.prototype.average = average;
Query.prototype.sum = sum;
Query.prototype.each = each;
Query.prototype.updateAll = updateAll;
Query.prototype.deleteAll = deleteAll;
