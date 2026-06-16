// 1. Système de gestion des likes
function toggleLike(button) {
    const countSpan = button.querySelector('span');
    let currentLikes = parseInt(countSpan.textContent);

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        currentLikes--;
        button.style.background = 'rgba(255,255,255,0.03)';
        button.style.borderColor = 'rgba(255,255,255,0.08)';
    } else {
        button.classList.add('liked');
        currentLikes++;
        button.style.background = '#0052ff';
        button.style.borderColor = '#0052ff';
    }
    countSpan.textContent = currentLikes;
}

// 2. Filtre par Catégorie (Action / RPG / Tous)
function filterCategory(category, button) {
    // Mettre à jour l'état actif des boutons
    document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Filtrer les cartes
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 3. Barre de recherche dynamique
function filterGames() {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');

    cards.forEach(card => {
        const title = card.getAttribute('data-title');
        if (title.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 4. Gestion de la Fenêtre Modale (Infos de jeu)
const modal = document.getElementById('game-modal');

function openModal(title, description, price) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-price').textContent = price;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Fermer la modale si on clique à l'extérieur de la fenêtre blanche
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
