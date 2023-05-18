fetch("users.json")
.then(res => res.json())
.then(data => {
  // localStorage.setItem("users", JSON.stringify(data))
  if(!JSON.parse(localStorage.getItem("users"))) {
    localStorage.setItem("users", JSON.stringify(data))
  } 
})
.catch(err => console.log(err))

fetch("books.json")
.then(res => res.json())
.then(data => {
  // localStorage.setItem("books", JSON.stringify(data))
  if(!JSON.parse(localStorage.getItem("books"))) {
    localStorage.setItem("books", JSON.stringify(data))
  } 
})
.catch(err => console.log(err))


if(!localStorage.getItem("issueBook")) {
  localStorage.setItem("issueBook", JSON.stringify([]))
}
if(!localStorage.getItem("issuedBook")) {
  localStorage.setItem("issuedBook", JSON.stringify([]))
}

var books = JSON.parse(localStorage.getItem("books")).books
var users = JSON.parse(localStorage.getItem("users")).users
var logInfo = JSON.parse(localStorage.getItem("login"))

var loginUser = users.find(function(value) {
  if(logInfo && value.id === logInfo.user) return value
}) 


function showUserInNav(){
    if(logInfo && logInfo.loggedIn) {
        document.querySelector(".login a").innerHTML = ""
        document.querySelector(".user-list a").innerHTML = loginUser.name
        document.querySelector(".logout a").innerHTML = "Logout"
    } else {
        document.querySelector(".logout a").innerHTML = ""
        document.querySelector(".user-list a").innerHTML = ""
        document.querySelector(".login a").innerHTML = "Login"
    }
    if(logInfo && loginUser.role === "admin") {
      document.querySelector(".admin a").innerHTML = "Admin Panel"
    } else {
      document.querySelector(".admin a").innerHTML = ""
    }
}
if(window.location.pathname === "/" || window.location.pathname === "/index.html") showUserInNav()