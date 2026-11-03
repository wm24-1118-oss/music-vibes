// Funciones interactivas de Music Vibes
document.addEventListener("DOMContentLoaded", function () {
  const themeButton = document.getElementById("themeToggle");
  const topButton = document.getElementById("topButton");

  // Activar o desactivar el modo claro/oscuro.
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      themeButton.innerHTML = isLight
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-stars-fill"></i>';
      alert(isLight ? "Modo claro activado" : "Modo oscuro activado");
    });
  }

  // Mostrar el botón para volver arriba cuando se baja por la página.
  window.addEventListener("scroll", function () {
    if (topButton) {
      topButton.classList.toggle("show", window.scrollY > 300);
    }
  });
  if (topButton) {
    topButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  // Información que se muestra cuando el visitante selecciona un género.
  const genreData = {
    "Pop": { description: "El pop se caracteriza por sus melodías pegadizas y variedad de sonidos.", artists: ["Taylor Swift", "Dua Lipa", "The Weeknd"], songs: ["Blinding Lights", "Levitating", "Anti-Hero"] },
    "Urbana": { description: "La música urbana reúne ritmos como reguetón, trap y otros sonidos contemporáneos.", artists: ["Bad Bunny", "Karol G", "Rauw Alejandro"], songs: ["Tití Me Preguntó", "TQG", "Todo de Ti"] },
    "Rock": { description: "El rock combina guitarras, bajo, batería y una gran diversidad de estilos.", artists: ["Queen", "Coldplay", "Imagine Dragons"], songs: ["Bohemian Rhapsody", "Viva La Vida", "Believer"] },
    "Electrónica": { description: "La música electrónica utiliza instrumentos y recursos digitales para crear ritmos y ambientes.", artists: ["David Guetta", "Calvin Harris", "Avicii"], songs: ["Titanium", "Summer", "Wake Me Up"] },
    "Jazz": { description: "El jazz destaca por la improvisación, la expresividad y la libertad musical.", artists: ["Louis Armstrong", "Miles Davis", "Ella Fitzgerald"], songs: ["What a Wonderful World", "So What", "Dream a Little Dream of Me"] },
    "Merengue": { description: "El merengue es uno de los ritmos más representativos de la República Dominicana.", artists: ["Juan Luis Guerra", "Wilfrido Vargas", "Johnny Ventura"], songs: ["La Bilirrubina", "El Africano", "Patacón Pisao"] },
    "Bachata": { description: "La bachata es un género dominicano conocido por sus guitarras y letras románticas.", artists: ["Romeo Santos", "Aventura", "Prince Royce"], songs: ["Propuesta Indecente", "Obsesión", "Darte un Beso"] },
    "Salsa": { description: "La salsa mezcla ritmos afrocaribeños y se disfruta especialmente en el baile.", artists: ["Marc Anthony", "Héctor Lavoe", "Celia Cruz"], songs: ["Vivir Mi Vida", "Periódico de Ayer", "La Vida Es Un Carnaval"] }
  };

  document.querySelectorAll(".genre-select").forEach(function (card) {
    function openGenre() {
      const name = card.querySelector("h3").textContent.trim();
      const data = genreData[name];
      if (!data) return;
      document.getElementById("genreModalTitle").textContent = name;
      document.getElementById("genreDescription").textContent = data.description;
      const artistsBox = document.getElementById("genreArtists");
      const songsBox = document.getElementById("genreSongs");
      artistsBox.innerHTML = "";
      songsBox.innerHTML = "";
      data.artists.forEach(function (artist) {
        const link = document.createElement("a");
        link.className = "artist-pill";
        link.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(artist + " canciones");
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = artist;
        artistsBox.appendChild(link);
      });
      data.songs.forEach(function (song) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "https://www.youtube.com/results?search_query=" + encodeURIComponent(song + " canción oficial");
        link.target = "_blank";
        link.rel = "noopener";
        link.innerHTML = '<i class="bi bi-play-circle-fill"></i> ' + song + ' <span>Escuchar en YouTube</span>';
        item.appendChild(link);
        songsBox.appendChild(item);
      });
      bootstrap.Modal.getOrCreateInstance(document.getElementById("genreModal")).show();
    }
    card.addEventListener("click", openGenre);
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openGenre(); }
    });
  });

  // Abrir una ventana modal con el contenido de cada artículo.
  document.querySelectorAll("[data-article]").forEach(function (button) {
    button.addEventListener("click", function () {
      const articleText = document.getElementById("articleText");
      articleText.textContent = button.getAttribute("data-article");
      const modal = new bootstrap.Modal(document.getElementById("articleModal"));
      modal.show();
    });
  });

  // Formulario demostrativo: valida los campos y muestra una alerta.
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("nombre").value.trim();
      alert("¡Gracias, " + name + "! Tu mensaje fue validado en esta demostración.");
      contactForm.reset();
    });
  }
});
