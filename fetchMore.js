module.exports = function (fields) {
  const me = this;
  return new Promise((res, rej) => {
    me
      .count()
      .limit(1)
      .fetchAll()
      .then((data) => {
        const count = Math.ceil(data.count / 1000);
        const promises = [];
        for (let i = 0; i < count; i += 1) {
          promises.push(me.limit(1000).skip(i * 1000).fetchAll());
        }
        return Promise.all(promises);
      })
      .then((results) => {
        let data = [];
        for (let i = 0; i < results.length; i += 1) {
          data = data.concat(results[i]);
        }
        res(data);
      })
      .catch((errors) => {
        rej(errors);
      });
  });
};
