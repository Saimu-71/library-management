if(window.location.pathname === "/return1.html") {
  var issuedBook = JSON.parse(localStorage.getItem("issuedBook"))
  if(loginUser.role !== "admin") location.href = "/"
  var requestContainer = document.querySelector(".request-container")
  requestContainer.innerHTML = issuedBook.map(function(value) {
    return `
          <div class="m1">
            <div class="m2">${value.user}</div>
            <div class="m2">${value.book}</div>
            <div class="m2">${books.map(function(book) {
              
              if(book.id === value.book) return book.name
            }).join("")}</div>
            <div class="m2">
              <input onclick = "returnBook(${value.book}, ${value.user})" value="Return Book" />
            </div>
          </div>
          `
  }).join("")
}

function returnBook(returnBook, returnUser) {
  var issuedBook = JSON.parse(localStorage.getItem("issuedBook"))
  // var returnUser = document.querySelector(".return-user").value
  // var returnBook = document.querySelector(".return-book").value
  if(!returnBook || !returnUser) {
    alert("User id or Book Id required")
    return
  }
  books.find(function(value) {
    if(value.id == returnBook) value.quantity += 1
  })
  users.find(function(value) {
    if(value.id == returnUser) {
      value.quantity -= 1
      value.issueBook = value.issueBook.filter(function(book) {
        if(book.bookId != returnBook) return book
      })
    }
  })
  issuedBook = issuedBook.filter(function(value) {
    return (value.book !== returnBook || value.user !== returnUser)
  })
  localStorage.setItem("books", JSON.stringify({books: books}))
  localStorage.setItem("users", JSON.stringify({users: users}))
  localStorage.setItem("issuedBook", JSON.stringify(issuedBook))
  location.href = "/return1.html"
}