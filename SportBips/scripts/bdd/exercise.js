function createExerciseTable(db) {
    const exerciseStore = db.createObjectStore("exercise", { keyPath: "key" });
    exerciseStore.createIndex("label", "label", { unique: false });  
    exerciseStore.createIndex("categoryKey", "categoryKey", { unique: false });  
}

function feedExerciseTable(db) {
    const exerciseStore = db.transaction("exercise", "readwrite").objectStore("exercise");

    // Suppression de toutes les données existantes
    const clearRequest = exerciseStore.clear();
    clearRequest.onsuccess = function () {
        // Alimentation de la table avec les nouvelles données
		const exercises = [
			{ key: "JJ", label: "Jumping Jacks", categoryKey: "CAR" },  
			{ key: "SPM", label: "Superman", categoryKey: "DOS"  }, 
			{ key: "SQT", label: "Squats", categoryKey: "LEG"  },  
			{ key: "PU", label: "Push-ups", categoryKey: "MUL"  }, 
			{ key: "GB", label: "Gainage Bassin", categoryKey: "GNG"  },  
			{ key: "DOG", label: "Bird Dog", categoryKey: "MUL"  }, 
			
			{ key: "HK", label: "High Knees", categoryKey: "CAR"  },  
			{ key: "RA", label: "Reverse Angels", categoryKey: "DOS"  }, 
			{ key: "FNT", label: "Fentes", categoryKey: "LEG"  },  
			{ key: "BC", label: "Bicycle Crunches", categoryKey: "ABD"  }, 
			{ key: "SPW", label: "Side Plank Walk", categoryKey: "MUL"  },  
			{ key: "BDG", label: "Bridge", categoryKey: "GNG"  }, 
			
			{ key: "BRP", label: "Burpees", categoryKey: "CAR"  },  
			{ key: "WS", label: "Wall Slides", categoryKey: "DOS"  }, 
			{ key: "CHZ", label: "Chaise", categoryKey: "LEG"  },  
			{ key: "ARJ", label: "Abdos relevés de jambes", categoryKey: "ABD"  }, 
			{ key: "PL2", label: "Plank Alternate", categoryKey: "DOS"  }, 
			{ key: "BER", label: "Bear walk", categoryKey: "GNG"  },  
			
			{ key: "REV", label: "Fentes Reverence", categoryKey: "MUL"  }, 
			{ key: "ABD", label: "Abdos", categoryKey: "ABD"  },  
			{ key: "180", label: "180 Plank Reach", categoryKey: "GNG"  },
			
			{ key: "ASB", label: "Alt Swing Back", categoryKey: "DOS"  },  
			{ key: "PPU", label: "Pike Push-up", categoryKey: "BRA"  }, 
			{ key: "RSP", label: "Reverse Superman", categoryKey: "ABD"  },  
			{ key: "MC", label: "Mountain Climbers", categoryKey: "MUL"  }, 
			
			{ key: "P1", label: "Poids Punch", categoryKey: "POI"  }, 
			{ key: "P2", label: "Poids Vol", categoryKey: "POI"  }, 
			{ key: "P3", label: "Poids Tornade", categoryKey: "POI"  },  
			{ key: "P4", label: "Poids Ange", categoryKey: "POI"  }, 
			{ key: "P5", label: "Poids Psychose", categoryKey: "POI"  },  
			{ key: "P6", label: "Poids Zombie", categoryKey: "POI"  }, 
		
			{ key: "G1", label: "Gainage ventral", categoryKey: "GNG"  }, 
			{ key: "G2", label: "Gainage oblique gauche", categoryKey: "GNG"  }, 
			{ key: "G3", label: "Gainage oblique droit", categoryKey: "GNG"  }, 
			{ key: "G4", label: "Gainage lombaire", categoryKey: "GNG"  }, 
			{ key: "G5", label: "Planche latérale gauche", categoryKey: "GNG"  }, 
			{ key: "G6", label: "Planche latérale droite", categoryKey: "GNG"  }, 
			
			{ key: "E1", label: "Etirement Cou", categoryKey: "ETI"  }, 
			{ key: "E2", label: "Etirement Triceps", categoryKey: "ETI"  }, 
			{ key: "E3", label: "Etirement Epaules", categoryKey: "ETI"  }, 
			{ key: "E4", label: "Etirement Pectoraux", categoryKey: "ETI"  }, 
			{ key: "E5", label: "Etirement Dos latéral", categoryKey: "ETI"  }, 
			{ key: "E6", label: "Etirement Dos Epaules Pectoraux", categoryKey: "ETI"  },
			{ key: "E7", label: "Etirement Cuisses flamant rose", categoryKey: "ETI"  },
			{ key: "E8", label: "Etirement Mollets  pied plat", categoryKey: "ETI"  },
			{ key: "E9", label: "Etirement Mollets talon", categoryKey: "ETI"  },
			{ key: "E10", label: "Etirement Hanche", categoryKey: "ETI"  },
			{ key: "E11", label: "Etirement Avant-bras", categoryKey: "ETI"  },
			{ key: "E12", label: "Etirement Dos Hanche Abdominaux Inspiration", categoryKey: "ETI"  },
			{ key: "E13", label: "Etirement Dos Hanche Abdominaux Expiration", categoryKey: "ETI"  },
			{ key: "E14", label: "Etirement Haut du dos", categoryKey: "ETI"  },
			{ key: "E15", label: "Etirement Abdominaux", categoryKey: "ETI"  },
			{ key: "E16", label: "Etirement Dos prière", categoryKey: "ETI"  },
			{ key: "E17", label: "Etirement Cuisses papillon", categoryKey: "ETI"  },
			{ key: "E18", label: "Etirement Fessiers assis", categoryKey: "ETI"  },
			{ key: "E19", label: "Etirement Bas du dos cuisses mollets", categoryKey: "ETI"  },
			{ key: "E20", label: "Etirement Dos roulade arrière", categoryKey: "ETI"  },
			{ key: "E21", label: "Etirement Bas du dos fessiers", categoryKey: "ETI"  },
			{ key: "E22", label: "Etirement Fessiers allongé", categoryKey: "ETI"  },
			{ key: "E23", label: "Etirement Cuisses jambe en l'air", categoryKey: "ETI"  },
			
			{ key: "CDL", label: "Chandelle", categoryKey: "GNG"  }
		];

        exercises.forEach(exercise => {
            const addRequest = exerciseStore.add(exercise); // Ajout des données
            addRequest.onerror = function(event) {
                console.error(`Erreur lors de l'ajout de la exercice ${exercise.key}:`, event.target.error);
            };
        });
    };
	clearRequest.onerror = function(event) {
        console.error("Erreur lors de la suppression des anciens exercices:", event.target.error);
    };
}
