// infrastructure.js — Gérer les opérations CRUD pour interagir avec la base de données
function getMenuExerciseMappings(db, menuKeys, callback) {
    const transaction = db.transaction(["menu_exercise"], "readonly");
    const store = transaction.objectStore("menu_exercise");
    const request = store.getAll();

    request.onsuccess = function(event) {
        const allMappings = event.target.result;

        const filteredMappings = allMappings.filter(mapping => menuKeys.includes(mapping.menuKey));
        callback(filteredMappings);
    };

    request.onerror = function(event) {
        console.error("Erreur lors de la récupération des associations menu-exercice", event);
    };
}

function getExercisesByKeys(db, exerciseKeys, callback) {
    const transaction = db.transaction(["exercise"], "readonly");
    const store = transaction.objectStore("exercise");

    const exercises = [];
    let count = exerciseKeys.length;

    if (count === 0) {
        callback([]); // Aucun exercice trouvé
        return;
    }

    exerciseKeys.forEach(key => {
        let request = store.get(key);
        request.onsuccess = function(event) {
            if (event.target.result) {
                exercises.push(event.target.result);
            }
            if (--count === 0) {
                callback(exercises); // On appelle le callback une fois toutes les requêtes terminées
            }
        };
        request.onerror = function(event) {
            console.error("Erreur lors de la récupération de l'exercice", event);
        };
    });
}



// Fonction pour ajouter un enregistrement à une table spécifique
function addRecord(db, table, data, callback) {
    // Code pour ajouter un enregistrement à la table
    // Appeler callback avec succès ou erreur
}

// Fonction pour récupérer tous les enregistrements d'une table
function getAllRecords(db, table, callback) {
    // Code pour récupérer tous les enregistrements d'une table
    // Appeler callback avec les résultats
}

// Fonction pour supprimer un enregistrement d'une table
function deleteRecord(db, table, key, callback) {
    // Code pour supprimer un enregistrement
    // Appeler callback avec succès ou erreur
}
