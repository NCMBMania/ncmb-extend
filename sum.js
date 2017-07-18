module.exports = function(fields) {
  let me = this;
  return new Promise(function(res, rej) {
    me.fetchAll()
      .then(function (results) {
        if (!fields)
          return res(results);
        if (typeof fields === 'string') {
          fields = [fields];
        }
        let sums = {};
        for (let i = 0; i < results.length; i++) {
          let row = results[i];
          for (let j = 0; j < fields.length; j++) {
            let field = fields[j];
            if (!sums[field])
              sums[field] = 0;
            if (typeof row[field] !== 'number')
              continue;
            sums[field] += row[field];
          }
        }
        results.sum = sums;
        res(results);
      })
      .catch(function(err) {
        rej(err);
      })
  })
}
