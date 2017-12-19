// Creates the card deck and creates a split between player and cpu 
var warArray [], playerHand [], cpuHand [];
var playDeck = '', cpuDeck = '', playerCard = '', cpuCard = ''; 
var playing = false;

//populating deck 
function fillArray() {
    var deck [];
    for (var i = 0; i < 52; i++)
            deck[i] = i;



        shuffle(deck);
        splitCards(deck);
}   



