function showProfile() {
  var profile = document.querySelector(".profile")
  profile.innerHTML = `
  <p><span>Name:</span> ${loginUser.name}</p>
          <p><span>Email:</span> ${loginUser.email}</p>
          <p><span>Role:</span> ${loginUser.role}</p>
          <p><span>Requested Books:</span></p>
          <table style="width: 100%; text-align: center" border="1">
            <thead>
              <tr>
                <th>Book Id</th>
                <th>Book Name</th>
              </tr>
            </thead>
            <tbody>
            ${
              loginUser.requestBook.map(function(value) {
                return `
                <tr>
                  <td>${value.bookId}</td>
                  <td>${value.bookName}</td>
                </tr>
              `
              }).join("")
            }
            </tbody>
          </table>
          <p><span>Issued Book:</span></p>
          <table style="width: 100%; text-align: center" border="1">
            <thead>
              <tr>
                <th>Book Id</th>
                <th>Book Name</th>
              </tr>
            </thead>
            <tbody>
              ${
                loginUser.issueBook.map(function(value) {
                  return `
                  <tr>
                    <td>${value.bookId}</td>
                    <td>${value.bookName}</td>
                  </tr>
                `
                }).join("")
              }
            </tbody>
          </table>
  `
  if(profile.style.display === "block") profile.style.display = "none"
    else profile.style.display = "block"
}


var categoryList = []
books.map(function(book) {
    categoryList.push(book.category)
})

var category = [... new Set(categoryList)]
if(window.location.pathname === "/" || window.location.pathname === "/index.html") {
  document.querySelector(".category").innerHTML = `<option value="categories">Categories</option>`
  document.querySelector(".category").innerHTML += category.map(function(value) {
    return `<option value="${value}">
                ${value}
            </option>`
  })
}

function issueBook(book, user) {
    books.find(function(value) {
        if(value.id === book && value.quantity > 1) {
            localStorage.setItem("issueBook", JSON.stringify({book: book, user: user}))
        }
    })
}

function searchFromCategory(element) {
    var cardContainer = document.querySelector(".card_container")
    cardContainer.innerHTML = books.map(function(book) {
        if(book.category === element.value) {
            return ` <div class="card">
            <div class="card_img_des_wrap">
              <div class="card_img">
                <img src="images/${book.image}" alt="book image" />
              </div>
              <div class="card_des">
                <h2>${book.name}</h2>
                <br />
                <p>
                  Writer(s):
                  <span>${book.author}</span>
                </p>
                <br />
                <p class="card_des_category">
                  Category: <span>${book.category}</span>
                </p>
              </div>
            </div>

            <div class="card_btn">
              <button onclick="request(${book.id}, '${book.name}')">Issue Request</button>
              <p class="card_issued_text">Available: <span>${book.quantity} copy</span></p>
            </div>
          </div>`
        }
    }).join("")
}

function searchBook() {
    var searchInput = document.querySelector(".search-input")
    var cardContainer = document.querySelector(".card_container")
    if(searchInput.value === "") return
    cardContainer.innerHTML = books.map(function(book) {
        if(searchInput.value === book.name || searchInput.value == book.id) {
            return `<div class="card">
            <div class="card_img_des_wrap">
              <div class="card_img">
                <img src="images/${book.image}" alt="book image" />
              </div>
              <div class="card_des">
                <h2>${book.name}</h2>
                <br />
                <p>
                  Writer(s):
                  <span>${book.author}</span>
                </p>
                <p class="card_des_category">
                  Category: <span>${book.category}</span>
                </p>
              </div>
            </div>

            <div class="card_btn">
              <button onclick="request(${book.id}, '${book.name}')">Issue Request</button>
              <p class="card_issued_text">Available: <span>${book.quantity} copy</span></p>
            </div>
          </div>`
        }
    }).join("")
}

function request(book, bookName) {
  var singleBook = books.find(function(value) {
    if(value.id === book) return value
  })
  var issueBook = JSON.parse(localStorage.getItem("issueBook"))
  if(!loginUser) alert("Please log in")
  else if(singleBook.quantity < 1) alert("Not available")
  else {
    users.find(function(user) {
      if(user.id === logInfo.user) user.requestBook.push({bookId: book, bookName: bookName})
    })
    issueBook.push({book: book, user: loginUser.id})
    localStorage.setItem("issueBook", JSON.stringify(issueBook))
    alert("Your request has been granted")
    localStorage.setItem("users", JSON.stringify({users: users}))
  }
}

function logout() {
    localStorage.removeItem("login")
    window.location.href = "/login.html"
    showUserInNav()
}