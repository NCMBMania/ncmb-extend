const Query = require('ncmb/lib/query');
const average = require('./average');
const sum = require('./sum');
const each = require('./each');

Query.prototype.average = average;
Query.prototype.sum = sum;
Query.prototype.each = each;
