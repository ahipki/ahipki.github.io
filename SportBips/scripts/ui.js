// ui.js — Interagir avec l'UI, afficher les résultats, et capturer les actions utilisateur

const ui = {
	displayGeneratedMenus(menus) {
		const menuListElement = document.getElementById("program-list");
		menuListElement.innerHTML = ''; // Effacer l'ancien contenu

		allExercises = []; // Reset des exercices

		menus.forEach((menu, index) => {
			const menuElement = document.createElement("div");
			menuElement.innerHTML = `<strong>Menu ${index + 1} : ${menu.title}</strong>`;

			const exerciseList = document.createElement("ul");
			menu.exercises.forEach((exercise, exerciseIndex) => {
				const exerciseElement = document.createElement("li");
				exerciseElement.textContent = exercise.label;
				exerciseElement.classList.add("exercise-item");
				exerciseElement.setAttribute("data-key", `${index}-${exerciseIndex}`);
				exerciseList.appendChild(exerciseElement);

				allExercises.push(exercise);
			});

			menuElement.appendChild(exerciseList);
			menuListElement.appendChild(menuElement);
		});
		
		toggleStartButton(); // Vérifie s'il faut afficher ou cacher les controles du programme

	},

	// Fonction pour gérer le clic sur le bouton "Générer le programme"
	handleGenerateProgramClick() {
		const n = parseInt(document.getElementById("menu-count").value, 10);
		if (!isNaN(n) && n > 0) {
			// Appel au contrôleur pour générer des menus
			controller.generateRandomMenus(n);
		} else {
			console.warn("Veuillez entrer un nombre valide.");
		}
	},
	handleStartProgramClick() {
		let index = 0;

		function showNextExercise() {
			// Retirer la mise en surbrillance précédente
			document.querySelectorAll(".active-exercise").forEach(el => el.classList.remove("active-exercise"));

			if (index < allExercises.length) {
				// Trouver l'élément de l'exercice en cours et le mettre en avant
				const exerciseElements = document.querySelectorAll(".exercise-item");
				exerciseElements[index].classList.add("active-exercise");

				// Attendre le temps défini, puis passer au suivant
				setTimeout(() => {
					index++;
					showNextExercise();
				}, 3000); // Change toutes les 3 secondes
			}
		}

		showNextExercise();
	},
};

function toggleStartButton() {
    const programList = document.getElementById("program-list");
    const programControls = document.getElementById("program-controls");

    if (programList.children.length > 0) {
        programControls.style.display = "flex";
    } else {
        programControls.style.display = "none";
    }
}

let currentExerciseIndex = 0;
let currentMenuIndex = 0;
let isPaused = false;
let countdownInterval;
const countdownElement = document.getElementById("countdown");

function startProgram(menus) {
    if (menus.length === 0) return;
    
    document.getElementById("start-program").style.display = "none"; // Cacher le bouton GO
    runWorkout(menus, 0, 0); // Démarrer le premier menu, premier exercice
}

function highlightExercise(menuIndex, exerciseIndex, exerciseKey, isActive) {
	document.querySelectorAll(".exercise-item").forEach(item => {
		if (item.dataset.key === `${menuIndex}-${exerciseIndex}`) {
			item.classList.toggle("active-exercise", isActive);
		}
	});

	// const menuElements = document.querySelectorAll("#program-list > div");
	// if (menuElements[menuIndex]) {
		// const exerciseElements = menuElements[menuIndex].querySelectorAll("li");
		// if (exerciseElements[exerciseIndex]) {
			// exerciseElements[exerciseIndex].classList.add("active-exercise");
		// }
	// }
}

// Fonction pour afficher les exercices associés aux menus
function displayExercises(exercises) {
    const exercisesElement = document.getElementById("exercises-list");
    exercisesElement.innerHTML = ''; // Effacer les anciens exercices
    exercises.forEach(exercise => {
        const exerciseElement = document.createElement("li");
        exerciseElement.textContent = exercise.name;
        exercisesElement.appendChild(exerciseElement);
    });
}

// Fonction pour afficher les menus récupérés
function displayMenus(menus) {
    // Code pour afficher la liste des menus dans l'UI
}

// Fonction pour afficher les exercices associés à un menu
function displayExercises(exercises) {
    // Code pour afficher la liste des exercices dans l'UI
}

function initUI() {
    document.getElementById("generate-program").addEventListener("click", ui.handleGenerateProgramClick);
	document.getElementById("start-program").addEventListener("click", () => {
		startProgram(structuredMenus);
	});
}

let currentSportMusic;
let beepAudio = new Audio('audios/beep.mp3');

// Fonction pour jouer une musique de sport aléatoire
function playMusic() {
    // Vérifie si une musique est déjà en cours, et dans ce cas ne rien faire
    if (currentSportMusic && !currentSportMusic.paused) return;

    const randomIndex = Math.floor(Math.random() * 21) + 1; 
    const selectedTrack = `audios/sport/${randomIndex}.mp3`; 

    // Créer un nouvel objet Audio pour la musique sélectionnée
    currentSportMusic = new Audio(selectedTrack);
    currentSportMusic.volume = 0.8; // Volume normal
    currentSportMusic.play(); // Joue la musique
	
	// Écouter l'événement 'ended' pour jouer une nouvelle musique à la fin
    currentSportMusic.onended = function() {
        playMusic(); // Appeler la fonction pour jouer une nouvelle musique
    };
}

// Fonction pour gérer les bips
function playBeep() {
    beepAudio.play();
}

// Fonction pour démarrer le décompte avec musique et bips
function startCountdown(duration, color, label, onEnd) {
    countdownElement.style.color = color;

    let remainingTime = duration;
    countdownElement.textContent = label + " " + helper.formatTime(remainingTime);

    const interval = setInterval(() => {
        if (label === "Prépare-toi" && remainingTime <= 5 && remainingTime >= 1) {
            playBeep();
        }

        remainingTime--; 

        if (remainingTime < 0) {
            clearInterval(interval);
            if (onEnd) onEnd(); 
        } else {
            countdownElement.textContent = label + " " + helper.formatTime(remainingTime);
        }
    }, 1000);
}



// Fonction pour exécuter l'entraînement
function runWorkout(menus, menuIndex, exerciseIndex) {
    if (menuIndex >= menus.length) {
        countdownElement.textContent = "Programme terminé !";
        document.getElementById("start-program").style.display = "block"; // Réafficher le bouton GO
        return;
    }

    const menu = menus[menuIndex];
    const exerciseList = menu.exercises;

    if (exerciseIndex >= exerciseList.length) {
        // Fin du menu → Ajout du repos de 30 secondes avant le prochain menu
        startCountdown(30, "black", "Repos", () => runWorkout(menus, menuIndex + 1, 0));
		currentSportMusic.volume = 0.4; 

        return;
    }

    const exercise = exerciseList[exerciseIndex];

    playBeep();

    // Décompte de 5 secondes avant l'exercice
    startCountdown(5, "red", "Prépare-toi", () => {
        playMusic();

        // Période d'exercice de 30 secondes
        startCountdown(30, "rgb(0, 111, 255)", exercise.label, () => {
            // Pendant la période de récupération, on réduit le volume de la musique
            currentSportMusic.volume = 0.4; 
			
			highlightExercise(menuIndex, exerciseIndex, exercise.key, false); // Fin de l'exercice → enlever la mise en valeur

            startCountdown(10, "green", "Récup", () => {
                // Reprend la musique normale après la récupération
                currentSportMusic.volume = 0.8;
                runWorkout(menus, menuIndex, exerciseIndex + 1); // Passe à l'exercice suivant
            });
        });
    });
	// Active le highlight 5 secondes avant le début de l'exercice
	highlightExercise(menuIndex, exerciseIndex, exercise.key, true);
}

// Initialisation de l'UI au lancement de l'application
initUI();