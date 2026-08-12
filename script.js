document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MENU MOBILE (HAMBURGUER)
       ========================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    /* ==========================================
       2. BASE DE DADOS DOS PRODUTOS
       ========================================== */
    const amigurumisData = [
        {
            id: 1,
            title: "Chaveiro Ursinho Cupcake",
            category: "comidinhas",
            
            image: "bolinho urso.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 2,
            title: "Mini bolinhos de Aniversário",
            category: "comidinhas",
            
            image: "bolos aniver.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 3,
            title: "Cachorrinho Sylvanian Families",
            category: "outros",
            
            image: "cachorro.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 4,
            title: "Coelhinho Sylvanian Families",
            category: "outros",
            
            image: "coelho.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 5,
            title: "Chaveiro Macaquinho",
            category: "outros",
            
            image: "macaco.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 6,
            title: "Peixinho Azul",
            category: "fundo-do-mar",
            
            image: "peixe azul.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 7,
            title: "Peixe de Crochê Rosa",
            category: "fundo-do-mar",
            
            image: "peixe.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 8,
            title: "Pibble Preto com Pirulito",
            category: "outros",
            
            image: "pibble pirulito.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 9,
            title: "Chaveiro Pibble Branco",
            category: "outros",
            
            image: "pibble.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 10,
            title: "Chaveiro Polvo Azul",
            category: "fundo-do-mar",
            
            image: "polvo.jpg",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 11,
            title: "Chaveiro Gatinho Pudim",
            category: "comidinhas",
            
            image: "pudim gato.png",
            link:" https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 12,
            title: "Mini Rocamboles Variados",
            category: "comidinhas",
            
            image: "rocamboles.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        }
    ];

    const bolsasData = [
        {
            id: 1,
            title: "Bolsa Amarela Fio de Malha",
            category: "fio-de-malha",
            
            image: "bolsa amarela.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 2,
            title: "Bolsa Branca de Linha",
            category: "linha",
            
            image: "bolsa branca.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 3,
            title: "Bolsa Cereja marrom",
            category: "linha",
            
            image: "bolsa cereja.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 4,
            title: "Bolsa Marrom Fio de Malha",
            category: "fio-de-malha",
            
            image: "bolsa marrom.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 5,
            title: "Bolsa Palha de Linha",
            category: "linha",
            
            image: "bolsa palha.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 6,
            title: "Bolsa Fio de Malha Pérola",
            category: "fio-de-malha",
            
            image: "bolsa perola.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        },
        {
            id: 7,
            title: "Bolsa Vinho Fio de Malha",
            category: "fio-de-malha",
            
            image: "bolsa vinho.png",
            link: "https://shopee.com.br/search?keyword=akiras%20arts"
        }
    ];

    /* ==========================================
       3. FUNÇÃO DE RENDERIZAR E FILTRAR
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
                    <p class="price">${item.price}</p>
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn-primary">Ver na Shopee ♡</a>
                </div>
            `).join('');
        }

        // Renderiza todos inicialmente
        displayItems(data);

        // Configuração dos botões de filtro
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

    // Inicialização das grades dependendo da página
    renderProducts(amigurumisData, 'amigurumisGrid');
    renderProducts(bolsasData, 'bolsasGrid');
});