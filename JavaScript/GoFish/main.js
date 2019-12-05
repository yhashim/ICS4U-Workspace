const NUM_FACES = 13;
const PLAY = 1;
const NUM_CARDS = 5;
const WIN_PTS = 10;
var SUITS = ["hearts", "clubs", "diamonds", "spades"];

var traits = []
traits[0] = "IQ1000GOD";
traits[1] = "BULLY";
traits[2] = "veggie"; 
// asks whoever doesn't have the card they want for it


var cards = [];
var CPUs = [];
var numPlayers;

var canvas, ctx;
var backgroundImg;

var gameDone = false;

var player;
var targetElem;

var status;

window.onload = function init() {
    loadAllImgs();
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = '#870000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function begin(num) {
    numPlayers = num - 1;
    document.getElementById("title").style.display = 'none';
    document.getElementById("b1").style.display = 'none';
    document.getElementById("b2").style.display = 'none';
    document.getElementById("b3").style.display = 'none';
    document.getElementById("num").style.display = 'block';
    if (numPlayers == 1) {
        document.getElementById("target1").style.display = 'block';
        targetElem = 1;
    } else if (numPlayers == 2) {
        document.getElementById("target2").style.display = 'block';
        targetElem = 2;
    } else {
        document.getElementById("target3").style.display = 'block';
        targetElem = 3;
    }
    document.getElementById("text1").style.display = 'block';
    document.getElementById("text2").style.display = 'block';
    document.getElementById("ask").style.display = 'block';
    status = "Game initialized";
    player = new Player();
    for (var i = 0; i < NUM_CARDS; i++) {
        var suit = SUITS[Math.floor(Math.random() * SUITS.length)];
        var randomCard = new Card(Math.floor(Math.random() * 13) + 1, suit);
        player.recieveCard(randomCard);
    }
    checkPairs(player.hand.hand, player);
    for (var i = 0; i < numPlayers; i++) {
        var trait = traits[Math.floor(Math.random() * traits.length)];
        CPUs[i] = new CPU(i, trait);
        for (var j = 0; j < NUM_CARDS; j++) {
            var suit = SUITS[Math.floor(Math.random() * SUITS.length)];
            var randomCard = new Card(Math.floor(Math.random() * 13) + 1, suit);
            CPUs[i].recieveCard(randomCard);
        }
        checkPairs(CPUs[i].hand.hand, CPUs[i]);
    }
    draw();
}

class Player {
    constructor() {
        this.name = "You";
        this.hand = new Hand();
        this.points = 0;
        this.target;
        this.cardNumWanted;
    }
    getHand() {
        return this.hand;
    }
    getPoints() {
        return this.points;
    }
    setCardAndTarg() {
        this.target = document.getElementById("target" + targetElem).value;
        this.cardNumWanted = document.getElementById("num").value;
        status = "";
        play(this);
    }
    getTarget() {
        return this.target;
    }
    getCardWanted() {
        return this.cardNumWanted;
    }
    recieveCard(card) {
        this.hand.addCard(card);
    }
    hasPairs() {
        if (this.hand.length == 1) {
            this.hand.hasPairs = false;
            return false;
        } else if (this.hand.length == 2) {
            if (this.hand.hand[0].number == this.hand.hand[1].number) {
                this.hand.hasPairs = true;
                return true;
            }
        } else {
            for (var i = 0; i < this.hand.length - 1; i++) {
                for (var j = (i + 1); j < this.hand.length; j++) {
                    if (this.hand.hand[i].number == this.hand.hand[j].number) {
                        this.hand.hasPairs = true;
                        return true;
                    }
                }
            }
        }
        this.hand.hasPairs = false;
        return false;
    }
    cardInHand(card) {
        return this.hand.cardPresent(card);
    }
    giveCard(card) {
        return this.hand.removeCard(card);
    }
    isHandEmpty() {
        return this.hand.length == 0;
    }
    refillHand() {
        if (this.hand.length == 0) {
            for (var i = 0; i < NUM_CARDS; i++) {
                var suit = SUITS[Math.floor(Math.random() * SUITS.length)];
                var randomCard = new Card(Math.floor(Math.random() * 13) + 1, suit);
                this.recieveCard(randomCard);
            }
        }
    }
}

function setCardAndTarg() {
    player.setCardAndTarg();
}

class CPU {
    constructor(number, trait) {
        this.number = number;
        this.name = "CPU" + number;
        this.trait = trait;
        this.hand = new Hand();
        this.points = 0;
        this.target;
        this.cardNumWanted;
    }
    getHand() {
        return this.hand;
    }
    getPoints() {
        return this.points;
    }
    setTarget(card) {
        if (CPUs.length==1){
            this.target = -1;
        }
        if (this.trait == "veggie") {
            if (!player.cardInHand(card)) {
                this.target = -1;
            } else {
                for (var i = 0; i < CPUs.length; i++) {
                    if (i != this.number) {
                        if (!CPUs[i].cardInHand(card)) {
                            this.target = i;
                        }
                    }
                }
            }
        } else if (this.trait == "BULLY") {
            this.target = -1; // player
        } else if (this.trait == "IQ1000GOD") {
            if (player.cardInHand(card)) {
                this.target = -1;
            } else {
                for (var i = 0; i < CPUs.length; i++) {
                    if (i != this.number) {
                        if (CPUs[i].cardInHand(card)) {
                            this.target = i;
                        }
                    }
                }
            }
            if (this.target == null) {
                this.target = Math.floor(Math.random() * 3);
            }
        }
        return this.target;
    }
    getCardWanted() {
        this.cardNumWanted = this.hand.hand[Math.floor(Math.random() * this.hand.length)].number;
        return this.cardNumWanted;
    }
    recieveCard(card) {
        this.hand.addCard(card);
    }
    hasPairs() {
        if (this.hand.length == 1) {
            this.hand.hasPairs = false;
            return false;
        } else if (this.hand.length == 2) {
            if (this.hand.hand[0].number == this.hand.hand[1].number) {
                this.hand.hasPairs = true;
                return true;
            }
        } else {
            for (var i = 0; i < this.hand.length - 1; i++) {
                for (var j = (i + 1); j < this.hand.length; j++) {
                    if (this.hand.hand[i].number == this.hand.hand[j].number) {
                        this.hand.hasPairs = true;
                        return true;
                    }
                }
            }
        }
        this.hand.hasPairs = false;
        return false;
    }
    cardInHand(card) {
        return this.hand.cardPresent(card);
    }
    giveCard(card) {
        return this.hand.removeCard(card);
    }
    isHandEmpty() {
        return this.hand.length == 0;
    }
    refillHand() {
        if (this.hand.length == 0) {
            for (var i = 0; i < NUM_CARDS; i++) {
                var suit = SUITS[Math.floor(Math.random() * SUITS.length)];
                var randomCard = new Card(Math.floor(Math.random() * 13) + 1, suit);
                this.recieveCard(randomCard);
            }
        }
    }
}

class Card {
    constructor(number, suit) {
        this.number = number;
        this.suit = suit;
    }
    get name() {
        return "" + this.suit + this.number;
    }
    getCardName() {
        return this.name;
    }
    getCardNumber() {
        return this.number;
    }
    getSuit() {
        return this.suit;
    }
}

class Hand {
    constructor() {
        this.hand = [];
        this.length = 0;
        this.hasPairs = true;
    }
    cardPresent(card) {
        for (var i = 0; i < this.length; i++) {
            if (this.hand[i].number == card) {
                return true;
            }
        }
        return false;
    }
    addCard(card) {
        this.hand[this.length] = card;
        this.length++;
    }
    removeCard(card) {
        var index = 0;
        var suit;
        for (var i = 0; i < this.length; i++) {
            if (this.hand[i].number == card) {
                index = i;
                suit = this.hand[i].getSuit();
                break;
            }
        }
        var modHand = new Hand();
        for (var i = 0; i < index; i++) {
            modHand.hand[i] = this.hand[i];
            modHand.length++;
        }
        for (var i = index + 1; i < this.length; i++) {
            modHand.hand[i - 1] = this.hand[i];
            modHand.length++;
        }
        this.hand = modHand.hand;
        this.length = modHand.length;
        return suit;
    }
}

function checkPairs(hand, person) {
    if (person.hasPairs() == false) {
        return false;
    } else {
        var escape = false;
        for (var i = 0; i < hand.length; i++) {
            if (escape) {
                break;
            }
            for (var j = (i + 1); j < hand.length; j++) {
                if (hand[i] != null && hand[j] != null && hand[i].number == hand[j].number) {
                    var newHand = new Hand();
                    hand[i] = null;
                    hand[j] = null;
                    var l = 0;
                    for (var k = 0; k < hand.length; k++) {
                        if (hand[k] != null) {
                            newHand.hand[l] = hand[k];
                            newHand.length++;
                            l++;
                        }
                    }
                    person.hand = newHand;
                    person.points++;
                    escape = true;
                }
                if (escape) {
                    break;
                }
            }
        }
        checkPairs(person.hand.hand, person);
    }
}

function play(player) {
    var winner = checkGame();
    if (winner != null) {
        var cpuName = person.name;
        if (person.name != "You"){
            cpuName = "CPU" + (person.number+1);
        }
        status = cpuName + " won the game!";
        alert(status);
        document.getElementById("ask").style.display = 'none';
        return;
    }
    document.getElementById("ask").style.display = 'block';
    sleep(250);
    console.log(player.name + " start go");
    go(player);
    player.refillHand();
    for (var i = 0; i < CPUs.length; i++) {
        CPUs[i].refillHand();
    }
    sleep(250);
    console.log(player.name + " done");
    winner = checkGame();
    if (winner != null) {
        var cpuName = person.name;
        if (person.name != "You"){
            cpuName = "CPU" + (person.number+1);
        }
        status = cpuName + " won the game!";
        alert(status);
        document.getElementById("ask").style.display = 'none';
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    for (var i = 0; i < CPUs.length; i++) {
        if (CPUs[i] == null) {
            console.log("BAD");
            break;
        }
        document.getElementById("ask").style.display = 'none';
        sleep(250);
        console.log(CPUs[i].name + " start go");
        go(CPUs[i]);
        player.refillHand();
        for (var j = 0; i < CPUs.length; j++) {
            if (CPUs[j] == null) {
                console.log("BAD");
                break;
            }
            CPUs[j].refillHand();
        }
        winner = checkGame();
        if (winner != null) {
            var cpuName = person.name;
            if (person.name != "You"){
                cpuName = "CPU" + (person.number+1);
            }
            status = cpuName + " won the game!";
            alert(status);
            document.getElementById("ask").style.display = 'none';
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        sleep(250);
        console.log(CPUs[i].name + " end");
        winner = checkGame();
        if (winner != null) {
            var cpuName = person.name;
            if (person.name != "You"){
                cpuName = "CPU" + (person.number+1);
            }
            status = cpuName + " won the game!";
            alert(status);
            document.getElementById("ask").style.display = 'none';
            return;
        }
    }
    document.getElementById("ask").style.display = 'block';
    winner = checkGame();
    if (winner != null) {
        var cpuName = person.name;
        if (person.name != "You"){
            cpuName = "CPU" + (person.number+1);
        }
        status = cpuName + " won the game!";
        alert(status);
        document.getElementById("ask").style.display = 'none';
        return;
    }
}

function sleep(milliseconds) {
    // stack overflow credited
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function checkGame() {
    if (player.points >= 10) {
        return player;
    } else {
        for (var i = 0; i < CPUs.length; i++) {
            if (CPUs[i].points >= 10) {
                return CPUs[i];
            }
        }
    }
    return null;
}

function go(person) {
    var numWant, target;
    var winner = checkGame();
    if (winner != null) {
        var cpuName = person.name;
        if (person.name != "You"){
            cpuName = "CPU" + (person.number+1);
        }
        status = cpuName + " won the game!";
        alert(status);
        document.getElementById("ask").style.display = 'none';
        return;
    }
    if (person.name == "You") {
        numWant = person.cardNumWanted;
        target = CPUs[person.target - 1];
    } else {
        numWant = person.getCardWanted();
        target = person.setTarget(numWant);
        if (person.setTarget(numWant) == -1) {
            target = player;
        } else {
            target = CPUs[person.setTarget(numWant)];
        }
    }
    if (target.cardInHand(numWant)) {
        var num = numWant;
        if (numWant == 1) {
            num = "A";
        } else if (numWant == 11) {
            num = "J";
        } else if (numWant == 12) {
            num = "Q";
        } else if (numWant == 13) {
            num = "K";
        }
        if (person.name == "You") {
            status = "You recieved " + num + " from CPU" + (target.number+1);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
        } else {
            var who = "you";
            if (person.target != -1) {
                who = "CPU" + (target.number+1);
            }
            var cpuName = person.name;
            if (person.name != "you"){
                cpuName = "CPU" + (person.number+1);
            }
            status += ", " + cpuName + " recieved " + num + " from " + who;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
        }
        var suit = target.giveCard(numWant);
        if (num == "A") {
            num = 1;
        } else if (num == "J") {
            num = 11;
        } else if (num == "Q") {
            num = 12;
        } else if (num == "K") {
            num = 13;
        }
        var card = new Card(num, suit);
        person.recieveCard(card);
        checkPairs(person.hand.hand, person);
        winner = checkGame();
        if (winner != null) {
            var cpuName = person.name;
            if (person.name != "You"){
                cpuName = "CPU" + (person.number+1);
            }
            status = cpuName + " won the game!";
            alert(status);
            document.getElementById("ask").style.display = 'none';
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        return;
    } else {
        var numSay1 = numWant;
        if (numWant == 1) {
            numSay1 = "A";
        } else if (numWant == 11) {
            numSay1 = "J";
        } else if (numWant == 12) {
            numSay1 = "Q";
        } else if (numWant == 13) {
            numSay1 = "K";
        }
        var num = Math.floor((Math.random() * 13) + 1);
        var numSay2 = num;
        if (num == 1) {
            numSay2 = "A";
        } else if (num == 11) {
            numSay2 = "J";
        } else if (num == 12) {
            numSay2 = "Q";
        } else if (num == 13) {
            numSay2 = "K";
        }
        var suit = SUITS[Math.floor(Math.random() * SUITS.length)];
        var card = new Card(num, suit);
        person.recieveCard(card);
        winner = checkGame();
        if (winner != null) {
            var cpuName = person.name;
            if (person.name != "You"){
                cpuName = "CPU" + (person.number+1);
            }
            status = cpuName + " won the game!";
            alert(status);
            document.getElementById("ask").style.display = 'none';
            return;
        }
        checkPairs(person.hand.hand, person);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        if (person.target == -1) {
            var cpuName = person.name;
            if (person.name != "you"){
                cpuName = "CPU" + (person.number+1);
            }
            status += ", " + cpuName + " picked up " + numSay2 + " bc you don't have " + numSay1;
        } else {
            if (person.name == "You") {
                status = "CPU" + (target.number+1) + " didn't have " + numSay1 + " so you picked up " + numSay2;
            } else {
                var cpuName = person.name;
                if (person.name != "you"){
                    cpuName = "CPU" + (person.number+1);
                }
                status += ", CPU" + (target.number+1) + " didn't have " + numSay1 + " so " + cpuName + " picked up " + numSay2;
            }
        }
        return;
    }
    return;
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
    img = new Image();
    img.src = "images/cards/clubs" + "J" + ".png";
    cards['clubs11'] = img;
    img = new Image();
    img.src = "images/cards/clubs" + "Q" + ".png";
    cards['clubs12'] = img;
    img = new Image();
    img.src = "images/cards/clubs" + "K" + ".png";
    cards['clubs13'] = img;

    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/diamonds" + i + ".png";
        cards['diamonds' + i] = img;
    }
    img = new Image();
    img.src = "images/cards/diamonds" + "J" + ".png";
    cards['diamonds11'] = img;
    img = new Image();
    img.src = "images/cards/diamonds" + "Q" + ".png";
    cards['diamonds12'] = img;
    img = new Image();
    img.src = "images/cards/diamonds" + "K" + ".png";
    cards['diamonds13'] = img;

    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/hearts" + i + ".png";
        cards['hearts' + i] = img;
    }
    var img = new Image();
    img.src = "images/cards/hearts" + "J" + ".png";
    cards['hearts11'] = img;
    img = new Image();
    img.src = "images/cards/hearts" + "Q" + ".png";
    cards['hearts12'] = img;
    img = new Image();
    img.src = "images/cards/hearts" + "K" + ".png";
    cards['hearts13'] = img;

    for (var i = 2; i <= 10; i++) {
        var img = new Image();
        img.src = "images/cards/spades" + i + ".png";
        cards['spades' + i] = img;
    }
    img = new Image();
    img.src = "images/cards/spades" + "J" + ".png";
    cards['spades11'] = img;
    img = new Image();
    img.src = "images/cards/spades" + "Q" + ".png";
    cards['spades12'] = img;
    img = new Image();
    img.src = "images/cards/spades" + "K" + ".png";
    cards['spades13'] = img;

    img = new Image();
    img.src = "images/cards/clubs" + "A" + ".png";
    cards['clubs1'] = img;
    img = new Image();
    img.src = "images/cards/hearts" + "A" + ".png";
    cards['hearts1'] = img;
    img = new Image();
    img.src = "images/cards/diamonds" + "A" + ".png";
    cards['diamonds1'] = img;
    img = new Image();
    img.src = "images/cards/spades" + "A" + ".png";
    cards['spades1'] = img;
}

function draw() {
    winner = checkGame();
    if (winner != null) {
        var cpuName = person.name;
        if (person.name != "You"){
            cpuName = "CPU" + (person.number+1);
        }
        status = cpuName + " won the game!";
        alert(status);
        document.getElementById("ask").style.display = 'none';
        return;
    }
    ctx.fillStyle = '#870000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var i = 10;
    var all = player.hand.hand;
    for (var c of all) {
        if (c != null) {
            var name = c.name;
            var img = cards[c.name];
            ctx.drawImage(img, 540 + i, 500, img.width / 4, img.height / 4);
            i += 25;
        }
    }
    if (CPUs.length == 1) {
        all = CPUs[0].hand.hand;
        var x = 418;
        for (var c of all) {
            if (c != null) {
                var name = c.name;
                var img = cards[c.name];
                ctx.drawImage(cards['back'], x + i, 75, cards['back'].width / 6, cards['back'].height / 6)
                i += 25;
            }
        }
        ctx.font = "18px Times New Roman";
        ctx.fillStyle = "white";
        ctx.fillText("Points: " + CPUs[0].points, 640, 50);
    } else if (CPUs.length == 2) {
        for (var j = 0; j < CPUs.length; j++) {
            all = CPUs[j].hand.hand;
            var x;
            if (j == 0) {
                x = 145;
            } else {
                x = 550;
            }
            for (var c of all) {
                if (c != null) {
                    var name = c.name;
                    var img = cards[c.name];
                    ctx.drawImage(cards['back'], x + i, 75, cards['back'].width / 6, cards['back'].height / 6)
                    i += 25;
                }
            }
            ctx.font = "18px Times New Roman";
            ctx.fillStyle = "white";
            if (j == 0) {
                ctx.fillText("Points: " + CPUs[j].points, 360, 50);
            } else {
                ctx.fillText("Points: " + CPUs[j].points, 900, 50);
            }
        }
    } else if (CPUs.length == 3) {
        for (var j = 0; j < CPUs.length; j++) {
            all = CPUs[j].hand.hand;
            var x;
            if (j == 0) {
                x = 20;
            } else if (j == 1) {
                x = 285;
            } else {
                x = 550;
            }
            for (var c of all) {
                if (c != null) {
                    var name = c.name;
                    var img = cards[c.name];
                    ctx.drawImage(cards['back'], x + i, 75, cards['back'].width / 6, cards['back'].height / 6)
                    i += 25;
                }
            }
            ctx.font = "18px Times New Roman";
            ctx.fillStyle = "white";
            if (j == 0) {
                ctx.fillText("Points: " + CPUs[j].points, 240, 50);
            } else if (j == 1) {
                ctx.fillText("Points: " + CPUs[j].points, 630, 50);
            } else {
                ctx.fillText("Points: " + CPUs[j].points, 1025, 50);
            }
        }
    }
    ctx.font = "18px Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText("Points: " + player.points, 780, 728);
    ctx.fillText(status, (canvas.width / 2) - (status.length * 4), 385);
    window.requestAnimationFrame(draw);
}