module.exports = (f) => {
  const me = this;
  return new Promise((res, rej) => {
    me.fetchAll()
      .then((results) => {
        for (let i = 0; i < results.length; i++) {
          const row = results[i];
          const addOptions = f(row);
          for (let key in addOptions) {
            row[key] = addOptions[key];
          }
          results[i] = row;
        }
        res(results);
      })
      .catch((err) => {
        rej(err);
      });
  });
};
