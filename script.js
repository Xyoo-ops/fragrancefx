// ==================================
// ===       DATA LOKAL ÉLÉGANCE     ===
// ==================================

const products = [
    { id: 1, name: "Velvet Noir", category: "Unisex", price: 2500000, gender: "Unisex", notes: { top: "Bergamot, Saffron", middle: "Rose, Oud", base: "Vanilla, Amber" }, description: "Intense dan misterius, perpaduan sempurna antara Timur Tengah dan Eropa.", image: "placeholder-noir.png", tags: ["Oud", "Intense", "Winter", "Unisex"], isBestseller: true },
    { id: 2, name: "Citrus Royale", category: "Fresh", price: 1800000, gender: "Pria", notes: { top: "Lemon, Grapefruit", middle: "Mint, Ginger", base: "Vetiver, Musk" }, description: "Energi segar dari buah sitrus Italia, cocok untuk cuaca panas dan aktivitas harian.", image: "placeholder-citrus.png", tags: ["Fresh", "Citrus", "Summer", "Pria"], isBestseller: false },
    { id: 3, name: "Rose Éternelle", category: "Floral", price: 2200000, gender: "Wanita", notes: { top: "Pink Pepper, Lychee", middle: "Turkish Rose, Peony", base: "Cashmeran, Cedar" }, description: "Wewangian feminin dan romantis, menangkap esensi mawar abadi.", image: "placeholder-rose.png", tags: ["Floral", "Romantic", "Spring", "Wanita"], isBestseller: true },
    { id: 4, name: "Leather & Smoke", category: "Woody", price: 2800000, gender: "Pria", notes: { top: "Cardamom, Tobacco", middle: "Leather, Incense", base: "Patchouli, Sandalwood" }, description: "Aroma maskulin yang gelap dan canggih, seperti duduk di klub kulit yang mewah.", image: "placeholder-leather.png", tags: ["Woody", "Dark", "Fall", "Pria"], isBestseller: false },
    { id: 5, name: "Santal Mystic", category: "Woody", price: 2100000, gender: "Unisex", notes: { top: "Carrot Seed, Violet", middle: "Sandalwood, Orris", base: "Cedarwood, Cypriol" }, description: "Ketenangan dan kehangatan dari hutan cendana yang sunyi.", image: "placeholder-santal.png", tags: ["Woody", "Calm", "Unisex", "Fall"], isBestseller: true },
    { id: 6, name: "Oud Prestige", category: "Oud", price: 3500000, gender: "Unisex", notes: { top: "Raspberry, Geranium", middle: "Oud, Amberwood", base: "Benzoin, Frankincense" }, description: "Manifestasi kemewahan timur, dengan Oud berkualitas tertinggi.", image: "placeholder-oud.png", tags: ["Oud", "Luxury", "Winter", "Unisex"], isBestseller: true },
    { id: 7, name: "Gourmand Divine", category: "Gourmand", price: 1900000, gender: "Wanita", notes: { top: "Almond, Coffee", middle: "Jasmine, Tuberose", base: "Vanilla, Cacao" }, description: "Wewangian manis yang menggugah selera, seperti hidangan penutup yang kaya.", image: "placeholder-gourmand.png", tags: ["Gourmand", "Sweet", "Winter", "Wanita"], isBestseller: false },
];

const quiz = [
    {
        question: "1. Kapan waktu yang paling sering Anda gunakan untuk memakai parfum?",
        key: "occasion",
        options: [
            { text: "Harian, untuk bekerja atau santai.", value: "daily" },
            { text: "Acara malam/khusus, pertemuan penting.", value: "special" },
            { text: "Saat berlibur atau di musim panas.", value: "summer" },
            { text: "Musim dingin atau cuaca dingin.", value: "winter" },
        ]
    },
    {
        question: "2. Apa jenis aroma yang paling Anda sukai?",
        key: "scent_type",
        options: [
            { text: "Aroma kayu, gelap, atau pedas.", value: "Woody" },
            { text: "Aroma bunga, lembut, dan romantis.", value: "Floral" },
            { text: "Aroma segar, buah, atau sitrus.", value: "Fresh" },
            { text: "Aroma manis, vanilla, atau kopi (Gourmand).", value: "Gourmand" },
        ]
    },
    {
        question: "3. Apa kepribadian yang Anda ingin cerminkan melalui parfum?",
        key: "personality",
        options: [
            { text: "Elegan, dewasa, dan berwibawa.", value: "Mature" },
            { text: "Energik, ceria, dan mudah bergaul.", value: "Energetic" },
            { text: "Misterius, sensual, dan berani.", value: "Mysterious" },
            { text: "Tenang, lembut, dan menenangkan.", value: "Calm" },
        ]
    }
];

let cart = JSON.parse(localStorage.getItem('eleganceCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('eleganceWishlist')) || [];
let currentProductModal = null;
let currentQuestionIndex = 0;
let quizResults = {};
let selectedPage = 'beranda'; // Default page

// ==================================
// ===      UTILITIES & UI LOGIC    ===
// ==================================

// Page Switching
function setActiveNavLink(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-white', 'font-bold');
        link.classList.add('text-gray-300', 'font-medium');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('text-brand-gold-400', 'font-semibold');
            link.classList.remove('text-gray-300', 'font-medium');
        }
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active');
    });
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.remove('hidden');
        page.classList.add('active');
        setActiveNavLink(pageId);
        selectedPage = pageId;

        // Call specific render functions based on page
        if (pageId === 'koleksi') renderProducts('all');
        if (pageId === 'koleksi-pria') renderProducts('Pria');
        if (pageId === 'koleksi-wanita') renderProducts('Wanita');
        if (pageId === 'cart') renderCart();
        if (pageId === 'wishlist') renderWishlist();
        if (pageId === 'quiz') {
            // Reset quiz state when navigating away/to the page
            currentQuestionIndex = 0;
            quizResults = {};
            renderQuestion(); // Render the start or first question
        }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const toggleBtn = document.getElementById('menu-toggle');
    if (menu.classList.contains('-translate-y-full')) {
        menu.classList.remove('-translate-y-full');
        // Change icon to close (X)
        toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;
    } else {
        menu.classList.add('-translate-y-full');
        // Change icon to menu (Burger)
        toggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg>`;
    }
}

function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    if (overlay.classList.contains('hidden')) {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        setTimeout(() => input.focus(), 300);
    } else {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
    }
}

// Notification System
function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'fixed top-20 right-4 z-[200] bg-zinc-900 text-white px-6 py-3 rounded-lg shadow-xl border border-brand-gold-400/20 max-w-sm transform translate-x-full opacity-0';
        document.body.appendChild(notification);
    }

    notification.textContent = message;
    // Show
    notification.classList.remove('opacity-0', 'translate-x-full');
    notification.classList.add('opacity-100', 'translate-x-0');

    setTimeout(() => {
        // Hide
        notification.classList.remove('opacity-100', 'translate-x-0');
        notification.classList.add('opacity-0', 'translate-x-full');
    }, 3000);
}

// ==================================
// ===      PRODUCT RENDERING       ===
// ==================================

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function renderProductCard(product) {
    const isInWishlist = wishlist.includes(product.id);
    return `
        <div class="product-card group bg-zinc-900 rounded-lg shadow-lg overflow-hidden border border-brand-gold-400/10 hover:shadow-brand-gold-400/20 p-4">
            <div class="relative overflow-hidden cursor-pointer" onclick="showProductModal(${product.id})">
                <img src="${product.image}" alt="${product.name}" class="product-card-image w-full h-64 object-cover mx-auto transition-transform duration-500 rounded-md">
                <button class="product-card-wishlist absolute top-3 right-3 p-2 bg-black/50 rounded-full" onclick="event.stopPropagation(); toggleWishlist(${product.id});">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}" fill="${isInWishlist ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-.318-.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
            </div>
            <div class="p-4 text-center">
                <h3 class="font-serif text-xl font-bold text-white mb-1 truncate">${product.name}</h3>
                <p class="text-sm text-brand-gold-400 mb-3">${product.category}</p>
                <p class="text-lg font-semibold text-gray-200 mb-4">${formatRupiah(product.price)}</p>
                <button onclick="addToCart(${product.id})" class="w-full px-4 py-2 text-sm uppercase tracking-wider font-semibold bg-brand-gold-400 text-black rounded-full hover:bg-brand-gold-300 transition-all">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function renderProducts(filter) {
    let filteredProducts = products;
    let containerId = 'product-list';

    if (filter === 'Pria') {
        filteredProducts = products.filter(p => p.gender === 'Pria' || p.gender === 'Unisex');
        containerId = 'product-list-pria';
    } else if (filter === 'Wanita') {
        filteredProducts = products.filter(p => p.gender === 'Wanita' || p.gender === 'Unisex');
        containerId = 'product-list-wanita';
    } else if (filter !== 'all') {
        filteredProducts = products.filter(p => p.tags.includes(filter));
    }

    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = filteredProducts.map(renderProductCard).join('');
    }

    // Render bestsellers for Home page
    if (selectedPage === 'beranda') {
        const bestsellerContainer = document.getElementById('bestseller-products');
        if (bestsellerContainer) {
            bestsellerContainer.innerHTML = products.filter(p => p.isBestseller).map(renderProductCard).join('');
        }
    }
}

// ==================================
// ===       CART & WISHLIST        ===
// ==================================

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function updateWishlistCount() {
    document.getElementById('wishlist-count').textContent = wishlist.length;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('eleganceCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} ditambahkan ke Keranjang!`);
    if (selectedPage === 'cart') renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    const emptyMessage = document.getElementById('empty-cart-message');
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '';
        summary.style.display = 'none';
        emptyMessage.classList.remove('hidden');
        return;
    }

    emptyMessage.classList.add('hidden');
    summary.style.display = 'flex';

    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="flex items-center bg-zinc-800 p-4 rounded-lg shadow-md border border-brand-gold-400/10 animate-fade-in">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
                <div class="flex-grow">
                    <h3 class="font-serif text-lg font-bold text-white">${item.name}</h3>
                    <p class="text-sm text-brand-gold-400">${formatRupiah(item.price)}</p>
                </div>
                <div class="flex items-center space-x-3">
                    <button onclick="changeQuantity(${item.id}, -1)" class="text-gray-400 hover:text-white">-</button>
                    <span class="text-white">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="text-gray-400 hover:text-white">+</button>
                    <span class="text-white w-24 text-right">${formatRupiah(item.price * item.quantity)}</span>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-400 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('cart-total').textContent = formatRupiah(total);
}

function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('eleganceCart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('eleganceCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} dihapus dari Keranjang.`);
    renderCart();
}


function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const index = wishlist.indexOf(productId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${product.name} dihapus dari Wishlist.`);
    } else {
        wishlist.push(productId);
        showNotification(`${product.name} ditambahkan ke Wishlist!`);
    }

    localStorage.setItem('eleganceWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistButton();
    if (selectedPage === 'wishlist') renderWishlist();
    if (selectedPage === 'koleksi' || selectedPage === 'beranda') renderProducts(selectedPage); // Re-render to update icon
}

function renderWishlist() {
    const container = document.getElementById('wishlist-items');
    const emptyMessage = document.getElementById('empty-wishlist-message');
    
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
        container.innerHTML = '';
        emptyMessage.classList.remove('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        container.innerHTML = wishlistProducts.map(renderProductCard).join('');
    }
}

// ==================================
// ===       PRODUCT MODAL          ===
// ==================================

function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    currentProductModal = product;

    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-price').textContent = formatRupiah(product.price);
    document.getElementById('modal-top-notes').textContent = product.notes.top;
    document.getElementById('modal-middle-notes').textContent = product.notes.middle;
    document.getElementById('modal-base-notes').textContent = product.notes.base;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-image').alt = product.name;
    
    // Set button click handlers
    document.getElementById('modal-add-to-cart').onclick = () => {
        addToCart(product.id);
        closeProductModal();
    };
    document.getElementById('modal-wishlist-btn').onclick = (e) => {
        e.stopPropagation();
        toggleWishlist(product.id);
        updateWishlistButton(); // Update button immediately without closing
    };
    
    updateWishlistButton(); // Check wishlist status

    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-content-container');
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Prevent background scroll
    
    // Animate in
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 50);
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-content-container');
    
    // Animate out
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        currentProductModal = null;
    }, 300);
}

function updateWishlistButton() {
    const btn = document.getElementById('modal-wishlist-btn');
    if (!btn || !currentProductModal) return;

    const isInWishlist = wishlist.includes(currentProductModal.id);
    const svg = btn.querySelector('svg');

    svg.classList.toggle('text-red-500', isInWishlist);
    svg.classList.toggle('fill-red-500', isInWishlist);
    svg.classList.toggle('text-gray-400', !isInWishlist);
    svg.classList.toggle('fill-none', !isInWishlist);
}

// ==================================
// ===        QUIZ LOGIC            ===
// ==================================

function runQuiz() {
    document.getElementById('quiz-start-btn').classList.add('hidden');
    document.getElementById('quiz-next-btn').classList.remove('hidden');
    currentQuestionIndex = 0;
    quizResults = {};
    renderQuestion();
}

function renderQuestion() {
    const content = document.getElementById('quiz-content');
    const backBtn = document.getElementById('quiz-back-btn');
    const nextBtn = document.getElementById('quiz-next-btn');
    const progress = document.getElementById('quiz-progress');

    // Update Progress Bar
    const progressPercentage = ((currentQuestionIndex) / quiz.length) * 100;
    progress.style.width = `${progressPercentage}%`;

    // Back button logic
    if (currentQuestionIndex === 0) {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
    }

    // End of Quiz (Result Screen)
    if (currentQuestionIndex >= quiz.length) {
        nextBtn.classList.add('hidden');
        progress.style.width = '100%';
        showQuizResult(content);
        return;
    }

    // Current Question
    const currentQ = quiz[currentQuestionIndex];
    
    // Determine selected answer for current question (if any)
    const selectedValue = quizResults[currentQ.key];

    content.innerHTML = `
        <h2 class="text-3xl font-serif text-brand-gold-400 font-semibold mb-6">${currentQ.question}</h2>
        <div id="quiz-options" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${currentQ.options.map(option => `
                <button 
                    class="quiz-option p-4 rounded-lg text-left border border-zinc-700 hover:bg-zinc-800 ${selectedValue === option.value ? 'bg-brand-gold-400 text-black border-brand-gold-400 shadow-lg' : 'bg-zinc-800 text-gray-200'}"
                    onclick="handleAnswer('${currentQ.key}', '${option.value}')"
                    data-value="${option.value}"
                >
                    ${option.text}
                </button>
            `).join('')}
        </div>
    `;
    
    // Check if answer is selected to enable next button
    if (selectedValue) {
        nextBtn.textContent = (currentQuestionIndex === quiz.length - 1) ? 'Lihat Hasil' : 'Lanjut →';
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        nextBtn.textContent = 'Lanjut →';
        nextBtn.disabled = true;
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function handleAnswer(key, value) {
    quizResults[key] = value;
    
    // Update UI to show selected state
    document.querySelectorAll('#quiz-options button').forEach(btn => {
        const isSelected = btn.getAttribute('data-value') === value;
        btn.classList.toggle('bg-brand-gold-400', isSelected);
        btn.classList.toggle('text-black', isSelected);
        btn.classList.toggle('border-brand-gold-400', isSelected);
        btn.classList.toggle('bg-zinc-800', !isSelected);
        btn.classList.toggle('text-gray-200', !isSelected);
    });

    // Enable next button
    const nextBtn = document.getElementById('quiz-next-btn');
    nextBtn.textContent = (currentQuestionIndex === quiz.length - 1) ? 'Lihat Hasil' : 'Lanjut →';
    nextBtn.disabled = false;
    nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
}

function handleNext() {
    if (quizResults[quiz[currentQuestionIndex].key] || currentQuestionIndex >= quiz.length) {
        currentQuestionIndex++;
        renderQuestion();
    }
}

function handleBack() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function calculateBestMatch() {
    let scores = {};

    // Initialize scores for all products
    products.forEach(p => scores[p.id] = 0);

    // Scoring logic based on quiz results
    const { occasion, scent_type, personality } = quizResults;

    products.forEach(p => {
        let score = 0;
        
        // Score 1: Scent Type (Primary match)
        if (p.tags.includes(scent_type)) {
            score += 10; 
        } else if (p.category === scent_type) {
            score += 8;
        }

        // Score 2: Occasion/Season
        if (occasion === 'daily' && (p.tags.includes('Fresh') || p.tags.includes('Calm'))) {
            score += 5;
        } else if (occasion === 'special' && (p.tags.includes('Intense') || p.tags.includes('Luxury'))) {
            score += 7;
        } else if (occasion === 'summer' && p.tags.includes('Summer')) {
            score += 7;
        } else if (occasion === 'winter' && p.tags.includes('Winter')) {
            score += 7;
        }

        // Score 3: Personality (Bonus)
        if (personality === 'Mysterious' && p.tags.includes('Dark')) {
            score += 3;
        } else if (personality === 'Energetic' && p.tags.includes('Citrus')) {
            score += 3;
        } else if (personality === 'Calm' && p.tags.includes('Calm')) {
            score += 3;
        } else if (personality === 'Mature' && p.tags.includes('Oud')) {
            score += 3;
        }

        scores[p.id] = score;
    });

    // Convert to array, sort by score descending, and take top 3
    const sortedResults = Object.keys(scores)
        .map(id => ({ id: parseInt(id), score: scores[id] }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
    
    return sortedResults.map(r => products.find(p => p.id === r.id));
}

function showQuizResult(container) {
    const bestMatches = calculateBestMatch();
    
    container.innerHTML = `
        <div class="text-center animate-fade-in-up">
            <h2 class="font-serif text-5xl font-bold text-brand-gold-400 mb-6">Hasil Rekomendasi</h2>
            <p class="text-lg text-gray-300 mb-10">Berdasarkan jawaban Anda, berikut adalah parfum ÉLÉGANCE yang paling cocok untuk Anda:</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${bestMatches.map(product => `
                <div class="product-card group bg-zinc-800 p-4 rounded-lg shadow-xl border border-brand-gold-400/20 text-center cursor-pointer" onclick="showProductModal(${product.id})">
                    <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-cover mx-auto mb-3 rounded-full border-2 border-brand-gold-400/50">
                    <h3 class="font-serif text-xl font-bold text-white">${product.name}</h3>
                    <p class="text-sm text-brand-gold-300">${product.category}</p>
                    <p class="mt-2 text-xs text-gray-400">Skor Match: ${products.find(p => p.id === product.id).tags.includes(quizResults.scent_type) ? 'Tinggi' : 'Baik'}</p>
                </div>
            `).join('')}
        </div>
        <div class="text-center mt-10">
            <button onclick="runQuiz()" class="px-6 py-2 border border-brand-gold-400 text-brand-gold-400 rounded-full hover:bg-brand-gold-400 hover:text-black transition-colors">
                Ulangi Kuis
            </button>
        </div>
    `;
    
    document.getElementById('quiz-back-btn').classList.add('hidden');
}


// ==================================
// ===        BACKGROUND STARS      ===
// ==================================

function createStar(skyContainer) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    const size = Math.random() * 3 + 1; 
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    
    const duration = Math.random() * 3 + 2; 
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    skyContainer.appendChild(star);
}

function createShootingStar(skyContainer, index) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    shootingStar.style.top = `${Math.random() * 30 - 10}%`;
    shootingStar.style.left = `${Math.random() * 50 + 100}%`; // Start off-screen right
    shootingStar.style.animationDelay = `${Math.random() * 10 + (index * 5)}s`; 
    shootingStar.style.animationDuration = `${Math.random() * 5 + 5}s`; 
    
    skyContainer.appendChild(shootingStar);
}

function initNightSky() {
    const skyContainer = document.getElementById('night-sky-background');
    if (!skyContainer) return;
    
    // 1. Create Bintang Berkelip (100 stars)
    for (let i = 0; i < 100; i++) {
        createStar(skyContainer);
    }

    // 2. Create Bintang Jatuh (3 stars)
    for (let j = 0; j < 3; j++) {
        createShootingStar(skyContainer, j);
    }
}

// ==================================
// ===        INITIALIZATION        ===
// ==================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial UI setup
    initNightSky();
    showPage(selectedPage); // Render default page
    updateCartCount();
    updateWishlistCount();

    // 2. Loading Curtain
    const loadingCurtain = document.getElementById('loading-curtain');
    setTimeout(() => {
        loadingCurtain.classList.add('fade-out');
    }, 1000);
    setTimeout(() => {
        loadingCurtain.style.display = 'none';
    }, 2000);

    // 3. Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if(window.scrollY > 50){
            header.classList.add('py-3','bg-black/90');
            header.classList.remove('py-5','bg-black/70');
        } else {
            header.classList.remove('py-3','bg-black/90');
            header.classList.add('py-5','bg-black/70');
        }
    });

    // 4. Mobile Menu Toggle
    document.getElementById('menu-toggle').addEventListener('click', toggleMobileMenu);

    // Initial rendering of all filtered product pages
    renderProducts('all');
    renderProducts('Pria');
    renderProducts('Wanita');
});