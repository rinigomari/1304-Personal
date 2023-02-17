function checkData(key) {
    let data = [];
    if (JSON.parse(localStorage.getItem(key))) {
        data = JSON.parse(localStorage.getItem(key));
    }
    return data;
}

function removeAlert() {
    if (document.getElementById("containerAlert")) {
        document.getElementById("error").removeChild(document.getElementById("containerAlert"));
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(checkData("users"));
    let users = checkData("users");
    console.log(users);
    let user = users.filter((user) => user.username === username && user.password === password);
    
    console.log(user);
    if (user.length === 0) {
        removeAlert();
        let container = document.getElementById("error");
        let alert = `<div class="containerAlert" id="containerAlert">
        <div class="alert" id="alert">
            <h1>Alert</h1>
            <p>Username or password is incorrect. Please Check and try again</p>
        </div>
    </div>`;
    container.insertAdjacentHTML("beforeend", alert);
    } else {
        removeAlert();
        let container = document.getElementById("error");
        let alert = `<div class="containerSuccess" id="containerSuccess">
        <div class="success" id="success">
            <h1>Alert</h1>
            <p>Login Success!</p>
        </div>`;
    container.insertAdjacentHTML("beforeend", alert);
    let accountsActive = username;
    
    localStorage.setItem("accountsActive", JSON.stringify(accountsActive));
    setTimeout(() => {
        window.location.href = "index.html";
    }
    , 2000);
    }
}