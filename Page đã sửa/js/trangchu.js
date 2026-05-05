// ===== SELECT =====
const cards = document.querySelectorAll(".card");
const heartBtn = document.getElementById("heart-btn");
const cartBtn = document.getElementById("cart-btn");
const searchInput = document.getElementById("searchInput");

// ===== FAVORITE =====
heartBtn.onclick = () => {
    let list = JSON.parse(localStorage.getItem("favorites")) || [];

    list.push("Trang chủ");

    localStorage.setItem("favorites", JSON.stringify(list));

    heartBtn.innerText = "💖";
    alert("Đã lưu yêu thích ❤️");
};

// ===== CART =====
cartBtn.onclick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push("Event demo");

    localStorage.setItem("cart", JSON.stringify(cart));

    cartBtn.innerText = "🛍️";
    alert("Đã thêm giỏ hàng 🛒");
};

// ===== FILTER =====
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
    btn.onclick = () => {

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
    };
});

// ===== SEARCH =====
searchInput.onkeyup = () => {
    let value = searchInput.value.toLowerCase();

    cards.forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
};

// ===== SU KIEN CHAY =====
let currentFilter = "all";

// FILTER
function filterCategory(e, type) {
    currentFilter = type;

    const buttons = document.querySelectorAll(".category button");
    buttons.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    applyFilterAndSearch();
}

// SEARCH
document.getElementById("searchInput").addEventListener("keyup", function () {
    applyFilterAndSearch();
});

// CORE LOGIC (gộp cả 2)
function applyFilterAndSearch() {
    const value = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const category = card.dataset.category;

        const matchSearch = text.includes(value);
        const matchFilter = (currentFilter === "all" || category === currentFilter);

        if (matchSearch && matchFilter) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}