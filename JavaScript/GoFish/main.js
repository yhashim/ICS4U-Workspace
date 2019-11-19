const NUM_FACES = 13;
const PLAY = 1;
const NUM_CARDS = 5;
const WIN_PTS = 10;

var traits = []
    traits[0] = function IQ1000GOD(){
        // knows everyone's cards and who has what
        // always gets what they want
    };
    traits[1] = function BULLY(){
        // targets the player only
    };
    traits[2] = function VEGETABLE(){
        // only asks for cards they don't have themselves
        // asks whoever doesn't have the card they want for it
    };
var cards = [];
var CPUs = [];

function init() {
    loadAllImgs();
    var gameDone = false;
    var numPlayers = document.getElementByID(playersWanted)-1; // get from HTML pg how many wanted by player - 2, 3 or 4   
    for (var i = 0; i<numPlayers; i++){
        var trait = traits[Math.floor(Math.random() * traits.length)];
        CPUs[i] = new CPU(i, trait);
    } 
    play(player, cps, gameDone);
}

class Player {
    constructor(){
        this.name = "You";
        this.hand = new Hand(this);
        this.points = 0;
        this.target;
        this.cardNumWanted;
    }
    getPoints(){
        return this.points;
    }
    setTarget(number){
        this.target = number;
    }
    getTarget(){
        return target;
    }
    setCardWanted(number){
        this.cardNumWanted = number;
    }
    getCardWanted(){
        return cardNumWanted;
    }
    recieveCard(card){
        this.hand.addCard(card);
        if (this.hand.hasPairs()){
            checkPairs(this.hand);
        }
    }
    cardInHand(card){
        return this.hand.cardPresent(card);
    }
    giveCard(number){
        // put it in the CPU#'s hand
        this.hand.removeCard();
    }
    isHandEmpty(){
        return this.hand.size == 0;
    }
    refillHand(){
        if (this.hand.isHandEmpty()){
            for(var i = 0; i<NUM_CARDS; i++){
                drawCard();
            }
        }
    }
    drawCard(){
        // once player clicks on a card
        //while (//still no click){
            // wait
        //}
        this.hand.addCard(cards[Math.floor(Math.random()*cards.size)]);
        // player can pick up a card from the messed up pile
        // this is for when the player has to go fish
        // also for when player must refill hand
    }
}

class CPU {
    constructor(number, trait){
        this.name = "CPU" + number;
        this.trait = trait;
        this.hand = new Hand(this);
        this.points = 0;
        this.target;
        this.cardNumWanted;
    }
}

class Card {
    constructor(number, suit){
        this.number = number;   
        this.suit = suit;
        this.name = suit+number;
    }
    getCardName(){
        return this.name;
    }
    getCardNumber(){
        return this.number;
    }
    draw(x, y, visibility){
        // if visibility
            // image = image of card
        // if !visibility
            // image = image of back of card
        // print out card at coords on canvas
    }
}

class Hand {
    constructor(player){
        this.hand = [];
        this.size = 0;
        this.player = player;
    }
    cardPresent(card){
        // iterate through hand
        // return true if hand contains card
    }
    addCard(card){
        // iterate through
        // add card to the hand
        this.size++;
    }
    removeCard(card){
        // iterate through
        // remove card from hand
        this.size--;
    }
    hasPairs(){
        for (var i = 0; i<this.size; i++){
            for (var j = i+1; j<this.size; j++){
                if(hand[i]==hand[j]){
                    return true;
                }
            }
        }
        return false;
    }
    findMatches(){
        // iterate through
        // return matches and keep indeces of first and second match
        // delete them
        // add 1 point
        // repeat until no matches
        checkPairs(hand, hand.getPlayer);
    }
    draw(){
        // draw each individual card
        // iterate through
        // call each card's draw
    }
}

function checkPairs(hand, player){
    if (!hand.hasPairs){
        return;
    } else {
        for (var i = 0; i<hand.size; i++){
            for (var j = i+1; j<hand.size; j++){
                if (hand[i]==hand[j]){
                    var oldHand = hand;
                    var newHand = [];
                    hand[i] = null;
                    hand[j] = null;
                    var l = 0;
                    for (var k = 0; k<hand.size; k++){
                        if (hand[k] != null){
                            newHand[l] = hand[k];
                            l++;
                        }
                    }
                    hand = newHand;
                    hand.size -= 2;
                    player.points++;
                    checkPairs(hand, player);
                }
            }
        }
    }
}

function play(player, cps, gameDone){
    while (!gameDone) {
        player.go();
        for (var i = 0; i<numPlayers; i++){
            CPUs[i].go();
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