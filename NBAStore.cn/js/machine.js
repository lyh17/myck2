function $(selector) {
    if (document.querySelectorAll(selector).length === 1) {
        return document.querySelectorAll(selector)[0];
    }
    return document.querySelectorAll(selector);
}

function getRandomColor() {
    var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var result = "#";
    for (var i = 0; i < 6; i++) {
        var index = Math.floor(Math.random() * 16)
        result = result + arr[index];
    }
    return result;
}

function bindEvent(list, event, fn) {
    for (var i = 0; i < list.length; i++) {
        list[i][event] = fn;
    }
}