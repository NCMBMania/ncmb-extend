let Query     = require('ncmb/lib/query');
let average = require('./average');
let sum = require('./sum');
Query.prototype.average = average;
Query.prototype.sum     = sum;
