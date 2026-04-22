// chuyển tab
function switchTab(tab) {
    document.querySelectorAll(".form").forEach(f => f.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    document.getElementById(tab).classList.add("active");

    if (tab === "login") {
        document.querySelectorAll(".tab")[0].classList.add("active");
    } else {
        document.querySelectorAll(".tab")[1].classList.add("active");
    }
}

// REGISTER
document.getElementById("register").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = this.querySelector('[name="name"]').value;
    let email = this.querySelector('[name="email"]').value;
    let pass = this.querySelector('[name="pass"]').value;
    let confirm = this.querySelector('[name="confirm"]').value;

    if (!name || !email || !pass || !confirm) {
        alert("Nhập đầy đủ!");
        return;
    }

    if (pass !== confirm) {
        alert("Mật khẩu không khớp!");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, pass }));
    alert("Đăng ký thành công!");
    switchTab("login");
});

// LOGIN
document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = this.querySelector('[name="email"]').value;
    let pass = this.querySelector('[name="pass"]').value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Chưa có tài khoản!");
        return;
    }

    if (email === user.email && pass === user.pass) {
        document.getElementById("authBox").style.display = "none";
        document.getElementById("home").style.display = "block";
        document.getElementById("username").innerText = user.name;
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
});

// LOGOUT
function logout() {
    document.getElementById("home").style.display = "none";
    document.getElementById("authBox").style.display = "block";
}