const cards = document.querySelectorAll(".card");
const popup = document.getElementById("popup");

const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");
const popupImg = document.getElementById("popup-img");

const closeBtn = document.querySelector(".close-btn");

/* CLICK EVENT */
cards.forEach(card => {
    card.addEventListener("click", () => {
        popup.style.display = "block";

        popupTitle.innerText = card.querySelector("h3").innerText;
        popupDesc.innerText = card.querySelector("p").innerText;
        popupImg.src = card.querySelector("img").src;
    });
});

/* CLOSE */
closeBtn.onclick = () => popup.style.display = "none";
window.onclick = (e) => {
    if (e.target === popup) popup.style.display = "none";
};

/* FILTER */
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        const category = btn.dataset.category;

        cards.forEach(card => {
            if (category === "all" || card.dataset.category === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
let currentEvent = "";

// OPEN POPUP
function openPopup(name) {
    currentEvent = name;

    document.getElementById("popup-title").innerText = name;
    document.getElementById("popup").style.display = "block";
}

// CLOSE
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// SAVE FAVORITE
function saveFavorite() {
    let list = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!list.includes(currentEvent)) {
        list.push(currentEvent);
        localStorage.setItem("favorites", JSON.stringify(list));
        alert("Đã lưu ❤️");
    } else {
        alert("Đã tồn tại 😆");
    }
}

// FILTER
function filterCategory(type) {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        if (type === "all" || card.dataset.category === type) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// SEARCH
document.getElementById("searchInput").addEventListener("keyup", function () {
    let value = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
});