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
var numPlayers;

var canvas, ctx;
var backgroundImg;

var turn = 0;

var gameDone = false;
var turnStart = false;


window.onload = function init() {
    loadAllImgs();
    canvas = document.getElementById("myCanvas"); 
    ctx = canvas.getContext("2d");
    ctx.fillStyle = '#870000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log('test');
}

function begin(num) {
    document.getElementById("title").style.display = 'none';
    document.getElementById("b1").style.display = 'none';
    document.getElementById("b2").style.display = 'none';
    document.getElementById("b3").style.display = 'none';
    document.getElementById("num").style.display = 'block';
    document.getElementById("target").style.display = 'block';
    document.getElementById("text1").style.display = 'block';
    document.getElementById("text2").style.display = 'block';
    document.getElementById("ask").style.display = 'block';

    numPlayers = num-1; // get from HTML pg how many wanted by player - 2, 3 or 4   
    for (var i = 0; i<numPlayers; i++){
        var trait = traits[Math.floor(Math.random()*traits.length)];
        CPUs[i] = new CPU(i, trait);
    } 
    draw();
    play(player, cps);
}

function draw() {
    // if game oveer
        // return;
    // else
    // draw player
    var i = 10;
    for (var c in player.getHand()){
       card = cards[c];
       ctx.drawImage(card, 5+i, 50, card.width/4, card.height/4);   
       i += 25; 
    }
    for (var i = 0; i<CPUs.size; i++){
       for (var c in CPUs[i].getHand()){
           card = cards[c];
           ctx.drawImage(card, 5+i, 50, card.width/4, card.height/4);   
           i += 25; 
        } 
    }
        // do drawy stuff
        // draw player at bottom of screen
        // draw cpus
            // draw them based on num cpus
    window.requestAnimationFrame(draw);
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
    setCardAndTarg(){
        this.target = document.getElementById("target");
        this.cardNumWanted = document.getElementById("num");
        turnStart = true;
    }
    getTarget(){
        return this.target;
    }
    getCardWanted(){
        return this.cardNumWanted;
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
        this.number = number;
        this.name = "CPU" + number;
        this.trait = trait;
        this.hand = new Hand(this);
        this.points = 0;
        this.target;
        this.cardNumWanted;
    }
    getPoints(){
        return this.points;
    }
    setTarget(number){
        if (this.trait == VEGETABLE){
            if (!player.cardInHand(card)){
                // ask player
            } else {
                for (var i = 0; i<CPUs.length; i++){
                    if (!i == this.CPU.number){
                        if (!CPUs[i].cardInHand(card)){
                            // ask them
                        }
                    }
                }
            }
        } else if (this.trait == BULLY){
            this.target = 0; // player
        } else if (this.trait == IQ1000GOD){

        }
    }
    getTarget(){
        return this.target;
    }
    setCardWanted(number){
        if (this.trait == VEGETABLE){
            
        } else if (this.trait == BULLY){
            this.cardNumWanted = this.hand[Math.floor(Math.random()*this.hand.size)].getCardNumber();
        } else if (this.trait == IQ1000GOD){

        }
    }
    getCardWanted(){
        return this.cardNumWanted;
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

function play(player, cps){
    var winner = checkGame();
    while (!gameDone) {
        document.getElementById("ask").style.display = 'block';
        while (!turnStart){
            // wait until true
        }
        go(player);
        for (var i = 0; i<numPlayers; i++){
            document.getElementById("ask").style.display = 'none';
            go(CPUs[i]);
        }
    }
    console.log(winner);
}

function checkGame(){
    if (player.getPoints()>=10){
        gameDone = true;
        return player;
    } 
    for (var i = 0; i<CPUs.size; i++){
        if (CPUs[i].getPoints()>=10){
            gameDone = true;
            return CPU[i];
        }
    }
    checkGame();
}

function go(person){
    int numWant = person.getCardWanted();
    var target = person.getTarget();
    if (target.getHand.hasCard(numWant)){
            // ADD GETHAND TO CPU AND PLAYER CLASS
        // give stuff
        return;
    } else {
        // go fish stuff
        return;
    }
}

function loadAllImgs() {
    backgroundImg = new Image();
    backgroundImg.src = "images/bg2.png";
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