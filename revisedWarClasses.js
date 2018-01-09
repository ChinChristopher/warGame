function Player(name, currentDeck, wonDeck, warDeck) {
    this.name = name;
    this.currentDeck = currentDeck !== undefined && currentDeck instanceof Array ? currentDeck : [];
    this.wonDeck = wonDeck !== undefined && wonDeck instanceof Array ? wonDeck : [];
    this.warDeck = warDeck !== undefined && warDeck instanceof Array ? warDeck : [];
}
Player.prototype.GetCurrentCard = function() {
    this.currentCard = this.currentDeck.pop();
}
Player.prototype.GoToWar = function(opponent) {
    var tied = false;
    console.log("War");
    do {
        this.CanContinueWar(opponent);
        opponent.CanContinueWar(this);
        if (this.warDeck.length !== 0) {
            warCardsHolder[1].textContent = this.warDeck[this.warDeck.length - 1].cardText + " of " + this.warDeck[this.warDeck.length - 1].suit;
        }
        if (opponent.warDeck.length !== 0) {
            warCardsHolder[3].textContent = opponent.warDeck[opponent.warDeck.length - 1].cardText + " of " + opponent.warDeck[opponent.warDeck.length - 1].suit;
        }
        currentCardsHolder[0].textContent = this.currentDeck.length;
        currentCardsHolder[1].textContent = opponent.currentDeck.length;
        wonCardsHolder[0].textContent = this.wonDeck.length;
        wonCardsHolder[1].textContent = opponent.wonDeck.length;
        if (this.warDeck[this.warDeck.length - 1].faceValue === opponent.warDeck[opponent.warDeck.length - 1].faceValue) {
            tied = true;
        }
        console.log("Tied");
    }
    while (tied === true);
    if (this.warDeck[this.warDeck.length - 1].faceValue > opponent.warDeck[opponent.warDeck.length - 1].faceValue) {
        console.log(this.name + " wins war");
        this.WonWar(opponent);
    } else {
        console.log(opponent.name + " wins war");
        opponent.WonWar(this);
    }
}
Player.prototype.CanContinueWar = function(opponent) {
    Deck.DealWarCards(this, 2);
    if (this.currentDeck.length < 2) {
        if (this.wonDeck.length < 2) {
            if ((this.currentDeck.length === 1) && (this.wonDeck.length === 1)) {
                console.log(this.name + " continuing war");
                Deck.ShuffleDeck(this.wonDeck, this.currentDeck);
            } else if ((this.currentDeck.length === 0) && (this.wonDeck.length === 1)) {
                console.log(this.name + " loses war");
                Deck.ShuffleDeck(this.wonDeck, opponent.wonDeck);
                opponent.WonWar(this);
                this.GameOver(opponent);
            } else if ((this.currentDeck.length === 1) && (this.wonDeck.length === 0)) {
                console.log(this.name + " loses war");
                Deck.ShuffleDeck(this.currentDeck, opponent.wonDeck);
                opponent.WonWar(this);
                this.GameOver(opponent);
            } else {
                console.log(this.name + " loses");
                opponent.WonWar(this);
                this.GameOver(opponent);
            }
        }
        Deck.ShuffleDeck(this.wonDeck, this.currentDeck);
    }
}
Player.prototype.WonWar = function(opponent) {
    this.wonDeck = this.wonDeck.concat(this.warDeck, opponent.warDeck);
    this.warDeck = [];
    opponent.warDeck = [];
}
Player.prototype.GameOver = function(opponent) {
    console.log(opponent.name + " wins!");
    opponent.wonDeck = opponent.wonDeck.concat(opponent.warDeck, this.currentDeck, this.wonDeck, this.warDeck);
    opponent.warDeck = [];
    this.currentDeck = [];
    this.wonDeck = [];
    this.warDeck = [];
    PlayerWins(opponent);
}

function Card(options) {
    this.suit = options.suit;
    this.faceValue = options.faceValue;
    this.cardText = (function() {
        switch (this.faceValue) {
            case 14:
                { return "Ace" };
            case 13:
                { return "King" };
            case 12:
                { return "Queen" };
            case 11:
                { return "Jack" };
            default:
                { return String(this.faceValue) };
                break;
        }
    }).call(this);
}
Deck = {
    suits: ["Clubs", "Diamonds", "Hearts", "Spades"],
    cards: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
    deck: [],
    shuffledDeck: [],
    BuildDeck: function() {
        for (var suit = 0; suit < this.suits.length; suit++) {
            for (var card = 0; card < this.cards.length; card++) {
                this.deck.push(new Card({ suit: this.suits[suit], faceValue: this.cards[card] }));
            }
        }
    },
    ShuffleDeck: function(unshuffledDeck, shuffledDeck) {
        while (unshuffledDeck.length) {
            var index = Math.floor(Math.random() * unshuffledDeck.length);
            shuffledDeck.push(unshuffledDeck.splice(index, 1)[0]);
        }
        unshuffledDeck = [];
    },
    DistributeCards: function(player1Deck, player2Deck) {
        for (var i = 0; i < this.shuffledDeck.length / 2; i++) {
            player1Deck.push(this.shuffledDeck[i]);
            player2Deck.push(this.shuffledDeck[this.shuffledDeck.length - i - 1]);
        }
    },
    DealWarCards: function(player, num) {
        for (var i = 0; i < num; i++) {
            player.GetCurrentCard();
            player.warDeck.push(player.currentCard);
        }
        console.log(player);
    },
    StartGame: function(player1, player2) {
        this.BuildDeck();
        this.ShuffleDeck(this.deck, this.shuffledDeck);
        this.DistributeCards(player1.currentDeck, player2.currentDeck);
    }
}