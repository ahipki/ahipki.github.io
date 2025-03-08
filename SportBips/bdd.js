// bdd.js

const request = indexedDB.open("Exercise", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;

    // Création de la table "categorie"
    if (!db.objectStoreNames.contains("categorie")) {
        const categorieStore = db.createObjectStore("categorie", { keyPath: "id", autoIncrement: true });
        categorieStore.createIndex("key", "key", { unique: true });
        categorieStore.createIndex("label", "label", { unique: false });
    }

    // Création de la table "exercise"
    if (!db.objectStoreNames.contains("exercise")) {
        const exerciseStore = db.createObjectStore("exercise", { keyPath: "key" });
        exerciseStore.createIndex("key", "key", { unique: true });
        exerciseStore.createIndex("label", "label", { unique: false });
        exerciseStore.createIndex("categoryId", "categoryId", { unique: false }); 
    }

    // Création de la table "menu"
    if (!db.objectStoreNames.contains("menu")) {
        const menuStore = db.createObjectStore("menu", { keyPath: "key" });
        menuStore.createIndex("key", "key", { unique: true });
        menuStore.createIndex("label", "label", { unique: false });
        menuStore.createIndex("categoryId", "categoryId", { unique: false }); 
        menuStore.createIndex("favorite", "favorite", { unique: false });
    }

    // Création de la table "liaison" (table de liaison entre menu et exercise)
    if (!db.objectStoreNames.contains("liaison")) {
        const liaisonStore = db.createObjectStore("liaison", { keyPath: "id", autoIncrement: true });
        liaisonStore.createIndex("menuId", "menuId", { unique: false }); 
        liaisonStore.createIndex("exerciseId", "exerciseId", { unique: false }); 
    }
};

request.onsuccess = function(event) {
    const db = event.target.result;
    console.log("Base de données ouverte avec succès !");
};

request.onerror = function(event) {
    console.error("Erreur lors de l'ouverture de la base de données", event.target.error);
};
