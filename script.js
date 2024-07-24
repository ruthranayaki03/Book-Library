let bookStatus; 
let bookNumber; 
let booksReadCount; 
let booksUnreadCount; 
let bookReadBoolean
let library = [];

class Book {
    constructor(
    bookName = 'Unknown',
    author = 'Unknown',
    pages = 0,
    bookStatus = false
    ){
    this.bookName = bookName
    this.author = author
    this.pages = pages
    this.bookStatus = bookStatus
    }
}

const overlay = document.getElementById('overlay');
const submitButton = document.getElementById('submit');
const form = document.getElementById("addBookForm");
const bookSection = document.getElementById("bookSection");

const card = document.getElementById("bookCard");

submitButton.addEventListener('click', createNewBook);


function updateBookCount() {
    const booksRead = document.getElementById("booksRead");
    const booksUnread = document.getElementById("booksUnread");
    const booksTotal = document.getElementById("booksTotal");

    booksReadCount = 0;
    booksUnreadCount = 0;

    for (i=0; i <library.length; i++){
        if (library[i]['bookStatus'] === 'Read'){
            booksReadCount++
        }else{
            booksUnreadCount++
        }
    }
    booksRead.innerHTML = booksReadCount
    booksUnread.innerHTML = booksUnreadCount
    booksTotal.innerHTML = library.length
}

function openForm() {
    overlay.style.display = "block";
}

function createNewBook() {
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;

    const pages = document.getElementById('pages').value;
    const readOrNot = document.getElementById('readOrNot').checked;

    let bookAlreadyExists;

    for (i=0;i<library.length;i++) {
        if (library[i]['bookName'] === bookName){
            bookAlreadyExists = true
        }else{
            bookAlreadyExists = false
        }
    }

    if (bookAlreadyExists === true) {
        alert('The book already exists in your library!')
    }else{
        if (pages === ''){ 
            alert('The number of pages can only be in numbers!')
        }else{
      
            if (readOrNot === true){
                bookStatus = 'Read'
            }else{
                bookStatus = 'Not Read'
            }
    
            overlay.style.display = "none";
            form.reset();
    
            const newBook = new Book(bookName,author, pages, bookStatus)  
    
            library.push(newBook)
            localStorage.setItem('library', JSON.stringify(library))
    
            location.reload()
      
            createLibrary()  
        }
    }
}

function createLibrary() {

    for (i=0; i< library.length; i++) {

        const bookCard = document.createElement("div");

        const nameCard = document.createElement("p");
        const authorCard = document.createElement("p");
        const pagesCard = document.createElement("p");
        const deleteButton = document.createElement("button");
        const deleteButtonContainer = document.createElement("div");
        const readButton = document.createElement("button");
        const readButtonContainer = document.createElement("div");

        nameCard.innerHTML = library[i].bookName
        authorCard.innerHTML = library[i].author
        pagesCard.innerHTML = library[i].pages
        deleteButton.innerHTML = 'Delete'
        readButton.innerHTML = library[i].bookStatus

        deleteButton.id = 'deleteButton'
        deleteButton.dataset.id = i
        readButton.id = 'readButton'
        readButton.dataset.id = i

        bookCard.classList.add("book-card")
        nameCard.classList.add("bookName")

        readButtonContainer.classList.add('readButtonContainer')

        if(library[i].bookStatus==='Read'){
            readButton.classList.add('readButton')

        }else if(library[i].bookStatus==='Not Read') {
            readButton.classList.add('notReadButton')
        }

        deleteButtonContainer.classList.add('deleteButtonContainer')
        deleteButton.classList.add('deleteButton')

        readButton.classList.add('readButton')
  
        deleteButtonContainer.appendChild(deleteButton)

        readButtonContainer.appendChild(readButton)

        bookCard.appendChild(nameCard)
        bookCard.appendChild(authorCard)
        bookCard.appendChild(pagesCard)
        bookCard.appendChild(deleteButtonContainer)
        bookCard.appendChild(readButtonContainer)
  
        bookSection.appendChild(bookCard)
    
        deleteButton.addEventListener('click', deleteBookStep);
        readButton.addEventListener('click', readButtonStep)

        function readButtonStep(){
            let index = readButton.dataset.id

            if (readButton.innerHTML ==='Read') {
                bookReadBoolean = true
            }else{
                bookReadBoolean = false
            }

            readButtonToggle(index)
        }

        function deleteBookStep() {
            let index = deleteButton.dataset.id
        deleteBook(index)
        }
    }
  updateBookCount()
}


function readButtonToggle(index) {
    if (bookReadBoolean === true) {
        library[index]['bookStatus'] = 'Not Read'
    } else {
        library[index]['bookStatus'] = 'Read'
    }

    console.log(library[index]['bookStatus'])
    localStorage.setItem('library', JSON.stringify(library))

    location.reload()
}

function deleteBook(index) {

    library.splice(index,1)
    localStorage.setItem('library', JSON.stringify(library))
    location.reload()
}


function closeBookForm() {
    overlay.style.display = "none";
    form.reset();
}


window.onload = () => {

    if (JSON.parse(localStorage.getItem('library')) === null){

    }else{ 
    library = JSON.parse(localStorage.getItem('library'))
    }

  createLibrary()
}