"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFragments = void 0;
var getFragments = function (text) {
    var smsLength = 140;
    if (text.length <= smsLength) {
        return [text];
    }
    var words = text.split(" ");
    var maxFragmentLength = words.length > 9999 ? 9999 : words.length;
    var fragments = words.reduce(function (acc, currentValue) {
        if (acc.length === 0) {
            acc.push(currentValue);
            return acc;
        }
        var suffix = "".concat(acc.length, "/").concat(maxFragmentLength);
        var currentFragment = acc[acc.length - 1];
        var potentialIncreasedFragment = "".concat(currentFragment, " ").concat(currentValue, " ").concat(suffix);
        if (potentialIncreasedFragment.length <= smsLength) {
            acc[acc.length - 1] = "".concat(currentFragment, " ").concat(currentValue);
        }
        else {
            acc.push(currentValue);
        }
        return acc;
    }, []);
    return fragments.map(function (fragment, index, acc) { return "".concat(fragment, " ").concat(index + 1, "/").concat(acc.length); });
};
exports.getFragments = getFragments;
