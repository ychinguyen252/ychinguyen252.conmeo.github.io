// ===== SELECT =====
const cards = document.querySelectorAll(".card");
const heartBtn = document.getElementById("heart-btn");
const cartBtn = document.getElementById("cart-btn");
const searchInput = document.getElementById("searchInput");

// ===== FAVORITE =====
if (heartBtn) {
    heartBtn.onclick = () => {

        let list = JSON.parse(localStorage.getItem("favorites")) || [];

        list.push("Trang chủ");

        localStorage.setItem("favorites", JSON.stringify(list));

        heartBtn.innerText = "💖";

        alert("Đã lưu yêu thích ❤️");
    };
}

// ===== CART =====
if (cartBtn) {
    cartBtn.onclick = () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push("Event demo");

        localStorage.setItem("cart", JSON.stringify(cart));

        cartBtn.innerText = "🛍️";

        alert("Đã thêm giỏ hàng 🛒");
    };
}

// ===== SEARCH + FILTER =====

let currentFilter = "all";

// FILTER
function filterCategory(e, type) {

    currentFilter = type;

    const buttons = document.querySelectorAll(".category button");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    e.target.classList.add("active");

    applyFilterAndSearch();
}

// SEARCH
if (searchInput) {
    searchInput.addEventListener("keyup", applyFilterAndSearch);
}

// MAIN FUNCTION
function applyFilterAndSearch() {

    const value = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const text = card.innerText.toLowerCase();

        const category = card.dataset.category;

        const matchSearch = text.includes(value);

        const matchFilter =
            currentFilter === "all" ||
            category === currentFilter;

        if (matchSearch && matchFilter) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// ===== FOOTER MODAL =====
function openModal(title) {

    document.getElementById('modal-container').style.display = 'flex';

    document.getElementById('modal-title').innerText = title;
}

function closeModal() {

    document.getElementById('modal-container').style.display = 'none';
}