# NCMB Extend

ニフティクラウド mobile backendのJavaScript SDKを拡張するライブラリです。

## Usage

```
require('ncmb-extend');
let NCMB = require('ncmb');

let ncmb = new NCMB(YOUR_APPLICATION_KEY, YOUR_CLIENT_KEY);

let Item = ncmb.DataStore('Item');
Item
  .average(['Integer', 'Integer2'])
  .then(function(results) {
    console.log(results.average);
    // -> { Integer: 142, Integer2: 31 }
  })
```

## LICENSE

MIT License.

[mBaaSでサーバー開発不要！ | ニフティクラウド mobile backend](http://mb.cloud.nifty.com/)
