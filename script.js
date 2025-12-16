document.addEventListener("DOMContentLoaded", () => {
  const projectsData = [
    {
      id: 1,
      title: "Reforestación Amazonas",
      category: "selva",
      desc: "Recuperación de flora nativa en zonas afectadas por incendios forestales.",
      img: "assets/reforestacion-amazonas.webp",
      alt: "Vista aérea detallada y exuberante de la selva amazónica con densos árboles verdes y neblina mística.",
      detailedDesc: "Restauramos 250 hectáreas degradadas reintroduciendo más de 35 especies endémicas como caoba, cedro y shiringa. Hemos plantado 125,000 árboles nativos que capturan 15,000 toneladas de CO₂ anuales. Incluye viveros comunitarios y programas educativos que han capacitado a más de 300 personas."
    },
    {
      id: 2,
      title: "Pulmón Urbano Santiago",
      category: "urbano",
      desc: "Creación de micro-bosques en plazas de cemento para reducir islas de calor.",
      img: "assets/pulmon-urbano.webp",
      alt: "Parque urbano moderno con árboles jóvenes plantados simétricamente entre edificios de cristal bajo un día soleado.",
      detailedDesc: "Usamos metodología Miyawaki para micro-bosques que crecen 10x más rápido. Reducen temperatura 5°C y mejoran calidad del aire 40%, filtrando 2 toneladas de contaminantes/año. Transformamos 8 plazas urbanas beneficiando a 15,000 personas."
    },
    {
      id: 3,
      title: "Corredor Biológico Sur",
      category: "selva",
      desc: "Conectando fragmentos de bosque para permitir el tránsito de fauna nativa.",
      img: "assets/corredor-biologico.webp",
      alt: "Sendero natural en un bosque templado lluvioso con helechos gigantes y árboles ancestrales cubiertos de musgo.",
      detailedDesc: "Conectamos 8 reservas naturales con 45 km de corredores ecológicos. Protegemos rutas migratorias de 200+ especies amenazadas: puma, huemul y pudú. Las cámaras trampa documentan 60% más tránsito de fauna. Trabajamos con 18 propietarios bajo acuerdos voluntarios. 1,200 hectáreas de bosque nativo restaurado."
    },
    {
      id: 4,
      title: "Restauración Manglar Pacífico",
      category: "costero",
      desc: "Recuperación de ecosistemas de manglar para proteger la biodiversidad marina.",
      img: "assets/proyecto-manglar-costero.png",
      alt: "Ecosistema de manglar costero.",
      detailedDesc: "Los manglares capturan 4x más carbono que bosques terrestres. Restauramos 80 hectáreas: hábitat para 300+ especies marinas. Aumentamos poblaciones de peces 85% beneficiando a 25 comunidades pesqueras. 150,000 propágulos de mangle rojo, negro y blanco plantados."
    },
    {
      id: 5,
      title: "Bosque Vertical CDMX",
      category: "urbano",
      desc: "Jardines verticales en fachadas para combatir contaminación.",
      img: "assets/proyecto-jardin-vertical.png",
      alt: "Fachada con vegetación vertical.",
      detailedDesc: "12 jardines verticales filtran 25kg contaminantes/año cada uno. Reducen ruido 8dB y temperatura interior 4°C, ahorrando 30% en aire acondicionado. 800-1,200 plantas de 40 especies nativas mexicanas por jardín. Mejoran salud mental reduciendo estrés 35%. Riego automático con agua reciclada."
    },
    {
      id: 6,
      title: "Reforestación Altiplano",
      category: "andino",
      desc: "Especies nativas resistentes a sequía en ecosistemas de altura.",
      img: "assets/proyecto-zona-arida.png",
      alt: "Paisaje árido del altiplano.",
      detailedDesc: "Trabajamos 3,500-4,200 msnm con queñua y tola, especies ultra resistentes. 180 hectáreas de bosque andino restaurado (ecosistema con <10% cobertura original). Alianza con 8 comunidades quechuas y aymaras. 90,000 ejemplares plantados con 78% supervivencia. Regulan ciclo hídrico y protegen suelos."
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
      
      // Mantenemos la clase reveal para la animación de entrada
      card.className = "project-card reveal";
      
      // ESTRUCTURA HTML PARA EL FLIP
      // Nota: Usamos detailedDesc en la parte trasera
      card.innerHTML = `
        <div class="card-inner">
          
          <div class="card-front">
            <button class="fav-btn ${isFav ? "active" : ""}" data-id="${p.id}" aria-label="Añadir a favoritos">
              <i class="fas fa-heart"></i>
            </button>
            <div class="project-img-container" onclick="openLightbox('${p.img}', '${p.title}')">
              <img src="${p.img}" alt="${p.alt}" loading="lazy">
            </div>
            <div class="card-body">
              <span class="card-category">${p.category}</span>
              <h3 class="card-title">${p.title}</h3>
              <p class="card-text">${p.desc}</p>
              
              <button class="btn-text flip-btn" style="color: var(--primary-green); font-weight:700; background:none; border:none; cursor:pointer; padding:8px 0; margin-top: auto; display: flex; align-items: center; gap: 5px;">
                Leer más <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div class="card-back">
            <h4><i class="fas fa-info-circle"></i> Detalles del Proyecto</h4>
            <p>${p.detailedDesc}</p>
            
            <button class="btn btn-primary flip-back-btn">
              <i class="fas fa-undo"></i> Volver
            </button>
          </div>

        </div>
      `;
      projectsContainer.appendChild(card);
    });

    // REINICIALIZAR EVENTOS
    // 1. Eventos Favoritos
    document.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.addEventListener("click", toggleFavorite);
    });

    // 2. Evento para GIRAR (Leer más)
    document.querySelectorAll(".flip-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // Evita saltos de scroll
        e.stopPropagation(); // Evita que clicks internos afecten a otros elementos
        const card = btn.closest(".project-card");
        card.classList.add("flipped");
      });
    });

    // 3. Evento para VOLVER (Girar al revés)
    document.querySelectorAll(".flip-back-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const card = btn.closest(".project-card");
        card.classList.remove("flipped");
      });
    });

    checkScroll(); // Verifica si los elementos deben aparecer
  }

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
        <div class="card-inner">
          <div class="card-front">
            <button class="fav-btn ${isFav ? "active" : ""}" data-id="${p.id}" aria-label="Añadir a favoritos">
              <i class="fas fa-heart"></i>
            </button>
            <div class="project-img-container" onclick="openLightbox('${p.img}', '${p.title}')">
              <img src="${p.img}" alt="${p.alt}" loading="lazy">
            </div>
            <div class="card-body">
              <span class="card-category">${p.category}</span>
              <h3 class="card-title">${p.title}</h3>
              <p class="card-text">${p.desc}</p>
              <button class="btn-text flip-btn" data-id="${p.id}" style="color: var(--primary-green); font-weight:700; background:none; border:none; cursor:pointer; padding:8px 0;">
                Leer más <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div class="card-back">
            <h4 style="color: var(--primary-green); margin-bottom: 15px;">Detalles del Proyecto</h4>
            <p style="line-height: 1.8; margin-bottom: 20px;">${p.detailedDesc}</p>
            <button class="btn btn-primary flip-back-btn" data-id="${p.id}">
              <i class="fas fa-arrow-left"></i> Volver
            </button>
          </div>
        </div>
      `;
      projectsContainer.appendChild(card);
    });

    document.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.addEventListener("click", toggleFavorite);
    });

    document.querySelectorAll(".flip-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".project-card");
        card.classList.add("flipped");
      });
    });

    document.querySelectorAll(".flip-back-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".project-card");
        card.classList.remove("flipped");
      });
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

  // Lightbox Mejorado con Navegación
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const closeLightbox = document.querySelector(".close-lightbox");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  
  let currentImageIndex = 0;
  let lightboxImages = [];

  window.openLightbox = (src, caption) => {
    // Crear array de todas las imágenes de proyectos
    lightboxImages = [];
    document.querySelectorAll('.project-img-container img').forEach(img => {
      lightboxImages.push({
        src: img.src,
        alt: img.alt,
        caption: img.closest('.project-card').querySelector('.card-title').textContent
      });
    });
    
    currentImageIndex = lightboxImages.findIndex(img => img.src === src);
    showLightboxImage(currentImageIndex);
    lightbox.classList.add("active");
  };
  
  function showLightboxImage(index) {
    if (index < 0) index = lightboxImages.length - 1;
    if (index >= lightboxImages.length) index = 0;
    
    currentImageIndex = index;
    const img = lightboxImages[currentImageIndex];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.caption;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${lightboxImages.length}`;
  }

  closeLightbox.addEventListener("click", () => lightbox.classList.remove("active"));
  lightboxPrev.addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
  lightboxNext.addEventListener("click", () => showLightboxImage(currentImageIndex + 1));
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active");
  });
  
  // Navegación por teclado
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") lightbox.classList.remove("active");
    if (e.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
    if (e.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
  });
  
  // ==========================================
  // EMAILJS - Formulario de Contacto
  // ==========================================
  const contactForm = document.getElementById("contact-form");
  
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let allValid = true;
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      if (!validateInput({ target: input })) allValid = false;
    });

    if (allValid) {
      // Obtener valores del formulario
      const templateParams = {
        nombre: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mensaje: document.getElementById("message").value,
        asunto: "Contacto desde la web"
      };
      
      // Enviar con EmailJS
      emailjs.send('service_iqulzup', 'template_8fgwals', templateParams)
        .then(() => {
          showToast("¡Mensaje enviado con éxito!", "success");
          contactForm.reset();
          inputs.forEach((i) => i.classList.remove("success"));
        }, (error) => {
          showToast("Error al enviar. Intenta nuevamente.", "error");
          console.error('EmailJS error:', error);
        });
    } else {
      showToast("Por favor corrige los errores.", "error");
    }
  });
  
  // ==========================================
  // NEWSLETTER POPUP
  // ==========================================
  const newsletterModal = document.getElementById("newsletter-modal");
  const newsletterClose = document.querySelector(".newsletter-close");
  const newsletterForm = document.getElementById("newsletter-form");
  
  // Mostrar popup después de 10 segundos si no se ha mostrado antes
  const newsletterShown = localStorage.getItem("newsletterShown");
  if (!newsletterShown) {
    setTimeout(() => {
      newsletterModal.classList.add("active");
    }, 10000);
  }
  
  newsletterClose.addEventListener("click", () => {
    newsletterModal.classList.remove("active");
    localStorage.setItem("newsletterShown", "true");
  });
  
  newsletterModal.addEventListener("click", (e) => {
    if (e.target === newsletterModal) {
      newsletterModal.classList.remove("active");
      localStorage.setItem("newsletterShown", "true");
    }
  });
  
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    const emailValue = emailInput.value.trim();
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      showToast("Por favor ingresa un email válido.", "error");
      return;
    }
    
    // Enviar con EmailJS - enviar múltiples variantes para compatibilidad
    const templateParams = {
      email: emailValue,
      user_email: emailValue,
      to_email: emailValue
    };
    
    emailjs.send('service_iqulzup', 'template_b6a8ywr', templateParams)
      .then(() => {
        showToast("¡Gracias por suscribirte!", "success");
        newsletterModal.classList.remove("active");
        localStorage.setItem("newsletterShown", "true");
        newsletterForm.reset();
      }, (error) => {
        showToast("Error al suscribirte. Intenta nuevamente.", "error");
        console.error('EmailJS error:', error);
      });
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

  // ==========================================
  // 11. ACORDEÓN FAQ
  // ==========================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;
      
      // Cerrar todos los demás acordeones
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.nextElementSibling.classList.remove('active');
        }
      });
      
      // Toggle del acordeón actual
      header.setAttribute('aria-expanded', !isExpanded);
      content.classList.toggle('active');
    });
  });

  // Inicializar App
  renderProjects();
  updateCalculator(slider.value);
  checkScroll(); // Chequeo inicial
});
