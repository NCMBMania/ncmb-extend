module.exports = function (ary) {
  return new Promise((res, rej) => {
    const me = this;
    const Klass = this.ncmb.collections[this._className];
    const save = (index, objs) => {
      if (ary.length === index) {
        return res(objs);
      }
      let item = ary[index];
      delete item.objectId;
      delete item.createDate;
      delete item.updateDate;
      item = new Klass(JSON.parse(JSON.stringify(item)));
      item
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
