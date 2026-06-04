document.addEventListener('DOMContentLoaded', () => {
    // --- MAIN NAVIGATION TABS ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-tab');

            // Set active class on nav links
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Switch visible contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // --- PROJECT SUB-TABS NAVIGATION ---
    const projectBtns = document.querySelectorAll('.project-tab-btn');
    const projectPanels = document.querySelectorAll('.project-panel');

    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPanel = btn.getAttribute('data-panel');

            projectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectPanels.forEach(p => {
                p.classList.remove('active');
                if (p.id === targetPanel) {
                    p.classList.add('active');
                }
            });
        });
    });

    // --- TASK 1: COLLAPSIBLE DIRECTORY TREE ---
    const treeTitles = document.querySelectorAll('.tree-node-title');
    
    treeTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            e.stopPropagation();
            const parentNode = title.parentElement;
            const childrenContainer = parentNode.querySelector('.tree-children');
            const icon = title.querySelector('.folder-icon');
            
            if (childrenContainer) {
                const isCollapsed = childrenContainer.classList.toggle('collapsed');
                if (isCollapsed) {
                    icon.innerHTML = '📁';
                } else {
                    icon.innerHTML = '📂';
                }
            }
        });
    });

    // --- TASK 2: GOOGLE SEARCH SIMULATOR ---
    const searchSelect = document.getElementById('search-operator-select');
    const searchBtn = document.getElementById('simulate-search-btn');
    const searchResults = document.getElementById('search-results-output');

    const searchMockData = {
        'default': [
            {
                title: 'Tác động của Fintech đến các ngân hàng thương mại Việt Nam',
                url: 'https://vnu.edu.vn/tin-tuc/tac-dong-cua-fintech-den-ngan-hang',
                snippet: 'Nghiên cứu làm rõ vai trò của công nghệ tài chính đối với việc tối ưu hóa quy trình vận hành và nâng cao trải nghiệm khách hàng tại các ngân hàng thương mại Việt Nam trong kỷ nguyên số.'
            },
            {
                title: 'Phát triển Công nghệ Tài chính trong bối cảnh Cách mạng 4.0',
                url: 'https://sbv.gov.vn/web/sbv/fintech-vietnam-overview',
                snippet: 'Báo cáo chính thức từ Ngân hàng Nhà nước chỉ ra tốc độ tăng trưởng vượt trội của các doanh nghiệp Fintech Việt Nam trong lĩnh vực thanh toán điện tử, ví điện tử...'
            }
        ],
        'site:gov.vn': [
            {
                title: 'Nghị định số ABCXYZ/NĐ-CP của Chính phủ về Cơ chế thử nghiệm có kiểm soát (Sandbox) Fintech',
                url: 'https://chinhphu.gov.vn/van-ban-phap-luat/co-che-sandbox-fintech-vietnam',
                snippet: 'Văn bản quy định chi tiết khung pháp lý thử nghiệm cho các công ty Fintech hoạt động trong lĩnh vực ngân hàng, cho vay ngang hàng (P2P lending), và định danh khách hàng điện tử (eKYC).'
            },
            {
                title: 'Báo cáo Thường niên: Phát triển hạ tầng thanh toán số tại Việt Nam - Ngân hàng Nhà nước',
                url: 'https://sbv.gov.vn/web/tong-hop-du-lieu/bao-cao-thuong-nien-2023',
                snippet: 'Số liệu thống kê chính thức từ Ngân hàng Nhà nước Việt Nam về tỷ lệ số hóa hoạt động thanh toán và chuyển đổi số trong các ngân hàng thương mại Việt Nam giai đoạn 2021-2024.'
            }
        ],
        'filetype:pdf': [
            {
                title: '[PDF] Fintech and the Future of Finance - World Bank Report',
                url: 'https://documents.worldbank.org/curated/en/fintech-future-finance.pdf',
                snippet: 'Bản báo cáo dài 180 trang phân tích chi tiết xu hướng Fintech toàn cầu, tác động vĩ mô đối với hệ thống ngân hàng truyền thống, bài học kinh nghiệm và kiến nghị chính sách cho các nước đang phát triển.'
            },
            {
                title: '[PDF] Fintech và Chuyển đổi số Ngân hàng tại Việt Nam: Thực trạng và Khuyến nghị',
                url: 'https://vnu-is.edu.vn/research/fintech-va-chuyen-doi-so-vnuis-student.pdf',
                snippet: 'Đề tài nghiên cứu khoa học sinh viên VNU-IS phân tích định lượng tác động của Fintech đến tỷ suất sinh lời ROA, ROE của 15 ngân hàng thương mại Việt Nam giai đoạn 2018-2023.'
            }
        ],
        'intitle:Fintech': [
            {
                title: 'Tìm hiểu hệ sinh thái Fintech: Mô hình kinh doanh và Cơ hội cho Gen Z',
                url: 'https://cafef.vn/fintech-ecosystem-trends-gen-z',
                snippet: 'Hệ sinh thái Fintech bao gồm các cấu phần cốt lõi: Thanh toán (Payment), Cho vay (Lending), Quản lý tài sản (Wealthtech), và Công nghệ bảo hiểm (Insurtech)...'
            },
            {
                title: 'Fintech và Ngân hàng số: Trận chiến hay sự hợp tác đôi bên cùng có lợi?',
                url: 'https://vneconomy.vn/fintech-vs-digital-banking-collaboration',
                snippet: 'Phân tích xu hướng chuyển dịch từ đối đầu trực tiếp sang hợp tác chiến lược giữa các công ty Fintech khởi nghiệp và các ngân hàng lớn nhằm chiếm lĩnh thị phần tài chính bán lẻ.'
            }
        ],
        'complex': [
            {
                title: '[PDF] Nghiên cứu tác động của Fintech đến Hiệu quả hoạt động ngân hàng - VNU-IS Academic Database',
                url: 'https://vnu-is.edu.vn/docs/khoa-hoc-cong-nghe-fintech-tac-dong-performance.pdf',
                snippet: 'Sử dụng toán tử tìm kiếm nâng cao: "site:vnu.edu.vn filetype:pdf intitle:fintech". Kết quả lọc chính xác bài báo khoa học chất lượng cao của Đại học Quốc gia Hà Nội về hiệu quả ngân hàng số.'
            }
        ]
    };

    function renderResults(key) {
        const items = searchMockData[key] || searchMockData['default'];
        searchResults.innerHTML = '';
        
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <div class="result-url">${item.url}</div>
                <a href="#" class="result-title">${item.title}</a>
                <div class="result-snippet">${item.snippet}</div>
            `;
            searchResults.appendChild(div);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const selectedVal = searchSelect.value;
            renderResults(selectedVal);
        });
        // Initial render
        renderResults('default');
    }

    // --- TASK 3: PROMPT ENGINEERING PREVIEW ---
    const promptTabs = document.querySelectorAll('.prompt-tab');
    const promptBox = document.getElementById('prompt-input-preview');
    const responseBox = document.getElementById('prompt-output-preview');

    const promptDetails = {
        'basic': {
            prompt: 'Tóm tắt đoạn văn đã nêu trên.',
            response: 'HTML là viết tắt của Hypertext Markup Language, dùng để cấu trúc các trang web và không phải ngôn ngữ lập trình. Tài liệu HTML cấu thành bởi các cặp thẻ đóng mở. Người sáng tạo ra HTML là Tim Berners-Lee và nó được phát triển bởi W3C.'
        },
        'improved': {
            prompt: 'Tóm tắt đoạn văn trong khoảng 5-7 câu, nêu rõ các ý chính quan trọng.',
            response: '1. HTML (Hypertext Markup Language) là ngôn ngữ đánh dấu dùng để cấu trúc trang web.\n2. HTML không phải là ngôn ngữ lập trình.\n3. Các phần tử HTML được quy định bằng các cặp thẻ đóng mở (ví dụ <p> và </p>).\n4. Một số thẻ đặc biệt không cần thẻ đóng (như thẻ <img>).\n5. Tim Berners-Lee là cha đẻ của HTML và World Wide Web.\n6. W3C (World Wide Web Consortium) hiện phụ trách vận hành và phát triển cấu trúc HTML.'
        },
        'advanced': {
            prompt: 'Đóng vai là một Giảng viên môn Thiết kế Web chuyên nghiệp tại VNU-IS. Hãy tóm tắt đoạn văn trên theo định dạng: Ý chính cốt lõi, Các thuật ngữ/Từ khóa quan trọng (kèm giải thích ngắn) và Rút ra kết luận khoa học dễ hiểu nhất cho sinh viên ngành Fintech năm nhất học môn Nhập môn Công nghệ số.',
            response: '📚 [BÀI GIẢNG TÓM TẮT] - GIỚI THIỆU VỀ NGÔN NGỮ HTML\n\n📌 1. Ý CHÍNH CỐT LÕI:\n- Bản chất: HTML (Hypertext Markup Language) là ngôn ngữ đánh dấu siêu văn bản, giữ vai trò xây dựng bộ khung cấu trúc định hình trang web, tuyệt đối không phải ngôn ngữ lập trình logic.\n- Cú pháp vận hành: Trang HTML liên kết bởi các thẻ (tags) đi theo cặp (thẻ mở <tag> và thẻ đóng </tag>). Một số thẻ đặc biệt tự đóng (self-closing) như thẻ hình ảnh <img>.\n- Lịch sử phát triển: Được phát minh bởi Tim Berners-Lee và liên tục tiêu chuẩn hóa bởi tổ chức W3C.\n\n🔑 2. CÁC TỪ KHÓA TRỌNG TÂM CHO SINH VIÊN FINTECH:\n- HTML Elements (Phần tử HTML): Khối xây dựng cơ bản của tài liệu web, định hình bằng thẻ.\n- Tag (Thẻ): Ký hiệu điều khiển trình duyệt hiển thị văn bản đúng định dạng mong muốn.\n- W3C (World Wide Web Consortium): Tổ chức định hình luật chơi và tiêu chuẩn công nghệ toàn cầu trên Internet.\n\n💡 3. KẾT LUẬN SƯ PHẠM:\n"Các em hãy hình dung HTML giống như bộ khung xương của một tòa nhà ngân hàng kỹ thuật số. CSS sẽ là lớp sơn trang trí, và Javascript là hệ thống thang máy vận hành tự động. Việc nắm vững HTML giúp sinh viên FinTech tự tin hiểu được cách hiển thị dữ liệu tài chính trên môi trường web."'
        }
    };

    promptTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            promptTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const level = tab.getAttribute('data-level');
            promptBox.textContent = `Câu lệnh (Prompt): "${promptDetails[level].prompt}"`;
            responseBox.textContent = promptDetails[level].response;
        });
    });

    // --- TASK 5: INTERACTIVE CAROUSEL ---
    const slides = document.querySelector('.carousel-slides');
    const slideItems = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slideItems.length;

    function updateCarousel() {
        if (slides) {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }

    // --- TASK 6: RESPONSIVE ACCORDION ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
