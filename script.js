// Fonction pour gérer le compteur de likes sur les cartes de jeu
function toggleLike(button) {
    // Récupérer la zone du compteur (la balise span à l'intérieur du bouton)
    const countSpan = button.querySelector('span');
    let currentLikes = parseInt(countSpan.textContent);

    // Vérifier si le bouton a déjà été cliqué
    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        currentLikes--;
        button.style.backgroundColor = 'transparent';
        button.style.borderColor = '#30363d';
    } else {
        button.classList.add('liked');
        currentLikes++;
        button.style.backgroundColor = '#006fcd';
        button.style.borderColor = '#006fcd';
    }

    // Mettre à jour le texte du compteur
    countSpan.textContent = currentLikes;
}
