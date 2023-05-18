function login() {
    var user
    var email = document.querySelector(".login-email").value
    var password = document.querySelector(".login-password").value
    if(!email || !password) {
        alert("Email and password required.")
        return
    }
    users.find(function(value) {
        if(value.email === email) user = value
    })
    if(user && user.password === password) {
        localStorage.setItem("login", JSON.stringify({
            loggedIn: true, user: user.id 
        }))
        window.location.href = "/"
    } else {
        alert("Invalid email or password.")
    }
    showUserInNav()
}

