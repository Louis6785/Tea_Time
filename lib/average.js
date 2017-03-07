// average.js
// 取得陣列的平均值

module.exports = function average(array) {
    var sum = 0;
    for(var i = 0 ; i < array.length ; i++) {
        sum += array[i];
    }
    return sum / array.length;
}