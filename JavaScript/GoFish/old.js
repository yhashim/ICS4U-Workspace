const NUM_FACES = 13;
const PLAY = 1;
const NUM_CARDS = 5;
const WIN_PTS = 10;
var cards = {};

function init() {
    loadAllImgs();
    var gameDone = false;
    var numPlayers = doc.get() -1; // get from HTML pg how many wanted by player - 2, 3 or 4
    // set up player
    var player = {};
    player.name = "You"; // get from HTML player's name
    player.hand = [];
    player.numCards = 0;
    player.points = 0;
    for (var i = 0; i < NUM_CARDS; i++) {
        var card = getCard();
        player.hand[i] = card;
        player.numCards++;
    }
    // set up CPS
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
    for (var i = 0; i < numPlayers) {
        for (var i = 0; i < NUM_CARDS; i++) {
            var card = getCard();
            cps[i].hiddenHand[i] = card;
            cps[i].numCards++;
        }
        while (pairs(cps[i].hand) == true) {
            removePairs(cps[i].hand);
            cps[i].numCards -= 2;
            console.log("Pairs removed.");
            cps[i].hand = [null, null, null, null, null];
            for (var i = 0; i < cps[i].numCards; i++) {
                cps[i].hand[i] = "X";
            }
            console.log(cps[i].name + " " + cps[i].hand);
            player.points++;
            console.log("Points: " + player.points);
        }
    }
    play(player, cps, gameDone);
}

function play(player, cps, gameDone){
    while (!gameDone) {
        console.log(player.name + player.hand);
        while (pairs(player.hand) == true) {
            removePairs(player.hand);
            player.numCards -= 2;
            console.log("Pairs removed.");
            console.log("Hand: " + player.hand);
            player.points++;
            console.log("Points: " + player.points);
        }
        var turn = 0;
        while (turn == 0) {
            cpWant = getCPWant();
            numWant = getNumWant();
            if (contain(cpWant, numWant)) {
                for (var i = 0; i < numPlayers; i++) {
                    if (cps[i].name == cpWant) {

                    }
                }
            }
            turn++;
        }
        for (var i = turn-1; i<numPlayers; i++){
            if (cps[i].trait == bully){

            } else if (cps[i].trait == kookoo){

            } else if (cps[i].trait == IQinfinity){

            }
        }
    }
}

function loadAllImgs() {
    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/clubs" + i + ".png";
        cards['clubs' + i] = img;
    }
    img.src = "images/cards/clubs" + "J" + ".png";
    cards['clubsJ'] = img;
    img.src = "images/cards/clubs" + "Q" + ".png";
    cards['clubsQ'] = img;
    img.src = "images/cards/clubs" + "K" + ".png";
    cards['clubsK'] = img;
    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/diamonds" + i + ".png";
        cards['diamonds' + i] = img;
    }
    img.src = "images/cards/diamonds" + "J" + ".png";
    cards['diamondsJ'] = img;
    img.src = "images/cards/diamonds" + "Q" + ".png";
    cards['diamondsQ'] = img;
    img.src = "images/cards/diamonds" + "K" + ".png";
    cards['diamondsK'] = img;
    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/hearts" + i + ".png";
        cards['hearts' + i] = img;
    }
    img.src = "images/cards/hearts" + "J" + ".png";
    cards['heartsJ'] = img;
    img.src = "images/cards/hearts" + "Q" + ".png";
    cards['heartsQ'] = img;
    img.src = "images/cards/hearts" + "K" + ".png";
    cards['heartsK'] = img;
    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/spades" + i + ".png";
        cards['spades' + i] = img;
    }
    img.src = "images/cards/spades" + "J" + ".png";
    cards['spadesJ'] = img;
    img.src = "images/cards/spades" + "Q" + ".png";
    cards['spadesQ'] = img;
    img.src = "images/cards/spades" + "K" + ".png";
    cards['spadesK'] = img;
}

function getCard() {
    var x = Math.floor(Math.random() * NUM_FACES + 2);
    if (x <= 10) {
        return "" + x;
    } else if (x == 11) {
        return "J";
    } else if (x == 12) {
        return "Q";
    } else if (x == 13) {
        return "K";
    } else {
        return "A";
    }
}

function checkPairs(hand) {
    // check for pairs in a hand
    // return true if there is a pair
}

function removePairs(hand) {
    // delete a pair from the hand
}

function getNumWant() {
    // ask player what num they are searching for
}

function getCPWant() {
    // ask player which CP they want to ask
}

function contain(cpWant, numWant) {
    // check if CP# has the num the player asked for
    // return true if yes, false otherwise
}

function display(player, cps) {
    // display player's cards up on the bottom of the screen
    // display cps as just their #cards turned upside down
}