let currentSlide = 0;
const slides = document.querySelectorAll('.slide'); //constente pour slide
const prevBtn = document.querySelector('.prev'); //constente pour btn avant
const nextBtn = document.querySelector('.next'); //constente pour btn prochain

// Affiche la slide actuelle
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
}
// Événements pour les boutons de navigation
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// Rotation automatique des slides toutes les 5 secondes
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);
