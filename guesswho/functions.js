(function() {
    document.getElementById('summonersearchform').addEventListener('submit', function(event) { summoner_search(event); });
    
    function summoner_search(event){
        window.localStorage.setItem('summoner', document.getElementById('summonersearch').value)
        window.location.href = 'guess.html';
        event.preventDefault();
        //document.getElementById('bgimg').src = "images/bg-howling-abyss.jpg"
        //document.getElementById('transbox').style.visibility = 'hidden';
        //document.getElementById('summonersearch').style.visibility = 'hidden';

        //document.getElementById('searchbartwo').style.visibility = 'visible';
    }
})();