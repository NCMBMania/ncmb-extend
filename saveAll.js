module.exports = function (ary) {
  return new Promise((res, rej) => {
    const save = (index, objs) => {
      if (ary.length === index) {
        return res(objs);
      }
      ary[index]
        .save()
        .then((obj) => {
          objs.push(obj);
          return save(index + 1, objs);
        })
        .catch((err) => {
          rej(err);
        });
    };
    save(0, []);
  });
};
