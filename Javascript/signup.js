function removeAlert() {
    if (document.getElementById("containerAlert")) {
        document.getElementById("error").removeChild(document.getElementById("containerAlert"));
    }
}
function login() {
    removeAlert();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let users = [];
    if (JSON.parse(localStorage.getItem("users") !== null)) {
        users = JSON.parse(localStorage.getItem("users"));
    }

    let isRegistered = users.filter((user) => user.username === username || user.email === email);
    console.log(isRegistered.length);
    if (!username || !email || !password || !confirmPassword || password !== confirmPassword) {
        removeAlert();
        let container = document.getElementById("error");
        let alert = `<div class="containerAlert" id="containerAlert">
        <div class="alert" id="alert">
            <h1>Alert</h1>
            <p>Username or password is incorrect. Please Check and try again</p>
        </div>
    </div>`;
    container.insertAdjacentHTML("beforeend", alert);
    } else if (isRegistered.length !== 0){
        removeAlert();
        let container = document.getElementById("error");
        let alert = `<div class="containerAlert" id="containerAlert">
        <div class="alert" id="alert">
            <h1>Alert</h1>
            <p>Username / Email already exists! Try again</p>
        </div>
    </div>`;
    container.insertAdjacentHTML("beforeend", alert);
    } else {
        removeAlert();
        let userObject = {
            username:username,
            email:email,
            password:password,
            toy:[]
        }
        users.push(userObject);
        localStorage.setItem("users", JSON.stringify(users));
        let container = document.getElementById("error");
        let alert = `<div class="containerSuccess" id="containerSuccess">
        <div class="success" id="success">
            <h1>Alert</h1>
            <p>Success!</p>
        </div>
    </div>`;
    container.insertAdjacentHTML("beforeend", alert);
    setTimeout(() => {
        window.location.href = "login.html";
    }
    , 2000);
    }
}