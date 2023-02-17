function removeAlert() {
    if (document.getElementById("containerAlert")) {
        document.getElementById("error").removeChild(document.getElementById("containerAlert"));
    }
}

function goHome() {
    window.location.href = "index.html";
}

function post() {
    let itemName = document.getElementById("itemName").value;
    let dropDown = document.getElementById("dropDown").value;
    let retailPrice = document.getElementById("retailPrice").value;
    let description = document.getElementById("description").value;

    if (!itemName || !dropDown || !retailPrice || !description) {
        removeAlert();
        let container = document.getElementById("error");
        let alert = `<div class="containerAlert" id="containerAlert">
        <div class="alert" id="alert">
            <h1>Alert</h1>
            <p>Please fill in all the fields</p>
        </div>`;
        container.insertAdjacentHTML("beforeend", alert);
    } else {
        removeAlert();
        let container = document.getElementById("error");
        let alert = `<div class="containerAlert" id="containerAlert">
        <div class="success" id="success">
            <h1>Alert</h1>
            <p>Success</p>
        </div>`;
        container.insertAdjacentHTML("beforeend", alert);
        let users = [];
        if (JSON.parse(localStorage.getItem("users") !== null)) {
        users = JSON.parse(localStorage.getItem("users"));
        }
        if(JSON.parse(localStorage.getItem("accountsActive")) !== null) {
            let allToys = [];
            let toyObj = {};
            if (JSON.parse(localStorage.getItem("allToys")) !== null) {
                allToys = JSON.parse(localStorage.getItem("allToys"));
            }
            toyObj = {itemNum:Math.floor(Math.random() * 10000), itemName, dropDown, retailPrice, description, offers:[]};
            allToys.push(toyObj);
            let accountsActive = JSON.parse(localStorage.getItem("accountsActive"));
            let newUsers = users.map((user) => {
                if (user.username === accountsActive) {
                    return {...user, toy: [...user.toy, toyObj, ]

                    }
                }
                return user;
            });
            
            localStorage.setItem("users", JSON.stringify(newUsers));
            localStorage.setItem("allToys", JSON.stringify(allToys));
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    }
}