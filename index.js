let Query     = require('ncmb/lib/query');
let a = require('./average');
Query.prototype.average = a;
