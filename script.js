class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
}

class Library {
  constructor() {
    this.books = []
  }

  addBook(newBook) {
    this.books.push(newBook)
  }

}


const removeBook = (e) => {
  library.books.splice(e.target.dataset.index, 1)
  updateBooksGrid()
}

const toggleRead = (e) => {
  const book = library.books[e.target.dataset.index]
  book.read = !book.read
  updateBooksGrid()
}
const createBookCard = (book) => {
  const bookCard = document.createElement('div')
  const title = document.createElement('p')
  const author = document.createElement('p')
  const pages = document.createElement('p')
  const buttonGroup = document.createElement('div')
  const readBtn = document.createElement('button')
  const removeBtn = document.createElement('button')

  bookCard.classList.add('book-card')
  buttonGroup.classList.add('button-section')

  title.textContent = book.title
  author.textContent = book.author
  pages.textContent = `${book.pages} pages`
  removeBtn.textContent = 'Remove'
  removeBtn.setAttribute("data-index", `${library.books.indexOf(book)}`)
  removeBtn.onclick = removeBook
  readBtn.setAttribute("data-index", `${library.books.indexOf(book)}`)
  readBtn.onclick = toggleRead

  if (book.read) {
    readBtn.textContent = 'Read'
    readBtn.classList.add('btn-green')
  } else {
    readBtn.textContent = 'Not read'
    readBtn.classList.add('btn-red')
  }

  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(pages)
  buttonGroup.appendChild(readBtn)
  buttonGroup.appendChild(removeBtn)
  bookCard.appendChild(buttonGroup)
  booksGrid.appendChild(bookCard)
  
}


const booksGrid = document.querySelector(".grid-container")
const addBookBtn = document.querySelector(".add-book-btn");
const addBookForm = document.querySelector('form.add-book-form');
const submitBookButton = document.querySelector(".submit-book-btn");

const addBookModal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const openModal = function () {
  addBookForm.reset()
  addBookModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  addBookModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

addBookBtn.onclick = openModal;
overlay.onclick = closeModal;

const resetBooksGrid = function () {
  booksGrid.innerHTML = ''
}

const updateBooksGrid = function () {
  resetBooksGrid()
  for (let book of library.books) {
    createBookCard(book)
  }
}
// function that takes form inputs and returns the new instance of a book
const bookInstanceFromInput = function () {
  const title = document.querySelector('#book-title').value
  const author = document.querySelector('#book-author').value
  const pages = document.querySelector('#book-pages').value
  const read = document.querySelector('#book-read').checked
  return new Book(title, author, pages, read)
}

const submitBook = function (e) {
  e.preventDefault()
  const newBook = bookInstanceFromInput()
  library.addBook(newBook)
  updateBooksGrid()
  closeModal()
}

submitBookButton.onclick = submitBook

const library = new Library()