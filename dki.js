function switchTab(tab) {
    document.querySelectorAll(".form").forEach(f => {
        f.classList.remove("active");
    });

    document.querySelectorAll(".tab").forEach(t => {
        t.classList.remove("active");
    });

    document.getElementById(tab).classList.add("active");

    if (tab === "login") {
        document.querySelectorAll(".tab")[0].classList.add("active");
    } else {
        document.querySelectorAll(".tab")[1].classList.add("active");
    }
}

// Đăng ký
document.getElementById("register").addEventListener("submit", function(e) {
    e.preventDefault();

    let inputs = this.querySelectorAll("input");
    let name = inputs[0].value;
    let email = inputs[1].value;
    let pass = inputs[2].value;
    let confirm = inputs[3].value;

    if (pass !== confirm) {
        alert("Mật khẩu không khớp!");
        return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, pass }));

    alert("Đăng ký thành công!");
    switchTab("login");
});

// Đăng nhập
document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();

    let inputs = this.querySelectorAll("input");
    let email = inputs[0].value;
    let pass = inputs[1].value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Chưa có tài khoản!");
        return;
    }

    if (email === user.email && pass === user.pass) {
        document.querySelector(".auth-box").style.display = "none";
        document.getElementById("home").style.display = "block";
        document.getElementById("username").innerText = user.name;
    } else {
        alert("Sai tài khoản hoặc mật khẩu!");
    }
});

// Logout
function logout() {
    document.querySelector(".auth-box").style.display = "block";
    document.getElementById("home").style.display = "none";
}