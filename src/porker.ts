class Card {
  constructor(public readonly mark: string, public readonly num: number) { }
}

class Deck {
  private cards: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  private initializeDeck() {
    const marks: string[] = ['♠', '♡', '♦', '♣'];
    const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    for (const mark of marks) {
      for (const num of nums) {
        this.cards.push(new Card(mark, num));
      }
    }
  }

  drawCard(): Card | undefined {
    return this.cards.pop();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}

class Dealer {
  constructor(public readonly deck: Deck) { }

  giveCard(): Card | undefined {
    return this.deck.drawCard();
  }

  shuffleDeck() {
    this.deck.shuffle();
  }
}

class Player {
  private hands: Card[] = [];

  constructor(public readonly name: string) { }

  receiveCard(card: Card) {
    this.hands.push(card);
  }

  showHands() {
    for (const card of this.hands) {
      console.log(`${this.name}: ${card.mark} ${card.num}`);
    }
  }
}

const deck = new Deck();
const dealer = new Dealer(deck);
dealer.shuffleDeck();

const player1 = new Player('kida');
const player2 = new Player('subaru');

function dealCards(player: Player, dealer: Dealer, numCards: number) {
  for (let i = 0; i < numCards; i++) {
    const card = dealer.giveCard();
    if (card) {
      player.receiveCard(card);
    }
  }
}


dealCards(player1, dealer, 5);
dealCards(player2, dealer, 5);

player1.showHands();
player2.showHands();