// Creates the card deck and creates a split between player and cpu 
var warArray [], playerHand [], cpuHand [];
var playDeck = '', cpuDeck = '', playerCard = '', cpuCard = '';
var playing = false;

//populating deck 
function fillArray() {
        var deck = [];
        for (var i = 0; i < 52; i++)
            deck[i] = i;
    
        shuffle(deck);
        splitCards(deck);
    }
//Deck shuffling 
function shuffle(deck) {
    for(var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
    return deck;
}

//function to split shuffled deck in half
function splitCards(deck) {
	var i = 0;

	//push a card to each "hand" array
	while (i != deck.length) {
		playerHand.push(deck[i]);
		cpuHand.push(deck[(i+1)]);
		i+=2;
	}

	$('.playCount').html("Player cards: " + playerHand.length);
	$('.compCount').html("Computer cards: " + cpuHand.length);
	$('.result').html("");
}
function deal() {
    $('.playerCard').html("");
	$('.compCard').html("");
	$('.newGame').show();

    
}