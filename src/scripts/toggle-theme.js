const toggleThemeButton = document.querySelector('.toggle-theme');
const sunIcon = document.querySelector('.icon-sun');
const moonIcon = document.querySelector('.icon-moon');
const body = document.body;

// Ustawiamy domyślną klasę dla jasnego motywu
body.classList.add('light-theme');

toggleThemeButton.addEventListener('click', () => {
  // Przełączamy motyw
  if (body.classList.contains('light-theme')) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');

    // Pokaż księżyc, ukryj słońce
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');

    // Pokaż słońce, ukryj księżyc
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }
});
