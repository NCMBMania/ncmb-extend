module.exports = function () {
  const me = this;
  let count = 0;
  return new Promise((res, rej) => {
    me
      .count()
      .fetchAll()
      .then((results) => {
        const promises = [];
        count = results.count;
        for (let i = 0; i < results.results.length; i++) {
          const item = results.results[i];
          promises.push(item.delete());
        }
        Promise
          .all(promises)
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
  });
};
