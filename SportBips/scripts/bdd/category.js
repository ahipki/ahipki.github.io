function createCategoryTable(db) {
    if (!db.objectStoreNames.contains("category")) {
		const categoryStore = db.createObjectStore("category", { keyPath: "key" });
        categoryStore.createIndex("label", "label", { unique: false });
    }
}

function feedCategoryTable(db) {
	const categoryStore = db.transaction("category", "readwrite").objectStore("category");

    // Suppression de toutes les données existantes
    const clearRequest = categoryStore.clear();
    clearRequest.onsuccess = function () {
        // Alimentation de la table avec les nouvelles données
        const categories = [
            { key: "CAR", label: "Cardio" }, 
            { key: "ETI", label: "Etirement" },
            { key: "POI", label: "Poids" },
            { key: "GNG", label: "Gainage" },
            { key: "MUL", label: "Multiple" },
            { key: "DOS", label: "Dos" },
            { key: "LEG", label: "Jambes" },
            { key: "BRA", label: "Bras" },
            { key: "ABD", label: "Abdos" },
            { key: "EQU", label: "Equilibre" }
        ];

        categories.forEach(category => {
            const addRequest = categoryStore.add(category); // Ajout des données
            addRequest.onerror = function(event) {
                console.error(`Erreur lors de l'ajout de la catégorie ${category.key}:`, event.target.error);
            };
        });
    };
    clearRequest.onerror = function(event) {
        console.error("Erreur lors de la suppression des anciennes catégories:", event.target.error);
    };
}
