function removeAlert() {
    if (document.getElementById("containerAlert")) {
        document.getElementById("error").removeChild(document.getElementById("containerAlert"));
    }
}

function goHome() {
    window.location.href = "index.html";
}

function sendOffer() {
    let avatar = document.getElementById("avatar").value;
    let senderName = document.getElementById("senderName").value;
    let itemName = document.getElementById("itemName").value;
    let dropDown = document.getElementById("dropDown").value;
    let retailPrice = document.getElementById("retailPrice").value;
    let description = document.getElementById("description").value;

    let toyOwner;
    let toyNum;
    if (JSON.parse(localStorage.getItem("toyNum") !== null)) {
        toyNum = JSON.parse(localStorage.getItem("toyNum"));
    }

    if (JSON.parse(localStorage.getItem("toyOwner") !== null)) {
        toyOwner = JSON.parse(localStorage.getItem("toyOwner"));
    }
    let users = [];
    let offers = [];
    let offer = {avatar, senderName, itemName, dropDown, retailPrice, description};
    if (JSON.parse(localStorage.getItem("offers") !== null)) {
        offers = JSON.parse(localStorage.getItem("offers"));
    }
    if (JSON.parse(localStorage.getItem("users") !== null)) {
        users = JSON.parse(localStorage.getItem("users"));
        let updatedUsers = users.map((user) => {
           if (user.username === toyOwner.username) {
                let newToys = user.toy.map((toy) => {
                    if (toy.itemNum === toyNum) {
                        return {
                            ...toy, offers: [...toy.offers, {avatar, senderName, itemName, dropDown, retailPrice, description}]
                        }
                    }
                    return toy;
                })
                return {
                    ...user, toy: newToys
                }
           }
           return user;
        })
        offers.push(offer);
        localStorage.setItem("offers", JSON.stringify(offers));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
}