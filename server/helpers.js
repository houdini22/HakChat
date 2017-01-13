var getCurrentDate = function () {
    var now = new Date();
    var year = "" + now.getFullYear();
    var month = "" + (now.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    var day = "" + now.getDate();
    if (day.length == 1) {
        day = "0" + day;
    }
    var hour = "" + now.getHours();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    var minute = "" + now.getMinutes();
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    var second = "" + now.getSeconds();
    if (second.length == 1) {
        second = "0" + second;
    }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
};

var getCurrentHour = function () {
    var now = new Date();
    var hour = "" + now.getHours();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    var minute = "" + now.getMinutes();
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    var second = "" + now.getSeconds();
    if (second.length == 1) {
        second = "0" + second;
    }
    return hour + ":" + minute + ":" + second;
};

var log = function () {
    let args = Array.prototype.slice.call(arguments);
    args.unshift('[' + getCurrentDate() + ']');
    console.log.apply(null, args);
};

module.exports = {
    getCurrentDate,
    getCurrentHour,
    log
};