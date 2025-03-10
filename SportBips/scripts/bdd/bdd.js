// bdd.js : Gestion de la base de données

let db;

function openDatabase(callback) {
    const request = indexedDB.open("Workout", 1);

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        createCategoryTable(db);
        createExerciseTable(db);
        createMenuTable(db);
        createMenu_exerciseTable(db);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Base de données ouverte avec succès !");

        // Alimenter les tables après ouverture
        feedCategoryTable(db);
        feedExerciseTable(db);
        feedMenuTable(db);
        feedMenu_exerciseTable(db);

        // Exécuter le callback si fourni
        if (callback) callback(db);
    };

    request.onerror = function(event) {
        console.error("Erreur lors de l'ouverture de la base de données", event.target.error);
    };
}


// // Appel de la fonction pour ouvrir la base de données
// openDatabase();
