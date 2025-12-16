document.addEventListener("DOMContentLoaded", () => {
  const projectsData = [
    { id: 1, title: "Reforestación Amazonas", category: "selva", desc: "Recuperación de flora nativa en zonas afectadas por incendios forestales.", img: "assets/reforestacion-amazonas.webp", alt: "Vista aérea detallada y exuberante de la selva amazónica con densos árboles verdes y neblina mística.", detailedDesc: "Restauramos 250 hectáreas degradadas reintroduciendo más de 35 especies endémicas como caoba, cedro y shiringa. Hemos plantado 125,000 árboles nativos que capturan 15,000 toneladas de CO₂ anuales. Incluye viveros comunitarios y programas educativos que han capacitado a más de 300 personas." },
    { id: 2, title: "Pulmón Urbano Santiago", category: "urbano", desc: "Creación de micro-bosques en plazas de cemento para reducir islas de calor.", img: "assets/pulmon-urbano.webp", alt: "Parque urbano moderno con árboles jóvenes plantados simétricamente entre edificios de cristal bajo un día soleado.", detailedDesc: "Usamos metodología Miyawaki para micro-bosques que crecen 10x más rápido. Reducen temperatura 5°C y mejoran calidad del aire 40%, filtrando 2 toneladas de contaminantes/año. Transformamos 8 plazas urbanas beneficiando a 15,000 personas." },
    { id: 3, title: "Corredor Biológico Sur", category: "selva", desc: "Conectando fragmentos de bosque para permitir el tránsito de fauna nativa.", img: "assets/corredor-biologico.webp", alt: "Sendero natural en un bosque templado lluvioso con helechos gigantes y árboles ancestrales cubiertos de musgo.", detailedDesc: "Conectamos 8 reservas naturales con 45 km de corredores ecológicos. Protegemos rutas migratorias de 200+ especies amenazadas: puma, huemul y pudú. Las cámaras trampa documentan 60% más tránsito de fauna. Trabajamos con 18 propietarios bajo acuerdos voluntarios. 1,200 hectáreas de bosque nativo restaurado." },
    { id: 4, title: "Restauración Manglar Pacífico", category: "costero", desc: "Recuperación de ecosistemas de manglar para proteger la biodiversidad marina.", img: "assets/proyecto-manglar-costero.png", alt: "Ecosistema de manglar costero.", detailedDesc: "Los manglares capturan 4x más carbono que bosques terrestres. Restauramos 80 hectáreas: hábitat para 300+ especies marinas. Aumentamos poblaciones de peces 85% beneficiando a 25 comunidades pesqueras. 150,000 propágulos de mangle rojo, negro y blanco plantados." },
    { id: 5, title: "Bosque Vertical CDMX", category: "urbano", desc: "Jardines verticales en fachadas para combatir contaminación.", img: "assets/proyecto-jardin-vertical.png", alt: "Fachada con vegetación vertical.", detailedDesc: "12 jardines verticales filtran 25kg contaminantes/año cada uno. Reducen ruido 8dB y temperatura interior 4°C, ahorrando 30% en aire acondicionado. 800-1,200 plantas de 40 especies nativas mexicanas por jardín. Mejoran salud mental reduciendo estrés 35%. Riego automático con agua reciclada." },
    { id: 6, title: "Reforestación Altiplano", category: "andino", desc: "Especies nativas resistentes a sequía en ecosistemas de altura.", img: "assets/proyecto-zona-arida.png", alt: "Paisaje árido del altiplano.", detailedDesc: "Trabajamos 3,500-4,200 msnm con queñua y tola, especies ultra resistentes. 180 hectáreas de bosque andino restaurado (ecosistema con <10% cobertura original). Alianza con 8 comunidades quechuas y aymaras. 90,000 ejemplares plantados con 78% supervivencia. Regulan ciclo hídrico y protegen suelos." }
  ];

  let favorites = JSON.parse(localStorage.getItem("ecoFavorites")) || [];

  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
        const treeCounter = document.getElementById("tree-counter");
        if (treeCounter) animateValue(treeCounter, 0, 15430, 2000);
      }, 500);
    });
  }

  function animateValue(element, start, end, duration) {
    let startTime = null;
    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const savedTheme = localStorage.getItem("ecoTheme") || "light";
  document.body.classList.toggle("dark-mode", savedTheme === "dark");
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) icon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("ecoTheme", isDark ? "dark" : "light");
      if (icon) icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    });
  }

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  function checkScroll() {
    document.querySelectorAll(".reveal").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) el.classList.add("active");
    });
  }
  window.addEventListener("scroll", checkScroll);
  checkScroll();

  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("visible", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const projectsContainer = document.getElementById("projects-container");
  if (projectsContainer) {
    function renderProjects(filter = "all", searchTerm = "") {
      projectsContainer.innerHTML = "";
      const filtered = projectsData.filter(p => {
        const matchCat = filter === "all" || p.category === filter;
        const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.desc.toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
      });

      if (filtered.length === 0) {
        projectsContainer.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No se encontraron proyectos.</p>';
        return;
      }

      filtered.forEach(p => {
        const isFav = favorites.includes(p.id);
        const card = document.createElement("div");
        card.className = "project-card reveal";
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front">
              <button class="fav-btn ${isFav ? "active" : ""}" data-id="${p.id}" aria-label="Añadir a favoritos"><i class="fas fa-heart"></i></button>
              <div class="project-img-container" onclick="openLightbox('${p.img}', '${p.title}')"><img src="${p.img}" alt="${p.alt}" loading="lazy"></div>
              <div class="card-body">
                <span class="card-category">${p.category}</span>
                <h3 class="card-title">${p.title}</h3>
                <p class="card-text">${p.desc}</p>
                <button class="btn-text flip-btn" style="color: var(--primary-green); font-weight:700; background:none; border:none; cursor:pointer; padding:8px 0; margin-top: auto; display: flex; align-items: center; gap: 5px;">Leer más <i class="fas fa-arrow-right"></i></button>
              </div>
            </div>
            <div class="card-back">
              <h4><i class="fas fa-info-circle"></i> Detalles del Proyecto</h4>
              <p>${p.detailedDesc}</p>
              <button class="btn btn-primary btn-sm flip-back-btn">Volver</button>
            </div>
          </div>`;
        projectsContainer.appendChild(card);
        card.querySelector(".flip-btn").addEventListener("click", () => card.classList.add("flipped"));
        card.querySelector(".flip-back-btn").addEventListener("click", () => card.classList.remove("flipped"));
        card.querySelector(".fav-btn").addEventListener("click", function() {
          const pid = +this.dataset.id;
          const idx = favorites.indexOf(pid);
          if (idx > -1) {
            favorites.splice(idx, 1);
            this.classList.remove("active");
            showToast("Quitado de favoritos", "info");
          } else {
            favorites.push(pid);
            this.classList.add("active");
            showToast("¡Agregado a favoritos!", "success");
          }
          localStorage.setItem("ecoFavorites", JSON.stringify(favorites));
        });
      });
      checkScroll();
    }

    const filterBtns = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("search-input");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", e => {
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        renderProjects(e.target.dataset.filter, searchInput ? searchInput.value : "");
      });
    });
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        const activeF = document.querySelector(".filter-btn.active")?.dataset?.filter || "all";
        renderProjects(activeF, e.target.value);
      });
    }
    renderProjects();
  }

  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    function validateInput(e) {
      const inp = e.target;
      const val = inp.value.trim();
      let valid = true;
      if (inp.type === "email") valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      else if (inp.tagName === "TEXTAREA") valid = val.length >= 10;
      else valid = val.length >= 3;
      
      inp.classList.toggle("error", !valid);
      inp.classList.toggle("success", valid);
      const errorMsg = inp.nextElementSibling;
      if (errorMsg && errorMsg.classList.contains("error-msg")) {
        errorMsg.style.display = valid ? "none" : "block";
      }
      return valid;
    }

    contactForm.querySelectorAll("input, textarea").forEach(input => {
      input.addEventListener("blur", validateInput);
      input.addEventListener("input", validateInput);
    });

    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      let allValid = true;
      contactForm.querySelectorAll("input, textarea").forEach(input => {
        if (!validateInput({ target: input })) allValid = false;
      });

      if (allValid) {
        const templateParams = {
          nombre: document.getElementById("name").value,
          email: document.getElementById("email").value,
          mensaje: document.getElementById("message").value,
          asunto: "Contacto desde la web"
        };
        
        emailjs.send('service_iqulzup', 'template_8fgwals', templateParams)
          .then(() => {
            showToast("¡Mensaje enviado con éxito!", "success");
            contactForm.reset();
            contactForm.querySelectorAll("input, textarea").forEach(i => i.classList.remove("success"));
          }, error => {
            showToast("Error al enviar. Intenta nuevamente.", "error");
            console.error('EmailJS error:', error);
          });
      } else {
        showToast("Por favor corrige los errores.", "error");
      }
    });
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const closeLightbox = document.querySelector(".close-lightbox");
    const lightboxPrev = document.querySelector(".lightbox-prev");
    const lightboxNext = document.querySelector(".lightbox-next");
    let currentImageIndex = 0;
    let lightboxImages = [];

    window.openLightbox = (src, caption) => {
      lightboxImages = [];
      document.querySelectorAll('.project-img-container img').forEach(img => {
        lightboxImages.push({
          src: img.src,
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
      if (lightboxCounter) lightboxCounter.textContent = `${currentImageIndex + 1} / ${lightboxImages.length}`;
    }

    if (closeLightbox) closeLightbox.addEventListener("click", () => lightbox.classList.remove("active"));
    if (lightboxPrev) lightboxPrev.addEventListener("click", () => showLightboxImage(currentImageIndex - 1));
    if (lightboxNext) lightboxNext.addEventListener("click", () => showLightboxImage(currentImageIndex + 1));
    lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.classList.remove("active"); });
    document.addEventListener("keydown", e => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") lightbox.classList.remove("active");
      if (e.key === "ArrowLeft") showLightboxImage(currentImageIndex - 1);
      if (e.key === "ArrowRight") showLightboxImage(currentImageIndex + 1);
    });
  }

  const newsletterModal = document.getElementById("newsletter-modal");
  if (newsletterModal) {
    const newsletterClose = document.querySelector(".newsletter-close");
    const newsletterForm = document.getElementById("newsletter-form");
    const newsletterShown = localStorage.getItem("newsletterShown");
    
    if (!newsletterShown) {
      setTimeout(() => newsletterModal.classList.add("active"), 10000);
    }
    
    if (newsletterClose) {
      newsletterClose.addEventListener("click", () => {
        newsletterModal.classList.remove("active");
        localStorage.setItem("newsletterShown", "true");
      });
    }
    
    newsletterModal.addEventListener("click", e => {
      if (e.target === newsletterModal) {
        newsletterModal.classList.remove("active");
        localStorage.setItem("newsletterShown", "true");
      }
    });
    
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", e => {
        e.preventDefault();
        const emailInput = document.getElementById("newsletter-email");
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailValue)) {
          showToast("Por favor ingresa un email válido.", "error");
          return;
        }
        
        const templateParams = { email: emailValue, user_email: emailValue, to_email: emailValue };
        emailjs.send('service_iqulzup', 'template_b6a8ywr', templateParams)
          .then(() => {
            showToast("¡Gracias por suscribirte!", "success");
            newsletterModal.classList.remove("active");
            localStorage.setItem("newsletterShown", "true");
            newsletterForm.reset();
          }, error => {
            showToast("Error al suscribirte. Intenta nuevamente.", "error");
            console.error('EmailJS error:', error);
          });
      });
    }
  }

  const sliderElement = document.getElementById("tree-slider");
  if (sliderElement) {
    const sliderDisplay = document.getElementById("slider-val-display");
    const co2Result = document.getElementById("co2-result");
    const areaResult = document.getElementById("area-result");
    const impactMsg = document.getElementById("impact-message");

    function updateCalculator(trees) {
      if (sliderDisplay) sliderDisplay.textContent = trees;
      const co2 = trees * 22;
      const area = trees * 5;
      if (co2Result) co2Result.textContent = `${co2} kg / año`;
      if (areaResult) areaResult.textContent = `${area} m²`;
      
      let message = "🌍 Equivalente a...";
      if (trees >= 50) message = "🎉 ¡Increíble! Tu aporte captura CO₂ equivalente a plantar un bosque urbano completo.";
      else if (trees >= 20) message = "🌲 Excelente. Compensas las emisiones anuales de un auto promedio.";
      else if (trees >= 10) message = "🌱 Buen comienzo. Ayudas a restaurar ecosistemas nativos.";
      else message = "🌿 Cada árbol cuenta. Suma tu granito de arena al planeta.";
      
      if (impactMsg) impactMsg.textContent = message;
    }

    sliderElement.addEventListener("input", e => updateCalculator(+e.target.value));
    const savedVal = localStorage.getItem("ecoSliderValue");
    if (savedVal) {
      sliderElement.value = savedVal;
      updateCalculator(+savedVal);
    } else {
      updateCalculator(+sliderElement.value);
    }
    sliderElement.addEventListener("change", e => localStorage.setItem("ecoSliderValue", e.target.value));

    const donateBtn = document.getElementById("donate-calc-btn");
    const donationModal = document.getElementById("donation-modal");
    const donationClose = document.getElementById("donation-close");
    const donationForm = document.getElementById("donation-form");
    const customAmount = document.getElementById("donation-custom");
    const donationSummary = document.getElementById("donation-summary");

    if (donateBtn && donationModal) {
      // Open modal
      donateBtn.addEventListener("click", () => {
        donationModal.classList.add("active");
        
        // Calculate amount based on trees
        const currentTrees = parseInt(sliderElement.value) || 1;
        const pricePerTree = 1000;
        const totalAmount = currentTrees * pricePerTree;

        // Update UI
        if (customAmount) customAmount.value = totalAmount;
        if (donationSummary) {
          donationSummary.innerHTML = `<i class="fas fa-tree"></i> Plantando <strong>${currentTrees} ${currentTrees === 1 ? 'árbol' : 'árboles'}</strong>`;
        }
      });

      // Close modal
      if (donationClose) {
        donationClose.addEventListener("click", () => donationModal.classList.remove("active"));
      }
      donationModal.addEventListener("click", e => {
        if (e.target === donationModal) donationModal.classList.remove("active");
      });

      // Handle Submit
      if (donationForm) {
        donationForm.addEventListener("submit", e => {
          e.preventDefault();
          const amount = customAmount ? customAmount.value : 0;
          if (!amount || amount <= 0) {
            showToast("Por favor ingresa un monto válido", "error");
            return;
          }
          
          donationModal.classList.remove("active");
          showToast(`¡Gracias! Redirigiendo a pasarela de pago... ($${amount})`, "success");
        });
      }
    }
  }

  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;
      accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== header) {
          otherHeader.setAttribute('aria-expanded', 'false');
          otherHeader.nextElementSibling.classList.remove('active');
        }
      });
      header.setAttribute('aria-expanded', !isExpanded);
      content.classList.toggle('active');
    });
  });

  const typewriterEl = document.getElementById("typewriter");
  if (typewriterEl) {
    const phrases = ["un árbol a la vez", "con ciencia y pasión", "junto a comunidades"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (!isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 500);
          return;
        }
      }
      setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
  }
});
