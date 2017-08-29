module.exports = function(f) {
  let me = this;
  return new Promise(function(res, rej) {
    me.fetchAll()
      .then(function(results) {
        for (let i = 0; i < results.length; i++) {
					let row = results[i];
					const addOptions = f(row);
					for (let key in addOptions) {
						row[key] = addOptions[key];
					}
					results[i] = row;
        }
        res(results);
      })
      .catch(function(err) {
        rej(err);
      })
  })
}
