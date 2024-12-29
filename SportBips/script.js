// Récupérer les éléments du DOM
const menuCountSelect = document.getElementById('menu-count');
const exerciseCountInput = document.getElementById('exercise-count');
const generateProgramButton = document.getElementById('generate-program');
const programList = document.getElementById('program-list');
const currentExercise = document.getElementById('current-exercise');
const countdown = document.getElementById('countdown');
const startProgramButton = document.getElementById('start-program');

// Exemple de données pour les exercices
const menus = [
    { name: 'Menu 1', exercises: ['Jumping Jacks', 'Squats', 'Push-ups', 'Lunges', 'Plank', 'Burpees'], favorite: false },
    { name: 'Menu 2', exercises: ['Mountain Climbers', 'Sit-ups', 'High Knees', 'Tricep Dips', 'Bicycle Crunches', 'Side Plank'], favorite: false },
    { name: 'Menu 3', exercises: ['Jump Rope', 'Step-ups', 'Pull-ups', 'Leg Raises', 'Flutter Kicks', 'Russian Twists'], favorite: false },
    { name: 'Menu 4', exercises: ['Box Jumps', 'Deadlifts', 'Overhead Press', 'Bench Press', 'Rows', 'Power Cleans'], favorite: false },
    { name: 'Menu 5', exercises: ['Sprint Intervals', 'Farmer Walk', 'Push Press', 'Tire Flips', 'Kettlebell Swings', 'Wall Balls'], favorite: false },
    { name: 'Menu 6', exercises: ['Handstand Push-ups', 'Pistol Squats', 'Muscle-ups', 'Plank to Push-up', 'Bear Crawl', 'Broad Jumps'], favorite: false },
    { name: 'Menu 7', exercises: ['Shadow Boxing', 'Side Lunges', 'Jump Squats', 'Calf Raises', 'Superman Hold', 'Donkey Kicks'], favorite: true },
    { name: 'Menu 8', exercises: ['Back Extensions', 'Leg Curls', 'Wall Sit', 'Inchworms', 'Hip Thrusts', 'Diamond Push-ups'], favorite: true },
    { name: 'Menu 9', exercises: ['Burpee to Pull-up', 'Kettlebell Clean', 'Renegade Row', 'Overhead Squat', 'Lateral Hops', 'Tuck Jumps'], favorite: true }
];

// Fonction pour générer le programme
generateProgramButton.addEventListener('click', () => {
    const menuCount = parseInt(menuCountSelect.value);
    const exerciseCount = parseInt(exerciseCountInput.value) || 0;
    let selectedMenus = [];

    // Sélection des menus en fonction des règles
    if (menuCount >= 6) {
        selectedMenus = menus.slice(0, 6);
    } else if (menuCount >= 3) {
        selectedMenus = menus.filter(menu => menu.favorite).slice(0, 1).concat(menus.filter(menu => !menu.favorite).slice(0, menuCount - 1));
    } else {
        selectedMenus = menus.filter(menu => !menu.favorite).slice(0, menuCount);
    }

    // Afficher les menus et exercices sous forme de tableaux
    programList.innerHTML = '';
    selectedMenus.forEach(menu => {
        const menuTitle = document.createElement('h3');
        menuTitle.textContent = menu.name;
        programList.appendChild(menuTitle);

        const table = document.createElement('table');
        const row = document.createElement('tr');

        menu.exercises.forEach(exercise => {
            const cell = document.createElement('td');
            cell.textContent = exercise;
            row.appendChild(cell);
        });

        table.appendChild(row);
        programList.appendChild(table);
    });
});

// Fonction pour démarrer le programme
startProgramButton.addEventListener('click', () => {
    const tables = programList.querySelectorAll('table');
    let currentMenuIndex = 0;
    let currentExerciseIndex = 0;

    const startCountdown = (time, callback) => {
        let seconds = time;
        countdown.textContent = `00:${seconds.toString().padStart(2, '0')}`;
        const interval = setInterval(() => {
            seconds--;
            countdown.textContent = `00:${seconds.toString().padStart(2, '0')}`;
            if (seconds <= 0) {
                clearInterval(interval);
                callback();
            }
        }, 1000);
    };

    const runExercise = () => {
        if (currentMenuIndex < tables.length) {
            const currentTable = tables[currentMenuIndex];
            const exercises = currentTable.querySelectorAll('td');

            if (currentExerciseIndex < exercises.length) {
                currentExercise.textContent = exercises[currentExerciseIndex].textContent;
                startCountdown(30, () => {
                    currentExerciseIndex++;
                    if (currentExerciseIndex === exercises.length) {
                        currentExerciseIndex = 0;
                        currentMenuIndex++;
                        startCountdown(45, runExercise); // Pause longue entre menus
                    } else {
                        startCountdown(15, runExercise); // Pause courte entre exercices
                    }
                });
            }
        } else {
            currentExercise.textContent = 'Programme terminé !';
        }
    };

    runExercise();
});
