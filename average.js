module.exports = function(fields) {
  let me = this;
  return new Promise(function(res, rej) {
    me.fetchAll()
      .then(function(results) {
        if (!fields)
          return res(results);
        if (typeof fields === 'string') {
          fields = [fields];
        }
        let avarages = {};
        for (let i = 0; i < results.length; i++) {
          let row = results[i];
          for (let j = 0; j < fields.length; j++) {
            let field = fields[j];
            if (!avarages[field])
              avarages[field] = 0;
            if (typeof row[field] !== 'number')
              continue;
            avarages[field] += row[field];
          }
        }
        for (let field in avarages) {
          avarages[field] = parseInt(avarages[field] / results.length);
        }
        results.average = avarages;
        res(results);
      })
      .catch(function(err) {
        rej(results);
      })
  })
}
