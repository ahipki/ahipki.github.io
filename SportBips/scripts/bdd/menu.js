function createMenuTable(db) {
    if (!db.objectStoreNames.contains("menu")) {
		const menuStore = db.createObjectStore("menu", { keyPath: "key" });
        menuStore.createIndex("label", "label", { unique: false });
		menuStore.createIndex("categoryKey", "categoryKey", { unique: false });  
    }
}

function feedMenuTable(db) {
	const menuStore = db.transaction("menu", "readwrite").objectStore("menu");

    // Suppression de toutes les données existantes
    const clearRequest = menuStore.clear();
    clearRequest.onsuccess = function () {
        // Alimentation de la table avec les nouvelles données
    const menus = [
        { key: "M1", label: "Menu 1", categoryKey: "MUL", favorite: false },  
        { key: "M2", label: "Menu 2", categoryKey: "MUL", favorite: false }, 
        { key: "M3", label: "Menu 3", categoryKey: "MUL", favorite: false },  
        { key: "M4", label: "Menu 4", categoryKey: "MUL", favorite: false }, 
        { key: "M5", label: "Menu 5", categoryKey: "MUL", favorite: false },   
        { key: "M6", label: "Menu 6", categoryKey: "MUL", favorite: false } ,   
        { key: "MP", label: "Poids", categoryKey: "POI", favorite: true } ,   
        { key: "MG", label: "Gainage", categoryKey: "GNG", favorite: true } ,   
        { key: "ME1", label: "Etirement 1", categoryKey: "ETI", favorite: true },   
        { key: "ME2", label: "Etirement 2", categoryKey: "ETI", favorite: true },   
        { key: "ME3", label: "Etirement 2", categoryKey: "ETI", favorite: true }  
    ];
        menus.forEach(menu => {
            const addRequest = menuStore.add(menu); // Ajout des données
            addRequest.onerror = function(event) {
                console.error(`Erreur lors de l'ajout du menu ${menu.key}:`, event.target.error);
            };
        });
    };
    clearRequest.onerror = function(event) {
        console.error("Erreur lors de la suppression des anciens menus:", event.target.error);
    };
}
