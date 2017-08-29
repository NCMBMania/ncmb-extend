# NCMB Extend

ニフティクラウド mobile backendのJavaScript SDKを拡張するライブラリです。

## Install

Using npm

```
$ npm install ncmb-extend
```

## Usage

### average

取得したデータの平均値を計算します。

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

### each

各行ごとにデータを取得します。

```
AA7
  .calc((obj) => {
    return { plus: obj.Integer + obj.Integer2 };
  })
  .then((results) => {
    console.log(results);
  });
```

## LICENSE

MIT License.

[mBaaSでサーバー開発不要！ | ニフティクラウド mobile backend](http://mb.cloud.nifty.com/)
