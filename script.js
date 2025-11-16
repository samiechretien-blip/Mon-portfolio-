// Déclaration des variables globales pour le jeu
let couleurCible;
const nombreDeCouleurs = 3; 

// --- Fonctions d'aide pour le jeu ---

// Génère une couleur RGB aléatoire
function genererCouleurAleatoire() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Vérifie si la couleur cliquée est la bonne
function verifierReponse(couleurCliquee) {
    const messageDisplay = document.getElementById('message');
    
    if (couleurCliquee === couleurCible) {
        messageDisplay.textContent = "🥳 Correct! Bien joué!";
        messageDisplay.style.color = 'lime';
        // Désactiver les clics après la victoire
        document.querySelectorAll('.couleur-carre').forEach(carre => {
            carre.style.pointerEvents = 'none';
        });
    } else {
        messageDisplay.textContent = "❌ Faux. Essaie encore!";
        messageDisplay.style.color = 'red';
    }
}

// --- Fonctions de Contrôle de la Modale et du Jeu ---

// Initialise/Réinitialise une nouvelle partie du jeu
function resetJeu() {
    const couleurs = [];
    const messageDisplay = document.getElementById('message');
    const container = document.getElementById('couleurs-container');

    // Génération et choix de la couleur cible
    for (let i = 0; i < nombreDeCouleurs; i++) {
        couleurs.push(genererCouleurAleatoire());
    }
    const indexCible = Math.floor(Math.random() * nombreDeCouleurs);
    couleurCible = couleurs[indexCible];
    
    document.querySelector('.modale-content h3').textContent = `Trouve la couleur: ${couleurCible}`;
    messageDisplay.textContent = "Clique sur la bonne couleur.";
    messageDisplay.style.color = '#f0f0f0'; // Réinitialiser la couleur du message
    container.innerHTML = ''; // Nettoyer les anciens carrés

    // Créer et ajouter les carrés avec leurs événements de clic
    for (let i = 0; i < nombreDeCouleurs; i++) {
        const carre = document.createElement('div');
        carre.classList.add('couleur-carre');
        carre.style.backgroundColor = couleurs[i];
        
        carre.addEventListener('click', function() {
            verifierReponse(carre.style.backgroundColor);
        });

        container.appendChild(carre);
    }
    // S'assurer que les carrés sont cliquables
    document.querySelectorAll('.couleur-carre').forEach(carre => {
        carre.style.pointerEvents = 'auto';
    });
}

// Fonction appelée par le bouton "Voir" pour ouvrir le jeu
function lancerJeu() {
    document.getElementById('jeu-modale').style.display = 'block';
    resetJeu(); // Lance le jeu
}

// Fonction pour fermer la modale
function fermerJeu() {
    document.getElementById('jeu-modale').style.display = 'none';
}

// Fermer la modale en cliquant en dehors
window.onclick = function(event) {
    const modale = document.getElementById('jeu-modale');
    if (event.target === modale) {
        fermerJeu();
    }
}