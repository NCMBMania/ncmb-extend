module.exports = function main(returnFields) {
  const me = this;
  return new Promise((res, rej) => {
    me.fetchAll()
      .then((results) => {
        if (!returnFields) {
          return res(results);
        }
        const fields = typeof returnFields === 'string' ? [returnFields] : returnFields;
        const sums = {};
        let row;
        for (let i = 0; i < results.length; i += 1) {
          row = results[i];
          let field;
          for (let j = 0; j < fields.length; j += 1) {
            field = fields[j];
            if (!sums[field]) {
              sums[field] = 0;
            }
            if (typeof row[field] === 'number') {
              sums[field] += row[field];
            }
          }
        }
        const resultObj = results;
        resultObj.sum = sums;
        return res(resultObj);
      })
      .catch(err => rej(err));
  });
};
