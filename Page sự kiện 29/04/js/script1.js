/* =========================
   CLICK → SANG TRANG DETAIL
========================= */
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const name = card.querySelector("h3").innerText;
        const desc = card.querySelector("p")?.innerText || "Hà tự tìm nhé";
        const img = card.querySelector("img")?.src || "https://picsum.photos/500";

        const url = `event-detail.html?name=${encodeURIComponent(name)}&desc=${encodeURIComponent(desc)}&img=${encodeURIComponent(img)}`;
        window.location.href = url;
    });
});


/* =========================
   FILTER CATEGORY
========================= */
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")?.classList.remove("active");
        btn.classList.add("active");

        const category = btn.dataset.category;

        document.querySelectorAll(".card").forEach(card => {
            if (category === "all" || card.dataset.category === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


/* =========================
   SEARCH
========================= */
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        let value = this.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(value)
                ? "block"
                : "none";
        });
    });
}


/* =========================
   FAVORITE (LƯU LOCAL)
========================= */
function saveFavorite(name) {
    let list = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!list.includes(name)) {
        list.push(name);
        localStorage.setItem("favorites", JSON.stringify(list));
        alert("Đã lưu ❤️");
    } else {
        alert("Đã tồn tại 😆");
    }
}