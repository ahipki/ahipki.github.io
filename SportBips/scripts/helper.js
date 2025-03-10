function getRandomElements(array, n) {
    if (array.length === 0) return [];
    n = Math.min(n, array.length); // S'assurer qu'on ne prend pas plus d'éléments que disponible

    const shuffled = [...array].sort(() => 0.5 - Math.random()); // Mélange
    return shuffled.slice(0, n);
}

