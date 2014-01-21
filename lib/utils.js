(function() {
  (function(factory) {
    if (typeof exports === "object") {
      return module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
      return define([], factory);
    }
  })(function() {
    var getAndCreate, getValue, isArray, objectUtils, setValue;
    isArray = function(object) {
      if (Array.isArray != null) {
        return Array.isArray(object);
      } else {
        return Object.prototype.toString.call(object) === "[object Array]";
      }
    };
    getValue = function(path, object, valueIfMissing) {
      var aPath, key, value;
      if (valueIfMissing == null) {
        valueIfMissing = void 0;
      }
      if (object == null) {
        return valueIfMissing;
      }
      aPath = path.split(".");
      value = object;
      key = aPath.shift();
      if (aPath.length === 0) {
        value = value[key];
        if (value == null) {
          value = valueIfMissing;
        }
      } else {
        while (value && key) {
          value = value[key];
          if (value == null) {
            value = valueIfMissing;
          }
          key = aPath.shift();
        }
        value = 0 === aPath.length ? value : valueIfMissing;
      }
      return value;
    };
    getAndCreate = function(path, object, defaultValue) {
      var aPath, key, value;
      if (object == null) {
        return;
      }
      aPath = path.split(".");
      value = object;
      key = aPath.shift();
      while (key) {
        if (value[key] == null) {
          value[key] = {};
        }
        if (aPath.length === 0) {
          if (defaultValue != null) {
            value[key] = defaultValue;
          }
        }
        value = value[key];
        key = aPath.shift();
      }
      return value;
    };
    setValue = function(path, object, value) {
      getAndCreate(path, object, value);
      return object;
    };
    return objectUtils = {
      isArray: isArray,
      getValue: getValue,
      getAndCreate: getAndCreate,
      setValue: setValue
    };
  });

}).call(this);
