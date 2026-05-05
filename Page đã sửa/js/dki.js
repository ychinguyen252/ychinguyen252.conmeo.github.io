// VALIDATE EMAIL
// =====================
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// =======================================================
// TÍNH NĂNG: ĐO ĐỘ MẠNH MẬT KHẨU (REAL-TIME KHI GÕ PHÍM)
// =======================================================
// Đặt phần khai báo này vào trong một hàm hoặc kiểm tra kỹ
const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength-text");

if (passwordInput && strengthText) {
    passwordInput.addEventListener("input", function() {
        const val = this.value; // Dùng this.value để lấy giá trị trực tiếp
        
        if (val.length === 0) {
            strengthText.textContent = "";
            return;
        }

        const hasLetters = /[a-zA-Z]/.test(val);
        const hasNumbers = /[0-9]/.test(val);

        if (val.length >= 8 && hasLetters && hasNumbers) {
            strengthText.textContent = "Độ mạnh: Mạnh";
            strengthText.style.color = "green";
        } else if (hasLetters && hasNumbers) {
            strengthText.textContent = "Độ mạnh: Trung bình";
            strengthText.style.color = "orange";
        } else {
            strengthText.textContent = "Độ mạnh: Yếu";
            strengthText.style.color = "red";
        }
    });
}
// =======================================================
// TÍNH NĂNG: ĐĂNG KÝ (SUBMIT FORM)
// =======================================================
const registerForm = document.querySelector("h2")?.innerText.includes("Đăng ký")
    ? document.querySelector("form")
    : null;

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = registerForm.querySelector('input[type="text"]').value.trim();
        const phone = registerForm.querySelector('input[type="tel"]').value.trim();
        const email = registerForm.querySelector('input[type="email"]').value.trim();
        
        // Lấy dữ liệu từ ô password (ưu tiên lấy theo ID nếu có)
        const passwordField = registerForm.querySelector('#password') || registerForm.querySelector('input[type="password"]');
        const password = passwordField.value.trim();

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

// =======================================================
// TÍNH NĂNG: ĐĂNG NHẬP (VÀ CHUYỂN TRANG)
// =======================================================
const loginFormElement = document.getElementById("loginForm");

if (loginFormElement) {
    loginFormElement.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = loginFormElement.querySelector('input[type="email"]').value.trim();
        
        // Lấy dữ liệu từ ô password 
        const passwordField = loginFormElement.querySelector('#password') || loginFormElement.querySelector('input[type="password"]');
        const password = passwordField.value.trim();

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("Chưa có tài khoản!");
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {
            // 1. Ẩn form đăng nhập, Hiện khối thành công
            document.getElementById("loginBox").style.display = "none";
            document.getElementById("successBox").style.display = "block";

            // 2. Chờ 2 giây rồi tự động chuyển sang file index.html
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
            
            // Nếu có thẻ hiển thị độ mạnh thì xóa chữ đi
            if (strengthText) strengthText.textContent = ""; 
        });
    }
}
// =======================================================
// TÍNH NĂNG: ẨN / HIỆN MẬT KHẨU
// =======================================================
const togglePasswordBtn = document.getElementById("togglePassword");
// Biến passwordInput đã được khai báo ở phần Đo độ mạnh mật khẩu rồi nên ta dùng lại luôn

if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", function() {
        // Kiểm tra xem ô input đang là dạng 'password' hay 'text'
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        
        // Đổi thuộc tính type của ô input
        passwordInput.setAttribute("type", type);
        
        // Đổi hình con mắt cho sinh động (nhắm/mở)
        this.textContent = type === "password" ? "👁️" : "🙈";
    });
}