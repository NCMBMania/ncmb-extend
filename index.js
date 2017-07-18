const Query = require('ncmb/lib/query');
const average = require('./average');
const sum = require('./sum');

Query.prototype.average = average;
Query.prototype.sum = sum;
