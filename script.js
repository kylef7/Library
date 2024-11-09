const myLibrary = [];
const favDialog = document.getElementById("favDialog");
const confirmBtn = favDialog.querySelector("#confirmBtn");

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.hasRead = hasRead;
}

Book.prototype.hasReadBook = function () {
    if (this.hasRead === true) {
        this.hasRead = false
    } else if (this.hasRead === false) {
        this.hasRead = true;
    }

    displayBooksPage();
}

function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
}

function displayBooksPage() {
    const library = document.querySelector(".libraryContainer");

    library.innerHTML = "";

    if (myLibrary.length == 0) {
        showAddButton();
    };

    for (let i = 0; i < myLibrary.length; i++) {

        const newBook = document.createElement("div");
        newBook.classList.add("book");
        const bookInfo = document.createElement("div");
        bookInfo.classList.add("bookInfo");
        

        newBook.dataset.tempId = i;
        const newTitle = document.createElement("p");
        newTitle.classList.add("title");
        const newAuthor = document.createElement("p");
        newAuthor.classList.add("author");
        const newPages = document.createElement("p");
        newPages.classList.add("pages");
        const newHasRead = document.createElement("p");
        newHasRead.classList.add("hasReadClass");

        const removeButton = document.createElement("button");
        const removeButtonDiv = document.createElement("div");
        removeButton.classList.add("removeButton");

        const hasReadButton = document.createElement("button");
        const hasReadButtonDiv = document.createElement("div");
        hasReadButton.classList.add("hasReadButton");

        newTitle.textContent = myLibrary[i].title;
        newAuthor.textContent = myLibrary[i].author;
        newPages.textContent = myLibrary[i].pages;

        if (myLibrary[i].hasRead === true) {
            newHasRead.textContent = "You have read this book!";
        } else if (myLibrary[i].hasRead === false) {
            newHasRead.textContent = "You have not read this book yet!";
        };

        library.appendChild(newBook);
        newBook.appendChild(bookInfo);
        bookInfo.appendChild(newTitle);
        bookInfo.appendChild(newAuthor);
        bookInfo.appendChild(newPages);
        newBook.appendChild(newHasRead);
        newBook.appendChild(removeButton);
        newBook.appendChild(hasReadButton);
        removeButton.appendChild(removeButtonDiv);
        hasReadButton.appendChild(hasReadButtonDiv);

        if (i == myLibrary.length - 1) {
            showAddButton();
        }

        removeButton.addEventListener('click', () => {

            library.removeChild(newBook);
            myLibrary.splice(newBook.dataset.tempId, 1);
            displayBooksPage();
        });

        hasReadButton.addEventListener('click', () => {
            myLibrary[i].hasReadBook();
        });
    }
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".addBookButton");
const closeButton = document.querySelector("dialog button");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

function showAddButton() {
    const theButton = document.createElement("button");
    theButton.classList.add("addBookButton");

    for (let i = 0; i < 2; i++) {
        const div = document.createElement("div");
        theButton.appendChild(div);
    }

    document.querySelector(".libraryContainer").appendChild(theButton);

    const showButton = document.querySelector(".addBookButton");
    showButton.addEventListener("click", () => {
        dialog.showModal();
    });
}

closeButton.addEventListener("click", () => {
    dialog.close();
});

confirmBtn.addEventListener("click", (event) => {

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let hasReadSelect;

    let form = document.querySelector("form");

    if (form.checkValidity()) {

        event.preventDefault();

        if (document.getElementById("hasRead").value === "true") {
            hasReadSelect = true;
        } else if (document.getElementById("hasRead").value === "false") {
            hasReadSelect = false;
        };

        addBookToLibrary(title, author, pages, hasReadSelect);

        displayBooksPage();

        favDialog.close();
    }

});
