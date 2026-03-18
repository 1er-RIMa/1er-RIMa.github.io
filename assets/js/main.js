// sert a afficher ou masquer la mission 
document.getElementById('show-mission').addEventListener('click', function () {
    const mission = document.getElementById('mission');
    mission.classList.toggle('hidden');
    this.textContent = mission.classList.contains('hidden') ? 'Voir la mission' : 'Masquer';
});
