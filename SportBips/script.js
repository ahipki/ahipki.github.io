const menuCountSelect = document.getElementById('menu-count');
const exerciseCountInput = document.getElementById('exercise-count');
const generateProgramButton = document.getElementById('generate-program');
const programList = document.getElementById('program-list');
const currentExercise = document.getElementById('current-exercise');
const countdown = document.getElementById('countdown');
const startProgramButton = document.getElementById('start-program');

// TODO Compléter avec les vrais menus
const menus = [
    { name: 'Menu 1', exercises: ['Jumping Jacks', 'Superman', 'Squats', 'Push-up', 'Gainage Bassin', 'Bird Dog'], favorite: false },
    { name: 'Menu 2', exercises: ['High Knees', 'Reverse Angels', 'Lunges', 'Bicycle Crunches', 'Side Plank Walk', 'Bridge' ], favorite: false },
    { name: 'Menu 3', exercises: ['Burpees', 'Wall Slides', 'Chaise', 'Abdos relevés de jambes', 'Plank Alternate', 'Bear walk'], favorite: false },
    { name: 'Menu 4', exercises: ['Superman', 'Lungees Reverence', 'Push-up', 'Crunches', '180 Plank Reach', 'Bridge'], favorite: false },
    { name: 'Menu 5', exercises: ['Jumping Jacks', 'Alt Swing Back', 'Squats', 'Pike Push-up', 'Full Hollow Body Hold', 'Mountain Climbers'], favorite: false },
    { name: 'Menu 6', exercises: ['Handstand Push-ups', 'Pistol Squats', 'Muscle-ups', 'Plank to Push-up', 'Bear Crawl', 'Broad Jumps'], favorite: false },
    { name: 'Menu Poids', exercises: ['Poids', 'Poids', 'Poids', 'Poids', 'Poids', 'Poids'], favorite: true },
    { name: 'Menu Gainage', exercises: ['Gainage', 'Gainage', 'Gainage', 'Gainage', 'Gainage', 'Gainage'], favorite: true },
    { name: 'Menu Etirement', exercises: ['Etirement', 'Etirement', 'Etirement', 'Etirement', 'Etirement', 'Etirement'], favorite: true }, 
];

// TODO Bug : On n'a pas la possibilité de choisir entre choix par menu 1 à 6 menus, choix par exercices 1 à 100, choix par temps : 5 à 30min
generateProgramButton.addEventListener('click', () => {
    const menuCount = parseInt(menuCountSelect.value);
    const exerciseCount = parseInt(exerciseCountInput.value) || 0;
    let selectedMenus = [];

// TODO Bug : On n'a pas de possibilité de choisir son menu parmi la liste
// TODO Spec : toujours à la fin de la séance, les menus favoris
    if (menuCount === 1 || menuCount === 2) {
        // Choix manuel ou aléatoire parmi les menus
        selectedMenus = menus.filter(menu => !menu.favorite).slice(0, menuCount);
    } else if (menuCount === 3) {
        // Inclure exactement 1 menu favori
        const favoriteMenus = menus.filter(menu => menu.favorite).slice(0, 1);
        const normalMenus = menus.filter(menu => !menu.favorite).slice(0, 2);
        selectedMenus = favoriteMenus.concat(normalMenus);
    } else if (menuCount === 4 || menuCount === 5) {
        // Inclure exactement 2 menus favoris
        const favoriteMenus = menus.filter(menu => menu.favorite).slice(0, 2);
        const normalMenus = menus.filter(menu => !menu.favorite).slice(0, menuCount - 2);
        selectedMenus = favoriteMenus.concat(normalMenus);
    } else if (menuCount === 6) {
        // Inclure exactement 3 menus favoris
        const favoriteMenus = menus.filter(menu => menu.favorite).slice(0, 3);
        const normalMenus = menus.filter(menu => !menu.favorite).slice(0, 3);
        selectedMenus = favoriteMenus.concat(normalMenus);
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

// TODO Bug : pas de bip sonore et pas de pause
// TODO Spec : rajouter un décompte de 5 avant de commencer, pour annoncer l'exercice
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

// TODO Option lecture IA
// TODO Option image stickman