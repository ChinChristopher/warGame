var suit = ['&spades;', '&hearts;', '&diams;', '&clubs;'];
var cardType = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
var deck[cardType, suit];

var player = document.getElementById('player');
var cpu = document.getElementById('cpu');

var start = document.getElementById('start');
var play = document.getElementById('play');
var shuffle = document.querySelector('P');

var buildDeck = function(suit, cardType) {
    for (var i = 0; i < suit.length; i++) {
        for (var j = 0; j < cardType.length; j++) {
            deck.push({
                suit: suits[i],
                cardType: cardType[j],
                value: j
            })
        }
    }
    shuffle(deck);
};

function shuffle(array) {
    var x = array.length,
        t, i;

    while (x) {
        i = Math.floor(math.random() * x--);

        t = array[x];
        array[x] = array[i];
        array[i] = t;
    }
    return array;
}
}

var playerHand = [];
var cpuHand = [];