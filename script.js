// --- 1. INITIALISATION ET LOCALSTORAGE ---
let likesData = JSON.parse(localStorage.getItem('crisjeux_likes')) || { spiderman2: 0, eldenring: 0, horizon: 0 };
let cart = [];
let currentFormRating = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Mettre à jour l'affichage visuel des likes sauvegardés au chargement
    for (let key in likesData) {
        const btn = document.querySelector(`[onclick*="'${key}'"]`);
        if(btn) {
            btn.querySelector('.like-count').textContent = likesData[key];
        }
    }
    updateCartUI();
});

// --- 2. GESTION DES LIKES PERSISTANTS ---
function toggleLike(gameKey, button) {
    const countSpan = button.querySelector('.like-count');
    
    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        likesData[gameKey]--;
    } else {
        button.classList.add('liked');
        likesData[gameKey]++;
    }
    
    countSpan.textContent = likesData[gameKey];
    localStorage.setItem('crisjeux_likes', JSON.stringify(likesData));
}

// --- 3. SYSTEME DE PANIER COMPLET ---
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function addToCart(title, price) {
    // Vérifier si l'article est déjà présent
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    updateCartUI();
    // Animation flash sur le panier
    const cartBtn = document.querySelector('.btn-cart-toggle');
    cartBtn.style.transform = 'scale(1.1)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
}

function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalPrice = document.getElementById('cart-total-price');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Votre panier est vide.</p>';
        cartCount.textContent = 0;
        cartTotalPrice.textContent = '0.00€';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div>
                <h4>${item.title} (x${item.quantity})</h4>
                <small style="color: #748094">${(item.price * item.quantity).toFixed(2)}€</small>
            </div>
            <button class="btn-remove" onclick="removeFromCart('${item.title}')">&times;</button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
    
    cartCount.textContent = count;
    cartTotalPrice.textContent = total.toFixed(2) + '€';
}

function checkout() {
    if(cart.length === 0) return;
    alert("🚀 Commande simulée avec succès ! Merci pour votre achat virtuel sur CRISJEUX.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// --- 4. FILTRES AVANCÉS ET RECHERCHE ---
let activeCategory = 'all';
let maxPriceFilter = 80;

function filterCategory(category, button) {
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    activeCategory = category;
    applyAllFilters();
}

function updatePriceFilter(value) {
    document.getElementById('price-val').textContent = value;
    maxPriceFilter = parseInt(value);
    applyAllFilters();
}

function filterGames() {
    applyAllFilters();
}

function applyAllFilters() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title');
        const category = card.getAttribute('data-category');
        const price = parseInt(card.getAttribute('data-price'));

        const matchesSearch = title.includes(searchInput);
        const matchesCategory = (activeCategory === 'all' || category === activeCategory);
        const matchesPrice = price <= maxPriceFilter;

        if (matchesSearch && matchesCategory && matchesPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// --- 5. SYSTEME DE COMMENTAIRES ---
function setRating(rating) {
    currentFormRating = rating;
    const stars = document.querySelectorAll('.rating-stars span');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function submitReview() {
    const pseudo = document.getElementById('review-pseudo').value.trim();
    const text = document.getElementById('review-text').value.trim();
    
    if(!pseudo || !text || currentFormRating === 0) {
        alert("⚠️ Remplis ton pseudo, ton message et choisis une note avec les étoiles !");
        return;
    }
    
    const reviewsList = document.getElementById('reviews-list');
    const starString = '★'.repeat(currentFormRating) + '☆'.repeat(5 - currentFormRating);
    
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
        <h4>${pseudo} <span class="stars-display">${starString}</span></h4>
        <p>${text}</p>
    `;
    
    // Insérer le nouvel avis tout en haut de la liste
    reviewsList.insertBefore(newReview, reviewsList.firstChild);
    
    // Réinitialiser le formulaire
    document.getElementById('review-pseudo').value = '';
    document.getElementById('review-text').value = '';
    setRating(0);
}
