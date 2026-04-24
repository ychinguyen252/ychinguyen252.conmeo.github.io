// REGISTER
// =====================
const registerForm = document.querySelector("h2")?.innerText.includes("Đăng ký")
    ? document.querySelector("form")
    : null;

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = registerForm.querySelector('input[type="text"]').value.trim();
        const phone = registerForm.querySelector('input[type="tel"]').value.trim();
        const email = registerForm.querySelector('input[type="email"]').value.trim();
        const password = registerForm.querySelector('input[type="password"]').value.trim();

        if (!fullName || !phone || !email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (!validateEmail(email)) {
            alert("Email không hợp lệ!");
            return;
        }

        if (password.length < 6) {
            alert("Mật khẩu phải >= 6 ký tự!");
            return;
        }

        const user = {
            fullName: fullName,
            phone: phone,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Đăng ký thành công!");
        window.location.href = "login.html";
    });
}
// LOGIN
// =====================
const loginForm = document.querySelector("h2")?.innerText.includes("Đăng nhập")
    ? document.querySelector("form")
    : null;

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("Chưa có tài khoản!");
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {
            alert("Đăng nhập thành công!");
        } else {
            alert("Sai email hoặc mật khẩu!");
        }
    });
}
// VALIDATE EMAIL
// =====================
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}