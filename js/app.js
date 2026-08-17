const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const bookGrid = document.getElementById("bookGrid");

function displayBooks(bookList) {
    bookGrid.innerHTML = "";

    if (bookList.length === 0) {
        bookGrid.innerHTML = `
            <p class="no-results">
                No books found.
            </p>
        `;
        return;
    }

    bookList.forEach(book => {
        const bookCard = document.createElement("article");

        bookCard.className = "catalogue-book";

        bookCard.innerHTML = `
            <div class="catalogue-cover">
                ${book.cover}
            </div>

            <div class="catalogue-book-info">

                <span class="book-category">
                    ${book.category}
                </span>

                <h2>${book.title}</h2>

                <p class="book-author">
                    ${book.author}
                </p>

                <p>
                    ${book.description}
                </p>

                <button class="details-button">
                    View Details
                </button>

            </div>
        `;

        bookGrid.appendChild(bookCard);
    });
}

function searchBooks() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );

    displayBooks(filteredBooks);
}

searchButton.addEventListener("click", searchBooks);

searchInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        searchBooks();
    }
});