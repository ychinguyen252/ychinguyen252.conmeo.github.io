const eventList = document.getElementById("eventList");
const searchInput = document.getElementById("searchInput");
const filterBtns = document.querySelectorAll(".filter-btn");

let eventsData = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// LOAD JSON
fetch("events.json")
    .then(res => res.json())
    .then(data => {
        eventsData = data;
        renderEvents(data);
    });

// RENDER
function renderEvents(events) {
    eventList.innerHTML = "";

    events.forEach(event => {
        const isFav = favorites.includes(event.id);

        eventList.innerHTML += `
        <a href="event-detail.html?id=${event.id}" class="event-card" data-category="${event.category}">
            
            ${event.badge ? `<div class="badge">${event.badge}</div>` : ""}

            <button class="fav-btn ${isFav ? "active-fav" : ""}" 
                onclick="toggleFavorite(event, '${event.id}')">❤</button>

            <img src="${event.image}">
            <h3>${event.title}</h3>
            <p>${event.location} • ${event.date}</p>
            <span>${event.price}</span>
        </a>
        `;
    });
}

// FAVORITE
function toggleFavorite(e, id) {
    e.preventDefault();

    if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderEvents(eventsData);
}

// SEARCH
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = eventsData.filter(e =>
        e.title.toLowerCase().includes(value)
    );

    renderEvents(filtered);
});

// FILTER
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");

        const category = btn.dataset.category;

        if (category === "all") {
            renderEvents(eventsData);
        } else {
            renderEvents(eventsData.filter(e => e.category === category));
        }
    });
});
[
  {
    "id": "ai",
    "title": "AI Conference 2026",
    "category": "tech",
    "location": "Hà Nội",
    "date": "15/08",
    "price": "199.000đ",
    "badge": "HOT",
    "image": "https://via.placeholder.com/300x180"
  },
  {
    "id": "music",
    "title": "Summer Music Fest",
    "category": "music",
    "location": "HCM",
    "date": "20/08",
    "price": "299.000đ",
    "badge": "NEW",
    "image": "https://via.placeholder.com/300x180"
  }
]
// Favorite events
const list = document.getElementById("favoriteList");
const emptyMessage = document.getElementById("emptyMessage");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// load JSON
fetch("events.json")
    .then(res => res.json())
    .then(data => {

        const favEvents = data.filter(e => favorites.includes(e.id));

        if (favEvents.length === 0) {
            emptyMessage.style.display = "block";
        }

        favEvents.forEach(event => {
            list.innerHTML += `
            <a href="event-detail.html?id=${event.id}" class="event-card">
                <img src="${event.image}">
                <h3>${event.title}</h3>
                <p>${event.location} • ${event.date}</p>
                <span>${event.price}</span>

                <button class="remove-btn" onclick="removeFav(event, '${event.id}')">
                    ❌
                </button>
            </a>
            `;
        });
    });

// xóa khỏi yêu thích
function removeFav(e, id) {
    e.preventDefault();

    favorites = favorites.filter(f => f !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    location.reload(); // reload lại trang
}