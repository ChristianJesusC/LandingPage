// ============================================
// NAVEGACIÓN - Menú móvil y scroll activo
// ============================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Efecto scroll en navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Actualizar link activo según la sección visible
    updateActiveLink();
});

// Toggle menú móvil
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle) {
            navToggle.classList.remove('active');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target)) {
        if (navToggle) {
            navToggle.classList.remove('active');
        }
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Actualizar link activo según la sección visible
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// SCROLL SUAVE PARA ENLACES INTERNOS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // 70px para compensar navbar fijo
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SCROLL A FORMULARIO
// ============================================

function scrollToForm() {
    const formSection = document.getElementById('registro');
    if (formSection) {
        const offsetTop = formSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ============================================
// MANEJO DEL FORMULARIO
// ============================================

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        edad: document.getElementById('edad').value
    };
    
    // Validación básica
    if (!formData.nombre || !formData.email || !formData.edad) {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return;
    }
    
    // Simular envío (aquí conectarías con tu backend)
    console.log('Datos del formulario:', formData);
    
    // Mostrar mensaje de éxito
    alert('¡Gracias por registrarte! Redirigiendo a la aplicación...');
    
    // Limpiar formulario
    document.getElementById('leadForm').reset();
    
    // Aquí redirigirías a la aplicación móvil o página de descarga
    // window.location.href = '/app-download';
}

// ============================================
// ANIMACIÓN DEL MOCKUP DEL TELÉFONO
// ============================================

function animatePhoneMockup() {
    const options = document.querySelectorAll('.app-option');
    
    if (options.length === 0) return;
    
    let currentIndex = 1; // Empieza con la segunda opción activa
    
    setInterval(() => {
        // Remover clase active de todas las opciones
        options.forEach(option => option.classList.remove('active'));
        
        // Agregar clase active a la opción actual
        if (options[currentIndex]) {
            options[currentIndex].classList.add('active');
        }
        
        // Avanzar al siguiente índice (circular)
        currentIndex = (currentIndex + 1) % options.length;
    }, 3000); // Cambiar cada 3 segundos
}

// ============================================
// OBSERVADOR DE INTERSECCIÓN - Animaciones al scroll
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que necesitan animación
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.problem-item, .step, .stat-card, .transformation-card, .visual-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// PREVENCIÓN DE SUBMIT MÚLTIPLE
// ============================================

let isSubmitting = false;

const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        
        isSubmitting = true;
        
        // Resetear después de 3 segundos
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Iniciar animación del mockup del teléfono
    animatePhoneMockup();
    
    // Iniciar animaciones de scroll
    initScrollAnimations();
    
    // Verificar si hay un hash en la URL y hacer scroll a esa sección
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// ============================================
// DETECTAR SCROLL HACIA ARRIBA/ABAJO
// ============================================

let lastScrollTop = 0;
const navbarHeight = 70;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        // Scroll hacia abajo - ocultar navbar (opcional)
        // navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba - mostrar navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ============================================
// FUNCIÓN PARA COPIAR EMAIL (OPCIONAL)
// ============================================

function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// ============================================
// VALIDACIÓN EN TIEMPO REAL DEL FORMULARIO
// ============================================

const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const edadSelect = document.getElementById('edad');

// Validar nombre
if (nombreInput) {
    nombreInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (value.length < 3 && value.length > 0) {
            nombreInput.style.borderColor = 'var(--color-accent-warning)';
        } else if (value.length >= 3) {
            nombreInput.style.borderColor = 'var(--color-accent-success)';
        } else {
            nombreInput.style.borderColor = 'var(--color-border)';
        }
    });
}

// Validar email
if (emailInput) {
    emailInput.addEventListener('blur', (e) => {
        const value = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value && !emailRegex.test(value)) {
            emailInput.style.borderColor = 'var(--color-accent-warning)';
        } else if (value && emailRegex.test(value)) {
            emailInput.style.borderColor = 'var(--color-accent-success)';
        } else {
            emailInput.style.borderColor = 'var(--color-border)';
        }
    });
}

// ============================================
// TRACK DE EVENTOS (GOOGLE ANALYTICS, ETC)
// ============================================

function trackEvent(eventName, eventData) {
    // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Ejemplo con Google Analytics (si está configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Trackear clicks en CTAs
document.querySelectorAll('.btn-cta, .btn-nav, .btn-submit').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', {
            button_text: button.textContent,
            button_location: button.closest('section')?.id || 'navbar'
        });
    });
});

// ============================================
// LAZY LOADING DE IMÁGENES (SI LAS HAY)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// FUNCIÓN PARA COMPARTIR EN REDES SOCIALES
// ============================================

function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Descubre tu carrera ideal con Orientate+');
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        trackEvent('social_share', { platform: platform });
    }
}

// ============================================
// SMOOTH SCROLL POLYFILL (PARA NAVEGADORES ANTIGUOS)
// ============================================

if (!('scrollBehavior' in document.documentElement.style)) {
    // Implementar smooth scroll para navegadores que no lo soporten
    const smoothScroll = (target, duration = 500) => {
        const targetPosition = target.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };
}

// ============================================
// CONSOLE LOG PERSONALIZADO
// ============================================

console.log(
    '%c¡Bienvenido a Orientate+! 🚀',
    'color: #2563eb; font-size: 20px; font-weight: bold;'
);
console.log(
    '%c¿Estás buscando trabajo? Visita nuestras ofertas en /carreras',
    'color: #06b6d4; font-size: 14px;'
);

// ============================================
// MANEJO DE ERRORES GLOBAL
// ============================================

window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    // Aquí podrías enviar el error a un servicio de logging
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

window.addEventListener('load', () => {
    // Medir tiempo de carga
    const loadTime = performance.now();
    console.log(`Página cargada en ${loadTime.toFixed(2)}ms`);
    
    // Trackear tiempo de carga
    trackEvent('page_load', {
        load_time: loadTime,
        page: window.location.pathname
    });
});