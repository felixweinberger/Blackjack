$(document).ready(function(){

  let hitButton = $("#hit-button");
  let standButton = $("#stand-button");
  let dealerCards = $(".dealer-cards");
  let playerCards = $(".player-cards");
  let gameBoard = initializeNewGameBoard();

  hitButton.click(function() {

  })

  // prepare the game...
  //    initialise a game state
  //    create the deck from the cardSet
  //    shuffle the deck

  // session loop...
    // draw two cards for the dealer
    // draw two cards for the player

    // draw the game state to the DOM
    // show the first dealer card
    // show the player hand

    // game loop...

      // draw the current game state to the html

      // listen for hit or stand
      // if hit...
      //    draw a card from the deck
      hitButton.click(function() {
        // to do
        // draw a card from the top of the deck
        // attach the card image to the player area
      });

      // if stand...
      //    complete the dealer draw
      standButton.click(function() {
        // to do
      })

      // if dealer has blackjack...
      //    increase played by 1
      //    clear game state and break out of loop

      // if player has blackjack...
      //    increase played by 1
      //    increase won by 1
      //    clear game state and break out of loop

      // if dealer wins...
      //    increase played by 1
      //    clear game state and break out of loop

      // if player wins...
      //    increase played by 1
      //    increase won by 1
      //    clear game state and break out of loop 

});

const CARD_SET = {
  suits: ['H', 'S', 'D', 'C'],
  ranks: [2, 3, 4, 5, 6, 7, 8, 9, 0, 'J', 'Q', 'K', 'A'],
}

class GameBoard {
  constructor(deck, dealerHand, playerHand) {
    this.deck = deck;
    this.dealerHand = dealerHand;
    this.dealerScore = scoreHand(dealerHand);
    this.playerHand = playerHand;
    this.playerScore = scoreHand(playerHand);
    this.playerWins = 0;
    this.playerGame = 0;
  }
}

class Card {
  constructor(rank, suit, cardString, image) {
    this.rank = rank;
    this.suit = suit;
    this.cardString = cardString;
    this.image = image;
  }
}

function initializeNewGameBoard() {
  let deck = createDeck(CARD_SET);
  shuffleDeck(deck);
  let dealerHand = drawCards(deck, 1);
  let playerHand = drawCards(deck, 2);
  return new GameBoard(deck, dealerHand, playerHand);
}

function doesDealerHit(dealerHand) {
  let handScore = scoreHand(dealerHand);
  return handScore.score < 17 || (handScore.score === 17 && handScore.soft === true);
}

function scoreHand(hand) {
  let nonAcesScore = 0;
  let acesInHand = 0;
  let acesScore = 0;

  // compute the score of non-ace cards only
  for (let card of hand) {
    if (card.rank === 'A') {
      acesInHand += 1;
    } else if ('0JQK'.indexOf(card.rank) !== -1) {
      nonAcesScore += 10;
    } else {
      nonAcesScore += Number(card.rank);
    }
  }

  // determine the score of aces separately
  let highAces = 0;
  let lowAces = acesInHand;
  for (let i = acesInHand; i > 0; i--) {
    if (i * 11 + (acesInHand - i) * 1 + nonAcesScore <= 21) {
      highAces = i;
      lowAces = acesInHand - 1;
      break;
    }
  }
  acesScore = (highAces * 11) + (lowAces * 1);

  return {
    score: acesScore + nonAcesScore,
    soft: acesInHand > 0
  }
}

function drawCards(deck, numberOfCards) {
  let drawnCards = [];
  for (let i = 0; i < numberOfCards; i++) {
    drawnCards.push(deck.shift());
  }
  return drawnCards;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function createDeck(cardSet) {
  let deck = [];
  for (let i = 0; i < 6; i++) {
    for (let suit of cardSet.suits) {
      for (let rank of cardSet.ranks) {
        let cardString = String(rank) + suit;
        let image = 'img/' + cardString + '.png';
        deck.push(new Card(String(rank), String(suit), cardString, image));
      }
    }
  }
  return deck;
}

function assert(expectedBehavior, desiredBehavior) {
  if (!expectedBehavior) {
    console.log('FAILED, ' + desiredBehavior);
  } else {
    console.log('passed');
  }
}
