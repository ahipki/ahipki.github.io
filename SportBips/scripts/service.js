const service = {
	getAllMenus: function(db, callback) {
		const transaction = db.transaction("menu", "readonly");
		const menuStore = transaction.objectStore("menu");
		const request = menuStore.getAll();

		request.onsuccess = function() {
			callback(request.result);
		};

		request.onerror = function(event) {
			console.error("Erreur lors de la récupération des menus:", event.target.error);
		};
	},

	getExercisesForMenus: function(db, menuKeys, callback) {
		const transaction = db.transaction(["menu_exercise", "exercise"], "readonly");
		const menuExerciseStore = transaction.objectStore("menu_exercise");
		const exerciseStore = transaction.objectStore("exercise");

		let exercises = [];
		let pendingRequests = menuKeys.length;

		menuKeys.forEach(menuKey => {
			const index = menuExerciseStore.index("menuKey"); // Vérifie bien que c'est "menuKey"
			const request = index.getAll(menuKey); 

			request.onsuccess = function(event) {
				const menuExercises = event.target.result;

				if (menuExercises.length > 0) {
					let pendingExerciseRequests = menuExercises.length;

					menuExercises.forEach(menuExercise => {
						const exerciseRequest = exerciseStore.get(menuExercise.exerciseKey);

						exerciseRequest.onsuccess = function(event) {
							exercises.push(event.target.result);
							pendingExerciseRequests--;

							if (pendingExerciseRequests === 0) {
								pendingRequests--;
								if (pendingRequests === 0) {
									callback(exercises);
								}
							}
						};

						exerciseRequest.onerror = function(event) {
							console.error("Erreur lors de la récupération de l'exercice :", event.target.error);
							pendingExerciseRequests--;
						};
					});
				} else {
					pendingRequests--;
				}

				if (pendingRequests === 0) {
					callback(exercises);
				}
			};

			request.onerror = function(event) {
				console.error("Erreur lors de la récupération des exercices liés aux menus :", event.target.error);
				pendingRequests--;
			};
		});
	},
};