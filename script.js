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

const titleErroBox = document.querySelector('.title-validaion-error');
const authorErroBox = document.querySelector('.author-validaion-error');
const pagesErroBox = document.querySelector('.pages-validaion-error');

const openModal = function () {
  addBookForm.reset()
  titleErroBox.textContent = '';
  authorErroBox.textContent = '';
  pagesErroBox.textContent = '';

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


const fieldValidation = function () {
  
}




const submitBook = function (e) {
  e.preventDefault()
  const titleField = document.querySelector('#book-title');
  if (titleField.validity.tooLong) {
    titleErroBox.textContent = 'Title is too long';
  } else if (titleField.validity.valueMissing) {
    titleErroBox.textContent = 'Must provide title'
  } else {
    titleErroBox.textContent = '';
  }

  const authorField = document.querySelector('#book-author');
  if (authorField.validity.tooLong) {
    authorErroBox.textContent = 'Author name is too long';
  } else if (authorField.validity.valueMissing) {
    authorErroBox.textContent = 'Must provide book author'
  } else {
    authorErroBox.textContent = '';
  }

  const pagesField = document.querySelector('#book-pages');
  if (pagesField.validity.rangeOverflow) {
    pagesErroBox.textContent = 'Value too big';
  } else if (pagesField.validity.valueMissing) {
    pagesErroBox.textContent = 'Must provide pages count'
  } else if (pagesField.validity.rangeUnderflow) {
    pagesErroBox.textContent = 'Value cannot be negative';
  } else {
    pagesErroBox.textContent = '';
  }

  if (!pagesField.validity.valid || !authorField.validity.valid || !titleField.validity.valid) {
    return
  }

  const readField = document.querySelector('#book-read');

  const title = titleField.value
  const author = authorField.value
  const pages = pagesField.value
  const read = readField.checked
  const newBook = new Book(title, author, pages, read)
  library.addBook(newBook)
  updateBooksGrid()
  closeModal()
}

submitBookButton.onclick = submitBook

const library = new Library()