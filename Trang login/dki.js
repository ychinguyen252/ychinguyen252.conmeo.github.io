// VALIDATE EMAIL
// =====================
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// REGISTER (ĐĂNG KÝ)
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

        // Kiểm tra mật khẩu (>= 6 ký tự và ít nhất 1 chữ in hoa)
        const hasUpperCase = /[A-Z]/.test(password);
        if (password.length < 6 || !hasUpperCase) {
            alert("Mật khẩu phải lớn hơn 6 ký tự và có ít nhất 1 chữ in hoa!");
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

// LOGIN (ĐĂNG NHẬP & CHUYỂN TRANG)
// =====================
const loginFormElement = document.getElementById("loginForm");

if (loginFormElement) {
    loginFormElement.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = loginFormElement.querySelector('input[type="email"]').value.trim();
        const password = loginFormElement.querySelector('input[type="password"]').value.trim();

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("Chưa có tài khoản!");
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {
            // 1. Ẩn form đăng nhập, Hiện khối thành công
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("successBox").style.display = "block";

            // 2. Chờ 2 giây rồi tự động chuyển sang file index.html bằng lệnh location.href
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
        } else {
            alert("Sai email hoặc mật khẩu!");
        }
    });

    // Xử lý nút Đăng xuất (hiện ra ở màn hình thành công)
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            document.getElementById("successBox").style.display = "none";
            document.getElementById("loginBox").style.display = "block";
            loginFormElement.reset(); // Xóa trắng form cũ
        });
    }
}