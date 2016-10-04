function load() {
    var url = $("#url")
        .val();
    var score = $("#score")
        .val();
    writeres("Error");
    if (url.match(/tbot\.xyz/)) {
        var param = url.replace(/^.*#/g, '').replace(/\?.*$/g, '');
        var data = "data=" + param + "&score=" + score;
        post("https://tbot.xyz/api/setScore", data, function(data) { writeres("OK"); }, function(data) { writeres("Error"); }, true);
        return;
    }
    if (url.match(/www\.gameeapp\.com/)) {
        param = url.replace(/#.*$/g, '').replace(/.*\//g, '');
        data =
            '{ "score": ' + score +
            ', "url": "' + param +
            '", "play_time": 100}';
        post("https://bots.gameeapp.com/set-web-score-qkfnsog26w7173c9pk7whg0iau7zwhdkfd7ft3tn", data, function(data) { writeres("OK"); }, function(data) { writeres("Error"); });
        return; 
    }
    writeres("I cannot use cheats on this game. You can add support to new games by submitting a pull request to <a href='https://github.com/danog/telegramcheats' target='_blank'>the TelegramCheats repo</a>");
}
function post(url, data, cb, failCb, proxy = false) {
    if (proxy) {
        url = "https://proxy.daniil.it/?url=" + encodeURIComponent(url);
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resp = xhr.responseText
            cb(JSON.parse(resp))
        } else if (failCb) {
            failCb()
        }
    }
    xhr.open("POST", url, true);
    xhr.send(data);
}
function writeres(cos) {
    $("#res").html(cos);
}
