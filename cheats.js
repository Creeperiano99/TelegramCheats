function urlSafeDecode(urlencoded) {
    try {
        return decodeURIComponent(
            urlencoded);
    } catch (e) {
        return urlencoded;
    }
}

function urlParseHashParams(
    locationHash) {
    locationHash = locationHash.replace(
        /^#/, '');
    var params = {};
    if (!locationHash.length) {
        return params;
    }
    if (locationHash.indexOf('=') < 0 &&
        locationHash.indexOf('?') < 0) {
        params._path = urlSafeDecode(
            locationHash);
        return params;
    }
    var qIndex = locationHash.indexOf(
        '?');
    if (qIndex >= 0) {
        var pathParam = locationHash.substr(
            0, qIndex);
        params._path = urlSafeDecode(
            pathParam);
        locationHash = locationHash.substr(
            qIndex + 1);
    }
    var locationHashParams =
        locationHash.split('&');
    var i, param, paramName, paramValue;
    for (i = 0; i < locationHashParams.length; i++) {
        param = locationHashParams[i].split(
            '=');
        paramName = urlSafeDecode(param[
            0]);
        paramValue = param[1] === null ?
            null : urlSafeDecode(param[
                1]);
        params[paramName] = paramValue;
    }
    return params;
}

function getcode(locationHash) {
    return urlParseHashParams(locationHash.replace(/^.*#/, ''))._path;
}

function load() {
    var url = $("#url")
        .val();
    var score = $("#score")
        .val();
    writeres("Error");
    if (url.match(/tbot\.xyz/)) {
        var param = getcode(url);
        var data = "data=" + param +
            "&score=" + score;
        $.ajax({
            url: "https://tbot.xyz/api/setScore",
            data: data,
            type: 'POST',
            processData: false,
            async: false,
            success: function(data) {
                writeres(
                    "OK"
                );
            }
        });
        return;
    }
    if (url.match(/www\.gameeapp\.com/)) {
        param = url.replace(/#.*$/g, '').replace(/.*\//g, '');
        data =
            '{ "score": ' + score +
            ', "url": "' + param +
            '", "play_time": 100}';
        $.ajax({
            url: "https://bots.gameeapp.com/set-web-score-qkfnsog26w7173c9pk7whg0iau7zwhdkfd7ft3tn",
            data: data,
            type: 'POST',
            async: false,
            dataType: 'json',
            success: function(data) {
                if (JSON.stringify(data) == '{"status":"OK"}') {
                    writeres(
                        "OK"
                    );
                    return;
                }
            }
        });
        return;
    }
    writeres("I cannot use cheats on this game. You can add support to new games by submitting a pull request to <a href='https://github.com/danog/telegramcheats' target='_blank'>the TelegramCheats repo</a>");
}

function writeres(cos) {
    $("#res")
        .html(cos);
}
