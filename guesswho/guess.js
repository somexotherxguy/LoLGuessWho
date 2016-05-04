(function() {

	var guessCount = 0;
    var summoner = window.localStorage.getItem('summoner');
    
    //remove caps and spaces
    var summonerName=summoner.toLowerCase();
    summonerName=summonerName.replace(/\s+/g,'');

    var masteryData;
    var champData = [];
    
    var sumUrl = "http://lolguesswho-env.us-west-2.elasticbeanstalk.com/?summonername="+summonerName;
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
                        /*if(i == 0) {
                            document.getElementById('champtwo').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[i].key + "_0.jpg";
                        } else if(i == 1) {
                            document.getElementById('champone').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[i].key + "_0.jpg";
                        } else if(i == 2) {
                            document.getElementById('champthree').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[i].key + "_0.jpg";
                        }*/
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        
                    }
                });
            }
            document.getElementById('sumname').innerHTML = summoner;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            document.getElementById('sumname').innerHTML = 'SUMMONER DOES NOT EXIST. PLEASE ENTER A VALID SUMMONER';
            document.getElementById('sumname').style.color = 'red'; 
        }
    });

    // Timer is started here
    var min = 0;
    var sec = 0;
    var timerRunning = true;
    var mytimer = window.setInterval(function(){timer()}, 1000);
    
    //Set Interval to check for a win
    
    //Event Listeners are added here
    document.getElementById('summonersearchform').addEventListener('submit', function(event) { summonerSearchGuess(event); });
    document.getElementById('champguessform').addEventListener('submit', function(event) { championSearchGuess(event); });
    document.getElementById('giveup').addEventListener('click', function() { giveUp(); });
    
    //Searches for a new summoner
    function summonerSearchGuess(event){
        window.localStorage.setItem('summoner', document.getElementById('summonersearch').value)
        window.location.href = 'guess.html';
        event.preventDefault(); 
    }
    
    //Checks if the champion guess is correct
    function championSearchGuess(event){
    	var champGuessName = document.getElementById('champguess').value;
        document.getElementById('champguess').value = "";
    	console.log(champGuessName);
    	for(var x = 0; x < champData.length; x++){
            console.log(champData[x].key);
    		if(champGuessName==champData[x].key){
    			if(x == 0) {
                    document.getElementById('champtwo').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                    document.getElementById('champtwo').style.opacity = 1;
                } else if(x == 1) {
                    document.getElementById('champone').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                    document.getElementById('champone').style.opacity = 1;
                } else if(x == 2) {
                    document.getElementById('champthree').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                    document.getElementById('champthree').style.opacity = 1;
                }
    		}
    	}
        guessCount++;
        if(guessCount >= 999){
            guessCount = 0;
        }
        document.getElementById('numguess').innerHTML = guessCount;
        event.preventDefault(); 
    }
    
    function timer() {
        if(sec === 59){
            min++;
            if(min > 10){
                document.getElementById('min').innerHTML = min;
            } else {
                document.getElementById('min').innerHTML = "0" + min;
            }
            sec = 0;
            document.getElementById('sec').innerHTML = "0" + sec;
            if(min === 59){
                min = -1;
            }
        } else {
            sec++;
            if(sec >= 10){
                document.getElementById('sec').innerHTML = sec;
            } else {
                document.getElementById('sec').innerHTML = "0" + sec;
            }
        }
    }
    
    function giveUp(){
        window.clearInterval(mytimer);
        timerRunning = false;
        for(var x = 0; x < champData.length; x++){
            if(x == 0) {
                document.getElementById('champtwo').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                document.getElementById('champtwo').style.opacity = 1;
            } else if(x == 1) {
                document.getElementById('champone').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                document.getElementById('champone').style.opacity = 1;
            } else if(x == 2) {
                document.getElementById('champthree').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                document.getElementById('champthree').style.opacity = 1;
            }
    	}
    }
    
    function checkWin(){
        var champimg1 = document.getElementById('champtwo');
        var champimg2 = document.getElementById('champone');
        var champimg3 = document.getElementById('champthree');
        if(champimg1.src !== "images/questionmark.jpg"){
            if(champimg2.src !== "images/questionmark.jpg"){
                if(champimg3.src !== "images/questionmark.jpg"){
                    if(timerRunning === true){
                        window.clearInterval(mytimer);
                    }
                }
            }
        }
    }
})();