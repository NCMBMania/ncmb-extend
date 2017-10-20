module.exports = (fields) => {
  const me = this;
  return new Promise((res, rej) => {
    me.fetchAll()
      .then((results) => {
        if (!fields) { return res(results); }
        if (typeof fields === 'string') {
          fields = [fields];
        }
        const sums = {};
        for (let i = 0; i < results.length; i++) {
          const row = results[i];
          for (let j = 0; j < fields.length; j++) {
            const field = fields[j];
            if (!sums[field]) { sums[field] = 0; }
            if (typeof row[field] !== 'number') { continue; }
            sums[field] += row[field];
          }
        }
        results.sum = sums;
        return res(results);
      })
      .catch((err) => {
        rej(results);
      });
  });
};
