// ui.js — Interagir avec l'UI, afficher les résultats, et capturer les actions utilisateur

// Fonction pour gérer le clic sur le bouton "Générer le programme"
function handleGenerateProgramClick() {
    const n = parseInt(document.getElementById("menu-count").value, 10);
    if (!isNaN(n) && n > 0) {
        // Appel au contrôleur pour générer des menus
        controller.generateRandomMenus(n);
    } else {
        console.warn("Veuillez entrer un nombre valide.");
    }
}

// Fonction pour afficher les menus générés dans l'UI
function displayGeneratedMenus(menus) {
    const menuListElement = document.getElementById("menu-list");
    menuListElement.innerHTML = ''; // Effacer les anciens menus
    menus.forEach(menu => {
        const menuElement = document.createElement("li");
        menuElement.textContent = menu.name;
        menuListElement.appendChild(menuElement);
    });
}

// Fonction pour afficher les exercices associés aux menus
function displayExercises(exercises) {
    const exercisesElement = document.getElementById("exercises-list");
    exercisesElement.innerHTML = ''; // Effacer les anciens exercices
    exercises.forEach(exercise => {
        const exerciseElement = document.createElement("li");
        exerciseElement.textContent = exercise.name;
        exercisesElement.appendChild(exerciseElement);
    });
}

// Initialisation de l'UI au lancement de l'application
initUI();


// Fonction pour afficher les menus récupérés
function displayMenus(menus) {
    // Code pour afficher la liste des menus dans l'UI
}

// Fonction pour afficher les exercices associés à un menu
function displayExercises(exercises) {
    // Code pour afficher la liste des exercices dans l'UI
}

// Fonction pour capturer l'action de l'utilisateur pour générer un programme
function captureUserAction() {
    // Code pour capturer l'action de l'utilisateur (par exemple, un clic sur un bouton)
}

// Fonction pour initialiser l'UI
function initUI() {
    // Ajout des écouteurs d'événements pour les boutons
    document.getElementById("generate-program").addEventListener("click", handleGenerateProgramClick);
    // D'autres événements ou initialisations d'UI peuvent être ajoutés ici
}
