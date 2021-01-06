const showCard = document.getElementById('showCard');
const cardCount = document.getElementById('cardCount');
const cardList = document.getElementById('cardList');
const dealBtn = document.getElementById('dealBtn');
const cardHistory = document.getElementById('cardHistory');
const prevHistory = document.getElementById('prevHistory');
const nextHistory = document.getElementById('nextHistory');

let deck = new Array();
let history = new Array();
let cardCnt;
let historyIndex;

main();

function main() {
    showCard.innerHTML = '-';
    populate();
    shuffleDeck();
    displayCount();
    displayHistory();
    prevHistory.disabled = true;
    nextHistory.disabled = true;
}

function populate() {
    let suit = ['♠','♡','♢','♣'];
    let cardNum = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    for(const face of suit) {
        for(const num of cardNum) {
            deck.push(face + num);
        }
    }
}

function displayCount() {
    cardCnt = deck.length - 1;
    cardCount.innerHTML = cardCnt + 1;
}

function displayDeck() {
    cardList.innerHTML = deck;
}

function displayHistory() {
    cardHistory.innerHTML = history;
}

function previousCard() {
    if(historyIndex > 0) {
        historyIndex--;
        console.log(historyIndex);
    }
    if(historyIndex === 1) {
        prevHistory.disabled = true;
        nextHistory.disabled = false;
    } else {
        nextHistory.disabled = false;
    }
    showCard.innerHTML = displayCardName(history[historyIndex - 1]);
}

function nextCard() {
    if(historyIndex < history.length) {
        historyIndex++;
        console.log(historyIndex);
    }
    if(historyIndex === history.length) {
        nextHistory.disabled = true;
        prevHistory.disabled = false;
    } else {
        prevHistory.disabled = false;
    }
    showCard.innerHTML = displayCardName(history[historyIndex - 1]);
}

function dealCard() {
    //let cardIndex = Math.floor(Math.random() * (1 + cardCnt - 0)) + 0;
    // console.log(cardIndex);
    // let goToHistory = deck.splice(cardIndex, 1);
    cardIndex = cardCnt;
    let goToHistory = deck.shift();
    showCard.innerHTML = displayCardName(goToHistory);
    // console.log(goToHistory);
    history.push(goToHistory);
    displayDeck();
    displayHistory();
    displayCount();
    historyIndex = history.length;
    console.log(historyIndex);
    if(historyIndex > 1) {
        prevHistory.disabled = false;
        nextHistory.disabled = true;
    }
    if(cardCnt < 0) {
        dealBtn.disabled = true;
    }
}

function shuffleDeck() {
    if (deck.length < 52) {
        showCard.innerHTML = '-';
        deck.splice(0, deck.length);
        history.splice(0, history.length);
        populate();
        dealBtn.disabled = false;
        prevHistory.disabled = true;
        nextHistory.disabled = true;
    }
    deck.sort(function(a, b){return 0.5 - Math.random()});
    displayDeck();
    displayHistory();
    displayCount();
}

function displayCardName(cardToName) {
    let displayName;
    switch(cardToName.charAt(1)) {
        case 'A':
            displayName = 'Ace of ';
            break;
        case '2':
            displayName = 'Two of ';
            break;
        case '3':
            displayName = 'Three of ';
            break;
        case '4':
            displayName = 'Four of ';
            break;
        case '5':
            displayName = 'Five of ';
            break;
        case '6':
            displayName = 'Six of ';
            break;
        case '7':
            displayName = 'Seven of ';
            break;
        case '8':
            displayName = 'Eight of ';
            break;
        case '9':
            displayName = 'Nine of ';
            break;
        case '1':
            displayName = 'Ten of ';
            break;
        case 'J':
            displayName = 'Jack of ';
            break;
        case 'Q':
            displayName = 'Queen of ';
            break;
        case 'K':
            displayName = 'King of ';
            break;
        default:
            displayName = cardToName.charAt(1) + ' of ';
            break;
    }
    switch(cardToName.charAt(0)) {
        case '♠':
            displayName += 'Spades'
        break;
        case '♡':
            displayName += 'Hearts'
        break;
        case '♢':
            displayName += 'Diamonds'
        break;
        case '♣':
            displayName += 'Clubs'
        break;
    }
    return displayName;
}