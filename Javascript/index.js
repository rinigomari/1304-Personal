function redirect() {
    window.location.href = "postToy.html";
}

window.onload = function() {
    
    let allToys = [];
    if(JSON.parse(localStorage.getItem("allToys")) !== null) {
        allToys = JSON.parse(localStorage.getItem("allToys"));
    }
    let postings = document.getElementById("postings");
    if (allToys.length > 0) {
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
        toyCard.addEventListener("click", () => {
            localStorage.setItem("toyCard", JSON.stringify(toy));
            window.location.href = "cardViewOffer.html";
            });
        });
    }
    
}