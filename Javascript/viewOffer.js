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
        <p>$${toyCard.retailPrice}</p>
        <h1>Description</h1>
        <p>${toyCard.description}</p>
    </div>`;
    postDiv.insertAdjacentHTML("beforeend", card);
    let sendToy = document.getElementById("sendOffer");
    sendToy.addEventListener("click", () => {
        let users = [];
        if (JSON.parse(localStorage.getItem("users") !== null)) {
            users = JSON.parse(localStorage.getItem("users"));
            let toyOwner = users.find((user) => {
                return user.toy.find((toy) => {
                    return toy.itemNum === toyCard.itemNum;
                });
            });
            localStorage.setItem("toyOwner", JSON.stringify(toyOwner));
            localStorage.setItem("toyNum", JSON.stringify(toyCard.itemNum));
            window.location.href = "sendOfferInfo.html";
        }
    });
    }
}