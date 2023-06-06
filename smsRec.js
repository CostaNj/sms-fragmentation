"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFragments = void 0;
var smsLength = 140;
var getNextFragment = function (words, fragmentsLvl) {
    if (words.length === 0) {
        return {
            maxFragmentsLvl: fragmentsLvl - 1,
            fragments: []
        };
    }
    var currentFragment = '';
    while ("".concat(currentFragment.trim(), " ").concat(fragmentsLvl, "/").length <= smsLength && words.length !== 0) {
        var word = words.shift();
        currentFragment = "".concat(currentFragment, " ").concat(word).trim();
    }
    var _a = getNextFragment(words, fragmentsLvl + 1), maxFragmentsLvl = _a.maxFragmentsLvl, fragments = _a.fragments;
    var suffix = "".concat(fragmentsLvl, "/").concat(maxFragmentsLvl);
    var currentFragmentWithSuffix = "".concat(currentFragment, " ").concat(suffix);
    if (currentFragmentWithSuffix.length <= smsLength) {
        return {
            maxFragmentsLvl: maxFragmentsLvl,
            fragments: __spreadArray(["".concat(currentFragment, " ").concat(suffix)], fragments, true)
        };
    }
    else {
        var overLimitedWords_1 = [];
        var optimalFragments = __spreadArray([currentFragmentWithSuffix], fragments, true).reduce(function (acc, current) {
            var currentWords = current.split(' ');
            var currentSuffix = currentWords.pop();
            if (overLimitedWords_1.length !== 0) {
                currentWords.unshift.apply(currentWords, overLimitedWords_1);
                overLimitedWords_1.length = 0;
            }
            while ("".concat(currentWords.join(' '), " ").concat(currentSuffix).length > smsLength) {
                var lastDeletedWord = currentWords.pop();
                if (lastDeletedWord) {
                    overLimitedWords_1.unshift(lastDeletedWord);
                }
            }
            acc.push("".concat(currentWords.join(' '), " ").concat(currentSuffix));
            return acc;
        }, []);
        return {
            maxFragmentsLvl: maxFragmentsLvl,
            fragments: optimalFragments
        };
    }
};
var getFragments = function (text) {
    if (text.length <= smsLength) {
        return [text];
    }
    var words = text.split(' ');
    var fragments = getNextFragment(words, 1).fragments;
    return fragments;
};
exports.getFragments = getFragments;
