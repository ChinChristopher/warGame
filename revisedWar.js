var dealCards = document.getElementById("dealCards");
var cardHolder = document.getElementsByClassName("cardHolder");
var currentCardsHolder = document.getElementsByClassName("currentCardsHolder");
var wonCardsHolder = document.getElementsByClassName("wonCardsHolder");
var warCardsHolder = document.getElementsByClassName("warCardsHolder");

var Player1 = new Player("Player 1");
var Player2 = new Player("Player 2");
Deck.StartGame(Player1, Player2);

function GameLogic(player1, player2) {
    if (player1.currentDeck.length === 0) {
        player1.GameOver(player2);
        Player1Wins(player1);
    } else if (player2.currentDeck.length === 0) {
        player2.GameOver(player1);
        Player2Wins(player2);
    } else {
        if (player1.currentDeck.length === 0) {
            Deck.ShuffleDeck(player1.wonDeck, player1.currentDeck);
        }
        if (player2.currentDeck.length === 0) {
            Deck.ShuffleDeck(player2.wonDeck, player2.currentDeck);
        }
        player1.GetCurrentCard();
        player2.GetCurrentCard();
        warCardsHolder[1].textContent = "";
        warCardsHolder[3].textContent = "";
        cardHolder[0].textContent = player1.currentCard.cardText + " of " + player1.currentCard.suit;
        cardHolder[1].textContent = player2.currentCard.cardText + " of " + player2.currentCard.suit;
        currentCardsHolder[0].textContent = player1.currentDeck.length;
        currentCardsHolder[1].textContent = player2.currentDeck.length;
        wonCardsHolder[0].textContent = player1.wonDeck.length;
        wonCardsHolder[1].textContent = player2.wonDeck.length;
        if (player1.currentCard.faceValue === player2.currentCard.faceValue) {
            player1.warDeck.push(player1.currentCard);
            player2.warDeck.push(player2.currentCard);
            player1.GoToWar(player2);
        } else {
            if (player1.currentCard.faceValue > player2.currentCard.faceValue) {
                player1.wonDeck.push(player1.currentCard);
                player1.wonDeck.push(player2.currentCard);
            } else {
                player2.wonDeck.push(player1.currentCard);
                player2.wonDeck.push(player2.currentCard);
            }
        }
    }
}

function PlayerWins(player) {
    if (player.name === "Player 1") {
        warCardsHolder[1].textContent = "";
        warCardsHolder[3].textContent = "";
        cardHolder[0].textContent = "";
        cardHolder[1].textContent = "";
        currentCardsHolder[0].textContent = player.currentDeck.length;
        currentCardsHolder[1].textContent = "";
        wonCardsHolder[0].textContent = player.wonDeck.length;
        wonCardsHolder[1].textContent = "";
    } else {
        warCardsHolder[1].textContent = "";
        warCardsHolder[3].textContent = "";
        cardHolder[0].textContent = "";
        cardHolder[1].textContent = "";
        currentCardsHolder[0].textContent = "";
        currentCardsHolder[1].textContent = player.currentDeck.length;
        wonCardsHolder[0].textContent = "";
        wonCardsHolder[1].textContent = player.wonDeck.length;
    }
    dealCards.disabled = true;
}
dealCards.onclick = function() {
    GameLogic(Player1, Player2);
}
reshuffle.onclick = function() {
    GameLogic(StartGame)
}
