(function() {
    document.getElementById('summonersearchform').addEventListener('submit', function(event) { summoner_search(event); });
    
    function summoner_search(event){
        event.preventDefault();
        console.log('i got called');
    }
})();