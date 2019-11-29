const NUM_FACES = 13;
const PLAY = 1;
const NUM_CARDS = 5;
const WIN_PTS = 10;
var SUITS = ["hearts", "clubs", "diamonds", "spades"];


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
var turnStart;

var player;

window.onload = function init() {
    loadAllImgs();
    canvas = document.getElementById("myCanvas"); 
    ctx = canvas.getContext("2d");
    ctx.fillStyle = '#870000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    turnStart = false;
}

function begin(num) {
    console.log("began");
    document.getElementById("title").style.display = 'none';

    document.getElementById("b1").style.display = 'none';
    document.getElementById("b2").style.display = 'none';
    document.getElementById("b3").style.display = 'none';

    document.getElementById("num").style.display = 'block';
    document.getElementById("target").style.display = 'block';

    document.getElementById("text1").style.display = 'block';
    document.getElementById("text2").style.display = 'block';
    document.getElementById("text3").style.display = 'block';

    document.getElementById("ask").style.display = 'block';

    player = new Player();
    for (var i = 0; i<NUM_CARDS; i++){
        var suit = SUITS[Math.trunc(Math.random()*SUITS.length)];
        var randomCard = new Card(Math.floor(Math.random()*13) + 1, suit);
        player.recieveCard(randomCard);
    }
    numPlayers = num-1; // get from HTML pg how many wanted by player - 2, 3 or 4   
    for (var i = 0; i<numPlayers; i++){
        var trait = traits[Math.floor(Math.random()*traits.length)];
        CPUs[i] = new CPU(i, trait);
        var suit = SUITS[Math.trunc(Math.random()*SUITS.length)];
        for (var j = 0; j<NUM_CARDS; j++){
            var randomCard = new Card(Math.floor(Math.random()*13) + 1, suit);
            CPUs[i].recieveCard(randomCard);
        }
    } 
    console.log("about to draw");
    draw();
    console.log("about to play with player")
    play(player);
}

function draw() {
    // if game over
        // draw game over in center
        // return;
    // else
        // do drawy stuff
            // draw player at bottom of screen
            // draw cpus
                // draw them based on num cpus
    var i = 10;
    var all = player.hand.hand;
    for (var c of all){
        var name = c.name;
        var img = cards[c.name];
       ctx.drawImage(img, 540+i, 500, img.width/4, img.height/4);   
       i += 25; 
    }
    for (var j = 0; j<CPUs.length; j++){
        all = CPUs[j].hand.hand;
        var x;
        if (j == 0){
            x = 20;
        } else if (j == 1){
            x = 295;
        } else {
            x = 550;
        }
        for (var c of all){
           var card = all[c];
           // ctx.drawImage(cards[c.name], x+i, 75, cards[c.name].width/4, cards[c.name].height/4);
           ctx.drawImage(cards['back'], x+i, 75, cards['back'].width/4, cards['back'].height/4)   
           i += 25; 
        } 
    }  
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
    getHand(){
        return this.hand;
    }
    getPoints(){
        return this.points;
    }
    setCardAndTarg(){
        this.target = document.getElementById("target");
        this.cardNumWanted = document.getElementById("num");
        play(this);
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
    giveCard(card){
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
        this.hand.addCard(cards[Math.floor(Math.random()*cards.length)]);
        // player can pick up a card from the messed up pile
        // this is for when the player has to go fish
        // also for when player must refill hand
    }
}

function setCardAndTarg(){
    player.setCardAndTarg();
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
    getHand(){
        return this.hand;
    }
    getPoints(){
        return this.points;
    }
    setTarget(number){
        if (this.trait == VEGETABLE){
            if (!player.cardInHand(card)){
                this.target = 0;
            } else {
                for (var i = 0; i<CPUs.length; i++){
                    if (i == this.CPU.number){
                        if (!CPUs[i].cardInHand(card)){
                            this.target = i;
                        }
                    }
                }
            }
        } else if (this.trait == BULLY){
            this.target = 0; // player
        } else if (this.trait == IQ1000GOD){
            if (player.cardInHand(card)){
                this.target = 0;
            } else {
                for (var i = 0; i<CPUs.length; i++){
                    if (i == this.CPU.number){
                        if (CPUs[i].cardInHand(card)){
                            this.target = i;
                        }
                    }
                }
            }
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
        this.hand.addCard(cards[Math.floor(Math.random()*cards.length)]);
        // player can pick up a card from the messed up pile
        // this is for when the player has to go fish
        // also for when player must refill hand
    }
}

class Card {
    constructor(number, suit){
        this.number = number;   
        this.suit = suit;
    }
    get name(){
        return "" + this.suit + this.number;
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
        for (var i = 0; i<this.size; i++){
            if (this.hand[i].getCardNumber()==card.getCardNumber()){
                return true;
            }
        }
    }
    addCard(card){
        this.hand[this.size] = card;
        this.size++;
    }
    removeCard(card){
        var index = 0;
        for (var i = 0; i<this.size; i++){
            if (this.hand[i].getCardNumber()==card.getCardNumber() && this.hand[i].getCardSuit()==card.getCardSuit()){
                index = i; 
                break;
            }
        }
        for (var i = index+1; i<this.size; i++){
            this.hand[i-1]=this.hand[i];
        }
        this.size--;
    }
    hasPairs(){
        for (var i = 0; i<this.hand.size; i++){
            for (var j = i+1; j<this.hand.size; j++){
                if(this.hand[i].getCardNumber()==this.hand[j].getCardNumber()){
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

function play(player){
    var winner = checkGame();
    while (!gameDone) {
        document.getElementById("ask").style.display = 'block';
        go(player);
        checkGame();
        for (var i = 0; i<numPlayers; i++){
            document.getElementById("ask").style.display = 'none';
            go(CPUs[i]);
            checkGame();
        }
    }
    console.log(winner);
}

function checkGame(){
    if (player.getPoints()>=10){
        gameDone = true;
        return player;
    } 
    for (var i = 0; i<CPUs.length; i++){
        if (CPUs[i].getPoints()>=10){
            gameDone = true;
            return CPU[i];
        }
    }
    //checkGame();
}

function go(person){
    var numWant = person.cardNumWanted;
    var target;
    if (person.target == 0){
        target = person;
    } else {
        target = CPUs[person.target-1];
    }
    if (target.hand.cardPresent(numWant)){
            // ADD GETHAND TO CPU AND PLAYER CLASS
        // give stuff
        turnStart = false;
        return;
    } else {
        // go fish stuff
        turnStart = false;
        return;
    }
}

function loadAllImgs() {
    backgroundImg = new Image();
    backgroundImg.src = "images/bg2.png";

    var back = new Image();
    back.src = "images/cards/back.png";
    cards['back'] = back;

    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/clubs" + i + ".png";
        cards['clubs' + i] = img;
    }
    img.src = "images/cards/clubs" + "J" + ".png";
    cards['clubs11'] = img;
    img.src = "images/cards/clubs" + "Q" + ".png";
    cards['clubs12'] = img;
    img.src = "images/cards/clubs" + "K" + ".png";
    cards['clubs13'] = img;

    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/diamonds" + i + ".png";
        cards['diamonds' + i] = img;
    }
    img.src = "images/cards/diamonds" + "J" + ".png";
    cards['diamonds11'] = img;
    img.src = "images/cards/diamonds" + "Q" + ".png";
    cards['diamonds12'] = img;
    img.src = "images/cards/diamonds" + "K" + ".png";
    cards['diamonds13'] = img;

    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/hearts" + i + ".png";
        cards['hearts' + i] = img;
    }
    img.src = "images/cards/hearts" + "J" + ".png";
    cards['hearts11'] = img;
    img.src = "images/cards/hearts" + "Q" + ".png";
    cards['hearts12'] = img;
    img.src = "images/cards/hearts" + "K" + ".png";
    cards['hearts13'] = img;

    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/spades" + i + ".png";
        cards['spades' + i] = img;
    }
    img.src = "images/cards/spades" + "J" + ".png";
    cards['spades11'] = img;
    img.src = "images/cards/spades" + "Q" + ".png";
    cards['spades12'] = img;
    img.src = "images/cards/spades" + "K" + ".png";
    cards['spades13'] = img;

    // ACES - lol forgot them
    img.src = "images/cards/clubs" + "A" + ".png";
    cards['clubs1'] = img;
    img.src = "images/cards/hearts" + "A" + ".png";
    cards['hearts1'] = img;
    img.src = "images/cards/diamonds" + "A" + ".png";
    cards['diamonds1'] = img;
    img.src = "images/cards/spades" + "A" + ".png";
    cards['spades1'] = img;
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