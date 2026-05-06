const favList = document.getElementById("fav-list");
const emptyText = document.getElementById("empty");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function render() {
    favList.innerHTML = "";

    if (favorites.length === 0) {
        emptyText.style.display = "block";
        return;
    }

    emptyText.style.display = "none";

    favorites.forEach(item => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${item.name}</h3>
            <button onclick="removeFav('${item.id}')">❌ Xóa</button>
        `;

        favList.appendChild(div);
    });
}

function removeFav(id) {
    favorites = favorites.filter(i => i.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    render();
}

render();