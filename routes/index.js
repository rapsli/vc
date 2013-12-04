var BTCE     = require('btce');
var _ = require("underscore");

exports.all = function(req, res){
    var btce = new BTCE(config.btce_key, config.btce_sign);
    var pairs = {
        ltc_btc: undefined,
        btc_usd: undefined,
        ltc_usd: undefined,
        ftc_btc: undefined
    };

    var totalPairs = _.clone(_.size(pairs));
    var resultsReturned = 1;
    var results = [];
    for (var pair in pairs) {
        btce.ticker({ pair:pair}, (function(pair){
            console.log(pair)
            return function(err, data) {
                if (err) throw err;
                pairs[pair] = data.ticker;
                var finish = true;
                for (var key in pairs) {
                    if (pairs[key] === undefined) {
                        finish = false;
                        break;
                    }
                }
                if (finish) res.json(pairs);
            }
        })(pair));
    }
};

var returnResult = function(res) {
    
}