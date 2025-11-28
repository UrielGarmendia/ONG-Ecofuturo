document.addEventListener("DOMContentLoaded", () => {
  const projectsData = [
    {
      id: 1,
      title: "Reforestación Amazonas",
      category: "selva",
      desc: "Recuperación de flora nativa en zonas afectadas por incendios forestales.",
      imgMobile:
        "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      imgDesktop:
        "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Vista aérea detallada y exuberante de la selva amazónica con densos árboles verdes y neblina mística.",
    },
    {
      id: 2,
      title: "Pulmón Urbano Santiago",
      category: "urbano",
      desc: "Creación de micro-bosques en plazas de cemento para reducir islas de calor.",
      imgMobile:
        "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      imgDesktop:
        "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Parque urbano moderno con árboles jóvenes plantados simétricamente entre edificios de cristal bajo un día soleado.",
    },
    {
      id: 3,
      title: "Corredor Biológico Sur",
      category: "selva",
      desc: "Conectando fragmentos de bosque para permitir el tránsito de fauna nativa.",
      imgMobile:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      imgDesktop:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Sendero natural en un bosque templado lluvioso con helechos gigantes y árboles ancestrales cubiertos de musgo.",
    },
  ];

  let favorites = JSON.parse(localStorage.getItem("ecoFavorites")) || [];

  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
      animateValue(document.getElementById("tree-counter"), 0, 15430, 2000);
    }, 500);
  });

  const particlesContainer = document.getElementById("particles-container");
  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = Math.random() * 100 + "%";
    p.style.width = Math.random() * 5 + 2 + "px";
    p.style.height = p.style.width;
    p.style.animationDelay = Math.random() * 5 + "s";
    p.style.animationDuration = Math.random() * 10 + 10 + "s";
    particlesContainer.appendChild(p);
  }

  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    showToast(isDark ? "Modo Oscuro Activado" : "Modo Claro Activado");
  });

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Volver Arriba
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) backToTopBtn.classList.add("visible");
    else backToTopBtn.classList.remove("visible");
  });
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const projectsContainer = document.getElementById("projects-container");
  const searchInput = document.getElementById("search-input");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function renderProjects(filter = "all", searchTerm = "") {
    projectsContainer.innerHTML = "";

    const filtered = projectsData.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      projectsContainer.innerHTML =
        '<p style="text-align:center; grid-column: 1/-1;">No se encontraron proyectos.</p>';
      return;
    }

    filtered.forEach((p) => {
      const isFav = favorites.includes(p.id);
      const card = document.createElement("div");
      card.className = "project-card reveal";
      card.innerHTML = `
                        <button class="fav-btn ${
                          isFav ? "active" : ""
                        }" data-id="${p.id}" aria-label="Añadir a favoritos">
                            <i class="fas fa-heart"></i>
                        </button>
                        <div class="project-img-container" onclick="openLightbox('${
                          p.imgDesktop
                        }', '${p.title}')">
                            <picture>
                                <source srcset="${
                                  p.imgMobile
                                }" media="(max-width: 600px)">
                                <img src="${p.imgDesktop}" alt="${
        p.alt
      }" loading="lazy">
                            </picture>
                        </div>
                        <div class="card-body">
                            <span class="card-category">${p.category}</span>
                            <h3 class="card-title">${p.title}</h3>
                            <p class="card-text">${p.desc}</p>
                            <a href="#" class="btn-text" style="color: var(--primary-green); font-weight:700;">Leer más <i class="fas fa-arrow-right"></i></a>
                        </div>
                    `;
      projectsContainer.appendChild(card);
    });

    document.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.addEventListener("click", toggleFavorite);
    });

    checkScroll();
  }

  function toggleFavorite(e) {
    const btn = e.currentTarget;
    const id = parseInt(btn.dataset.id);

    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
      btn.classList.remove("active");
      showToast("Eliminado de favoritos");
    } else {
      favorites.push(id);
      btn.classList.add("active");
      showToast("Añadido a favoritos");
    }
    localStorage.setItem("ecoFavorites", JSON.stringify(favorites));
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter, searchInput.value);
    });
  });

  // Event Listener Search
  searchInput.addEventListener("input", (e) => {
    const activeFilter =
      document.querySelector(".filter-btn.active").dataset.filter;
    renderProjects(activeFilter, e.target.value);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeLightbox = document.querySelector(".close-lightbox");

  window.openLightbox = (src, caption) => {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("active");
  };

  closeLightbox.addEventListener("click", () =>
    lightbox.classList.remove("active")
  );
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  });

  const slider = document.getElementById("tree-slider");
  const sliderDisplay = document.getElementById("slider-val-display");
  const co2Result = document.getElementById("co2-result");
  const areaResult = document.getElementById("area-result");
  const impactMsg = document.getElementById("impact-message");
  const btnDonar = document.getElementById("btn-donar");

  const savedSliderVal = localStorage.getItem("sliderVal");
  if (savedSliderVal) {
    slider.value = savedSliderVal;
    updateCalculator(savedSliderVal);
  }

  slider.addEventListener("input", (e) => {
    updateCalculator(e.target.value);
    localStorage.setItem("sliderVal", e.target.value);
  });

  function updateCalculator(val) {
    sliderDisplay.textContent = val;

    animateValue(co2Result, parseInt(co2Result.textContent), val * 21, 500);
    animateValue(areaResult, parseInt(areaResult.textContent), val * 2, 500);

    if (val < 5)
      impactMsg.textContent = "Todo gran bosque comienza con una semilla";
    else if (val < 20)
      impactMsg.textContent = "Excelente aporte para tu comunidad";
    else
      impactMsg.textContent = "¡Impacto masivo! Eres un guardián del planeta";
  }

  btnDonar.addEventListener("click", () => {
    showToast(`¡Gracias! Redirigiendo a pago para ${slider.value} árboles.`);
  });

  // Helper Animación Números
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  // ==========================================
  // 8. FORMULARIO & VALIDACIÓN
  // ==========================================
  const form = document.getElementById("contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("input", validateInput);
    input.addEventListener("blur", validateInput);
  });

  function validateInput(e) {
    const input = e.target;
    const val = input.value.trim();
    let isValid = false;

    if (input.id === "name") isValid = val.length >= 3;
    else if (input.id === "email")
      isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    else if (input.id === "message") isValid = val.length > 0;

    if (isValid) {
      input.classList.remove("error");
      input.classList.add("success");
    } else {
      input.classList.remove("success");
      input.classList.add("error");
    }
    return isValid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;
    inputs.forEach((input) => {
      if (!validateInput({ target: input })) allValid = false;
    });

    if (allValid) {
      showToast("¡Mensaje enviado con éxito!", "success");
      form.reset();
      inputs.forEach((i) => i.classList.remove("success"));
    } else {
      showToast("Por favor corrige los errores.", "error");
    }
  });

  // ==========================================
  // 9. ANIMACIONES (Typing & Scroll Reveal)
  // ==========================================
  // Typing Effect
  const textToType = "un árbol a la vez.";
  const typeWriterElement = document.getElementById("typewriter");
  let typeIndex = 0;

  function typeWriter() {
    if (typeIndex < textToType.length) {
      typeWriterElement.innerHTML += textToType.charAt(typeIndex);
      typeIndex++;
      setTimeout(typeWriter, 100);
    }
  }
  setTimeout(typeWriter, 1000);

  // Scroll Reveal
  function checkScroll() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", checkScroll);

  // ==========================================
  // 10. HELPER TOAST
  // ==========================================
  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";

    let icon = type === "success" ? "fa-check-circle" : "fa-info-circle";
    if (type === "error") icon = "fa-exclamation-circle";

    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Inicializar App
  renderProjects();
  updateCalculator(slider.value);
  checkScroll(); // Chequeo inicial
});
