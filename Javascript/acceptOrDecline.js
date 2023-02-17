function removeAlert() {
    if (document.getElementById("containerAlert")) {
        document.getElementById("error").removeChild(document.getElementById("containerAlert"));
    }
}

function goHome() {
    window.location.href = "index.html";
}

window.onload = function() {
    if(JSON.parse(localStorage.getItem("toyCard")) !== null) {
        let postDiv = document.getElementById("post-div");
        let toyCard = JSON.parse(localStorage.getItem("toyCard"));
        let card = `<div class="rightside" id="rightside">
        <h1>Item Name</h1>
        <p>${toyCard.itemName}</p>
        <h1>Condition</h1>
        <p>${toyCard.dropDown}</p>
        <h1>Retail Price</h1>
        <p>$ ${toyCard.retailPrice}</p>
        <h1>Description</h1>
        <p>${toyCard.description}</p>
        </div>`;

        postDiv.insertAdjacentHTML("beforeend", card);
        let acceptToy = document.getElementById("accept");
        let rejectToy = document.getElementById("decline");

        acceptToy.addEventListener("click", () => {
            removeAlert();
            let allToys = [];
            let users = [];
            let toyOwner;
            if (JSON.parse(localStorage.getItem("toyOwner")) !== null) {
                toyOwner = JSON.parse(localStorage.getItem("toyOwner"));
            }
            if (JSON.parse(localStorage.getItem("users")) !== null) {
                users = JSON.parse(localStorage.getItem("users"));
            }
            if (JSON.parse(localStorage.getItem("allToys")) !== null) {
                allToys = JSON.parse(localStorage.getItem("allToys"));
            }
            let toyCard;
            if (JSON.parse(localStorage.getItem("toyCard")) !== null) {
                toyCard = JSON.parse(localStorage.getItem("toyCard"));
            }
            let updatedToys = allToys.filter((toy) => {
                return toy.itemNum !== toyCard.itemNum;
            });
            let updatedUsers = users.map((user) => {
                if(user.username === toyOwner.username) {
                    let newToys = user.toy.filter((toy) => {
                        return toy.itemNum !== toyCard.itemNum;
                    })
                    return {...user, toy: newToys};
                }
                return user;
            })
            console.log(updatedUsers);
            localStorage.setItem("allToys", JSON.stringify(updatedToys));
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            let container = document.getElementById("error");
            let alert = `<div class="containerAlert" id="containerAlert">
            <div class="success" id="success">
            <h1>Success</h1>
            <p>You have succesfully traded your toys! You will be redirected back to the homepage</p>
                </div>
            </div>`;
            container.insertAdjacentHTML("beforeend", alert);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        })

        rejectToy.addEventListener("click", () => {
            removeAlert();
            let container = document.getElementById("error");
            let alert = `<div class="containerAlert" id="containerAlert">
            <div class="alert" id="alert">
            <h1>Rejected!</h1>
            <p>Your offer has been rejected! You will be redirected back to the homepage</p>
                </div>
            </div>`;
            container.insertAdjacentHTML("beforeend", alert);
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        })
    }
}