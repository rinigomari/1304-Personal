function redirect() {
    window.location.href = "postToy.html";
}

window.onload = function() {
    let accountsActive;
    if (JSON.parse(localStorage.getItem("accountsActive")) !== null) {
        accountsActive = JSON.parse(localStorage.getItem("accountsActive"));
    }
    let users = [];
    if (JSON.parse(localStorage.getItem("users") !== null)) {
        users = JSON.parse(localStorage.getItem("users"));
    } else {
        let userObj = {username: "admin", password: "admin", toy: []};
        users.push(userObj);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("accountsActive", JSON.stringify(userObj.username)); 
    }

    let allToys = [];
    if(JSON.parse(localStorage.getItem("allToys")) !== null) {
        allToys = JSON.parse(localStorage.getItem("allToys"));
    }
    let postings = document.getElementById("postings");
    if (allToys.length > 0) {
        let search = document.getElementById("search");
        
        allToys.map((toy) => {
            let card = `<div class="card" id="${toy.itemNum}" onclick="viewCard()">
            <h4>${toy.itemName}</h4>
            <img src="/Images/gundam1.png" alt="Avatar">
            <div class="container">
                <p>Retail Price: $ ${toy.retailPrice}</p>
            </div>
        </div>`;
        postings.insertAdjacentHTML("beforeend", card);
        let toyCard = document.getElementById(toy.itemNum);
        search.addEventListener("keyup", () => {
            if (toy.itemName.includes(search.value)) {
                toyCard.style.display = "block";
                console.log(toy.itemName.includes(search.value));
            } else {
                toyCard.style.display = "none";
            }
        });
        
        toyCard.addEventListener("click", () => {
            localStorage.setItem("toyCard", JSON.stringify(toy));
            window.location.href = "cardViewOffer.html";
            });
        });
    }

    let user = users.find((user) => {
        return user.username === accountsActive;
    });
    if (user) {
        let toysOffer = [];
        toysOffer = user.toy.filter((toy1) => {
            if (toy1.offers.length > 0) {
                return toy1;
            }
        })
        console.log(toysOffer);
        if (toysOffer.length > 0) {
            let poppUp = document.getElementById("ul");
            let popUp = document.getElementById("popUp");
            let close = document.querySelector(".close");
            let notification = document.querySelector(".notif");
            notification.style.border = "5px solid red";
            notification.addEventListener("click", () => {
                popUp.style.display = "block";
                notification.style.border = "1px solid #BBB4AB";
                popUp.style.backgroundColor = "#1E1E1E";
            });
            close.addEventListener("click", () => {
                popUp.style.display = "none";
                console.log("close");
                notification.style.border = "5px solid red";
            });
            toysOffer.forEach((toy) => {
                toy.offers.forEach((offer) => {
                let notif = `<li>${offer.senderName} wants to trade an item!
            ${toy.itemName}
            <button id="${offer.id}">View</button>
            </li>`;
            poppUp.insertAdjacentHTML("beforeend", notif);
            let notifi = document.getElementById(offer.id);
            notifi.addEventListener("click", () => {
                localStorage.setItem("notific", JSON.stringify(toy));
                window.location.href = "acceptOrDecline.html";
            });
            })
        })
        }
    }
    
}