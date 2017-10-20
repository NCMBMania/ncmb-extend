const DataStore = require('ncmb/lib/datastore');
const Operation = require('ncmb/lib/operation');

module.exports = (function () {
  const reserved = [
    'save', 'update', 'delete', 'className'];
  const isReserved = function (key) {
    return reserved.indexOf(key) > -1;
  };
  const ncmb = this;

  function DataStoreEX(name, options) {
    const OriginalClass = this.DataStore(name);
    const Data = (function () {
      let originalClass;
      function Data(attrs) {
        if (options.defaults) {
          Object.keys(options.defaults).forEach((key) => {
            if (!attrs[key]) {
              attrs[key] = options.defaults[key];
            }
          });
        }
        originalClass = new OriginalClass(attrs);
      }

      Object.keys(Operation.prototype).forEach((attr) => {
        if (typeof Operation.prototype[attr] === 'function') {
          Data.prototype[attr] = function () {
            const operation = new Operation(reserved);
            operation[attr].apply(originalClass, [].slice.apply(arguments));
            return this;
          };
        }
      });

      const validation = () => {
        const errors = {};
        if (options.validates) {
          Object.keys(options.validates).forEach((key) => {
            const validate = options.validates[key];
            const value = originalClass[key];
            if (validate.required && typeof value === 'undefined') {
              if (!errors[key]) errors[key] = [];
              errors[key].push('is required.');
            }
            switch (validate.type) {
              case 'number':
                if (typeof value !== 'number') {
                  if (!errors[key]) errors[key] = [];
                  errors[key].push('is not number');
                }
                if (validate.min && value < validate.min) {
                  if (!errors[key]) errors[key] = [];
                  errors[key].push(`smaller than ${validate.min}`);
                }
                if (validate.max && value > validate.max) {
                  if (!errors[key]) errors[key] = [];
                  errors[key].push(`bigger than ${validate.max}`);
                }
                break;
              case 'string':
                if (typeof value !== 'string') {
                  if (!errors[key]) errors[key] = [];
                  errors[key].push('is not string');
                }
                if (validate.min && value.length < validate.min) {
                  if (!errors[key]) errors[key] = [];
                  errors[key].push(`smaller than ${validate.min}`);
                }
                if (validate.max && value.length > validate.max) {
                  if (!errors[key]) errors[key] = [];
                  errors[key].push(`bigger than ${validate.max}`);
                }
                break;
              default:
            }
          });
        }
        return errors;
      };

      Data.prototype.save = function (callback) {
        return new Promise((res, rej) => {
          const errors = validation();
          if (Object.keys(errors).length > 0) {
            return rej(errors);
          }
          return originalClass
              .save()
              .then(results => res(results))
              .catch(err => rej(err));
        });
      };

      Data.prototype.update = function (callback) {
        return new Promise((res, rej) => {
          const errors = validation();
          if (Object.keys(errors).length > 0) {
            return rej(errors);
          }
          return originalClass
              .update()
              .then(results => res(results))
              .catch(err => rej(err));
        });
      };

      Data.prototype.delete = function (callback) {
        return originalClass.delete();
      };

      return Data;
    }());
    return Data;
  }
  return DataStoreEX;
}(this));
