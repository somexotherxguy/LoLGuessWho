(function() {
    var summoner = window.localStorage.getItem('summoner');
    document.getElementById('sumname').innerHTML = summoner;

    var apiurl = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + summoner + '?api_key=3f6239b0-97b4-42fa-8d52-63aabb176184';
    /*$.ajax({
        url:  apiurl,
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function (json) {
            console.log('hell yea it worked');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });*/
})();