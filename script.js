
const quotes = [
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi",
        category: "Motivation"
    },
    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
        category: "Perseverance"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "Confidence"
    },
    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh",
        category: "Success"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
        category: "Inspiration"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain",
        category: "Productivity"
    },
    {
        text: "Dream big and dare to fail.",
        author: "Norman Vaughan",
        category: "Courage"
    },
    {
        text: "Well done is better than well said.",
        author: "Benjamin Franklin",
        category: "Action"
    },
    {
        text: "Quality is not an act, it is a habit.",
        author: "Will Durant",
        category: "Growth"
    },
    {
        text: "Turn your wounds into wisdom.",
        author: "Oprah Winfrey",
        category: "Wisdom"
    },
    {
        text: "Success is the sum of small efforts repeated day in and day out.",
        author: "Robert Collier",
        category: "Success"
    },
    {
        text: "Nothing will work unless you do.",
        author: "Maya Angelou",
        category: "Motivation"
    },
    {
        text: "Happiness depends upon ourselves.",
        author: "Aristotle",
        category: "Happiness"
    },
    {
        text: "Action is the foundational key to all success.",
        author: "Pablo Picasso",
        category: "Action"
    },
    {
        text: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
        category: "Perseverance"
    }
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteCategory = document.getElementById("quoteCategory");
const quoteNumber = document.getElementById("quoteNumber");
const totalQuotes = document.getElementById("totalQuotes");

const newQuoteBtn = document.getElementById("newQuoteBtn");
const previousBtn = document.getElementById("previousBtn");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

let currentQuoteIndex = -1;
let previousQuotes = [];
let toastTimer;

function showQuote(index) {
    currentQuoteIndex = index;

    const quote = quotes[index];

    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `— ${quote.author}`;
    quoteCategory.textContent = quote.category;
    quoteNumber.textContent =
        `Quote #${String(index + 1).padStart(2, "0")}`;

    totalQuotes.textContent =
        `${quotes.length} inspiring quotes available`;

    previousBtn.disabled = previousQuotes.length === 0;
}

function getRandomQuoteIndex() {
    if (quotes.length <= 1) return 0;

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === currentQuoteIndex);

    return randomIndex;
}

function generateNewQuote() {
    if (currentQuoteIndex !== -1) {
        previousQuotes.push(currentQuoteIndex);
    }

    const randomIndex = getRandomQuoteIndex();
    showQuote(randomIndex);
}

function showPreviousQuote() {
    if (previousQuotes.length === 0) return;

    const previousIndex = previousQuotes.pop();
    showQuote(previousIndex);
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

async function copyQuote() {
    const quote = quotes[currentQuoteIndex];

    const textToCopy = `"${quote.text}" — ${quote.author}`;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";

            document.body.appendChild(textArea);
            textArea.select();

            const copied = document.execCommand("copy");
            textArea.remove();

            if (!copied) {
                throw new Error("Copy command was unsuccessful.");
            }
        }

        showToast("Quote copied successfully!");
    } catch (error) {
        showToast("Copy failed. Please select and copy the quote.");
        console.error("Clipboard error:", error);
    }
}

newQuoteBtn.addEventListener("click", generateNewQuote);
previousBtn.addEventListener("click", showPreviousQuote);
copyBtn.addEventListener("click", copyQuote);

// Display a random quote when the app opens.
generateNewQuote();
