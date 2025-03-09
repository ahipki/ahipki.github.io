function createMenu_exerciseTable(db) {
    if (!db.objectStoreNames.contains("menu_exercise")) {
		const menu_exerciseStore = db.createObjectStore("menu_exercise", { autoIncrement: true });
        menu_exerciseStore.createIndex("menuKey", "menuKey", { unique: false });
		menu_exerciseStore.createIndex("exerciseKey", "exerciseKey", { unique: false });  
    }
}

function feedMenu_exerciseTable(db) {
	const menu_exerciseStore = db.transaction("menu_exercise", "readwrite").objectStore("menu_exercise");

    // Suppression de toutes les données existantes
    const clearRequest = menu_exerciseStore.clear();
    clearRequest.onsuccess = function () {
        // Alimentation de la table avec les nouvelles données
		const menu_exercises = [
			{ menuKey: "M1", exerciseKey: "JJ" },
			{ menuKey: "M1", exerciseKey: "SPM" },
			{ menuKey: "M1", exerciseKey: "SQT" },
			{ menuKey: "M1", exerciseKey: "PU" },
			{ menuKey: "M1", exerciseKey: "GB" },
			{ menuKey: "M1", exerciseKey: "DOG" },
			
			{ menuKey: "M2", exerciseKey: "HK" },
			{ menuKey: "M2", exerciseKey: "RA" },
			{ menuKey: "M2", exerciseKey: "FNT" },
			{ menuKey: "M2", exerciseKey: "BC" },
			{ menuKey: "M2", exerciseKey: "SPW" },
			{ menuKey: "M2", exerciseKey: "BDG" },
			
			{ menuKey: "M3", exerciseKey: "BRP" },
			{ menuKey: "M3", exerciseKey: "WS" },
			{ menuKey: "M3", exerciseKey: "CHZ" },
			{ menuKey: "M3", exerciseKey: "ARJ" },
			{ menuKey: "M3", exerciseKey: "PL2" },
			{ menuKey: "M3", exerciseKey: "BER" },

			{ menuKey: "M4", exerciseKey: "SPM" },
			{ menuKey: "M4", exerciseKey: "REV" },
			{ menuKey: "M4", exerciseKey: "PU" },
			{ menuKey: "M4", exerciseKey: "ABD" },
			{ menuKey: "M4", exerciseKey: "180" },
			{ menuKey: "M4", exerciseKey: "BDG" },
			
			{ menuKey: "M5", exerciseKey: "JJ" },
			{ menuKey: "M5", exerciseKey: "ASB" },
			{ menuKey: "M5", exerciseKey: "SQT" },
			{ menuKey: "M5", exerciseKey: "PPU" },
			{ menuKey: "M5", exerciseKey: "RSP" },
			{ menuKey: "M5", exerciseKey: "MC" },

			{ menuKey: "M6", exerciseKey: "GB" },
			{ menuKey: "M6", exerciseKey: "HK" },
			{ menuKey: "M6", exerciseKey: "DOG" },
			{ menuKey: "M6", exerciseKey: "WS" },
			{ menuKey: "M6", exerciseKey: "PL2" },
			{ menuKey: "M6", exerciseKey: "CDL" },

			{ menuKey: "MP", exerciseKey: "P1" },
			{ menuKey: "MP", exerciseKey: "P2" },
			{ menuKey: "MP", exerciseKey: "P3" },
			{ menuKey: "MP", exerciseKey: "P4" },
			{ menuKey: "MP", exerciseKey: "P5" },
			{ menuKey: "MP", exerciseKey: "P6" },

			{ menuKey: "MG", exerciseKey: "G1" },
			{ menuKey: "MG", exerciseKey: "G2" },
			{ menuKey: "MG", exerciseKey: "G3" },
			{ menuKey: "MG", exerciseKey: "G4" },
			{ menuKey: "MG", exerciseKey: "G5" },
			{ menuKey: "MG", exerciseKey: "G6" },

			{ menuKey: "ME1", exerciseKey: "E4" }, // Pecs
			{ menuKey: "ME1", exerciseKey: "E16" }, // Dos
			{ menuKey: "ME1", exerciseKey: "E7" }, // Cuisses
			{ menuKey: "ME1", exerciseKey: "E8" }, // Mollets
			{ menuKey: "ME1", exerciseKey: "E10" }, // Hanche
			{ menuKey: "ME1", exerciseKey: "E14" }, // Haut du dos
			{ menuKey: "ME1", exerciseKey: "E22" }, // Fessiers
			{ menuKey: "ME1", exerciseKey: "E15" }, // Abdos

			{ menuKey: "ME2", exerciseKey: "E1" }, // Cou
			{ menuKey: "ME2", exerciseKey: "E2" }, // Triceps
			{ menuKey: "ME2", exerciseKey: "E3" }, // Epaules
			{ menuKey: "ME2", exerciseKey: "E5" }, // Dos latéral
			{ menuKey: "ME2", exerciseKey: "E17" }, // Cuisses
			{ menuKey: "ME2", exerciseKey: "E9" }, // Mollets
			{ menuKey: "ME2", exerciseKey: "E12" }, // Dos Hanche Abdos
			{ menuKey: "ME2", exerciseKey: "E21" }, // Bas du dos fessiers

			{ menuKey: "ME3", exerciseKey: "E11" }, //  Avant Bras
			{ menuKey: "ME3", exerciseKey: "E6" }, // Dos Epaules Pecs
			{ menuKey: "ME3", exerciseKey: "E19" }, // bas du dos cuisses Mollets
			{ menuKey: "ME3", exerciseKey: "E13" }, // Dos Hanche Abdos
			{ menuKey: "ME3", exerciseKey: "E18" }, // Fessiers
			{ menuKey: "ME3", exerciseKey: "E20" }, // Dos
			{ menuKey: "ME3", exerciseKey: "E23" } // Cuisses
		];
		menu_exercises.forEach(menu_exercise => {
			const addRequest = menu_exerciseStore.add(menu_exercise); // L'ID est auto-généré
			addRequest.onerror = function(event) {
				console.error(`Erreur lors de l'ajout du menu_exercise:`, event.target.error);
			};
		});
    };
    clearRequest.onerror = function(event) {
        console.error("Erreur lors de la suppression des anciens menu_exercises:", event.target.error);
    };
}
