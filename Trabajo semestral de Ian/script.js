const text = "¿Estás seguro en Internet?";
let i = 0;

function typingEffect() {
    const elemento = document.getElementById("typing");
    if (!elemento) return;

    if (i < text.length) {
        elemento.innerHTML += text.charAt(i);
        i++;
        setTimeout(typingEffect, 50);
    }
}

// Loader + animación juntos
window.addEventListener("load", function() {

    // Quitar loader después de 1.5s
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";

        // INICIAR animación después del loader
        typingEffect();

    }, 1500);

});

function startMission() {
    const intro = document.getElementById("intro");
    const main = document.getElementById("mainContent");

    if (!intro || !main) return;

    intro.classList.add("fade-out");

    setTimeout(() => {
        intro.style.display = "none";

        main.style.display = "block";
        main.classList.remove("hidden");
        main.classList.add("fade-in");

    }, 800);
}

// Esto me permite que las imagenes sea clickeable
document.getElementById("carousel").addEventListener("click", () => {
    const targetId = slides[current].target;
    const section = document.getElementById(targetId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
});

const slides = [
    {
        title: "Protege tus contraseñas",
        text: "Utiliza contraseñas seguras y autenticación en dos pasos.",
        image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87"
    },
    {
        title: "Cuidado con el phishing",
        text: "No hagas clic en enlaces sospechosos o correos falsos.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3"
    },
    {
        title: "Seguridad en redes sociales",
        text: "Configura tu privacidad y evita compartir información sensible.",
        image: "https://images.unsplash.com/photo-1611605698335-8b1569810432"
    }
];

let current = 0;
let interval;

function updateCarousel() {
    const carousel = document.getElementById("carousel");
    const title = document.getElementById("carousel-title");
    const text = document.getElementById("carousel-text");

    if (!carousel) return;

    carousel.style.backgroundImage = `url("${slides[current].image}")`;

    title.innerText = slides[current].title;
    text.innerText = slides[current].text;

    updateIndicators();
}

function nextSlide() {
    current = (current + 1) % slides.length;
    updateCarousel();
}

function startCarousel() {
    interval = setInterval(nextSlide, 4000);
}

function stopCarousel() {
    clearInterval(interval);
}

/* Indicadores */
function createIndicators() {
    const container = document.getElementById("indicators");

    slides.forEach((_, index) => {
        const dot = document.createElement("span");

        dot.addEventListener("click", () => {
            current = index;
            updateCarousel();
        });

        container.appendChild(dot);
    });
}

function updateIndicators() {
    const dots = document.querySelectorAll(".indicators span");

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === current);
    });
}

/* Eventos */
window.addEventListener("load", () => {
    createIndicators();
    updateCarousel();
    startCarousel();

    const carousel = document.getElementById("carousel");

    carousel.addEventListener("mouseenter", stopCarousel);
    carousel.addEventListener("mouseleave", startCarousel);
});