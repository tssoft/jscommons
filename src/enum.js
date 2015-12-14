(function(global) {

    var EnumValue = (function () {

        function EnumValue(value, description, stringValue) {
            this.value = value || 0;
            this.stringValue = stringValue;
            this.description = description;
        }

        EnumValue.prototype.toString = function () {
            return this.stringValue;
        };

        EnumValue.prototype.isEqual = function (other, predicate) {
            if (!predicate) {
                predicate = isEqualsByValue;
            }
            return predicate(this, other);
        };

        function isEqualsByValue(enum1, enum2) {
            return enum1.value === enum2.value;
        }

        return EnumValue;

    }());

    global.Enum = (function () {

        function Enum(valuesHash) {
            var stringValues = _.keys(valuesHash);
            var internalEnum = Object.freeze(_.mapObject(valuesHash, function (item, key) {
                var stringValue = _.find(stringValues, function (str) { return str === key; });
                return new EnumValue(item.value, item.description, stringValue);
            }));
            _.extend(this, internalEnum);
        };

        _.extend(Enum.prototype, {
            fromValue: function (value) {
                var enumVal = _.findWhere(this, { value: value });
                if (!enumVal) {
                    throw new RangeError('Cannot find enum with value ' + value);
                }
                return enumVal;
            }
        });

        return Enum;
    }());

}(window));