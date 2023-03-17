const quotecontainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
// show loading
function loading() {
    loader.hidden = false;
    quotecontainer.hidden = true;
}
// hide function
function complete() {
    quotecontainer.hidden = false;
    loader.hidden = true;
   }

//get quotes from api//
let apiQuotes = [];
function newQuotes() {
    loading();
    // pick a random quote from api quote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //    if authorfeild is empty
    if (!quote.author) {
        authorText.textContent = "UnKnown";
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length to determine styling//
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote,hide loader
   quoteText.textContent = quote.text;
   complete();
}
async function getquotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuotes();
    } catch (error) {
    }
}
// tweet quote
function tweetquote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click', getquotes);
twitterBtn.addEventListener('click', tweetquote);
getquotes();


