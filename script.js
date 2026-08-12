document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. CONSTANTE COM LINK OFICIAL DA SHOPEE
       ========================================== */
    const SHOPEE_URL = "https://shopee.com.br/akirasarts?entryPoint=ShopBySearch&searchKeyword=akiras%20arts";
    const QR_CODE_API = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(SHOPEE_URL)}`;

    /* ==========================================
       2. ATUALIZAR TODOS OS LINKS DA SHOPEE
       ========================================== */
    function updateShopeeLinks() {
        document.querySelectorAll('a[href*="shopee.com.br"]').forEach(link => {
            link.href = SHOPEE_URL;
        });
    }
    updateShopeeLinks();

    /* ==========================================
       3. MODAL DE QR CODE PARA ACESSO VIA CELULAR
       ========================================== */
    function setupQRCodeModal() {
        const modalHTML = `
            <div id="qrModal" class="qr-modal">
                <div class="qr-modal-content">
                    <span class="qr-close-btn">&times;</span>
                    <h3>Acesse no Celular ♡</h3>
                    <p>Aponte a câmera do celular para abrir a loja Akira's Arts na Shopee:</p>
                    <img src="${QR_CODE_API}" alt="QR Code Shopee Akira's Arts" class="qr-code-img">
                    <a href="${SHOPEE_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="margin-top: 10px; width: 100%;">
                        Abrir Loja Direto ♡
                    </a>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('qrModal');
        const closeBtn = modal.querySelector('.qr-close-btn');

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    setupQRCodeModal();

    // Função global para abrir o modal de QR Code
    window.openShopeeQR = function(e) {
        if (e) e.preventDefault();
        const modal = document.getElementById('qrModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    };

    /* ==========================================
       4. MENU MOBILE (HAMBURGUER E FECHAMENTO)
       ========================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Fechar ao clicar em qualquer link do menu
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /* ==========================================
       5. BASE DE DADOS DOS PRODUTOS
       ========================================== */
    const amigurumisData = [
        { id: 1, title: "Chaveiro Ursinho Cupcake", category: "comidinhas", image: "bolinho urso.jpg" },
        { id: 2, title: "Mini bolinhos de Aniversário", category: "comidinhas", image: "bolos aniver.png" },
        { id: 3, title: "Cachorrinho Sylvanian Families", category: "outros", image: "cachorro.jpg" },
        { id: 4, title: "Coelhinho Sylvanian Families", category: "outros", image: "coelho.jpg" },
        { id: 5, title: "Chaveiro Macaquinho", category: "outros", image: "macaco.jpg" },
        { id: 6, title: "Peixinho Azul", category: "fundo-do-mar", image: "peixe azul.jpg" },
        { id: 7, title: "Peixe de Crochê Rosa", category: "fundo-do-mar", image: "peixe.jpg" },
        { id: 8, title: "Pibble Preto com Pirulito", category: "outros", image: "pibble pirulito.jpg" },
        { id: 9, title: "Chaveiro Pibble Branco", category: "outros", image: "pibble.jpg" },
        { id: 10, title: "Chaveiro Polvo Azul", category: "fundo-do-mar", image: "polvo.jpg" },
        { id: 11, title: "Chaveiro Gatinho Pudim", category: "comidinhas", image: "pudim gato.png" },
        { id: 12, title: "Mini Rocamboles Variados", category: "comidinhas", image: "rocamboles.png" }
    ];

    const bolsasData = [
        { id: 1, title: "Bolsa Amarela Fio de Malha", category: "fio-de-malha", image: "bolsa amarela.png" },
        { id: 2, title: "Bolsa Branca de Linha", category: "linha", image: "bolsa branca.png" },
        { id: 3, title: "Bolsa Cereja marrom", category: "linha", image: "bolsa cereja.png" },
        { id: 4, title: "Bolsa Marrom Fio de Malha", category: "fio-de-malha", image: "bolsa marrom.png" },
        { id: 5, title: "Bolsa Palha de Linha", category: "linha", image: "bolsa palha.png" },
        { id: 6, title: "Bolsa Fio de Malha Pérola", category: "fio-de-malha", image: "bolsa perola.png" },
        { id: 7, title: "Bolsa Vinho Fio de Malha", category: "fio-de-malha", image: "bolsa vinho.png" }
    ];

    /* ==========================================
       6. FUNÇÃO DE RENDERIZAR E FILTRAR PRODUTOS
       ========================================== */
    function renderProducts(data, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        function displayItems(items) {
            container.innerHTML = items.map(item => `
                <div class="product-card" data-category="${item.category}">
                    <div class="product-img-wrapper">
                        <img src="${item.image}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/250x200/ffd1dc/8b008b?text=${encodeURIComponent(item.title)}'">
                    </div>
                    <h3>${item.title}</h3>
                    <div>
                        <a href="${SHOPEE_URL}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: 100%;">Ver na Shopee ♡</a>
                        <button onclick="openShopeeQR(event)" class="qr-trigger-btn">📱 Escanear QR Code</button>
                    </div>
                </div>
            `).join('');
        }

        displayItems(data);

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');
                if (filterValue === 'all') {
                    displayItems(data);
                } else {
                    const filteredData = data.filter(item => item.category === filterValue);
                    displayItems(filteredData);
                }
            });
        });
    }

    renderProducts(amigurumisData, 'amigurumisGrid');
    renderProducts(bolsasData, 'bolsasGrid');
});