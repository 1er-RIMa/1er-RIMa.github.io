// Génération du captcha aléatoire
function generateCaptcha() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('captcha-text').textContent = captcha;
    return captcha;
}

let currentCaptcha = generateCaptcha();

// Validation du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Validation des champs 
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const captcha = document.getElementById('captcha');

    // Réinitialisation des erreurs
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
    nom.style.borderColor = '#ddd';
    email.style.borderColor = '#ddd';
    message.style.borderColor = '#ddd';
    captcha.style.borderColor = '#ddd';

    // sert a valider les champs du formulaire de contact
    if (!nom.value.trim()) {
        nom.style.borderColor = 'var(--danger)';
        nom.nextElementSibling.style.display = 'block';
        nom.nextElementSibling.textContent = 'Le nom est obligatoire.';
        valid = false;
    }
    // sert a valider le champ email du formulaire de contact
    if (!email.value.trim() || !email.value.includes('@')) {
        email.style.borderColor = 'var(--danger)';
        email.nextElementSibling.style.display = 'block';
        email.nextElementSibling.textContent = 'L\'email est invalide.';
        valid = false;
    }
    // sert a valider le champ message du formulaire de contact
    if (!message.value.trim()) {
        message.style.borderColor = 'var(--danger)';
        message.nextElementSibling.style.display = 'block';
        message.nextElementSibling.textContent = 'Le message est obligatoire.';
        valid = false;
    }
    // sert a valider le champ captcha du formulaire de contact
    if (captcha.value.trim() !== currentCaptcha) {
        captcha.style.borderColor = 'var(--danger)';
        captcha.nextElementSibling.style.display = 'block';
        captcha.nextElementSibling.textContent = 'Le code captcha est incorrect.';
        valid = false;
    }
    // Si tout est valide, afficher le message de succès
    if (valid) {
        document.getElementById('contact-form').classList.add('hidden');
        document.getElementById('success-message').classList.remove('hidden');
        // Réinitialisation après 5 secondes
        setTimeout(() => {
            document.getElementById('contact-form').classList.remove('hidden');
            document.getElementById('success-message').classList.add('hidden');
            document.getElementById('contact-form').reset();
            currentCaptcha = generateCaptcha();
        }, 5000);
    }
});
