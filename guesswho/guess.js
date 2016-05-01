(function() {
    var summoner = window.localStorage.getItem('summoner');
    document.getElementById('sumname').innerHTML = summoner;

    var masteryData;
    var champData = [];
    
    var sumUrl = "http://lolguesswho-env.us-west-2.elasticbeanstalk.com/?summonername="+summoner;
    $.ajax({
        url:  sumUrl,
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function (json) {
            masteryData = json;
            for(var i = 0; i < masteryData.length; i++) {
                console.log(i);
                var champUrl = "http://lolguesswho-env.us-west-2.elasticbeanstalk.com/champion/?championid=" + masteryData[i].championId;
                $.ajax({
                    url:  champUrl,
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data: {
                    },
                    success: function (json) {
                        champData[i] = json;
                        if(i == 0) {
                            document.getElementById('champtwo').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[i].key + "_0.jpg";
                        } else if(i == 1) {
                            document.getElementById('champone').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[i].key + "_0.jpg";
                        } else if(i == 2) {
                            document.getElementById('champthree').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[i].key + "_0.jpg";
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        
                    }
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
        }
    });
    
    document.getElementById('summonersearchform').addEventListener('submit', function(event) { summonerSearchGuess(event); });
    
    function summonerSearchGuess(event){
        window.localStorage.setItem('summoner', document.getElementById('summonersearch').value)
        window.location.href = 'guess.html';
        event.preventDefault(); 
    }
})();