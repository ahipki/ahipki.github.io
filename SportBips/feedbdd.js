// feedbdd.js

// Fonction pour alimenter les tables d'exercices, de menus, de catégories et de liaisons
function feedDatabase(db) {
    const transaction = db.transaction(["categorie", "exercise", "menu", "liaison"], "readwrite");

    // Alimentation de la table "categorie"
    const categorieStore = transaction.objectStore("categorie");
    const categories = [
        { key: "CAR", label: "Cardio" }, //0
        { key: "ETI", label: "Etirement" }, //1
        { key: "POI", label: "Poids" }, //2
        { key: "GAIN", label: "Gainage" }, //3
		{ key: "MULTI", label: "Multiple" }, //4
		{ key: "Dos", label: "Dos" }, //5
		{ key: "Jam", label: "Jambes" , //6
		{ key: "Bras", label: "Bras" }, //7
		{ key: "Abdo", label: "Abdos" }, //8
        { key: "EQU", label: "Equilibre" }, //9
    ];

    // Ajout des catégories et stockage de leurs IDs
	const categoryIds = []; 
    categories.forEach(category => {
        const request = categorieStore.add(category);
        request.onsuccess = function(event) {
            categoryIds.push(event.target.result); // Récupère l'id auto-incrémenté
        };
    });

    // Alimentation de la table "exercise"
    const exerciseStore = transaction.objectStore("exercise");
    const exercises = [
        { key: "JJ", label: "Jumping Jacks", categoryId: categoryIds[0] },  
        { key: "SPM", label: "Superman", categoryId: categoryIds[5] }, 
        { key: "SQT", label: "Squats", categoryId: categoryIds[6] },  
        { key: "PU", label: "Push-ups", categoryId: categoryIds[4] }, 
        { key: "GB", label: "Gainage Bassin", categoryId: categoryIds[3] },  
        { key: "DOG", label: "Bird Dog", categoryId: categoryIds[4] }, 
        { key: "HK", label: "High Knees", categoryId: categoryIds[0] },  
        { key: "RA", label: "Reverse Angels", categoryId: categoryIds[5] }, 
        { key: "FNT", label: "Fentes", categoryId: categoryIds[6] },  
        { key: "BC", label: "Bicycle Crunches", categoryId: categoryIds[8] }, 
        { key: "SPW", label: "Side Plank Walk", categoryId: categoryIds[4] },  
        { key: "BDG", label: "Bridge", categoryId: categoryIds[3] }, 
        { key: "BRP", label: "Burpees", categoryId: categoryIds[0] },  
        { key: "WS", label: "Wall Slides", categoryId: categoryIds[5] }, 
        { key: "CHZ", label: "Chaise", categoryId: categoryIds[6] },  
        { key: "ARJ", label: "Abdos relevés de jambes", categoryId: categoryIds[8] }, 
        { key: "CDL", label: "Chandelle", categoryId: categoryIds[3] },  
        { key: "PL2", label: "Plank Alternate", categoryId: categoryIds[5] }, 
        { key: "BER", label: "Bear walk", categoryId: categoryIds[3] },  
        { key: "REV", label: "Fentes Reverence", categoryId: categoryIds[4] }, 
        { key: "ABD", label: "Abdos", categoryId: categoryIds[8] },  
        { key: "180", label: "180 Plank Reach", categoryId: categoryIds[3] }, 
        { key: "ASB", label: "Alt Swing Back", categoryId: categoryIds[5] },  
        { key: "PPU", label: "Pike Push-up", categoryId: categoryIds[7] }, 
        { key: "RSP", label: "Reverse Superman", categoryId: categoryIds[8] },  
        { key: "MC", label: "Mountain Climbers", categoryId: categoryIds[4] }, 
        { key: "", label: "", categoryId: categoryIds[4] },  
        { key: "", label: "", categoryId: categoryIds[3] }, 
        { key: "", label: "", categoryId: categoryIds[0] },  
        { key: "", label: "", categoryId: categoryIds[5] }, 
        { key: "", label: "", categoryId: categoryIds[6] },  
        { key: "", label: "", categoryId: categoryIds[8] }, 
        { key: "", label: "", categoryId: categoryIds[3] }
    ];

    // Ajout des exercices à la base de données
    exercises.forEach(exercise => {
        exerciseStore.add(exercise);
    });

    // Alimentation de la table "menu"
    const menuStore = transaction.objectStore("menu");
    const menus = [
        { key: "menu1", label: "Menu 1", categoryId: categoryIds[0], favorite: false },  // Lier à la catégorie Cardio
        { key: "menu2", label: "Menu 2", categoryId: categoryIds[1], favorite: false },  // Lier à la catégorie Force
        { key: "menu3", label: "Menu 3", categoryId: categoryIds[2], favorite: false },  // Lier à la catégorie Souplesse
        { key: "menu4", label: "Menu 4", categoryId: categoryIds[3], favorite: false },  // Lier à la catégorie Endurance
        { key: "menu5", label: "Menu 5", categoryId: categoryIds[0], favorite: true },   // Lier à la catégorie Cardio et marqué comme favori
        { key: "menu6", label: "Menu 6", categoryId: categoryIds[1], favorite: false }   // Lier à la catégorie Force
    ];

    // Ajout des menus à la base de données
    menus.forEach(menu => {
        menuStore.add(menu);
    });

    // Alimentation de la table "liaison" qui lie les menus aux exercices
    const liaisonStore = transaction.objectStore("liaison");
    const liaisons = [
        { menuKey: "menu1", exerciseKey: "ex1" },  // Lier Menu 1 avec Exercice 1
        { menuKey: "menu1", exerciseKey: "ex2" },  // Lier Menu 1 avec Exercice 2
        { menuKey: "menu2", exerciseKey: "ex3" },  // Lier Menu 2 avec Exercice 3
        { menuKey: "menu2", exerciseKey: "ex4" },  // Lier Menu 2 avec Exercice 4
        { menuKey: "menu3", exerciseKey: "ex5" },  // Lier Menu 3 avec Exercice 5
        // Ajoute plus de liaisons ici si nécessaire
    ];

    // Ajout des liaisons à la table de liaison
    liaisons.forEach(liaison => {
        liaisonStore.add(liaison);
    });

    transaction.oncomplete = function() {
        console.log("Données insérées dans la base de données avec succès !");
    };

    transaction.onerror = function(event) {
        console.error("Erreur lors de l'insertion des données", event.target.error);
    };
}

// Exemple d'appel de la fonction dans ton code principal
const request = indexedDB.open("myDatabase", 1);

request.onsuccess = function(event) {
    const db = event.target.result;
    feedDatabase(db);
};

request.onerror = function(event) {
    console.error("Erreur lors de l'ouverture de la base de données", event.target.error);
};
