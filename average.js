module.exports = function main(returnField) {
  const me = this;
  return new Promise((res, rej) => {
    me.fetchAll()
      .then((results) => {
        if (!returnField) {
          return res(results);
        }
        const fields = typeof returnField === 'string' ? [returnField] : returnField;
        const avarages = {};
        let row;
        for (let i = 0; i < results.length; i += 1) {
          row = results[i];
          let field;
          for (let j = 0; j < fields.length; j += 1) {
            field = fields[j];
            if (!avarages[field]) {
              avarages[field] = 0;
            }
            if (typeof row[field] === 'number') {
              avarages[field] += row[field];
            }
          }
        }
        const keys = Object.keys(avarages);
        for (let i = 0; i < keys.length; i += 1) {
          avarages[i] = parseInt(avarages[i] / results.length, 10);
        }
        const returnObj = results;
        returnObj.average = avarages;
        return res(returnObj);
      })
      .catch(err => rej(err));
  });
};
