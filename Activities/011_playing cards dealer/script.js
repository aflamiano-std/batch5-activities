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
    let cardNum = [1,2,3,4,5,6,7,8,9,10,11,12,13];
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
    showCard.innerHTML = history[historyIndex - 1];
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
    showCard.innerHTML = history[historyIndex - 1];
}

function dealCard() {
    //let cardIndex = Math.floor(Math.random() * (1 + cardCnt - 0)) + 0;
    // console.log(cardIndex);
    // let goToHistory = deck.splice(cardIndex, 1);
    cardIndex = cardCnt;
    let goToHistory = deck.shift();
    showCard.innerHTML = goToHistory;
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

