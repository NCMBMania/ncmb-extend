const crypto = require('crypto');

module.exports = function (fields, calcs) {
  const Klass = this.ncmb.collections[this._className];
  const me = this;
  return new Promise((res, rej) => {
    me
      .fetchAll()
      .then((rows) => {
        const results = {};
        const counts = {};
        for (let i = 0; i < rows.length; i += 1) {
          const row = rows[i];
          const src = [];
          fields.map(field => row[field]).join(',');
          for (let j = 0; j < fields.length; j += 1) {
            const field = fields[j];
            src.push(row[field]);
          }
          const digest = crypto.createHash('md5').update(src.join(','), 'binary').digest('hex');
          if (!results[digest]) {
            results[digest] = {};
            counts[digest] = {};
          }

          for (let j = 0; j < fields.length; j += 1) {
            const field = fields[j];
            results[digest][field] = row[field];
          }

          for (let j = 0; j < calcs.length; j += 1) {
            const calc = calcs[j];
            if (!row[calc.field]) continue;
            const viewField = calc.as || calc.field;
            if (!results[digest][viewField]) {
              results[digest][viewField] = 0;
              counts[digest][viewField] = {
                total: 0,
                count: 0,
              };
            }
            counts[digest][viewField].count += 1;
            const value = row[calc.field];
            switch (calc.calc) {
              case 'sum':
                results[digest][viewField] += value;
                break;
              case 'average':
                counts[digest][viewField].total += value;
                const total = counts[digest][viewField].total;
                const count = counts[digest][viewField].count;
                results[digest][viewField] = total / count;
                break;
              default:
                break;
            }
          }
        }
        const ary = [];
        for (const digest in results) {
          ary.push(new Klass(results[digest]));
        }
        res(ary);
      });
  });
};
