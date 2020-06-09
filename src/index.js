const url = "http://localhost:3000/quotes?_embed=likes";
const quotesUrl = "http://localhost:3000/quotes";
const likesUrl = "http://localhost:3000/likes";

fetch(url)
  .then((res) => res.json())
  .then((quotes) => {
    for (const quote of quotes) {
      renderQuotes(quote);
    }
  });

function renderQuotes(quote) {
  const quoteLi = document.getElementById("quote-list");
  const li = document.createElement("li");
  const blockquote = document.createElement("blockquote");
  const p = document.createElement("p");
  const footer = document.createElement("footer");
  const likeBtn = document.createElement("button");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  li.classList.add("quote-card");
  blockquote.classList.add("blockquote");
  p.classList.add("mb-0");
  footer.classList.add("blockquote-footer");
  likeBtn.classList.add("btn-success");
  deleteBtn.classList.add("btn-danger");
  deleteBtn.innerText = "Delete";

  p.innerText = quote.quote;
  footer.innerText = quote.author;
  likeBtn.innerText = "Likes:";
  span.innerText = quote.likes.length;

  likeBtn.append(span);
  li.append(blockquote, p, footer, likeBtn, deleteBtn);
  quoteLi.append(li);

  likeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const likeOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        quoteId: quote.id,
      }),
    };

    fetch(likesUrl, likeOptions)
      .then((res) => res.json())
      .then(() => {
        span.innerText = ++quote.likes.length;
      });
  });

  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const deleteOptions = {
      method: "DELETE",
    };

    fetch(`${quotesUrl}/${quote.id}`, deleteOptions)
      .then((res) => res.json())
      .then((quote) => {
        li.remove(quote);
      });
  });
}

const form = document.getElementById("new-quote-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newQuote = document.getElementById("new-quote").value;
  const newAuthor = document.getElementById("author").value;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      quote: newQuote,
      author: newAuthor,
    }),
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((quote) => {
      return renderQuotes(quote);
    });
});
