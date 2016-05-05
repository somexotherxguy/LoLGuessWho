(function() {

	var guessCount = 0;
	var champOnePoints, champTwoPoints, champThreePoints;
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
                if(i==0){
                	champTwoPoints=masteryData[i].championPoints;
                	if(champTwoPoints.toString().length==5){
                		champTwoPoints=""+champTwoPoints.toString()[0]+""+champTwoPoints.toString()[1]+"."+champTwoPoints.toString()[2]+"k";	
                	}
                	else if(champTwoPoints.toString().length==4){
                		champTwoPoints=""+champTwoPoints.toString()[0]+"."+champTwoPoints.toString()[1]+"k";
                	}
                	else{
                		champTwoPoints=champTwoPoints.toString();
                	}
                }
                else if(i==1){
                	champOnePoints=masteryData[i].championPoints;
                	if(champOnePoints.toString().length==5){
                		champOnePoints=""+champOnePoints.toString()[0]+""+champOnePoints.toString()[1]+"."+champOnePoints.toString()[2]+"k";	
                	}
                	else if(champOnePoints.toString().length==4){
                		champOnePoints=""+champOnePoints.toString()[0]+"."+champOnePoints.toString()[1]+"k";
                	}
                	else{
                		champOnePoints=champOnePoints.toString();
                	}
                }
                else if(i==2){
                	champThreePoints=masteryData[i].championPoints;
                	if(champThreePoints.toString().length==5){
                		champThreePoints=""+champThreePoints.toString()[0]+""+champThreePoints.toString()[1]+"."+champThreePoints.toString()[2]+"k";	
                	}
                	else if(champThreePoints.toString().length==4){
                		champThreePoints=""+champThreePoints.toString()[0]+"."+champThreePoints.toString()[1]+"k";
                	}
                	else{
                		champThreePoints=champThreePoints.toString();
                	}
                }
                $.ajax({
                    url:  champUrl,
                    type: 'GET',
                    dataType: 'json',
                    async: false,
                    data: {
                    },
                    success: function (json) {
                        champData[i] = json;
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
    var winchecker = window.setInterval(function(){checkWin()}, 1000);
    
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
        var re = /(\b[a-z](?!\s))/g;
        var s = "fort collins, croton-on-hudson, harper's ferry, coeur d'alene, o'fallon"; 
    	var champGuessName = document.getElementById('champguess').value;
        champGuessName = champGuessName.replace(re, function(x){return x.toUpperCase();});
        document.getElementById('champguess').value = "";
    	console.log(champGuessName);
    	for(var x = 0; x < champData.length; x++){
            console.log(champData[x].name);
    		if(champGuessName==champData[x].name){
    			if(x == 0) {
    	            document.getElementById('champtwo').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
    	            document.getElementById('champtwopoints').style.visibility='visible';
    	            document.getElementById('champtwopoints').innerHTML=champTwoPoints;
    	            document.getElementById('champtwo').style.opacity = 1;
    	        } else if(x == 1) {
    	            document.getElementById('champone').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
    	            document.getElementById('champonepoints').style.visibility='visible';
    	            document.getElementById('champonepoints').innerHTML=champOnePoints;
    	            document.getElementById('champone').style.opacity = 1;
    	        } else if(x == 2) {
    	            document.getElementById('champthree').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
    	            document.getElementById('champthreepoints').style.visibility='visible';
    	            document.getElementById('champthreepoints').innerHTML=champThreePoints;
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
                document.getElementById('champtwopoints').style.visibility='visible';
	            document.getElementById('champtwopoints').innerHTML=champTwoPoints;
                document.getElementById('champtwo').style.opacity = 1;
            } else if(x == 1) {
                document.getElementById('champone').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                document.getElementById('champonepoints').style.visibility='visible';
	            document.getElementById('champonepoints').innerHTML=champOnePoints;
                document.getElementById('champone').style.opacity = 1;
            } else if(x == 2) {
                document.getElementById('champthree').src = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champData[x].key + "_0.jpg";
                document.getElementById('champthreepoints').style.visibility='visible';
	            document.getElementById('champthreepoints').innerHTML=champThreePoints;
                document.getElementById('champthree').style.opacity = 1;
            }
    	}
    }
    
    function checkWin(){
        var champimg1 = document.getElementById('champtwo');
        var champimg2 = document.getElementById('champone');
        var champimg3 = document.getElementById('champthree');
        if(champimg1.src.indexOf("images/questionmark.jpg") === -1){
            if(champimg2.src.indexOf("images/questionmark.jpg") === -1){
                if(champimg3.src.indexOf("images/questionmark.jpg") === -1){
                    if(timerRunning === true){
                        window.clearInterval(mytimer);
                        window.clearInterval(winchecker);
                        document.getElementById('sec').style.textShadow = "1px 1px 10px #00ff00";
                        document.getElementById('min').style.textShadow = "1px 1px 10px #00ff00";
                    } else {
                        window.clearInterval(winchecker);
                        document.getElementById('sec').style.textShadow = "1px 1px 10px #ff0000";
                        document.getElementById('min').style.textShadow = "1px 1px 10px #ff0000";
                    }
                }
            }
        }
    }
    
    function toTitleCase(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
})();