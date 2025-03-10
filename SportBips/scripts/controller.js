// controller.js — Gérer la logique entre l'UI et le back-end
const controller = {
    generateRandomMenus: function(n) {  // Pas besoin du mot-clé "function" ici
        openDatabase(function(db) {
            getAllMenus(db, function(menus) {
                const randomMenus = getRandomElements(menus, n);
                console.log("Menus récupérés aléatoirement :", randomMenus);

                const menuKeys = randomMenus.map(menu => menu.key); // Vérifie bien que menu.key est correct

                // Récupérer les exercices liés à ces menus
                getExercisesForMenus(db, menuKeys, function(menuExercises) {
                    console.log("Exercices associés aux menus :", menuExercises);
                });
            });
        });
    },

    // Fonction pour orchestrer l'appel aux services pour récupérer les menus
    handleGetMenus: function() {  // Pareil ici, on utilise "function" sans le mot-clé "function"
        openDatabase(function(db) {
            getAllMenus(db, function(menus) {
                console.log("Liste des menus :", menus);
            });
        });
    },

    // Fonction pour orchestrer l'appel aux services pour récupérer les exercices d'un menu
    handleGetExercises: function(menuKey) {
        openDatabase(function(db) {
            getExercisesForMenu(db, menuKey, function(exercises) {
                // Traiter les exercices récupérés et les envoyer à l'UI
            });
        });
    }
};
