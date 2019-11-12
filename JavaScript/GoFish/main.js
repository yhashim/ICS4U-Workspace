// const NUM_SUITS = 4;
const NUM_FACES = 13;
const PLAY = 1;
const NUM_CARDS = 5;

function init() {
    loadAllImgs();
    var gameDone = false;
    var numPlayers = 0; // get from HTML pg how many wanted by player
    while (!gameDone) {
        var player = {};
        player.name = "You"; // get from HTML player's name
        player.hand = [];
        player.numCards = 0;
        player.points = 0;
        var cps = [];
        for (var i = 0; i < numPlayers; i++) {
            cps[i] = {};
            cps[i].name = "cp" + i;
            cps[i].hand = ["X", "X", "X", "X", "X"];
            cps[i].hiddenHand = [];
            cps[i].numCards = 0;
            cps[i].points = 0;
            cps[i].trait = getRandomTrait();
        }
        for (var i = 0; i < NUM_CARDS; i++) {
            var card = getCard();
            player.hand[i] = card;
            player.numCards++;
        }
        for (var i = 0; i < numPlayers) {
            for (var i = 0; i < NUM_CARDS; i++) {
                var card = getCard();
                cps[i].hiddenHand[i] = card;
                cps[i].numCards++;
            }
            while (pairs(cps[i].hand) == true) {
                removePairs(cps[i].hand);
                cps[i].numCards-=2;
                console.log("Pairs removed.");
                cps[i].hand = [null, null, null, null, null];
                for (var i = 0; i<cps[i].numCards; i++){
                    cps[i].hand[i] = "X";
                }
                console.log(cps[i].name + " " + cps[i].hand);
                player.points++;
                console.log("Points: " + player.points);
            }
        }
        console.log(player.name + player.hand);
        while (pairs(player.hand) == true) {
            removePairs(player.hand);
            player.numCards-=2;
            console.log("Pairs removed.");
            console.log("Hand: " + player.hand);
            player.points++;
            console.log("Points: " + player.points);
        }
        var playerDoneRound = false;
        while (!playerDoneRound) {
            numWant = getNumWant();
            cpWant = getCPWant();
            if (contain(cpWant, numWant)) {
              for (var i = 0; i<numPlayers; i++){
                if (cps[i].name==cpWant){
                  
                }
              }
            }
        }
    }
}

function loadAllImgs(){

}

function getCard(){
    var x  = Math.floor(Math.radnom() * NUM_FACES + 2);
    if (x <= 10){
        return "" + x;
    } else if (x == 11){
        return "J";
    } else if (x == 12){
        return "Q";
    } else if (x == 13){
        return "K";
    } else {
        return "A";
    }
}

function checkPairs(hand){

}

function removePairs(hand){

}

function getNumWant(){

}

function getCPWant(){

}

function contain(cpWant, numWant){

}