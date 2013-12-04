var step = 5; // in secondes
var initial;
var activePair = 'ltc_btc';
var counter = 0;
var intervalCounter = undefined;

(function() {
    $(document).ready(function() {
        if ($.cookie('activePair') !== undefined) {
            activePair = $.cookie('activePair');
        }
        setTimer(1);
    });
    $( "#result" ).on( "click", "tr.select_pair", function() {
        activePair = $( this ).attr('pair');
        $.cookie("activePair", activePair);
    });
})();


var fetchData = function() {
    $.getJSON('/update', function(data) {
        var string = "<table class='table'>";
        string += "<thead><tr><th></th><th>Buy</th><th>Sell</th><th>High</th><th>Low</th></tr></thead>";
        for (var item in data) {
            string += renderItem(item, data[item]);
            if (item == activePair) {
                updateTitle(data[item]);
            }
        }
        string += "</table>";
        $("#result").html(string);
        if (intervalCounter != undefined) {
            clearInterval(intervalCounter);
        }
        counter = 0;
        intervalCounter = setInterval(updateCounter, 1000);
        setTimer(5000);
    })
    .fail(function(){
        setTimer(5000);
    });
    
}

var renderItem = function(pair, item) {
    var activeClass = "";
    if (pair == activePair) {
        activeClass = "danger";
    }
    result = "";
    result += "<tr class='select_pair "+activeClass+"' pair='"+pair+"'><td class='strong'>" + pair + "</td>";
    result += "<td>" + item.buy + "</td><td>" + item.sell + "</td>";
    result += "<td>" + item.high + "</td><td>" + item.low + "</td></tr>";
    return result;
}

var updateTitle = function(item) {
    $('title').html(item.buy + " / " + item.sell);
}

var setTimer = function(timer) {
    setTimeout(function() {fetchData();}, timer);
}

var updateCounter = function() {
    counter++;
    $('#counter').html(counter +"s");
}

