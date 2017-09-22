module.exports = function (obj, ary) {
  const me = this;
  const Klass = this.ncmb.collections[this._className];
  return new Promise((res, rej) => {
    me
      .fetchAll()
      .then((results) => {
        const promises = [];
        for (let i = 0; i < results.length; i++) {
          const item = results[i];
          for (const k in obj) {
            if (typeof obj[k] === 'function') {
              item.set(k, obj[k](item));
            } else {
              item.set(k, obj[k]);
            }
          }
          promises.push(item.update());
        }
        Promise
          .all(promises)
          .then((results) => {
            res(results);
          })
          .catch((err) => {
            rej(err);
          });
      });
  });
};
