var step = 5; // in secondes
var initial;


(function() {
    $(document).ready(function() {
        setTimer();
    });
})();


var fetchData = function() {
    $.getJSON('/update', function(data) {
        console.log(data);
        var string = "<table class='table'>";
        for (var item in data) {
            console.log(data[item])
            console.log(item);
            string += renderItem(item, data[item]);
        }
        string += "</table>";
        $("#result").html(string);
        setTimer();
    });
    
}

var renderItem = function(pair, item) {
    result = "";
    result += "<tr><td class='strong'>" + pair + "</td>";
    result += "<td>" + item.sell + "</td><td>" + item.buy + "</td>";
    result += "<td>" + item.high + "</td><td>" + item.low + "</td></tr>";
    return result;
}

var setTimer = function() {
    setTimeout(function() {fetchData();}, 2000);
}

