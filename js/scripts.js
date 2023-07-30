const toggleTheme = document.getElementById("toggle-theme");
const toggleIcon = document.getElementById("toggle-icon");
const toggleText = document.getElementById("toggle-text");

const toggleColors = document.getElementById("toggle-colors");

// Acá estan todas las variables del archivo CSS
const rootStyles = document.documentElement.style;

// Las banderas
const flagsElement = document.getElementById("flags");

// Todo lo que le hayamos puesto un data section
const textsToChange = document.querySelectorAll("[data-section]");

// Cambio de idioma
const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;
    // Utilizamos inner para que interprete si es que pusimos alguna etiqueta html
    textToChange.innerHTML = texts[section][value];
  }
};

function cambiarBandera(){
  const botonIngles = document.getElementById('boton-ingles');
  const botonEspanol = document.getElementById('boton-espanol');

  // Toggle (alternar) la visibilidad de los botones de idioma
  botonIngles.classList.toggle('oculto');
  botonEspanol.classList.toggle('oculto');
}

// Nos devuelve el idioma que declaramos como dataset en html
flagsElement.addEventListener("click", (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});


// Dark mode
toggleTheme.addEventListener("click", () => {
  // Si la tiene la quita, sino lo pone
  document.body.classList.toggle("dark");
  if (toggleIcon.src.includes("moon.svg")) {
    toggleIcon.src = "assets/icons/sun.svg";
    toggleText.textContent = "Light Mode";
  } else {
    toggleIcon.src = "assets/icons/moon.svg";
    toggleText.textContent = "Dark Mode";
  }
});

// Cambiar elementos de color
toggleColors.addEventListener("click", (e) => {
  rootStyles.setProperty("--primary-color", e.target.dataset.color);
});
