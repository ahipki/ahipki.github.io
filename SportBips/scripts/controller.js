// controller.js — Gérer la logique entre l'UI et le back-end
let structuredMenus = []; // Stocke les menus globalement

const controller = {
    generateRandomMenus: function(n) { 
        openDatabase(function(db) {
            service.getAllMenus(db, function(menus) {
                const randomMenus = helper.getRandomElements(menus, n);
                console.log("Menus récupérés aléatoirement :", randomMenus);

                const menuKeys = randomMenus.map(menu => menu.key); 

				getMenuExerciseMappings(db, menuKeys, function (menuExercises) {
					const exerciseKeys = menuExercises.map(me => me.exerciseKey);
					getExercisesByKeys(db, exerciseKeys, function (exercises) {
						structuredMenus = randomMenus.map(menu => ({
							title: menu.label,
							exercises: exercises.filter(ex => 
								menuExercises.some(me => me.menuKey === menu.key && me.exerciseKey === ex.key)
							)
						}));

						ui.displayGeneratedMenus(structuredMenus);
					});
				});
            });
        });
    },

    // Fonction pour orchestrer l'appel aux services pour récupérer les menus
    handleGetMenus: function() {
        openDatabase(function(db) {
            service.getAllMenus(db, function(menus) {
                console.log("Liste des menus :", menus);
            });
        });
    },

    // Fonction pour orchestrer l'appel aux services pour récupérer les exercices d'un menu
    handleGetExercises: function(menuKey) {
        openDatabase(function(db) {
            service.getExercisesForMenu(db, menuKey, function(exercises) {
                // Traiter les exercices récupérés et les envoyer à l'UI
            });
        });
    }
};
