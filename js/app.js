const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryFilter = document.getElementById("categoryFilter");
const bookGrid = document.getElementById("bookGrid");

const bookModal = document.getElementById("bookModal");
const modalClose = document.getElementById("modalClose");
const modalCover = document.getElementById("modalCover");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalDescription = document.getElementById("modalDescription");

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

                <button class="details-button" data-book-id="${book.id}">
                    View Details
                </button>

            </div>
        `;

        bookGrid.appendChild(bookCard);
    });

    document.querySelectorAll(".details-button").forEach(button => {
        button.addEventListener("click", () => {
            const bookId = Number(button.dataset.bookId);
            showBookDetails(bookId);
        });
    });
}

function showBookDetails(bookId) {
    const book = books.find(book => book.id === bookId);

    if (!book) {
        return;
    }

    modalCover.textContent = book.cover;
    modalCategory.textContent = book.category;
    modalTitle.textContent = book.title;
    modalAuthor.textContent = book.author;
    modalDescription.textContent = book.description;

    bookModal.classList.add("active");
}

function closeBookDetails() {
    bookModal.classList.remove("active");
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

modalClose.addEventListener("click", closeBookDetails);

bookModal.addEventListener("click", event => {
    if (event.target === bookModal) {
        closeBookDetails();
    }
});