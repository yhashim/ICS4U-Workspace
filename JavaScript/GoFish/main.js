const NUM_SUITS = 4;
const NUM_FACES = 13;
const PLAY = 1;
const NUM_PLAYERS = 3;
const NUM_CARDS = 5;

function init() {
    var gameDone = false;
    while (!gameDone) {
        var player = {};
        player.name = "You";
        player.hand = [];
        player.numCards = 0;
        player.points = 0;
        var cps = [];
        for (var i = 0; i < NUM_PLAYERS; i++) {
            cps[i] = {};
            cps[i].name = "cp" + i;
            cps[i].hand = ["X", "X", "X", "X", "X"];
            cps[i].numCards = 5;
            cps[i].points = 0;
        }
        for (var i = 0; i < NUM_CARDS; i++) {
            var card = getCard();
            player.hand[i] = card;
            player.numCards++;
        }
        for (var i = 0; i < NUM_PLAYERS) {
            console.log(cps[i].name + " " + cps[i].hand);
        }
        console.log(player.name + player.hand);
        while (pairs(player.hand) == true) {
            removePairs(player.hand);
            player.numCards--;
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
              for (var i = 0; i<NUM_PLAYERS; i++){
                if (cps[i].name==cpWant){
                  
                }
              }
            }
        }
    }
}