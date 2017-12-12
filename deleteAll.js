module.exports = function () {
  const me = this;
  let count = 0;
  return new Promise((res, rej) => {
    me
      .count()
      .limit(1)
      .fetchAll()
      .then((results) => {
        const promises = [];
        count = results.count;
        if (count === 0) {
          return res();
        }
        for (let i = 0; i < results.length; i++) {
          const item = results[i];
          if (item === 'count') {
            continue;
          }
          promises.push(item.delete());
        }
        return Promise
          .all(promises)
      })
      .then((deleteData) => {
        if (count > 1000) {
          me.deleteAll();
        } else {
          res();
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};
