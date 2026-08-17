const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryFilter = document.getElementById("categoryFilter");
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

function filterBooks() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filteredBooks);
}

searchButton.addEventListener("click", filterBooks);

searchInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        filterBooks();
    }
});

categoryFilter.addEventListener("change", filterBooks);