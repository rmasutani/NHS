'use strict';

/**
 * 数値の配列を上kとって、その要素の合計を返す関数
 */
function add(numbers) {
    let result = 0;
    for (const num of numbers) {
        result = result + num;
    } 
    return result;
}

module.exports = {
    add: add
};