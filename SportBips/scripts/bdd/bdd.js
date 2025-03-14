// bdd.js : Gestion de la base de données

let dbInstance = null;

function openDatabase(callback) {
	if (dbInstance) {
        callback(dbInstance);
        return;
    }
    const request = indexedDB.open("Workout", 1);

    request.onupgradeneeded = function(event) {
        dbInstance  = event.target.result;
        createCategoryTable(dbInstance );
        createExerciseTable(dbInstance );
        createMenuTable(dbInstance );
        createMenu_exerciseTable(dbInstance );
    };

    request.onsuccess = function(event) {
        dbInstance  = event.target.result;
        console.log("Base de données ouverte avec succès !");

        // Alimenter les tables après ouverture
        feedCategoryTable(dbInstance );
        feedExerciseTable(dbInstance );
        feedMenuTable(dbInstance );
        feedMenu_exerciseTable(dbInstance );

        // Exécuter le callback si fourni
        if (callback) callback(dbInstance );
    };

    request.onerror = function(event) {
        console.error("Erreur lors de l'ouverture de la base de données", event.target.error);
    };
}


// // Appel de la fonction pour ouvrir la base de données
// openDatabase();
