var Card = function(rank, suit) {
    this.rank = rank;
    this.suit = suit;
};

Card.prototype.string = function() {
    return this.rank + this.suit;
};

Card.prototype.getInt = function() {
    switch (this.rank) {
        case 'T':
            return 10;
        case 'J':
            return 11;
        case 'Q':
            return 12;
        case 'K':
            return 13;
        case 'A':
            return 14;
        default:
            return this.rank;
    }
};
var game = function() {
    this.HandX = [];
    this.HandY = [];
    this.shuffleDeal();
};

Game.prototype.shuffleDeal = function() {
    var RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K'];
    var SUITS = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
    deck = [];
    _.forEach(RANKS, function(rank) {
        _.forEach(SUITS, function(suit) {
            deck.push(new Card(rank, suit));
        });
    });
    deck = _.shuffle(deck);
    for (var i = 0; i < deck.length; i++) {
        if (i % 2 === 0) {
            this.HandX.push(deck[i]);
        } else {
            this.handY.push(deck[i]);
        }
    }
};
Game.prototype.compareCards = function(cardA, cardB) {
    if (cardA.getInt() > cardB.getInt()) {
        return 1;
    } else if (cardA.getInt() < cardB.getInt()) {
        return -1;
    } else {
        return 0;
    }
};
Game.prototype.handleWar = function(pot) {
    console.log("WAR");
    var cardA, cardB;
    if (this.HandX.length < 4) {
        cardA = this.HandX.shift();
        pot = pot.concat(this.HandX);
        this.HandX = [];
    } else {
        //put the first 3 cards in the pot
        for (var i = 0; i < 3; i++) {
            pot = pot.concat(this.HandX.shift());
        }
        cardA = this.HandX.shift();
    };
    if (this.handB.length < 4) {
        cardB = this.handY.shift();
        pot = pot.concat(this.HandY);
        this.HandY = [];
    } else {

        for (var j = 0; j < 3; j++) {
            pot = pot.concat(this.HandY.shift());
        }
        cardB = this.HandY.shift();
    }
    this.determineWinner(cardA, cardB, pot);
};
Gamepad.prototype.printState = function(cardA, cardB, pot) {
    console.log("A length " + this.HandX.length);
    console.log("B length " + cardB.length);

    console.log("A " + cardA.string());
    console.log("B " + cardB.string());
    var str = "";
    for (var i = 0; i < pot.length; i++) {
        str += pot[i].string() + ", ";
    }
    console.log("pot " + str);
};
Gamepad.prototype.determineWinner = function(cardA, cardB, pot) {
    if (!pot) {
        pot = [cardA, cardB];
    } else {
        pot = pot.concat([cardA, cardB]);
    }
}
this.printState(cardA, cardB, pot); {
    switch (this.compareCards(cardA, cardB)) {
        case 0:
            this.handleWar(pot);
            break;
        case 1:
            this.HandX = this.HandX.concat(pot);
            console.log("Hand A wins");
            break;
        case -1:
            this.HandY = this.HandY.concat(pot);
            console.log("Hand Y wins");
            break;
    }
    if (this.HandX.length === 0 || this.HandY.length === 0) {
        return false;
    } else {
        return true;
    }
};