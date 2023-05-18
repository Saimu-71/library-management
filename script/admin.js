if(window.location.pathname === "/admin.html") {
  let bookName
  var issuedBook = JSON.parse(localStorage.getItem("issueBook"))
  if(loginUser.role !== "admin") location.href = "/"
  var requestContainer = document.querySelector(".request-container")
  requestContainer.innerHTML = issuedBook.map(function(value) {
    return `
          <div class="m1">
            <div class="m2">${value.user}</div>
            <div class="m2">${value.book}</div>
            <div class="m2">${books.map(function(book) {
              
              if(book.id === value.book) {
                bookName = book.name
                return book.name
              }
            }).join("")}</div>
            <div class="m2">
              <input onclick = "updateQuantity(${value.book}, ${value.user}, '${bookName}')" value="Accept Request" />
            </div>
          </div>
          `
  }).join("")
}

function updateQuantity(book, user, bookName) {
    var issuedBookByUser = JSON.parse(localStorage.getItem("issuedBook")) 
    var issuedBook = JSON.parse(localStorage.getItem("issueBook"))
    books.find(function(value) {
        if(value.id === book) value.quantity -= 1 
    })
    users.find(function(value) {
        if(value.id === user) {
            value.issueBook.push({bookId: book, bookName: bookName})
            value.requestBook = value.requestBook.filter(function(value) {
              return value.bookId !== book
            })
            value.quantity += 1
        }
    })
    localStorage.setItem("books", JSON.stringify({books: books}))
    localStorage.setItem("users", JSON.stringify({users: users}))
    issuedBook = issuedBook.filter(function(value){
      return (value.book !== book || value.user !== user)
    })
    issuedBookByUser.push({book: book, user: user})
    localStorage.setItem("issueBook", JSON.stringify(issuedBook))
    localStorage.setItem("issuedBook", JSON.stringify(issuedBookByUser))
    location.href = "/admin.html"
}